const chai = require('chai')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

const Block = require('../../blockchain/block')

describe('Block', () => {
  const blockData = [
    {
      valid: true,
      description: 'Genesis Block',
      nonce: 0,
      parentHash: 'NULL',
      transactions: [],
      game: [],
    },
    {
      valid: false,
      description: 'No Transactions Block',
      nonce: 0,
      parentHash: '00067890000990989as',
      transactions: [],
      game: [],
    },
    {
      valid: false,
      description: 'No Transactions Block',
      nonce: 0,
      parentHash: '00067890000990989as',
      transactions: [],
      game: [],
    },
  ]

  it('Should have appropriate static methods', () => {
    Block.should.have.own.property('hash')    // hashes block header data
    Block.should.have.own.property('genesis') // creates a new genesis block
  })

  blockData.forEach(b => {
    const block = new Block(b)
    describe(b.description, () => {
      it('Has the appropriate fields', () => {
        block.should.have.own.property('hash')
        block.should.have.own.property('parentHash')
        block.should.have.own.property('transactionRoot')
        block.should.have.own.property('gameHash')
        block.should.have.own.property('transactions')
      })
      it('Has the correct methods', () => {
        block.should.have.own.property('isValid')
        block.should.have.own.property('toString')
      })
      it(`Is ${b.isValid ? '' : 'not '}valid`, () => {
        block.isValid().should.equal(b.valid)
      })
    })
  })
})
