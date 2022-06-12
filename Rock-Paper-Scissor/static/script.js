function rpsGame(yourChoise) {
    var humanChoise, botChoise;
    humanChoise = yourChoise.id;
    botChoise = ['rock', 'paper', 'scissor'][Math.floor(Math.random()*3)];
    result = decideWinner(humanChoise, botChoise);
    var message = finalMessage(result)
    resultFrontend(humanChoise, botChoise, message)
}

function decideWinner(hChoise, bChoise) {
    rpsData =  {
        'rock': {'rock': 0.5, 'paper': 0, 'scissor': 1 },
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'rock': 0, 'paper': 1, 'scissor': 0.5}
    }
    var yourScore = rpsData[hChoise][bChoise]
    var botScore = rpsData[bChoise][hChoise]
    return [yourScore, botScore]   
}

function finalMessage([yourScore, botScore]) {
    if (yourScore > botScore){
        return ['You won!', 'green']
    } else if (yourScore === botScore) {
        return ['Draw!', 'yellow']
    } else {
        return ['You loose!', 'red']
    }
}

function resultFrontend(hChoise, bChoise, message) {
    var imageData = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    var humanDiv = document.createElement('div')
    var messageDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var reloadBtn = document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imageData[hChoise] + "' style='height: 100%; width: 100%; object-fit: contain; border: none;'>"
    messageDiv.innerHTML = "<h1 style='color: " + message[1] + "; font-size: 60px; padding: 30px; '>" + message[0] + "</h1>"
    messageDiv.style.cssText = 'border: none; box-shadow: none;';
    botDiv.innerHTML = "<img src='" + imageData[bChoise] + "' style='height: 100%; width: 100%; object-fit: contain; border: none;' >"
    reloadBtn.innerHTML = "<button class='btn btn-outline-primary' onclick='refresh()' style ='margin: 10px;' >Play again</button>"

    document.getElementById('game-room-id').appendChild(botDiv)
    document.getElementById('game-room-id').appendChild(messageDiv)
    document.getElementById('game-room-id').appendChild(humanDiv)

    document.getElementById('main-div').appendChild(reloadBtn)

}

function refresh() {
    location.reload();
}  