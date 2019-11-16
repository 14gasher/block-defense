const Sprite = require('./sprite')
const WALL_HEALTH = 25

class Wall extends Sprite {
  constructor(pos, type, src) {
    super(WALL_HEALTH, pos, type, src)
  }
}

module.exports = Wall