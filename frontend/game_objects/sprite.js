class Sprite { 
  constructor(health, pos) {
    this.health = health
    this.position = {
      x: pos.x,
      y: pos.y
    }
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