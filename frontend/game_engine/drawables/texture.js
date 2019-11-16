const Drawable = require('./drawable')

class Texture extends Drawable { // Draws Textures
  constructor(specs) {
    super(specs, 'Texture')
    if(!specs.hasOwnProperty('src')) throw 'Texture Source Must Be Defined'
    let image = new Image()
    image.onload = () => {
      this.ready = true
      Object.assign(this, {
        texture: image,
        center: {
          x: 0,
          y: 0,
        },
        dimensions: {
          height: 0,
          width: 0,
          rotation: 0,
        },
        z_index: 0,
        src: undefined,
      }, specs)
    }
    image.src = specs.src
  }

  getType() {return super.getType()}

  update(specs) {
    if(specs.hasOwnProperty('src') && specs.src !== this.src) throw 'Woah Buddy... Create a new Texture Object for this...'
    Object.assign(this, specs)
  }

  draw(context) {
    super.draw(context)
    if(!this.ready) return // Don't draw if you can't...
    let topLeftCorner = {
      x: Math.round(this.center.x - (this.dimensions.width / 2)),
      y: Math.round(this.center.y - (this.dimensions.height / 2)),
    }
    context.save()
    context.translate(this.center.x, this.center.y)
    context.rotate(this.dimensions.rotation)
    context.translate(-this.center.x, -this.center.y)
    context.drawImage(
      this.texture,
      topLeftCorner.x,
      topLeftCorner.y,
      this.dimensions.width,
      this.dimensions.height
    )
    context.restore()
  }
}

module.exports = Texture