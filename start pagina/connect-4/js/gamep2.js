function backToPage() {
    window.location.href = "hp.html";  // Verwijst de gebruiker terug naar de homepage (hp.html) wanneer deze functie wordt aangeroepen
}

document.getElementById('reloadButton').addEventListener('click', function () {
    location.reload();  // Laadt de pagina opnieuw wanneer de 'reloadButton' wordt aangeklikt
});

let playerRed = "R";  // Definieert de speler voor de rode schijf als "R"
let playerYellow = "Y";  // Definieert de speler voor de gele schijf als "Y"
let currPlayer = playerRed;  // Stelt de huidige speler in als de rode speler

let gameOver = false;  // Een vlag die aangeeft of het spel is afgelopen
let board;  // Een variabele die het bord van het spel zal bevatten
let currColumns;  // Houdt de huidige open rijen voor elke kolom bij

let rows = 6;  // Aantal rijen op het bord
let columns = 7;  // Aantal kolommen op het bord

window.onload = function() {
    setGame();  // Roept de functie setGame aan wanneer de pagina is geladen
}

function setGame() {
    board = [];  // Initieert het bord als een leeg array
    currColumns = [5, 5, 5, 5, 5, 5, 5];  // Stelt de beginpositie van elke kolom in (de onderste rij is 5)

    for (let r = 0; r < rows; r++) {  // Itereert door de rijen van het bord
        let row = [];  // Maakt een nieuwe lege rij
        for (let c = 0; c < columns; c++) {  // Itereert door de kolommen van de rij
            row.push(' ');  // Voegt een leeg teken toe voor elke cel in de rij

            let tile = document.createElement("div");  // Maakt een nieuw div-element voor elke tegel
            tile.id = "cell_" + r.toString() + "-" + c.toString();  // Geeft elke tegel een unieke ID op basis van de rij en kolom
            tile.classList.add("tile");  // Voegt de klasse 'tile' toe voor styling
            tile.addEventListener("click", setPiece);  // Voegt een klik event toe om een zet te doen
            document.querySelector("#board").appendChild(tile);  // Voegt de tegel toe aan het bord in de HTML
        }
        board.push(row);  // Voegt de rij toe aan het bord
    }
}

function setPiece() {
    if (gameOver) {  // Controleert of het spel is afgelopen
        return;  // Als het spel afgelopen is, gebeurt er verder niets
    }

    let coords = this.id.split("-");  // Verkrijgt de rij- en kolomindex van de geklikte tegel
    let r = parseInt(coords[0]);  // Verkrijgt de rij van de tegel
    let c = parseInt(coords[1]);  // Verkrijgt de kolom van de tegel

    r = currColumns[c];  // Verkrijgt de huidige lege rij in de gekozen kolom
    if (r < 0) {  // Als de kolom vol is (er zijn geen lege rijen meer)
        return;  // Voer geen actie uit
    }

    board[r][c] = currPlayer;  // Plaatst de huidige speler's schijf op het bord
    let cell = "#" + r.toString() + "-" + c.toString();  // Verkrijgt de ID van de cel waar de schijf wordt geplaatst
    console.log(cell);  // Logt de cel-ID voor debugdoeleinden
    let tile = document.querySelector("#cell_" + r.toString() + "-" + c.toString());  // Verkrijgt de tegel op de aangegeven positie
    if (currPlayer == playerRed) {  // Controleert of de huidige speler de rode speler is
        tile.classList.add("red-piece");  // Voegt de rode schijf toe aan de tegel
        currPlayer = playerYellow;  // Verandert de huidige speler naar de gele speler
    }
    else {  // Als de huidige speler geel is
        tile.classList.add("yellow-piece");  // Voegt de gele schijf toe aan de tegel
        currPlayer = playerRed;  // Verandert de huidige speler naar de rode speler
    }

    r -= 1;  // Verplaatst de rij omhoog voor de volgende zet in dezelfde kolom
    currColumns[c] = r;  // Update de huidige lege rij voor de gekozen kolom

    checkWinner();  // Controleert of er een winnaar is na deze zet
}

