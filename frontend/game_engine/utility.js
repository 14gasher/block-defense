Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]]
  }
  return this
}

class Vector { // Useful physics class
  constructor({
    components = false,
    magnitude,
    direction,
  }) {
    if(components) {
      this.magnitude = Math.sqrt(components.x * components.x + components.y * components.y)
      this.direction = Math.atan2(components.y, components.x)
      this.components = components
    } else {
      this.magnitude = magnitude
      this.direction = direction
      this.components = {
        x: Math.cos(direction) * magnitude,
        y: Math.sin(direction) * magnitude,
      }
    }
  }

  add(vector) {
    return new Vector({
      components: {
        x: this.components.x + vector.components.x,
        y: this.components.y + vector.components.y,
      }
    })
  }
}

function fn2workerURL(fn) {
  var blob = new Blob(['('+fn.toString()+')()'], {type: 'application/javascript'})
  return URL.createObjectURL(blob)
}

module.exports = Vector