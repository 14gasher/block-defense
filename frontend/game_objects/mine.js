const Sprite = require('./sprite')

const MINE_HEALTH = 100 
const INCOME_RATE = 5

class Mine extends Sprite {

  constructor(pos, type) {
    super(MINE_HEALTH, pos, type)
    this.incomePerRnd = INCOME_RATE
  }

  //Method to implement: AddToMoney


}

module.exports = Mine