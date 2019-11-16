const Drawable = require('./drawable')

class Circle extends Drawable {
  constructor(specs) {
    super(specs, 'Circle')
    Object.assign(this,{ // Defaults
      fill: 'black',
      border: 'black',
      cx: 0,
      cy: 0,
      r: 0,
    },specs)
  }

  update(specs) {
    Object.assign(this, specs)
  }

  draw(context) {
    super.draw(context)
    context.save()
    context.beginPath()
    context.fillStyle = this.fill
    context.strokeStyle = this.border
    context.arc(
      this.cx, this.cy, // center x and y
      this.r,           // Radius
      0, 2 * Math.PI,   // Start, end angles
      true              // CounterClockWise
    )
    context.stroke()
    context.fill()
    context.restore()
  }

  getType() {return super.getType()}

}

module.exports = Circle