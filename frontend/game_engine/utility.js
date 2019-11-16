Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this
}

class Vector { // Useful physics class
  constructor(specs) {
    if(specs.hasOwnProperty('components')) {
      this.magnitude = Math.sqrt(specs.components.x * specs.components.x + specs.components.y * specs.components.y)
      this.direction = Math.atan2(specs.components.y, specs.components.x)
      this.components = specs.components
    } else {
      this.magnitude = specs.magnitude
      this.direction = specs.direction
      this.components = {
        x: Math.cos(specs.direction) * specs.magnitude,
        y: Math.sin(specs.direction) * specs.magnitude,
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
