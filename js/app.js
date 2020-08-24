// Clases
class Card {
  constructor(name, value, icon) {
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

  set value(value) {
    this._value = value;
  }

  get icon() {
    return this._icon;
  }
}

class Player {
  constructor(name, points = 0, hand = []) {
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
  deal(shuffledDeck, hand, flag) {
    let card = shuffledDeck.pop()
    while (flag && card.name === 'A') {
      card = shuffledDeck.pop()
    }
    hand.push(card)
  }
}

// Variables
const starterDeck = [
  new Card('A', 11, 'heart'),
  new Card('2', 2, 'heart'),
  new Card('3', 3, 'heart'),
  new Card('4', 4, 'heart'),
  new Card('5', 5, 'heart'),
  new Card('6', 6, 'heart'),
  new Card('7', 7, 'heart'),
  new Card('8', 8, 'heart'),
  new Card('9', 9, 'heart'),
  new Card('J', 10, 'heart'),
  new Card('Q', 10, 'heart'),
  new Card('K', 10, 'heart'),
  new Card('A', 11, 'diamond'),
  new Card('2', 2, 'diamond'),
  new Card('3', 3, 'diamond'),
  new Card('4', 4, 'diamond'),
  new Card('5', 5, 'diamond'),
  new Card('6', 6, 'diamond'),
  new Card('7', 7, 'diamond'),
  new Card('8', 8, 'diamond'),
  new Card('9', 9, 'diamond'),
  new Card('J', 10, 'diamond'),
  new Card('Q', 10, 'diamond'),
  new Card('K', 10, 'diamond'),
  new Card('A', 11, 'clover'),
  new Card('2', 2, 'clover'),
  new Card('3', 3, 'clover'),
  new Card('4', 4, 'clover'),
  new Card('5', 5, 'clover'),
  new Card('6', 6, 'clover'),
  new Card('7', 7, 'clover'),
  new Card('8', 8, 'clover'),
  new Card('9', 9, 'clover'),
  new Card('J', 10, 'clover'),
  new Card('Q', 10, 'clover'),
  new Card('K', 10, 'clover'),
  new Card('A', 11, 'spade'),
  new Card('2', 2, 'spade'),
  new Card('3', 3, 'spade'),
  new Card('4', 4, 'spade'),
  new Card('5', 5, 'spade'),
  new Card('6', 6, 'spade'),
  new Card('7', 7, 'spade'),
  new Card('8', 8, 'spade'),
  new Card('9', 9, 'spade'),
  new Card('J', 10, 'spade'),
  new Card('Q', 10, 'spade'),
  new Card('K', 10, 'spade')
]
const banner = document.querySelector('#banner'),
      bankerHand = document.querySelector('#cpu-hand'),
      playerHand = document.querySelector('#one-hand'),
      playerScore = document.querySelectorAll('.points'),
      btnStart = document.querySelector('#start'),
      btnRestart = document.querySelector('#restart'),
      btnRequest = document.querySelector('#request'),
      btnStay = document.querySelector('#stay'),
      modalBackground = document.querySelector('#modal-background'),
      modalResults = document.querySelector('#modal-results'),
      modalAsSelection = document.querySelector('#modal-as-selection'),
      modalBoxBody = document.querySelector('#modalBox-body'),
      lblWinner = document.querySelector('#winner'),
      lblPlayerPoint = document.querySelector('#player-score'),
      lblBankerPoint = document.querySelector('#banker-score'),
      playerCards = document.querySelectorAll('.player-cards')

let banker = new CPU('Banquero'),
    player1 = new Player('Juegar'),
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

  player1.hand.forEach( card => {
    playerCards[0].insertAdjacentHTML('beforeend', templatingCard(card))
  })

