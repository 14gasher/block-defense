const Sprite = require('./sprite')

class OffenseBaseObject extends Sprite { 
  constructor(health, pos, pwr, speed, atkSpeed, atkRange) {
    super(health, pos)
    this.power = pwr
    this.speed = speed
    this.attackSpeed = atkSpeed
    this.range = atkRange
  }

  //Potential methods to implement:
  // inRange(), 
}

module.exports = OffenseBaseObject