
let currentPlayer = 1; // Huidige speler
let player1Score = 0; // Score voor Speler 1
let player2Score = 0; // Score voor Speler 2
let gameWon = false; // Spelstatus
let previousRoll = null; // Vorige rol
let guess = ""; // Globale variabele voor de gok

function showPage(pageId) {
    const pages = document.querySelectorAll('.page'); // Alle pagina's selecteren
    pages.forEach(page => page.style.display = 'none'); // Verberg alle pagina's
    document.getElementById(pageId).style.display = 'block'; // Toon geselecteerde pagina
    resetGame(); // Reset het spel
}

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1; // Genereer random getal voor dobbelsteen 1
    const dice2 = Math.floor(Math.random() * 6) + 1; // Genereer random getal voor dobbelsteen 2
    document.getElementById('dice1').textContent = dice1; // Toon dobbelsteen 1 resultaat
    document.getElementById('dice2').textContent = dice2; // Toon dobbelsteen 2 resultaat
    console.log("gegooid ", dice1, dice2); // Laat resultaat in console zien
    return dice1 + dice2; // Geef de som terug
}

function checkWin() {
    if (player1Score >= 10) { // Controleer of Speler 1 heeft gewonnen
        document.getElementById('winnerMessage').textContent = "Speler 1 heeft gewonnen!"; // Bericht voor winnaar Speler 1
        document.getElementById('finalWinner').textContent = "Gefeliciteerd Speler 1! Je bent de grote winnaar!"; // Finale boodschap
        gameWon = true; // Spelstatus op gewonnen zetten
        console.log("Winnaar: Speler 1"); // Toon winnaar in console
    } else if (player2Score >= 10) { // Controleer of Speler 2 heeft gewonnen
        document.getElementById('winnerMessage').textContent = "Speler 2 heeft gewonnen!"; // Bericht voor winnaar Speler 2
        document.getElementById('finalWinner').textContent = "Gefeliciteerd Speler 2! Je bent de grote winnaar!"; // Finale boodschap
        gameWon = true; // Spelstatus op gewonnen zetten
        console.log("Winnaar: Speler 2"); // Toon winnaar in console
    }
}

document.getElementById('rollButton').addEventListener('click', function() {
    console.log("Roll-button gedrukt door Speler " + currentPlayer); // Toon in console wie de knop drukte
    if (gameWon) return; // Stop als het spel al gewonnen is

    const totalRoll = rollDice(); // Rol de dobbelstenen
    console.log("Huidige speler: Speler " + currentPlayer); // Toon huidige speler
    console.log("Vorige rol: " + previousRoll); // Toon vorige rol

    if (previousRoll !== null) { // Controleer of er een vorige rol is
        guess = document.getElementById('higherButton').classList.contains('hidden') ? 'lager' : 'hoger'; // Bepaal de gok
        const rolledHigher = totalRoll > previousRoll; // Controleer of de rol hoger is

        if ((guess === 'hoger' && rolledHigher) || (guess === 'lager' && !rolledHigher)) { // Controleer of de gok correct is
            if (currentPlayer === 1) {
                player1Score++; // Verhoog score voor Speler 1
                document.getElementById('result').textContent = "Correct geraden"; // Toon correct resultaat
            } else {
                player2Score++; // Verhoog score voor Speler 2
                document.getElementById('result').textContent = "Correct geraden"; // Toon correct resultaat
            }
            console.log("Correct geraden! Huidige score - Speler 1: " + player1Score + ", Speler 2: " + player2Score); // Toon scores in console
        } else {
            document.getElementById('result').textContent = 'incorrect geraden'; // Toon fout resultaat
            currentPlayer = currentPlayer === 1 ? 2 : 1; // Wissel van speler
            console.log("fout, spelers gaan ruilen " + currentPlayer); // Toon wissel in console
        }
    }

    previousRoll = totalRoll; // Zet de huidige rol als vorige rol

    document.getElementById('player1Score').textContent = player1Score; // Update score Speler 1
    document.getElementById('player2Score').textContent = player2Score; // Update score Speler 2

    checkWin(); // Controleer of er een winnaar is
    console.log("Scores Speler 1: " + player1Score + ", Speler 2: " + player2Score); // Toon scores in console

    if (gameWon) { // Controleer of het spel gewonnen is
        document.getElementById('rollButton').style.display = 'none'; // Verberg rol knop
        document.getElementById('higherButton').style.display = 'none'; // Verberg hoger knop
        document.getElementById('lowerButton').style.display = 'none'; // Verberg lager knop
        document.getElementById('finalWinner').style.display = 'block'; // Toon finale winnaar
    } else {
        document.getElementById('currentGuess').textContent = `Speler ${currentPlayer}, raad of de volgende rol Hoger of Lager is!`; // Toon huidige gok tekst
        document.getElementById('higherButton').style.display = 'inline-block'; // Toon hoger knop
        document.getElementById('lowerButton').style.display = 'inline-block'; // Toon lager knop
        console.log("Huidige gok: Speler " + currentPlayer + " raadt " + guess); // Toon huidige gok in console
    }
});

document.getElementById('higherButton').addEventListener('click', function() {
    console.log("Hoger-button gedrukt Speler " + currentPlayer); // Toon in console wie de knop drukte
    this.style.display = 'none'; // Verberg deze knop
    document.getElementById('lowerButton').style.display = 'none'; // Verberg lager knop
    document.getElementById('currentGuess').textContent = "Rollen..."; // Update huidige gok tekst
});

document.getElementById('lowerButton').addEventListener('click', function() {
    console.log("Lager-button gedrukt door Speler " + currentPlayer); // Toon in console wie de knop drukte
    this.style.display = 'none'; // Verbergt deze knop
    document.getElementById('higherButton').style.display = 'none'; // Verbergt hoger knop
    document.getElementById('currentGuess').textContent = "Rollen..."; // Update de huidige gok tekst
});

function resetGame() {
    player1Score = 0; // Reset score p;yr 1
    player2Score = 0; // Reset score plyr 2
    gameWon = false; // Reset spelstatus
    previousRoll = null; // Reset vorige rol
    document.getElementById('player1Score').textContent = player1Score; // Update score Speler 1
    document.getElementById('player2Score').textContent = player2Score; // Update score Speler 2
    document.getElementById('winnerMessage').textContent = ""; // Reset winnaar boodschap
    document.getElementById('finalWinner').textContent = ""; // Reset finale winnaar boodschap
    document.getElementById('rollButton').style.display = 'inline-block'; // Toon rol knop
    document.getElementById('higherButton').style.display = 'none'; // Verstop hoger knop
    document.getElementById('lowerButton').style.display = 'none'; // Verstop lager knop
    document.getElementById('result').textContent = ""; // Reset resultaat
    document.getElementById('currentGuess').textContent = "Raad of de volgende getal hoger of lager is!"; // Reset huidige gok tekst
}