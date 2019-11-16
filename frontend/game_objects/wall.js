const Sprite = require('./sprite')
const WALL_HEALTH = 25

class Wall extends Sprite {
  constructor(pos, type) {
    super(WALL_HEALTH, pos, type)
  }
}

module.exports = Wall