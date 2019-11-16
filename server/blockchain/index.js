const Block = require('./block')

class Blockchain {
  static verifyChain(chain) {
    if(!Block.isGenesis(chain[0])) return false
    for(let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const valid = block.parentHash === chain[i-1].hash && block.isValid()
      if(!valid) return false
    }
    return true
  }

  constructor() {
    this.chain = [Block.genesis()]

  }
}

module.exports = Blockchain
