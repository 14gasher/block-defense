import TD from './td'

const canvasId = 'game_canvas'
const canvas = document.createElement('canvas')
canvas.id = canvasId
document.body.appendChild(canvas)

setTimeout(() => {
  const game = new TD({canvasId})
  game.startGame()
}, 1000)
