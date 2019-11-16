export const EVENT_TYPE = {
  keydown: Symbol('keydown'),
  keyup: Symbol('keyup'),
}

class InputController {
  constructor(props) {
    this.events = []
    // Setup handlers
    // Keydown
    document.onkeydown = e => {
      e.preventDefault()
      this.events.push({
        type: EVENT_TYPE.keydown,
        key: e.key,
      })
    }

    document.onkeyup = e => {
      e.preventDefault()
      this.events.push({
        type: EVENT_TYPE.keyup,
        key: e.key,
      })
    }

    this.handleKeyDown = []
    this.handleKeyUp = []
  }

  clear() {
    this.events.length = 0
  }

  handle() {
    for(let i = 0; i < this.events.length; i++) {
      const e = this.events[i]
      switch(e.type) {
      case EVENT_TYPE.keydown:
        this.handleKeyDown.forEach(todo => todo(e.key))
        break
      case EVENT_TYPE.keyup:
        this.handleKeyUp.forEach(todo => todo(e.key))
        break
      default:
        break
      }
    }
    this.events = []
  }

  addListener(type, toDo) {
    switch (type) {
    case EVENT_TYPE.keydown:
      this.handleKeyDown.push(toDo)
      break
    case EVENT_TYPE.keyup:
      this.handleKeyUp.push(toDo)
      break
    default:
      throw 'Unknown Event Type: ' + type
    }
  }

  clearListeners() {
    this.handleKeyDown.length = 0
    this.handleKeyUp.length = 0
  }
}

export default InputController
