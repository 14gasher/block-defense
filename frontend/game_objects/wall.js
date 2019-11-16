const Sprite = require('./sprite')
const WALL_HEALTH = 25

class Wall extends Sprite {
  constructor(pos) {
    super(WALL_HEALTH, pos)
  }
}

module.exports = Wall