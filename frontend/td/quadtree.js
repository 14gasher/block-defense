class QuadTree {
  constructor(specs) {
    this.parent = specs.parent
    this.depth = specs.depth ? specs.depth : 1
    this.boundaries = specs.boundaries
    this.objects = specs.objects
    this.children = null
    const maxDepth = 5
    if (this.objects.length > specs.maxObjects && this.depth < maxDepth) {
      let xHalf = this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2
      let yHalf = this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
      let btl = {
        top: this.boundaries.top,
        left: this.boundaries.left,
        bottom: yHalf,
        right: xHalf,
      }
      let btr = {
        top: this.boundaries.top,
        left: xHalf,
        bottom: yHalf,
        right: this.boundaries.right,
      }
      let bbl = {
        top: yHalf,
        left: this.boundaries.left,
        bottom: this.boundaries.bottom,
        right: xHalf,
      }
      let bbr = {
        top: yHalf,
        left: xHalf,
        bottom: this.boundaries.bottom,
        right: this.boundaries.right,
      }
      let tl = []
      let tr = []
      let bl = []
      let br = []

      for (let i = 0; i < this.objects.length; i++) {
        let o = this.objects[i]
        let b = this.getGameObjectBoundaries(o)
        if (this.boundingBoxCollision(b, btl)) {
          tl.push(o)
        }
        if (this.boundingBoxCollision(b, btr)) {
          tr.push(o)
        }
        if (this.boundingBoxCollision(b, bbl)) {
          bl.push(o)
        }
        if (this.boundingBoxCollision(b, bbr)) {
          br.push(o)
        }
      }

      this.children = [
        new QuadTree({
          parent: this,
          depth: this.depth + 1,
          boundaries: btl,
          objects: tl,
          maxObjects: specs.maxObjects,
        }),
        new QuadTree({
          depth: this.depth + 1,
          parent: this,
          boundaries: btr,
          objects: tr,
          maxObjects: specs.maxObjects,
        }),
        new QuadTree({
          depth: this.depth + 1,
          parent: this,
          boundaries: bbl,
          objects: bl,
          maxObjects: specs.maxObjects,
        }),
        new QuadTree({
          depth: this.depth + 1,
          parent: this,
          boundaries: bbr,
          objects: br,
          maxObjects: specs.maxObjects,
        }),
      ]
    }
  }

  getLargestContainerCenter() {
    if (!this.children) {
      return {
        depth: this.depth,
        x: this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
        y: this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2,
      }
    }
    const results = this.children.map(c => c.getLargestContainerCenter())
    return results.sort((a, b) => a.depth > b.depth)[0]
  }

  getGameObjectBoundaries(gameObject) {
    let center = gameObject.center
    let dimensions = gameObject.dimensions
    let xShift = dimensions.width / 2
    let yShift = dimensions.height / 2
    return {
      left: center.x - xShift,
      right: center.x + xShift,
      top: center.y - yShift,
      bottom: center.y + yShift,
    }
  }

  getGameObjectSphere(gameObject) {
    let center = gameObject.center
    let dimensions = gameObject.dimensions
    let xShift = dimensions.width / 2
    let yShift = dimensions.height / 2
    let r = xShift > yShift ? xShift : yShift
    return {
      r,
      center,
    }
  }

  boundingBoxCollision(b1, b2) {
    return singleCheckCollision(b1, b2) || singleCheckCollision(b2, b1)

    function singleCheckCollision(boundary1, boundary2) {
      return (
        ((boundary1.left <= boundary2.left && boundary1.right >= boundary2.left) ||
          (boundary1.left <= boundary2.right && boundary1.right >= boundary2.right)) &&
        ((boundary1.top <= boundary2.top && boundary1.bottom >= boundary2.top) ||
          (boundary1.top <= boundary2.bottom && boundary1.bottom >= boundary2.bottom))
      )
    }
  }

  sphereCollision(b1, b2) {
    const rSum = b1.r + b2.r
    const xSum = b1.center.x - b2.center.x
    const ySum = b1.center.y - b2.center.y
    const res = rSum * rSum > xSum * xSum + ySum * ySum
    return res
  }

  // getRenderables() {
  //   let renderables = [new Rectangle({
  //     z_index: -1,
  //     fill: 'rgba(0,0,0,0)',
  //     border: 'white',
  //     x: this.boundaries.left,
  //     y: this.boundaries.top,
  //     height: this.boundaries.bottom - this.boundaries.top,
  //     width: this.boundaries.right - this.boundaries.left,
  //   })]
  //   if (this.children) {
  //     for (let i = 0; i < this.children.length; i++) {
  //       const c = this.children[i]
  //       renderables = renderables.concat(c.getRenderables())
  //     }
  //   }
  //   return renderables
  // }

  getCollisions() {
    let colissions = []
    if (this.children) {
      for (let i = 0; i < this.children.length; i++) {
        const node = this.children[i]
        colissions = colissions.concat(node.getCollisions())
      }
    } else {
      for (let i = 0; i < this.objects.length - 1; i++) {
        const c1 = this.objects[i]
        const b1 = this.getGameObjectSphere(c1)
        for (let j = i + 1; j < this.objects.length; j++) {
          const c2 = this.objects[j]
          const b2 = this.getGameObjectSphere(c2)
          if (this.sphereCollision(b1, b2)) {
            colissions.push([c1, c2])
          }
        }
      }
    }
    return colissions
  }
}

export default QuadTree
