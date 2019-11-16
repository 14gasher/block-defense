const WebSocket = require('ws')
// Port to socket on
const port = process.env.P2P_PORT || 5001
// Peers to connect to
// Add this (or similar) to cli PEERS = ws://localhost:5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []


// This handles realtime exchanges and communications with
// Other nodes in the network
class P2P {
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen() {
    const server = new WebSocket.Server({port})
    server.on('connection', s => this.connectSocket(s))
    this.connectToPeers()
  }

  connectSocket(socket) {
    this.sockets.push(socket)
  }

  connectToPeers() {
    for(const peer in peers) {
      const socket = new WebSocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    }
  }
}

module.exports = P2P
