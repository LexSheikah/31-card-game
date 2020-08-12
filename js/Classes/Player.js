class Player {
  constructor(id, name, points = 0) {
    this._id = id,
    this._name = name,
    this._points = points
  }

  draw() {
    // code
  }
}

class CPU extends Player {
  constructor(id, name, points) {
    super(id, name, points)
  }

  deal() {
    // code
  }
}

class Human extends Player {
  constructor(id, name, points) {
    super(id, name, points)
  }

  stay() {
    // code
  }
}