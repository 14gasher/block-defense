class Drawable { // Interface for Drawable Objects
  constructor(specs, type) {
    if(!specs.hasOwnProperty('z_index')) throw `Please Define the Z-index. Type: ${type}`
    this.type = type
    this.z_index = specs.z_index
  }
  update(specs) {
    Object.assign(this, specs)
  }
  draw(context) {}
  getType() {return this.type}
}

module.exports = Drawable