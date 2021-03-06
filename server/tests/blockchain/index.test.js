const chai = require('chai')
const should = chai.should()

const Block = require('../../blockchain/block')
const BlockChain = require('../../blockchain')

const TestBlocks = require('./testSetup')


describe('Blockchain', () => {
  const blockChain = new BlockChain()
  const blocks = {
    valid: new Block(TestBlocks.valid.transaction),
    invalid: new Block(TestBlocks.invalid.noTransactions),
  }
  describe('Static', () => {
    it('Can verify a chain', () => {
      BlockChain.verifyChain(blockChain.chain).should.equal(true)
    })
  })

  describe('Instance', () => {
    it('First Block should be genesis block', () => {
      Block.isGenesis(blockChain.chain[0]).should.equal(true)
    })

    it('Should add a valid block', () => {
      const start = blockChain.chain.length
      blockChain.addBlock(new Block(blocks.valid))
      const end = blockChain.chain.length - start
      end.should.equal(1)
    })

    it('Should not add an invalid block', () => {
      const start = blockChain.chain.length
      blockChain.addBlock(new Block(blocks.invalid))
      const end = blockChain.chain.length - start
      end.should.equal(0)
    })

    it('Should replace with a longer, valid chain', () => {
      const blockChain2 = new BlockChain()
      blockChain2.replaceChain(blockChain.chain)
      blockChain2.chain.length.should.equal(2)
    })
  })
})
