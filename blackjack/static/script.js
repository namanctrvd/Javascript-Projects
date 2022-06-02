
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['cardClubs2', 'cardClubs3', 'cardClubs4', 'cardClubs5', 'cardClubs6', 'cardClubs7', 'cardClubs8', 'cardClubs9', 'cardClubs10', 'cardClubsA', 'cardClubsJ', 'cardClubsQ', 'cardClubsK', 'cardDiamonds2', 'cardDiamonds3', 'cardDiamonds4', 'cardDiamonds5', 'cardDiamonds6', 'cardDiamonds7', 'cardDiamonds8', 'cardDiamonds9', 'cardDiamonds10', 'cardDiamondsA', 'cardDiamondsJ', 'cardDiamondsQ', 'cardDiamondsK', 'cardHearts2', 'cardHearts3', 'cardHearts4', 'cardHearts5', 'cardHearts6', 'cardHearts7', 'cardHearts8', 'cardHearts9', 'cardHearts10', 'cardHeartsA', 'cardHeartsJ', 'cardHeartsQ', 'cardHeartsK', 'cardSpades2', 'cardSpades3', 'cardSpades4', 'cardSpades5', 'cardSpades6', 'cardSpades7', 'cardSpades8', 'cardSpades9', 'cardSpades10', 'cardSpadesA', 'cardSpadesJ', 'cardSpadesQ', 'cardSpadesK'],
    'cardMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
    'hit': false

}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lostSound = new Audio('static/sounds/aww.mp3')

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        blackjackGame['hit'] = true
        let card = randomCard()
        showCard(card, YOU)
        updateScore(card, YOU)
        showScore(YOU)
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 52)
    return blackjackGame['cards'][randomIndex]
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img')
        cardImage.src = `static/images/cards/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false
        blackjackGame['hit'] = false
        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').innerHTML = 0;
        document.querySelector('#dealer-blackjack-result').innerHTML = 0

        document.querySelector('#your-blackjack-result').style.color = '#ffffff'
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'

        document.querySelector('#result').innerHTML = '';

        blackjackGame['turnsOver'] = false
    }
}

function updateScore(card, activePlayer) {
    if (card.slice(-1) === 'A') {
        // if adding 1 keeps score below 21 than add 11 otherwise ad 1
        if (activePlayer['score'] + blackjackGame['cardMap'][card.slice(-1)][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardMap'][card.slice(-1)][1]
        }
        else {
            activePlayer['score'] += blackjackGame['cardMap'][card.slice(-1)][0]
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardMap'][card.slice(-1)]
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score']
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function blackjackStand() {
    if (blackjackGame['hit'] === true) {
        blackjackGame['isStand'] = true
        while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
            let card = randomCard()
            showCard(card, DEALER)
            updateScore(card, DEALER)
            showScore(DEALER)
            await sleep(1000)
        }

        blackjackGame['turnsOver'] = true
        let winner = computeWinner();
        showResult(winner)
    }

}

function computeWinner() {
    let winner

    if (YOU['score'] <= 21) {
        // condition: Higher score than dealer or the dealer busts
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++
            winner = YOU
        }
        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++
            winner = DEALER
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++
        }
    }
    // condition: when user busts and dealer dosen't
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    }
    // condition: when user and dealer both busts
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++
    }

    return winner
}

function showResult(winner) {
    let message, messageColor
    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').innerHTML = blackjackGame['wins']
            message = 'You Won!'
            messageColor = 'green'
            winSound.play()
        }
        else if (winner === DEALER) {
            document.querySelector('#losses').innerHTML = blackjackGame['losses']
            message = 'You Lost!'
            messageColor = 'red'
            lostSound.play()
        }
        else {
            document.querySelector('#draws').innerHTML = blackjackGame['draws']
            message = 'You Drew!'
            messageColor = 'black'
        }

        document.querySelector('#result').innerHTML = message;
        document.querySelector('#result').style.color = messageColor;
    }


}