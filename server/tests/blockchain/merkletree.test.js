const chai = require('chai')
const should = chai.should()

const MerkleTree = require('../../blockchain/merkleTree')

describe('Merkle Tree', () => {
  it('Generates appropriate hash', () => {
    const transactions = []
    const hash = MerkleTree.hash(transactions)
    hash.should.equal('')
  })
})
