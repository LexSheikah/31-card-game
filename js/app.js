// Clases
class Card {
  constructor(id, name, value, icon) {
    this._id = id,
    this._name = name,
    this._value = value,
    this._icon = icon
  }

  get name() {
    return this._name;
  }

  get icon() {
    return this._icon;
  }
}

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

// Variables
const deck = [ // D P C T
  new Card('C01', 'A', 1, 'heart'),
  new Card('C02', '2', 2, 'heart'),
  new Card('C03', '3', 3, 'heart'),
  new Card('C04', '4', 4, 'heart'),
  new Card('C05', '5', 5, 'heart'),
  new Card('C06', '6', 6, 'heart'),
  new Card('C07', '7', 7, 'heart'),
  new Card('C08', '8', 8, 'heart'),
  new Card('C09', '9', 9, 'heart'),
  new Card('C10', 'J', 10, 'heart'),
  new Card('C11', 'Q', 10, 'heart'),
  new Card('C12', 'K', 10, 'heart')
]

const cpuHand = document.querySelector('#cpu-hand')
const playerHand = document.querySelector('#one-hand')

const startGame = () => {
  let hand = ''
  deck.forEach( card => {
    hand += `<div class="card">
              <div class="card-footer"><span>${card.name}</span></div>
              <div class="card-body"><img src="./img/icons/${card.icon}.svg" class="card-icon"></div>
              <div class="card-header"><span>${card.name}</span></div>
            </div>`
  })
  playerHand.innerHTML = '' // Limpiando el contenido del Div
  playerHand.insertAdjacentHTML('afterbegin', hand)
}

startGame()
