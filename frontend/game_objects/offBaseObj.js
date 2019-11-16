const Sprite = require('./sprite')
const Vector = require('../game_engine/utility')

import {
  areaIntersection,
} from './utilities'
import { start } from 'repl'

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

    let direction = this.findDirection() //Sets unit to move or attack
    let newPos = {
      x: this.position.x + (this.speed * delta * Math.cos(direction)),
      y: this.position.y + (this.speed * delta * Math.sin(direction)),
    }

    this.updatePosition(newPos)
  }

  findDirection() {
    let nextMove = this.findShortestPath()
    if(nextMove.x === this.position.x && nextMove.y === this.position.y) {
      this.speed = this.origSpeed
      return (new Vector({
        components: {
          x: nextMove.x - this.position.x,
          y: nextMove.y - this.position.y,
        }
      })).direction
    }
    this.speed = 0
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
            health: o.health,
            ...o.position,
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
        const newWeight = startWeight + this.calcDistanceWeight(this.enemyHome.position)
        if(newWeight < bestWeight) {
          bestWeight = newWeight
          bestHistory = history
        }
        break
      }
      obstructions
        .forEach(obstacle => {
          // Weight if attack obstacle
          priorityQ.push({
            startWeight: startWeight + this.calcWeight(obstacle, position),
            position: {x:obstacle.x, y:obstacle.y},
            filter: filter.concat([{...obstacle}]),
            history: history.concat([position])
          })
          // weight if move to edges
          priorityQ.push({
            startWeight: startWeight + this.calcDistanceWeight(obstacle.tr, position),
            position: obstacle.tr,
            filter: filter.concat([{ ...obstacle }]),
            history: history.concat([position])
          })
          priorityQ.push({
            startWeight: startWeight + this.calcDistanceWeight(obstacle.tl, position),
            position: obstacle.tl,
            filter: filter.concat([{ ...obstacle }]),
            history: history.concat([position])
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

module.exports = OffenseBaseObject
