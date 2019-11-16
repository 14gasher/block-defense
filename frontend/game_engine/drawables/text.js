const Drawable = require('./drawable')

class Text extends Drawable {
  constructor(specs) {
    super(specs, 'Text')
    Object.assign(this, {
      fill: 'black',
      x: 0,
      y: 0,
      text: '',
      fontFamily: 'Arial',
      fontSize: '30px',
    }, specs)
  }

  draw(context) {
    super.draw(context)
    context.save()
    context.fillStyle = this.fill
    context.font = `${this.fontSize} ${this.fontFamily}`
    context.fillText(this.text, this.x, this.y)
    context.restore()
  }
}

module.exports = Text