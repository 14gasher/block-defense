class RandomEngine {
  constructor() {
    this.storage = {
      gaussian: [],
      uniform: [],
    }
    this.usePrevious = false // For Gaussian Calculation
    this.y2 = 0
  }

  angle(maxAngle = (2 * Math.PI), minAngle = 0) {
    const range = maxAngle - minAngle
    return Math.random() * range + minAngle
  }

  elementInList(list) {
    list.shuffle()
    return list[0]
  }

  preGenerateUniform(count) {
    for(let i = 0; i < count; i++) this.storage.uniform.push(Math.random())
  }

  preGenerateGaussian(count, mean = 0, stdDev = 1) {
    for(let i = 0; i < count; i++) this.storage.gaussian.push(this.gaussian(mean, variance))
  }

  gaussian(mean = 0, stdDev = 1) {
    let x1 = 0,
      x2 = 0,
      y1 = 0,
      z = 0
    if(this.usePrevious) {
      this.usePrevious = false
      return mean + this.y2 * stdDev
    }
    this.usePrevious = true
    do {
      x1 = 2 * Math.random() - 1
      x2 = 2 * Math.random() - 1
      z = (x1 * x1) + (x2 * x2)
    } while (z >= 1)
    z = Math.sqrt((-2 * Math.log(z)) / z)
    y1 = x1 * z
    this.y2 = x2 * z
    return mean + y1 * stdDev
  }

  location(width, height) {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    }
  }
}

const RandomGenerator = new RandomEngine()

module.exports = RandomEngine