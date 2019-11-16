const Texture = require('../game_engine/drawables/texture')
const Z_INDEX = require('../game_engine/drawables/zIndex')

class Sprite { 
  constructor(health, pos, type, src,) {
    this.health = health
    this.type = type //ally or enemy
    this.position = {
      x: pos.x,
      y: pos.y,
    }
    this.renderable = new Texture({
      src: src,
      center: this.position, // reference to this to allow simple updates
      // dimensions: this.dimensions,
      z_index: Z_INDEX.FOREGROUND,
    })
  }

  updatePosition(newPos) {
    this.position.x = newPos.x
    this.position.y = newPos.y
  }

  updateHealth(attack) {
    this.health -= attack
  }

  isAlive() { 
    return this.health >= 0
  }
}

module.exports = Sprite