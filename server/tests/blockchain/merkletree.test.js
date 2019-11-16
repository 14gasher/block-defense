const chai = require('chai')
const should = chai.should()

const MerkleTree = require('../../blockchain/merkleTree')

describe('Merkle Tree', () => {
  it('Generates appropriate hash', () => {
    const transactions = Array(2000).fill(0)
    const hash = MerkleTree.findRoot({
      data: transactions,
      toString: a => `${a}`,
    })
    hash.should.equal('')
  })
})