function checkWinner() {
    console.log(board);  // Logt het bord voor debugdoeleinden

    // Horizontaal winnen
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {  // Controleert of er genoeg ruimte is voor een horizontale lijn
            if (board[r][c] != ' ' &&  // Controleert of de cel niet leeg is
                board[r][c] == board[r][c + 1] &&  // Vergelijkt de cel met de volgende cel rechts
                board[r][c] == board[r][c + 2] &&  // Vergelijkt de cel met de cel erna
                board[r][c] == board[r][c + 3]) {  // Vergelijkt de cel met de vierde cel
                console.log(board[r][c]);  // Logt de speler die gewonnen heeft (R of Y)
                console.log("Winning cells: Horizontal at row " + r + ", starting column " + c);  // Logt de positie van de winnende cellen
                setWinner(r, c);  // Roept de setWinner functie aan om de winnaar te tonen
                return;  // Eindigt de functie als er een winnaar is
            }
        }
    }

    // Verticaal winnen
    for (let r = 0; r < rows - 3; r++) {  // Controleert of er genoeg ruimte is voor een verticale lijn
        for (let c = 0; c < columns; c++) {  // Itereert door elke kolom
            if (board[r][c] != ' ' &&  // Controleert of de cel niet leeg is
                board[r][c] == board[r + 1][c] &&  // Vergelijkt de cel met de cel eronder
                board[r][c] == board[r + 2][c] &&  // Vergelijkt de cel met de cel erna
                board[r][c] == board[r + 3][c]) {  // Vergelijkt de cel met de vierde cel
                console.log(board[r][c]);  // Logt de speler die gewonnen heeft (R of Y)
                console.log("Winning cells: Vertical at column " + c + ", starting row " + r);  // Logt de positie van de winnende cellen
                setWinner(r, c);  // Roept de setWinner functie aan om de winnaar te tonen
                return;  // Eindigt de functie als er een winnaar is
            }
        }
    }

    // Diagonaal winnen (linksboven naar rechtsonder)
    for (let r = 0; r < rows - 3; r++) {  // Controleert of er genoeg ruimte is voor een diagonale lijn
        for (let c = 0; c < columns - 3; c++) {  // Controleert of er genoeg ruimte is voor een diagonale lijn
            if (board[r][c] != ' ' &&  // Controleert of de cel niet leeg is
                board[r][c] == board[r + 1][c + 1] &&  // Vergelijkt de cel met de cel diagonaal rechts beneden
                board[r][c] == board[r + 2][c + 2] &&  // Vergelijkt de cel met de volgende diagonaal
                board[r][c] == board[r + 3][c + 3]) {  // Vergelijkt de cel met de vierde diagonaal
                console.log(board[r][c]);  // Logt de speler die gewonnen heeft (R of Y)
                console.log("Winning cells: Diagonal (\\) starting at row " + r + ", column " + c);  // Logt de positie van de winnende cellen
                setWinner(r, c);  // Roept de setWinner functie aan om de winnaar te tonen
                return;  // Eindigt de functie als er een winnaar is
            }
        }
    }

    // Diagonaal winnen (linksonder naar rechtsboven)
    for (let r = 3; r < rows; r++) {  // Controleert of er genoeg ruimte is voor een diagonale lijn
        for (let c = 0; c < columns - 3; c++) {  // Controleert of er genoeg ruimte is voor een diagonale lijn
            if (board[r][c] != ' ' &&  // Controleert of de cel niet leeg is
                board[r][c] == board[r - 1][c + 1] &&  // Vergelijkt de cel met de cel diagonaal rechts boven
                board[r][c] == board[r - 2][c + 2] &&  // Vergelijkt de cel met de volgende diagonaal
                board[r][c] == board[r - 3][c + 3]) {  // Vergelijkt de cel met de vierde diagonaal
                console.log(board[r][c]);  // Logt de speler die gewonnen heeft (R of Y)
                console.log("Winning cells: Diagonal (/) starting at row " + r + ", column " + c);  // Logt de positie van de winnende cellen
                setWinner(r, c);  // Roept de setWinner functie aan om de winnaar te tonen
                return;  // Eindigt de functie als er een winnaar is
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.querySelector("#Winner");  // Verkrijgt het element waar de winnaar wordt getoond
    if (board[r][c] == "R") {  // Controleert of de rode speler heeft gewonnen
        winner.innerText = "Red Wins";  // Zet de tekst op "Red Wins"
    } else {  // Als de gele speler heeft gewonnen
        winner.innerText = "Yellow Wins";  // Zet de tekst op "Yellow Wins"
        console.log('Geel heeft gewonnen');  // Logt 'Geel heeft gewonnen' voor debugdoeleinden
    }

    gameOver = true;  // Zet de gameOver vlag op true zodat er niet meer gezet kan worden
}