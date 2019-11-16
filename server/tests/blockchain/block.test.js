const chai = require('chai')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

const Block = require('../../blockchain/block')
const TestBlocks = require('./testSetup')

describe('Block', () => {
  const blockData = [
      TestBlocks.valid.genesis,
      TestBlocks.valid.transaction,
      TestBlocks.invalid.noTransactions,
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
        block.should.have.own.property('nonce')
        block.should.have.own.property('timestamp')
        block.should.have.own.property('parentHash')
        block.should.have.own.property('transactionRoot')
        block.should.have.own.property('gameHash')
        block.should.have.own.property('transactions')
        block.should.have.own.property('game')
      })
      it(`Is ${b.valid ? '' : 'not '}valid`, () => {
        block.isValid().should.equal(b.valid)
      })
      it('Hashed correctly', () => {
        block.hash.should.equal(b.hash)
      })
    })
  })
})
