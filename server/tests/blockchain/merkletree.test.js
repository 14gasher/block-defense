const chai = require('chai')
const should = chai.should()

const MerkleTree = require('../../blockchain/merkleTree')

describe('Merkle Tree', () => {
  it('Generates appropriate hash', () => {
    const transactions = ['1', '2']
    const hash = MerkleTree.findRoot({
      data: transactions,
    })
    hash.should.equal('4bba124d7f7d6e481db86f6678928adad54a1160ba129d53feb6ca527a7060cf')
  })
})
