function* gameLoop() {
  let initial = Date.now()
  do {
    const newTime = Date.now()
    const delta = newTime - initial
    initial = newTime
    update(delta)
    yield delta
  } while(true)
}

function update(delta) {
  const a = []
  for(let i = 0; i < 10000; i++) {
    for(let j = 0; j < 1000; j++) {
      a.push(delta)
    }
  }
  return a
}

const game = gameLoop()

while(true) {
  console.log(`Timestamp: ${game.next().value}`)
}
