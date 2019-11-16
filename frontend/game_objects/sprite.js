const Texture = require('../game_engine/drawables/texture')
const Z_INDEX = require('../game_engine/drawables/zIndex')

class Sprite {
  constructor({
    health,
    pos,
    type,
    src,
    collisionRadius,
  }) {
    this.health = health
    this.type = type //ally or enemy
    this.collisionRadius = collisionRadius
    this.position = {
      x: pos.x,
      y: pos.y,
    }
    this.center = this.position
    this.dimensions = {
      height: 50,
      width: 50,
    }
    this.renderable = new Texture({
      src: src,
      center: this.position, // reference to this to allow simple updates
      dimensions: this.dimensions,
      z_index: Z_INDEX.FOREGROUND,
    })
  }

  update(delta) {
    //intentionally blank
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

  getRenderable() {return this.renderable}
}

module.exports = Sprite
