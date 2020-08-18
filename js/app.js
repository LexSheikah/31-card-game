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

  get value() {
    return this._value;
  }

  get icon() {
    return this._icon;
  }
}

class Player {
  constructor(id, name, points = 0, hand = []) {
    this._id = id,
    this._name = name,
    this._points = points,
    this._hand = hand
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get points() {
    return this._points;
  }

  set points(value) {
    this._points = value;
  }

  get hand() {
    return this._hand;
  }
}

class CPU extends Player {
  constructor(id, name, points, hand) {
    super(id, name, points, hand)
  }

  // Método para barajear las cartas del Deck
  shuffle(deck) {
    let currentCardIndex = deck.length, temporaryCard, randomCardIndex;

    while (0 !== currentCardIndex) { // Mientras queden elementos a mezclar...
      randomCardIndex = Math.floor(Math.random () * currentCardIndex);
      currentCardIndex -= 1;

      // Cambiando la última carta, con una carta ramdom
      temporaryCard = deck[currentCardIndex];
      deck[currentCardIndex] = deck[randomCardIndex];
      deck[randomCardIndex] = temporaryCard;
    }

    return deck;
  }

  // Método para repartir carta al jugador
  deal(shuffledDeck, hand) {
    hand.push(shuffledDeck.pop())
  }
}

class Human extends Player {
  constructor(id, name, points, hand) {
    super(id, name, points, hand)
  }
}

// Variables
const starterDeck = [
  new Card('H01', 'A', 11, 'heart'),
  new Card('H02', '2', 2, 'heart'),
  new Card('H03', '3', 3, 'heart'),
  new Card('H04', '4', 4, 'heart'),
  new Card('H05', '5', 5, 'heart'),
  new Card('H06', '6', 6, 'heart'),
  new Card('H07', '7', 7, 'heart'),
  new Card('H08', '8', 8, 'heart'),
  new Card('H09', '9', 9, 'heart'),
  new Card('H10', 'J', 10, 'heart'),
  new Card('H11', 'Q', 10, 'heart'),
  new Card('H12', 'K', 10, 'heart'),
  new Card('D01', 'A', 11, 'diamond'),
  new Card('D02', '2', 2, 'diamond'),
  new Card('D03', '3', 3, 'diamond'),
  new Card('D04', '4', 4, 'diamond'),
  new Card('D05', '5', 5, 'diamond'),
  new Card('D06', '6', 6, 'diamond'),
  new Card('D07', '7', 7, 'diamond'),
  new Card('D08', '8', 8, 'diamond'),
  new Card('D09', '9', 9, 'diamond'),
  new Card('D10', 'J', 10, 'diamond'),
  new Card('D11', 'Q', 10, 'diamond'),
  new Card('D12', 'K', 10, 'diamond'),
  new Card('C01', 'A', 11, 'clover'),
  new Card('C02', '2', 2, 'clover'),
  new Card('C03', '3', 3, 'clover'),
  new Card('C04', '4', 4, 'clover'),
  new Card('C05', '5', 5, 'clover'),
  new Card('C06', '6', 6, 'clover'),
  new Card('C07', '7', 7, 'clover'),
  new Card('C08', '8', 8, 'clover'),
  new Card('C09', '9', 9, 'clover'),
  new Card('C10', 'J', 10, 'clover'),
  new Card('C11', 'Q', 10, 'clover'),
  new Card('C12', 'K', 10, 'clover'),
  new Card('S01', 'A', 11, 'spade'),
  new Card('S02', '2', 2, 'spade'),
  new Card('S03', '3', 3, 'spade'),
  new Card('S04', '4', 4, 'spade'),
  new Card('S05', '5', 5, 'spade'),
  new Card('S06', '6', 6, 'spade'),
  new Card('S07', '7', 7, 'spade'),
  new Card('S08', '8', 8, 'spade'),
  new Card('S09', '9', 9, 'spade'),
  new Card('S10', 'J', 10, 'spade'),
  new Card('S11', 'Q', 10, 'spade'),
  new Card('S12', 'K', 10, 'spade')
]
const banner = document.querySelector('#banner'),
      bankerHand = document.querySelector('#cpu-hand'),
      playerHand = document.querySelector('#one-hand'),
      playerScore = document.querySelector('#points'),
      btnStart = document.querySelector('#start'),
      btnRestart = document.querySelector('#restart'),
      btnRequest = document.querySelector('#request'),
      btnStay = document.querySelector('#stay'),
      modalBackground = document.querySelector('#modal-background'),
      modalResults = document.querySelector('#modal-results'),
      modalAsSelection = document.querySelector('#modal-as-selection'),
      lblWinner = document.querySelector('#winner'),
      lblPlayerPoint = document.querySelector('#player-score'),
      lblBankerPoint = document.querySelector('#banker-score')

let banker = new CPU('cpu1', 'Banquero'),
    player1 = new Player('p1', 'Juegar'),
    shuffledDeck = banker.shuffle(starterDeck.slice()),
    winner = null,
    loser = null,
    games = 0

const templatingCard = (card) => {
  if(card === undefined) {
    return '<div class="card card-back cardSwepDown"></div>'
  } else {
    let cardTemplate = `<div class="card cardSwepUp">
                          <div class="card-footer"><span>${card.name}</span></div>
                          <div class="card-body"><img src="./img/icons/${card.icon}.svg" class="card-icon"></div>
                          <div class="card-header"><span>${card.name}</span></div>
                        </div>`
    return cardTemplate
  }
}

const showWinner = msj => {
  modalBackground.classList.remove('hidden')
  modalResults.classList.remove('hidden')
  lblWinner.innerText = msj
  lblPlayerPoint.innerText = player1.points
  lblBankerPoint.innerText = banker.points
}

const checkWinner = () => {
  let msj = ''
  let player1Difference = 31 - player1.points
  let bankerDifference = 31 - banker.points

  if(player1.points > 31) {
    winner = banker
    loser = player1
    msj = '😭 Perdiste 😭'
  } else if(banker.points > 31) {
    winner = player1
    loser = banker
    msj = '🎊 Ganaste 🎊'
  } else if (player1Difference === bankerDifference) {
    msj = '😅 Empate 😅'
  } else {
    if(player1Difference < bankerDifference) {
      winner = player1
      loser = banker
      msj = '🎊 Ganaste 🎊'
    } else {
      winner = banker
      loser = player1
    msj = '😭 Perdiste 😭'
    }
  }

  showMessage('Juego terminado')
  showWinner(msj)
}

const updateScore = (player, points) => {
  player.points = player.points + points
  if(player === player1) playerScore.innerText = player.points
  if(player.points >= 31) checkWinner()
}

const getCard = (player, hand) => {
  banker.deal(shuffledDeck, player.hand)
  let lastCard = player.hand[player.hand.length - 1]
  if(player === player1) {
    hand.insertAdjacentHTML('beforeend', templatingCard(lastCard))
  } else {
    hand.insertAdjacentHTML('beforeend', templatingCard())
  }
  updateScore(player, lastCard.value)
}

const thinking = () => {
  let probability = 31 - banker.points
  let random = Math.floor(Math.random() * 10) + 1
  if(random <= probability) return true
  else return false
}

const enableButtons = () => {
  btnStart.removeAttribute('disabled')
  btnRequest.removeAttribute('disabled')
  btnStay.removeAttribute('disabled')
}

const disableButtons = (flag) => {
  if(flag !== undefined) btnStart.setAttribute('disabled', 'true')
  btnRequest.setAttribute('disabled', 'true')
  btnStay.setAttribute('disabled', 'true')
}

const showMessage = txt => {
  banner.innerText = txt
}

const reset = () => {
  enableButtons()
  showMessage('31 Card Game')
  winner = null
  loser = null
  playerScore.innerText = 0
  bankerHand.innerHTML = ''
  playerHand.innerHTML = ''
  banker = new CPU('cpu1', 'Banquero')
  player1 = new Player('p1', 'Juegar')
  modalBackground.classList.add('hidden')
  modalResults.classList.add('hidden')
}

const startGame = () => {
  enableButtons()
  btnStart.setAttribute('disabled', 'true')
  showMessage('Turno del Jugador 1')

  // Repartiendo cartas iniciales del jugador 1
  for(let i = 0; i < 3; i++) {
    getCard(player1, playerHand)
  }
  // Repartiendo cartas iniciales para el banquero
  for(let i = 0; i < 3; i++) {
    getCard(banker, bankerHand)
  }
}

btnStart.addEventListener('click', () => {
  startGame()
})

btnRestart.addEventListener('click', () => {
  reset()
  startGame()
})

btnRequest.addEventListener('click', () => {
  getCard(player1, playerHand)
})

btnStay.addEventListener('click', () => {
  disableButtons()
  showMessage('Turno del Banquero')

  games++
  if(games % 3 === 0) shuffledDeck = banker.shuffle(starterDeck.slice())

  const drawingSimulator = () => {
    setTimeout(() => {
      if(thinking()) {
        getCard(banker, bankerHand)
        drawingSimulator()
      } else {
        if(winner === null) checkWinner()
      }
    }, 1000)
  }
  drawingSimulator()
})

disableButtons()