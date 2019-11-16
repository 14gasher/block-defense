const Drawable = require('./drawable')

class Rectangle extends Drawable { // Draws Rectangles
  constructor(specs) {
    super(specs, 'Rectangle')
    Object.assign(this,{ // Defaults
      fill: 'black',
      border: 'black',
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    },specs)
  }

  draw(context) {
    super.draw(context)
    context.save()
    context.beginPath()
    context.fillStyle = this.fill
    context.fillRect(
      this.x,
      this.y,
      this.width,
      this.height,
    )
    context.strokeStyle = this.border
    context.strokeRect(
      this.x,
      this.y,
      this.width,
      this.height,
    )
    context.restore()
  }

  getType() {return super.getType()}
}

module.exports = Rectangle