const Sprite = require('./sprite')

class DefenseBaseObject extends Sprite { 
  constructor(health, pos, type, pwr, atkSpeed, atkRange) {
    super(health, pos, type)
    this.power = pwr
    this.attackSpeed = atkSpeed
    this.range = atkRange
  }

  //Potential methods to implement:
  // inRange(), 
}

module.exports = DefenseBaseObject