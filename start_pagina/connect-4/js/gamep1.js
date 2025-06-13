function backToPage() {
  window.location.href = "hp.html";  // Verstuurt de gebruiker naar de "hp.html" pagina
}

document.getElementById('reloadButton').addEventListener('click', function () {
  location.reload();  // Laadt de pagina opnieuw wanneer de 'reloadButton' wordt geklikt
});

const rows = 6;  // Aantal rijen in het spelbord
const cols = 7;  // Aantal kolommen in het spelbord
let board = Array(rows).fill(null).map(() => Array(cols).fill(null));  // Maakt een leeg bord van 6x7 gevuld met null
let currentPlayer = 'player';  // Speler begint het spel
let gameActive = true;  // Het spel is actief, dus zetten we de status op 'true'

const gameBoard = document.getElementById('game-board');  // Verwijst naar het HTML-element met id 'game-board'

function createBoard() {
  gameBoard.innerHTML = '';  // Maakt het bord leeg voordat het opnieuw wordt opgebouwd
  for (let r = 0; r < rows; r++) {  // Loopt door elke rij
    for (let c = 0; c < cols; c++) {  // Loopt door elke kolom
      const cell = document.createElement('div');  // Maakt een nieuw 'div' element voor elke cel
      cell.classList.add('cell');  // Voegt de CSS-klasse 'cell' toe voor styling
      cell.dataset.row = r;  // Zet de rij-informatie op de data-row attribuut
      cell.dataset.col = c;  // Zet de kolom-informatie op de data-col attribuut
      gameBoard.appendChild(cell);  // Voegt de cel toe aan het spelbord in de HTML
    }
  }
}

function handlePlayerMove(event) {
  if (!gameActive || currentPlayer !== 'player') return;  // Alleen als het spel actief is en het de beurt van de speler is, wordt deze functie uitgevoerd

  const col = event.target.dataset.col;  // Haalt de kolom op waar de speler op heeft geklikt
  if (col !== undefined && isValidMove(col)) {  // Als de move geldig is
    dropDisc(col, 'player');  // Laat de schijf vallen in de geselecteerde kolom
    if (checkForWin('player')) {  // Controleert of de speler heeft gewonnen
      alert('Player wins!');  // Toont een bericht als de speler wint
      resetGame();  // Reset het spel na winst
      return;
    }
    currentPlayer = 'bot';  // Zet de huidige speler naar 'bot'
    setTimeout(botMove, 500);  // Laat de bot een zet doen na een korte vertraging van 500 ms
  }
}

function dropDisc(col, player) {
  for (let r = rows - 1; r >= 0; r--) {  // Zoekt naar de laagst mogelijke rij in de geselecteerde kolom
    if (!board[r][col]) {  // Als de cel leeg is
      board[r][col] = player;  // Zet de speler op de board
      updateBoard(r, col, player);  // Werk het bord bij in de UI
      return;
    }
  }
}

function updateBoard(row, col, player) {
  const cells = document.querySelectorAll('.cell');  // Haalt alle cellen op die zijn gemarkeerd met de klasse 'cell'
  cells[row * cols + parseInt(col)].classList.add(player);  // Voegt de spelerklasse ('player' of 'bot') toe aan de juiste cel
}

function isValidMove(col) {
  return board[0][col] === null;  // Controleert of de bovenste rij van de geselecteerde kolom leeg is (dus een zet kan worden gedaan)
}

function botMove() {
  if (!gameActive) return;  // Als het spel niet actief is, doet de bot geen zet

  const bestMove = findBestMove();  // Vindt de beste zet voor de bot
  if (bestMove !== -1) {
    dropDisc(bestMove, 'bot');  // Laat de bot zijn zet doen in de beste kolom
    if (checkForWin('bot')) {  // Controleert of de bot heeft gewonnen
      alert('Bot wins!');  // Toont een bericht als de bot wint
      resetGame();  // Reset het spel na de overwinning van de bot
      return;
    }
    currentPlayer = 'player';  // Zet de beurt terug naar de speler
  }
}

function findBestMove() {
  for (let c = 0; c < cols; c++) {  // Loopt door alle kolommen
    if (isValidMove(c) && willWin(c, 'bot')) {  // Als de bot kan winnen met deze zet
      return c;  // Return de kolom waar de bot wint
    }
  }

  for (let c = 0; c < cols; c++) {  // Loopt door alle kolommen
    if (isValidMove(c) && willWin(c, 'player')) {  // Als de speler kan winnen met deze zet, blokkeer hem
      return c;  // Return de kolom waar de speler kan winnen
    }
  }

  const centre = Math.floor(cols / 2);  // Kijkt eerst of de bot naar de middenkolom kan gaan
  if (isValidMove(centre)) return centre;

  return getRandomMove();  // Als geen van de bovenstaande gevallen geldt, kiest de bot een willekeurige zet
}

function willWin(col, player) {
  for (let r = rows - 1; r >= 0; r--) {  // Loopt door de kolommen om te controleren of een zet wint
    if (!board[r][col]) {  // Als de cel leeg is
      board[r][col] = player;  // Zet de speler in die cel
      const isWin = checkForWin(player);  // Controleert of de zet heeft gewonnen
      board[r][col] = null;  // Zet de cel weer terug naar null
      return isWin;  // Return true als de zet een winnaar is
    }
  }
  return false;  // Return false als de zet geen winnaar is
}

function getRandomMove() {
  const validMoves = [];
  for (let c = 0; c < cols; c++) {  // Loopt door alle kolommen
    if (isValidMove(c)) {  // Als de kolom een geldige zet is
      validMoves.push(c);  // Voeg de kolom toe aan de lijst met geldige zetten
    }
  }
  return validMoves[Math.floor(Math.random() * validMoves.length)];  // Kies willekeurig een zet uit de geldige zetten
}

function checkForWin(player) {
  // Controleer horizontale lijnen
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (
        board[r][c] === player &&
        board[r][c + 1] === player &&
        board[r][c + 2] === player &&
        board[r][c + 3] === player
      ) {
        return true;  // Return true als er een horizontale lijn van 4 van dezelfde speler is
      }
    }
  }

  // Controleer verticale lijnen
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < cols; c++) {
      if (
        board[r][c] === player &&
        board[r + 1][c] === player &&
        board[r + 2][c] === player &&
        board[r + 3][c] === player
      ) {
        return true;  // Return true als er een verticale lijn van 4 van dezelfde speler is
      }
    }
  }

  // Controleer diagonale lijnen (\)
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (
        board[r][c] === player &&
        board[r + 1][c + 1] === player &&
        board[r + 2][c + 2] === player &&
        board[r + 3][c + 3] === player
      ) {
        return true;  // Return true als er een diagonale lijn van 4 van dezelfde speler is
      }
    }
  }

  // Controleer diagonale lijnen (/)
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (
        board[r][c] === player &&
        board[r - 1][c + 1] === player &&
        board[r - 2][c + 2] === player &&
        board[r - 3][c + 3] === player
      ) {
        return true;  // Return true als er een diagonale lijn van 4 van dezelfde speler is
      }
    }
  }

  return false;  // Return false als er geen winnaar is
}

function resetGame() {
  board = Array(rows).fill(null).map(() => Array(cols).fill(null));  // Reset het bord naar een lege staat
  gameActive = true;  // Zet het spel weer op actief
  currentPlayer = 'player';  // Zet de speler weer als huidige speler
  createBoard();  // Maak het bord opnieuw aan in de UI
}

createBoard();  // Maak het bord bij het laden van de pagina
gameBoard.addEventListener('click', handlePlayerMove);  // Voegt een event listener toe voor de zet van de speler