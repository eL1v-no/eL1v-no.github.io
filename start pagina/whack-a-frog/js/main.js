let startGameBtn = document.querySelector('.container .start-game-btn');
let container = document.querySelector('.container');
let allItems = document.querySelectorAll('.container .all-items .item');
let scoreText = document.querySelector('.container .score-box .score span');
let timerText = document.querySelector('.container .timer span');
let gameOverBox = document.querySelector('.container .game-over');
let gameOverScore = document.querySelector('.container .game-over-score');  
let exitGameBtn = document.querySelector('.container .game-over .exit-game'); 
let playAgainBtn = document.querySelector('.container .game-over .play-again-btn');
               


let score = 0;
let globalStartGame;

container.addEventListener('click', (e) => {
    //punten gaan omhoog als je de mol raakt
    if (e.target.classList.contains('mole-clicked')) {
        score++; //ff kijken//
        scoreText.innerHTML = score;
        console.log('mol is geraakt');
        //laat text whack zien en de mol is geraakt
        let hole = e.target.parentElement.parentElement;
        let whackText = document.createElement('div');
        whackText.classList.add("whack");
        whackText.innerHTML = 'Whack!';
        hole.appendChild(whackText);
        //timer voor de text//
        setTimeout(() => {
            whackText.remove
        }, 500);
    }
})

//knop gaat weg zodra je op start drukt
let startGame = () => {
    startTimer(30);
    globalStartGame = setInterval(() => {
        console.log('mol komt naar boven')
        showMole();
    }, 1000);
    startGameBtn.style.display = 'none';
    container.style.height = '550px'; //knop gaat naar beneden
}

//show mole
let showMole = () => {
    // laat de kikker random zien
    let randomIndex = Math.floor(Math.random() * allItems.length);
    let moleAppeared = allItems[randomIndex].querySelector('.hole img');
    moleAppeared.classList.add('mole-appeared');
    moleAppeared.addEventListener('click', MolKlick)
    hideMole(moleAppeared);
}

// nieuwe functie voor de mole sho ff kijken en connecten met de eerste stuk voor de show mole
function MolKlick() {
    console.log("Je hebt op een mol geklikt!");

    let currentMole = document.querySelector(".mole-appeared");
    currentMole.removeEventListener('click', MolKlick);
}

//verstop mole
let hideMole = (moleItem) => {
    setTimeout(() => {
        moleItem.classList.remove('mole-appeared');
    }, 950);
}

let startTimer = (time) => {
    timer = setInterval(() => {
        if (time > 0) {
            time--;
            timerText.innerHTML = time;
        }
        if (time == 0) {
            clearInterval(globalStartGame);
            clearInterval(timer);
            gameOverBox.style.display = 'block';
            gameOverScore.innerHTML = score;
        }
    }, 1000)
}

exitGameBtn.addEventListener('click', ()=>{
    score = 0;
    scoreText.innerHTML = '0';
    timerText.innerHTML = '30';
    gameOverBox.style.display = 'none';
    startGameBtn.style.display = 'block';
})

exitGameBtn.addEventListener('click', () => { 
    score = 0;
    scoreText.innerHTML = '0';
    timerText.innerHTML = '30';
    startGameBtn.style.display = 'block';

    window.location.href = '../index.html'; 
});


playAgainBtn.addEventListener('click', ()=>{
    score = 0;
    scoreText.innerHTML = '0';
    timerText.innerHTML = '30';
    gameOverBox.style.display = 'none';
    startGameBtn.click();
})

startGameBtn.addEventListener('click', startGame);