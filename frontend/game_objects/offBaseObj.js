const Sprite = require('./sprite')
const Vector = require('../game_engine/utility')

class OffenseBaseObject extends Sprite { 
  constructor({
    health, 
    pos, 
    type, 
    pwr, 
    speed,
    atkSpeed, 
    atkRange,
    src,
    collisionRadius,
    enemyHome, 
  }) {
    super({health, pos, type, src, collisionRadius,})
    this.power = pwr
    this.origSpeed = speed //Keeps track of objects starting speed
    this.speed = speed
    this.attackSpeed = atkSpeed
    this.range = atkRange
    this.targets
    this.enemyHome = enemyHome
  }

  update(delta) { //Calculates new position
    super.update(delta)
    
    let direction = findDirection() //Sets unit to move or attack
    let newPos = {
      x: this.position.x + (this.speed * delta * Math.cos(direction)),
      y: this.position.y + (this.speed * delta * Math.sin(direction)),
    }

    this.updatePosition(newPos)
  }

  findDirection() { 
    let nextMove = this.findShortestPath()
    let v
    switch(nextMove.type) {
    case 'move' : 
      this.speed = this.origSpeed
      v = new Vector({
        components: {
          x: nextMove.x - this.position.x, 
          y: nextMove.y - this.position.y,}
      })
      return v.direction
    case 'destroy' : 
      this.speed = 0 
      return 0
    default : 
      throw new Error('Hmmm. Looks like that want a good... something. I don\'t know.' + JSON.stringify(nextMove))
    }
  }

  findShortestPath(targets) {//array of series of moves to perform in order to get to base
  //base 1 nothing betwween
  // base 2 oject blcoking: go around (with nothing blocking after) or kill
  //recursion 

    


  //Move to (x,y), then (a,b), then destroy, then ()
  //Weight of shortest path
  //TODO: Implement

    let moveList = [] //{type, x, y}
    return moveList[0]
  }

  calcWeight(target) {
    return target.health / (this.pwr * this.atkSpeed)
  }

  pathCollision(thisPos, directionToHome, target) { //Boolean if target is in the path
    let posX = Math.max(Math.abs(target.position.x - target.collisionRadius), Math.abs(target.position.x + target.collisionRadius))
    let posY = Math.max(Math.abs(target.position.y - target.collisionRadius), Math.abs(target.position.y + target.collisionRadius))
  
  }


  targetBetween(newPosition) { //returns the target between attacker's position and home base
    let homeLoc = {
      type: 'move', 
      x: this.enemyHome.position.x, 
      y: this.enemyHome.position.y
    }

    let v = new Vector({
      components: {
        x: homeLoc.x - this.position.x, 
        y: homeLoc.y - this.position.y,}
    })
    let directionToHome = v.direction

    

    this.targets.forEach((target) => {
      



    })
  }

}

module.exports = OffenseBaseObject