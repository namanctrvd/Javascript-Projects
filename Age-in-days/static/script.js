

function ageInDays() {
    var currentYear = prompt('What is the current year?')
    var birthYear = prompt("What year you were born?")
    var days = (currentYear - birthYear)*365
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode('You are ' + days + ' days old.')
    h1.setAttribute('id', 'ageInDays')
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)

}

function reset() {
    document.getElementById('ageInDays').remove()
}
