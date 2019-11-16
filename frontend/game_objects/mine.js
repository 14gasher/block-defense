const Sprite = require('./sprite')

const MINE_HEALTH = 100 
const INCOME_RATE = 5

class Mine extends Sprite {

  constructor(pos) {
    super(MINE_HEALTH, pos)
    this.incomePerRnd = INCOME_RATE
  }

  //Method to implement: AddToMoney


}

module.exports = Mine