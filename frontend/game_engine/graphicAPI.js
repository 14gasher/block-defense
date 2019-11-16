const ZINDEX = {
  BACKGROUND: 0,
  MIDGROUND: 50,
  FOREGROUND: 100,
}

Object.freeze(ZINDEX) // Common Z-Indexes

class GraphicAPI {
  constructor(ctx, dimensions) {
    this.dimensions = dimensions
    this.context = ctx
    this.textures = []
    this.rectangles = []
  }

  clear() {
    this.context.clearRect(0,0,this.dimensions.width,this.dimensions.height)
  }

  draw(drawables) {
    this.clear()
    drawables.sort((a,b) => a.z_index - b.z_index)
    for(let i = 0; i < drawables.length; i++) {
      drawables[i].draw(this.context)
    }
  }
}

class Drawable { // Interface for Drawable Objects
  constructor(specs, type) {
    if(!specs.hasOwnProperty('z_index')) throw `Please Define the Z-index. Type: ${type}`
    this.type = type
    this.z_index = specs.z_index
  }
  update(specs) {
    Object.assign(this, specs)
  }
  draw(context) {}
  getType() {return this.type}
}

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
