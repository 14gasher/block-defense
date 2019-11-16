const SHA256 = require('crypto-js/sha256')

const findRootRecursive = (data) => {
  if (data.length === 0) return SHA256('').toString()
  if (data.length === 1) return data[0]
  if (data.length === 2) return SHA256(data[0] + data[1]).toString()
  const newData = []
  for (let i = 0; i < data.length; i += 2) {
    if (i + 1 === data.length) {
      newData.push(SHA256(data[i]).toString())
      break
    }
    newData.push(SHA256(data[i] + data[i + 1]))
  }
  findRootRecursive(newData)
}

class MerkleTree {
  static findRoot({data = [], toString = a => a}) {
    return findRootRecursive(data.map(a =>
      SHA256(toString(a)).toString()
    ))
  }
}

module.exports = MerkleTree
