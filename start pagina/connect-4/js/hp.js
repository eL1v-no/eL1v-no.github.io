function goBackToTheHomepage() {
    window.location.href = "/Start%20pagina/index.html";

}




document.getElementById("1PlayerBtn").onclick = function () {
    // Toon alleen het veld voor speler 1 en verberg speler 2
    document.getElementById("fillInYourName").style.display = 'block';  // Toon het veld om de naam van speler 1 in te vullen
    document.getElementById("player2Section").style.display = 'none';  // Verberg het veld voor speler 2
    document.getElementById("start-game").disabled = true;  // Schakel de "Start Game" knop uit totdat alle velden zijn ingevuld
};

document.getElementById("2PlayersBtn").onclick = function () {
    // Toon beide velden voor speler 1 en speler 2
    document.getElementById("fillInYourName").style.display = 'block';  // Toon het veld om de naam van speler 1 in te vullen
    document.getElementById("player2Section").style.display = 'block';  // Toon het veld voor speler 2
    document.getElementById("start-game").disabled = true;  // Schakel de "Start Game" knop uit totdat alle velden zijn ingevuld
};

document.getElementById("submitNamesBtn").onclick = function () {
    let player1Name = document.getElementById("player1Name").value;  // Verkrijg de naam van speler 1
    let player2Name = "";  // Standaard waarde voor speler 2 naam

    // Controleer of het veld voor speler 2 zichtbaar is
    if (document.getElementById("player2Section").style.display !== 'none') {
        player2Name = document.getElementById("player2Name").value;  // Verkrijg de naam van speler 2 als het veld zichtbaar is
    }

    // Controleer of alle namen zijn ingevuld
    if (player1Name.trim() !== "" && (player2Name.trim() !== "" || document.getElementById("player2Section").style.display === 'none')) {
        document.getElementById("start-game").disabled = false;  // Zet de "Start Game" knop aan als alle velden zijn ingevuld
        document.getElementById("error-message").style.display = "none";  // Verberg het foutbericht
        // Werk de titel bij afhankelijk van of speler 2 meedoet
        document.getElementById("myH2").textContent = document.getElementById("player2Section").style.display !== 'none'
            ? `Player 1: ${player1Name} vs Player 2: ${player2Name}`  // Beide spelers spelen
            : `Player 1: ${player1Name}`;  // Alleen speler 1 speelt
    } else {
        document.getElementById("error-message").textContent = "Please fill in all required names before starting the game.";  // Toon foutbericht als een naam ontbreekt
        document.getElementById("error-message").style.display = "block";  // Zet het foutbericht zichtbaar
    }
};

document.getElementById("start-game").onclick = function () {
    if (document.getElementById("player2Section").style.display === 'none') {
        // Ga naar de pagina voor 1 speler als speler 2 niet zichtbaar is
        window.location.href = "gameP1.html";  // Navigeer naar de game pagina voor 1 speler
    } else {
        // Ga naar de pagina voor 2 spelers
        window.location.href = "gameP2.html";  // Navigeer naar de game pagina voor 2 spelers
    }
};