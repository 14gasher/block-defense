const particleImages = {}

import Drawable from './drawables/drawable'
import ZINDEX from './drawables/zIndex'
import RandomGenerator from './randomEngine'

;[ // Colors available, alphabetized for your sake
  'black',
  'blue',
  'gray',
  'green',
  'orange',
  'red',
  'white',
  'yellow'
].forEach(p => {
  particleImages[p] = new Image()
  particleImages[p].src = `textures/particles/${p}.png`
})

Object.freeze(particleImages) // Lock the object from further modification

class ParticleEngine {
  constructor() {
    this.generators = []
    this.particles = []
  }

  update(delta) {
    this.generators = this.generators.filter(generator => {
      generator.update(delta)
      return generator.isAlive()
    })
    this.generators.forEach(generator => {
      const particles = generator.generate()
      this.particles = this.particles.concat(particles)
    })
    this.particles = this.particles.filter(particle => {
      particle.update(delta)
      return particle.isAlive()
    })
  }

  getRenderables() {
    return this.particles
  }

  radial(specs) { // Allows 'explosive' particle
    let alive = 0
    this.generators.push({
      generate: () => {
        let particles = []
        for(let p = 0; p < specs.density; p++) {
          const angle = RandomGenerator.angle(specs.angle.max, specs.angle.min)
          const particleColor = RandomGenerator.elementInList(specs.colors)
          particles.push(new Particle({
            z_index: specs.z_index !== undefined ? specs.z_index : ZINDEX.FOREGROUND, // Default in front
            particleColor,
            center: Object.assign({},specs.center),
            size: RandomGenerator.gaussian(specs.size.mean, specs.size.stdDev),
            direction: {x: Math.cos(angle), y: Math.sin(angle)},
            speed: RandomGenerator.gaussian(specs.speed.mean, specs.speed.stdDev),
            lifetime: RandomGenerator.gaussian(specs.lifetime.mean, specs.lifetime.stdDev),
          }))
        }
        return particles
      },
      isAlive: () => alive < specs.generatorLifetime,
      update: delta => alive += delta
    })
  }
}

class Particle extends Drawable {
  constructor(specs) {
    super(specs, 'Particle')
    // eslint-disable-next-line no-prototype-builtins
    if(!specs.hasOwnProperty('particleColor')) throw 'ERROR: particleColor not defined. Particles must have a predefined particle color!'
    Object.assign(this, {
      texture: particleImages[specs.particleColor],
      center: {x: 0,y: 0},
      size: 0,
      direction: {x: 0, y: 0},
      speed: 0,
      lifetime: 0,
      alive: 0,
    }, specs)
  }

  update(delta) {
    this.alive += delta
    this.center.x += delta * this.speed * this.direction.x
    this.center.y += delta * this.speed * this.direction.y
  }

  isAlive() {return this.alive < this.lifetime}

  draw(context) {
    super.draw(context)
    context.save()
    const shift = -this.size / 2
    context.drawImage(
      this.texture,
      this.center.x + shift,
      this.center.y + shift,
      this.size,
      this.size,
    )
    context.restore()
  }
}

export default ParticleEngine
