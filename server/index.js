const router = require('express').Router()

const P2P = require('./p2p')
const BlockChain = require('./blockchain')

const blockchain = new BlockChain()
const p2pServer = new P2P(blockchain)

p2pServer.listen()

router
  .use('/user', require('./user'))
  .use('/game', require('./game'))

module.exports = router
