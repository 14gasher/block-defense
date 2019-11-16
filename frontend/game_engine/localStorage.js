class Storage {
  constructor() {
    this.storage = new PersistentStorage()
    if(!this.storage.storeWithKey('bootup-test', 'test')) {
      console.error('Local Storage is inaccessible. Using Session Storage. Try booting a simple server <code>python -m SimpleHTTPServer 3000</code> to make this work')
      this.storage = new SessionStorage()
    }
  }

  getWithKey(key) {
    return this.storage.getWithKey(key)
  }

  storeWithKey(key, val) {
    return this.storage.storeWithKey(key, val)
  }
}

class PersistentStorage {  // Data persists across sessions. Must use server for it to work
  getWithKey(key){
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch(e) {
      throw 'Error: That key does not exist'
    }

  }

  storeWithKey(key, value){ // Returns true if the item was stored
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      return false
    }
    return true
  }
}

class SessionStorage {  // Data dies after browser closed
  getWithKey(key) {
    const val = JSON.parse(sessionStorage[key])
    if(val === undefined) {
      throw 'Error: That key does not exist'
    }
    return val
  }

  storeWithKey(key, value) { // Returns true if the item was stored
    try {
      sessionStorage[key] = JSON.stringify(value)
    } catch (e) {
      return false
    }
    return true
  }
}

module.exports = Storage
