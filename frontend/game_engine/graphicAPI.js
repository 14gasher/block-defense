const ZINDEX = require('./drawables/zIndex')

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

module.exports = GraphicAPI
