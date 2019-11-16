import GameEngine from '../game_engine'
import { EVENT_TYPE } from '../game_engine/inputController'
import QuadTree from './quadtree'

import {
  MainOffense,
  MainDefense,
  Mine,
  Wall,
  HomeBase,
} from '../game_objects'

class TowerDefense extends GameEngine {
  constructor({ canvasId }) {
    super({ canvasId, dimensions: { height: 500, width: 500 } })
    this.money = 0
    this.gameObjects = []
  }

  startGame() {
    this.money = 0
    const enemyHome = new HomeBase({ position: { x: this.dimensions.width / 2, y: 50 }, isEnemy: true })
    const home = new HomeBase({ position: { x: this.dimensions.width / 2, y: this.dimensions.height - 50 }, isEnemy: false })
    this.gameObjects = [
      enemyHome,
      home
    ]

    this.input.clearListeners()
    super.addInputHandler(EVENT_TYPE.keydown, key => {
      switch (key) {
      case ' ':
        this.gameObjects.push(new MainDefense({
          isEnemy: false, position: {
            x: Math.random() * this.dimensions.height,
            y: Math.random() * this.dimensions.width,
          }
        }))
        break
      case 'a':
        this.gameObjects.push(new MainOffense({
          position: {
            x: home.position.x,
            y: home.position.y,
          },
          enemyHome,
        }))
        break
      default:
        break
      }
    })
    super.startGame()
  }

  update(delta) {
    super.update(delta)
    // If a home base destroyed, game over
    if (false) {
      return this.endGame()
    }
    this.gameObjects.forEach(go => go.update(delta, this.gameObjects))
    const qt = new QuadTree({
      parent: null,
      maxObjects: 4,
      boundaries: {
        top: 0,
        left: 0,
        right: this.dimensions.width,
        bottom: this.dimensions.height,
      },
      objects: this.gameObjects,
    })

    qt.getCollisions().forEach(([c1, c2]) => {
      if (c1.type === c2.type) return
      // TODO add in the attacking info
    })

    this.gameObjects = this.gameObjects.filter(go => go.isAlive())
  }

  render() {
    this.drawables = this.gameObjects.map(go => go.getRenderable())
    // TODO add hud with current income
    super.render()
  }
}

export default TowerDefense
