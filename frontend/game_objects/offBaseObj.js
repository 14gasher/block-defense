const Sprite = require('./sprite')

class OffenseBaseObject extends Sprite { 
  constructor(health, pos, type, pwr, speed, atkSpeed, atkRange) {
    super(health, pos, type)
    this.power = pwr
    this.speed = speed
    this.attackSpeed = atkSpeed
    this.range = atkRange
  }

  //Potential methods to implement:
  // inRange(), 
}

module.exports = OffenseBaseObject