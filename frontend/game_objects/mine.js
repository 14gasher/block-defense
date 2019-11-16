const Sprite = require('./sprite')

const MINE_HEALTH = 100
const INCOME_RATE = 5

class Mine extends Sprite {

  constructor({pos, type, src}) {
    super({health: MINE_HEALTH, pos, type, src})
    this.incomePerRnd = INCOME_RATE
  }

}

module.exports = Mine
