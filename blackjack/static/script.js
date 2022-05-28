/* Function to change the front page to game area */
    
function letsPlay() {
    document.getElementById('landing-page').remove()
    var playDiv = document.getElementById('container-1')
    
    playDiv.innerHTML += '<div class="flex-blackjack-row-1"> <img src = "static/images/ui/name.png" alt = "" width = "440" height = "210" > </div > <div class="flex-blackjack-row-2"> <img src="static/images/ui/dealer.jpeg" alt="" width="450" height="238" > </div> <div class="flex-blackjack-row-3"> <div id="dealer-box"> <h2>Dealer: <span id="dealer-blackjack-result">0</span></h2> </div> <div id="your-box"> <h2>You: <span id="your-blackjack-result">0</span></h2> </div> </div> <div class="flex-blackjack-row-4"> <div><button class="btn-lg btn-primary mr-2" id="blackjack-hit-btn">Hit</button> <button class="btn-lg btn-warning mr-2" id="blackjack-Stand-btn">Stand</button> <button class="btn-lg btn-danger" id="blackjack-deal-btn">Deal</button> </div> </div> <div class="flex-blackjack-row-5" id="flex-cat-gen"> <table> <tr> <th>Wins</th> <th>Losses</th> <th>Draws</th> </tr> <tr>  <td><span id="wins">0</span></td> <td><span id="losses">0</span></td> <td><span id="draws">0</span></td> </tr> </table> </div>'
}

