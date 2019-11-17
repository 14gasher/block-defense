import OffenseBase from './offBaseObj'
import DefenseBase from './defBaseObj'
import HomeBaseBase from './homeBase'
import MineBase from './mine'
import WallBase from './wall'

export const PLAYER = {
  ENEMY: 1,
  HUMAN: 0,
}

export class MainOffense extends OffenseBase {
  constructor({position, isEnemy, enemyHome}) {
    super({
      pos: position,
      health: 20,
      type: isEnemy ? PLAYER.ENEMY : PLAYER.HUMAN,
      pwr: 2,
      atkSpeed: 500, // ms
      atkRange: 5,
      speed: 50 / 1000,
      src: isEnemy ? 'resources/units/jelly-fish-bad.png' : 'resources/units/jelly-fish-team.png',
      enemyHome,
    })
  }
}

export class MainDefense extends DefenseBase {
  constructor({position, isEnemy}) {
    super({
      pos: position,
      health: 10,
      type: isEnemy ? PLAYER.ENEMY : PLAYER.HUMAN,
      pwr: 1,
      atkSpeed: 1000, // ms
      atkRange: 50,
      src: isEnemy ? 'resources/units/clownish-bad.png' : 'resources/units/clownfish-team.png',
    })
  }
}

export class HomeBase extends HomeBaseBase {
  constructor({position, isEnemy}) {
    super({
      pos: position,
      type: isEnemy ? PLAYER.ENEMY : PLAYER.HUMAN,
      src: isEnemy ? 'resources/units/tower-bad.png' : 'resources/units/tower-team.png',
    })
  }
}

export class Mine extends MineBase {
  constructor({position, isEnemy}) {
    super({
      pos: position,
      type: isEnemy ? PLAYER.ENEMY : PLAYER.HUMAN,
      src: isEnemy ? 'resources/units/worms-bad.png' : 'resources/units/worms-team.png',
    })
  }
}


export class Wall extends WallBase {
  constructor({position, isEnemy}) {
    super({
      pos: position,
      type: isEnemy ? PLAYER.ENEMY : PLAYER.HUMAN,
      src: isEnemy ? 'resources/units/rock-wall-bad.png' : 'resources/units/rock-wall-team.png',
    })
  }
}
