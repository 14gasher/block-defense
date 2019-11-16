const Block = require('../../blockchain/block')

const timestamp = new Date('January 1, 2020')

module.exports = {
  valid: {
    genesis: {
      valid: true,
      description: 'Genesis Block',
      timestamp,
      nonce: 0,
      parentHash: 'NULL',
      transactions: [{
        original: 500,
        uid: 0,
        to: 0,
        amt: 0,
      }],
      game: [],
      hash: 'b5cf9a79a58542e6ac8f19d1eb19043bfc381b035562366126627ccfb64a71d7',
    },
    transaction: {
      valid: true,
      description: 'One Transaction Block',
      nonce: 0,
      timestamp,
      parentHash: '00067890000990989as',
      transactions: [{ balance: 100, uid: 1, to: 0, amt: 10 }],
      game: [],
      hash: '83863e1957c75c6332a9b773cac75a3da511101ec459add2f688bfc1f76d852a',
    }
  },
  invalid: {
    noTransactions: {
      valid: false,
      description: 'No Transactions Block',
      nonce: 0,
      timestamp,
      parentHash: '00067890000990989as',
      transactions: [],
      game: [],
      hash: '77ccbeb539b2592bf83b68e3c4504a3269db8b64ea415a407a513467ae3d391b',
    }
  }


}