  banker.hand.forEach( card => {
    playerCards[1].insertAdjacentHTML('beforeend', templatingCard(card))
  })
}

const checkWinner = () => {
  let msj = ''

  if( player1.points > 31 || (banker.points > player1.points && banker.points <= 31) ) {
    winner = banker
    loser = player1
    msj = '😭 Perdiste 😭'
  } else if( banker.points > 31 || (player1.points > banker.points && player1.points <= 31) ) {
    winner = player1
    loser = banker
    msj = '🎊 Ganaste 🎊'
  } else if ( banker.points === player1.points ) {
    msj = '😅 Empate 😅'
  }

  showMessage('Juego terminado')
  showWinner(msj)
}

const updateScore = (player, points) => {
  player.points = player.points + points
  if(player === player1) playerScore[0].innerText = player.points
  if(player.points >= 31) checkWinner()
}

const closeModalAsSelecction = () => {
  modalBackground.classList.add('hidden')
  modalAsSelection.classList.add('hidden')
}

const showModalAsSelecction = card => {
  playerScore[1].innerText = player1.points
  if(modalBackground.classList.contains('hidden')) modalBackground.classList.remove('hidden')
  if(modalAsSelection.classList.contains('hidden')) modalAsSelection.classList.remove('hidden')

  let template = `<div class="AsViewer">
                    <div class="card cardSwepUp">
                      <div class="card-footer"><span>1</span></div>
                      <div class="card-body"><img src="./img/icons/${card.icon}.svg" class="card-icon"></div>
                      <div class="card-header"><span>1</span></div>
                    </div>
                    <div class="card cardSwepUp">
                      <div class="card-footer"><span>11</span></div>
                      <div class="card-body"><img src="./img/icons/${card.icon}.svg" class="card-icon"></div>
                      <div class="card-header"><span>11</span></div>
                    </div>
                  </div>`

  modalBoxBody.insertAdjacentHTML('afterbegin', template)

  let opctions = modalBoxBody.firstElementChild.children

  opctions[0].addEventListener('click', () => {
    card.value = 1
    closeModalAsSelecction()
    modalBoxBody.removeChild(modalBoxBody.firstChild)
    playerHand.insertAdjacentHTML('beforeend', templatingCard(card))
    updateScore(player1, card.value)
  })

  opctions[1].addEventListener('click', () => {
    card.value = 11
    closeModalAsSelecction()
    modalBoxBody.removeChild(modalBoxBody.firstChild)
    playerHand.insertAdjacentHTML('beforeend', templatingCard(card))
    updateScore(player1, card.value)
  })
}

const getCard = (player, hand, flag = false) => {
  banker.deal(shuffledDeck, player.hand, flag)
  let lastCard = player.hand[player.hand.length - 1]
  if(player === player1) {
    if(lastCard.name === 'A'){
      showModalAsSelecction(lastCard)
    } else {
      hand.insertAdjacentHTML('beforeend', templatingCard(lastCard))
      updateScore(player, lastCard.value)
    }
  } else {
    banker.points += lastCard.value
    hand.insertAdjacentHTML('beforeend', templatingCard())
    if (banker.points >= 31) checkWinner()
  }
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
  playerScore[0].innerText = 0
  playerScore[1].innerText = 0
  bankerHand.innerHTML = ''
  playerHand.innerHTML = ''
  banker = new CPU('Banquero')
  player1 = new Player('Juegar')
  modalBackground.classList.add('hidden')
  modalResults.classList.add('hidden')
  modalAsSelection.classList.add('hidden')
  playerCards[0].innerHTML = ''
  playerCards[1].innerHTML = ''
}

const startGame = () => {
  games++
  if(games % 3 === 0) shuffledDeck = banker.shuffle(starterDeck.slice())
  enableButtons()
  btnStart.setAttribute('disabled', 'true')
  showMessage('Turno del Jugador 1')

  // Repartiendo cartas iniciales del jugador 1
  for(let i = 0; i < 3; i++) {
    getCard(player1, playerHand, true)
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

  const drawingSimulator = () => {
    setTimeout(() => {
      if(banker.points > 26) {
        if(winner === null) checkWinner()
      } else {
        getCard(banker, bankerHand)
        drawingSimulator()
      }
    }, 1000)
  }
  drawingSimulator()
})

disableButtons()