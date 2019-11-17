const Sprite = require('./sprite')
const Vector = require('../game_engine/utility')

import {
  areaIntersection,
} from './utilities'

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

  update(delta, gameObjects) { //Calculates new position
    super.update(delta)
    let direction = this.findDirection(gameObjects.filter(a => a.type !== this.type)) //Sets unit to move or attack
    let newPos = {
      x: this.position.x + (this.speed * delta * Math.cos(direction)),
      y: this.position.y + (this.speed * delta * Math.sin(direction)),
    }

    this.updatePosition(newPos)
  }

  findDirection(obstacles) {
    let nextMove = this.findShortestPath(obstacles)
    const similar = (v1,v2) => Math.abs(v1 - v2) < 2
    if(!(similar(nextMove.x, this.position.x) && similar(nextMove.y, this.position.y))) {
      this.speed = this.origSpeed
      return (new Vector({
        components: {
          x: nextMove.x - this.position.x,
          y: nextMove.y - this.position.y,
        }
      })).direction
    }
    this.speed = 0
    return 0
  }

  findShortestPath(obstacles) {
    const mkPt = (x,y) => ({x,y})
    let priorityQ = [{
      position: this.position,
      startWeight: 0,
    }]
    let bestWeight = Infinity
    let bestHistory = []
    while(priorityQ.length > 0) {
      const {position, startWeight, filter = [], history=[]} = priorityQ.shift()
      const obstructions = obstacles
        .map(o => {
          const offset = o.radius
          const mox = o.position.x - offset
          const pox = o.position.x + offset
          const moy = o.position.y - offset
          const poy = o.position.y + offset
          const tl = mkPt(mox, moy)
          const tr = mkPt(pox, moy)
          const bl = mkPt(mox, poy)
          const br = mkPt(pox, poy)
          return {
            x: o.position.x,
            y: o.position.y,
            health: o.health,
            tl,tr,bl,br,
          }
        })
        .filter(({tl,tr,bl,br}) => {
          if(filter.find(f => {
            f.tr === tr
            f.tl === tl
            f.br === br
            f.bl === bl
          })) return false
          return areaIntersection({
            line: [position, this.enemyHome.position],
            area: [
              [tl, tr],
              [tr, br],
              [br, bl],
              [bl, tl],
            ],
          })
        })

      if(obstructions.length === 0) {
        const newWeight = startWeight + this.calcDistanceWeight(position, this.enemyHome.position)
        if(newWeight < bestWeight) {
          bestWeight = newWeight
          bestHistory = history.concat([this.enemyHome.position])
        }
        break
      }
      obstructions
        .forEach(obstacle => {
          // Weight if attack obstacle
          priorityQ.push({
            startWeight: startWeight + this.calcWeight(obstacle, position),
            position: {x:obstacle.x, y:obstacle.y},
            filter: filter.concat([{
              tr:obstacle.tr,
              br:obstacle.br,
              tl:obstacle.tl,
              bl:obstacle.bl
            }]),
            history: history.concat([{ x: obstacle.x, y: obstacle.y }])
          })
          // weight if move to edges
          priorityQ.push({
            startWeight: startWeight + this.calcDistanceWeight(obstacle.tr, position),
            position: obstacle.tr,
            filter: filter.concat([{
              tr: obstacle.tr,
              br: obstacle.br,
              tl: obstacle.tl,
              bl: obstacle.bl
            }]),
            history: history.concat([obstacle.tr])
          })
          priorityQ.push({
            startWeight: startWeight + this.calcDistanceWeight(obstacle.tl, position),
            position: obstacle.tl,
            filter: filter.concat([{
              tr: obstacle.tr,
              br: obstacle.br,
              tl: obstacle.tl,
              bl: obstacle.bl
            }]),
            history: history.concat([obstacle.tl])
          })
        })

      priorityQ = priorityQ
        .filter(a => a.startWeight < bestWeight)
        .sort((a, b) => (b.startWeight - a.startWeight))
    }
    return bestHistory[0]
  }

  calcDistanceWeight(obstacle, position) {
    const dx = obstacle.x - position.x
    const dy = obstacle.y - position.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance * this.origSpeed
  }

  calcWeight(target, position) {
    const dt = this.calcDistanceWeight(target, position)
    const dat = target.health / (this.pwr * this.atkSpeed)
    return dt + dat // travel + attack time
  }
}

export default OffenseBaseObject
