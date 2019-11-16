const Storage = require('./localStorage')
const AudioController = require('./audioController')
const GraphicAPI = require('./graphicAPI')
import ParticleEngine from './particleEngine'
import InputController from './inputController'

class GameController {
  constructor({ canvasId, render, dimensions = {
    width: window.innerWidth - 40,
    height: window.innerHeight - 40,
  }}) {
    let canvas = document.getElementById(canvasId)
    this.dimensions = dimensions
    canvas.height = this.dimensions.height
    canvas.width = this.dimensions.width
    this.storage = new Storage()
    this.audio = new AudioController()
    this.graphic = new GraphicAPI(canvas.getContext('2d'), this.dimensions)
    this.particle = new ParticleEngine()
    this.input = new InputController()
    this.beforeRender = render
    this.drawables = []
    // These are for average fps
    this.frames = 0
    this.second = 0
  }

  onend() {
    this.input.clearListeners()
  }

  getDimensions() {return this.dimensions}

  startGame() {
    this.initial = performance.now()
    this.shouldEnd = false
    this.input.clear()
    window.requestAnimationFrame(timestamp => this.gameLoop(timestamp))
  }

  setDrawables(drawables) {this.drawables = drawables}
  addInputHandler(type, todo) {this.input.addListener(type,todo)}

  endGame() {this.shouldEnd = true}

  gameLoop(time) {
    if(this.shouldEnd) {
      this.onend()
      return
    }
    let delta = time - this.initial // Delta time
    /* This is to calculate fps
    this.second += delta
    this.frames++
    if(this.second > 1000) {
      console.log(this.frames)
      this.frames = 0
      this.second = 0
    }
    */
    this.initial = time
    this.input.handle()             // Handle inputs
    this.update(delta)
    this.render()                   // Render
    window.requestAnimationFrame(t => this.gameLoop(t)) // Repeat
  }

  update(delta) {
    this.particle.update(delta)
  }

  render() {
    const particles = this.particle.getRenderables()
    const renderables = this.drawables.concat(particles)
    this.graphic.draw(renderables)
  }
}

export default GameController
