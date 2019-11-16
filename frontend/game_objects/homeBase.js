const Sprite = require('./sprite')
const HOME_HEALTH = 1000

class HomeBase extends Sprite {
  constructor({pos, type, src}) {
    super({health: HOME_HEALTH, pos, type, src})
  }
}

module.exports = HomeBase
