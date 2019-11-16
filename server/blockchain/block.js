const SHA256 = require('crypto-js/sha256')
const MerkleTree = require('./merkleTree')

class Block {
  static hash(block) {
    const { timestamp, parentHash, transactionRoot, gameHash, nonce } = block
    return SHA256(`${timestamp}${parentHash}${transactionRoot}${gameHash}${nonce}`).toString()
  }

  static genesis() {
    return new Block({
      timestamp: new Date(),
      nonce: 0,
      parentHash: 'NULL',
      transactions: [{
        original: 500,
        uid: 0,
        to: 0,
        amt: 0,
      }],
      game: [],
    })
  }

  constructor({
    timestamp,
    nonce,
    parentHash,
    transactions,
    game,
  }) {
    Object.assign(this, {
      timestamp,
      nonce,
      parentHash,
      transactions,
      game,
    })
    this.transactionRoot = Block.getTransactionRoot(this.transactions)
    this.gameHash = Block.getGameRoot(this.game)
    this.hash = Block.hash(this)
  }

  isValid() {
    return (
      this.gameHash === Block.getGameRoot(this.game) &&
      this.transactionRoot == Block.getTransactionRoot(this.transactions) &&
      this.transactions.length > 0
    ) || Block.isGenesis(this)
  }

  static getGameRoot(game) {
    return MerkleTree.findRoot({
      data: game,
      toString: ({ time, unit, position: { x, y } }) => `${time}${unit}${x}${y}`
    })
  }

  static getTransactionRoot(transactions) {
    return MerkleTree.findRoot({
      data: transactions,
      toString: ({ original, uid, to, amt }) => `${original}${uid}${to}${amt}`
    })
  }

  static isGenesis(block) {
    const genesis = Block.genesis()
    return [
      'parentHash',
      'nonce',
    ]
      .reduce((valid, key) => valid && genesis[key] === block[key], true) &&
      [
        'original',
        'uid',
        'to',
        'amt',
      ]
        .reduce((valid, key) => valid && genesis.transactions[0][key] === block.transactions[0][key], true) &&
      block.transactions.length === 1
  }

}

module.exports = Block
