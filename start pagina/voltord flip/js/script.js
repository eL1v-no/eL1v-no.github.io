//Variabelen
let width = 6;
let height = 6;
let y;
let x;
let delayInMilliseconds = 6000;
let lost = false;
let maxX = 6;
let maxY = 6;
let threeCounter = 0;
let canGameStart = true;
let score = 0;
let lives = 0;


//maakt het speelveld
const playArea = document.querySelector('#gameArea');
console.log(playArea);

function getButton(x, y){
    return '<div class="button" onclick="clickCell('+x+', '+y+')"><div class="button_value hidden" id="cell_'+x+'_'+y+'">'+getValueFromPlayArea(x, y)+'</div></div>';
    return '<button onclick="clickCell('+x+', '+y+')">'+getValueFromPlayArea(x, y)+'</button>';
}

speelveld = [
    [ 3, 1, 0, 1, 0, 1],
    [ 2, 0, 1, 2, 1, 0],
    [ 1, 1, 2, 0, 2, 3],
    [ 0, 2, 3, 1, 2, 1],
    [ 2, 1, 2, 2, 0, 1],
    [ 1, 2, 2, 3, 0, 2],
];

function getValueFromPlayArea(row, column) {
    return speelveld[row][column];
}

// zorgt ervoor dat je niet weer op een geklikte kaart kan klikken
function IsAlreadyClicked(row, column) {
    const clickedButton = document.querySelector(`#gameArea .button:nth-child(${(row * 6) + column + 1})`);
    child=clickedButton.firstChild;
    if(child.classList.contains("shown") == true){
        return true;
    } else{
    return false;
    }
}
// kijkt naar welke kaart geklikt was en wat het hoort te doen dan
function clickCell(row, column) {
    console.log(threeCounter)
    console.log(score)
    console.log(lives)
    console.log("You clicked on cell " + getValueFromPlayArea(row, column));
    
    if(IsAlreadyClicked(row, column)) {
        alert("Already clicked that cell");
        return;
    }
    ShowDiv(row, column);
    if (getValueFromPlayArea(row, column) == 0){
        if(lives == 0){
            alert("you have lost")
            setTimeout(function reseten(){
                const round = document.querySelector('#gameArea')
                round.innerHTML = " ";
                Reset();
                } , delayInMilliseconds);
                threeCounter = 0
                showAllCards()
                score = 0
                lives = 0
        } else {
            lives = lives - 1;
            alert("a live has been used")
        }
    }
    if (getValueFromPlayArea(row, column) == 3){
        threeCounter++;
        console.log(threeCounter)
        if(threeCounter == 4){
            alert("you have won")
            score = 0
            lives = 0
            setTimeout(function reseten(){
                const round = document.querySelector('#gameArea')
                round.innerHTML = " ";
                Reset();
                } , delayInMilliseconds);
                showAllCards()
        }
    }
    if (getValueFromPlayArea(row, column) == 1 || getValueFromPlayArea(row, column) == 2){
        score++;
        if(score == 5){
            lives = lives + 1;
            score = 0
        }
    }
}
// draait een kaart om
function ShowDiv(row, column) {
    const clickedDiv = document.querySelector(`#gameArea .button:nth-child(${(row * 6) + column + 1})`); // Pas 6 aan als je speelveld een ander formaat krijgt
    child=clickedDiv.firstChild;
    child.classList.remove("hidden");
    child.classList.add('shown');
}
// draait de kaarten om wanneer je gewonnen of verloren hebt
function showAllCards() {
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++) {
            ShowDiv(x, y);
        }
    }
}
//nog een code die het speelveld maakt
function Setup() {
    if(canGameStart !== true){
        alert("win of verlies eerst");
        return;
    }
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let htmlString = getButton(x, y);
            playArea.innerHTML += htmlString;
        }
    }
    canGameStart = false;
    
}

// hi


// zorgen dat de speelveld kan veranderen
function shuffle(speelveld) {
    let currentIndex = speelveld.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [speelveld[currentIndex], speelveld[randomIndex]] = [
            speelveld[randomIndex], speelveld[currentIndex]];
    }
}


// bord resetten
function Reset(){
    if(canGameStart !== false){
        alert("Click eerst op begin spel");
        return;
    }
    shuffle(speelveld);
    shuffle(speelveld);
    const lost = document.querySelector('#gameArea')
            lost.innerHTML = " ";
    canGameStart = true

}

shuffle(speelveld);


// regels en begin vraag
function Rules(){
    alert("Om het spel te starten moet er eerst op 'Begin spel' geklikt worden.")
    alert("Na het kliken verschijnt er een bord. Wanneer het bord er is kan het spel beginnen.")
    alert("Nu is je doel om alle kaarten met een 3 om te draaien zonder de gevaarlijke aan te raken.")
    alert("Er zijn in totaal 4 kaarten met een 3 dus het is niet makkelijk.")
    alert("Als er genoeg kaarten met een 1 of een 1 worden omgedraaid krijgt de speler een leven waarmee de speler 1 keer op een 0 kaart kan klikken zonder te verliezen.")
    alert("Als je wint of verliest worden alle kaarten omgedraait zodat je kan zien waar alles was.")
    alert("Als je verloren heb kan je weer op 'Begin spel kleine bord' om opnieuw te beginnen.")
}

alert("Neem even de tijd om de regels te bekijken links boven op het scherm")

// oude code

// https://www.codeguage.com/blog/flip-card-css
// c = Math.floor(Math.random() * 3);
// d = Math.floor(Math.random() * 3);
// e = Math.floor(Math.random() * 3);
// f = Math.floor(Math.random() * 3);
// g = Math.floor(Math.random() * 3);
// h = Math.floor(Math.random() * 3);
// i = Math.floor(Math.random() * 3);
// j = Math.floor(Math.random() * 3);
// k = Math.floor(Math.random() * 3);
// l = Math.floor(Math.random() * 3);
// m = Math.floor(Math.random() * 3);
// n = Math.floor(Math.random() * 3);
// q = Math.floor(Math.random() * 3);
// r = Math.floor(Math.random() * 3);
// s = Math.floor(Math.random() * 3);
// t = Math.floor(Math.random() * 3);
// z = Math.floor(Math.random() * 3);
// if(speelveld[0][2] == 4)
//     console.log("Je hebt een vijf gevonden");
// else
//     console.log("Je hebt een " + speelveld[0][2] + " gevonden");

// function startGame(){
//     createButtons();
// }
// function createButtons(maxX, maxY){
//     for(let x = 0; x < maxX; x++)
//     {
//         for(let y = 0; y < maxY; y++){
//             b = Math.floor(Math.random() * 4);
//             if (b == 3){
//             b = Math.floor(Math.random() * 4);
//             }
//             console.log('<button id="something" onclick="update('+x+','+y+')">' + b + '</button>');
//             const vield = document.querySelector('#Vield')
//             vield.innerHTML += '<button id="something" onclick="update('+x+','+y+')">' + b + '</button>';
//         }
//     }
// }

// function update(x, y){
//     if (speelveld[x][y] == 0){
//         console.log("0")
//     } else if (speelveld[x][y] == 1){
//         console.log("1")  
//     } else if (speelveld[x][y] == 2){
//         console.log("2") 
//     }   else if (speelveld[x][y] == 3){
//         console.log("3") 
//     } else {
//         console.log("help")
//     }
// }

//grote van het bord bepalen
// function startGameSmall(){
// while (i < 27) { 
//     b = Math.floor(Math.random() * 4);
//     if (b == 3){
//         b = Math.floor(Math.random() * 4);
//     }
//     buttonmaker();
//     i++;
//     }
//     smallBord = true;
// }

// function startGameMedium(){
//     while (i < 54) { 
//         b = Math.floor(Math.random() * 4);
//         if (b == 3){
//             b = Math.floor(Math.random() * 4);
//         }
//         buttonmaker();
//         i++;
//         }
//         mediumBord = true;
//  }

// function startGameLarge(){
//     while (i < 81) { 
//         b = Math.floor(Math.random() * 4);
//         if (b == 3){
//             b = Math.floor(Math.random() * 4);
//         }
//         buttonmaker();
//         i++;
//         }
//         largeBord = true;
// }



// //bord maker
// function buttonmaker(){
//     const button = document.querySelector('.categories-buttons')
//     if (b == 1 || b == 2 || b == 3) {
//     button.innerHTML += '<button id="something" onclick="pressed('+y+')">' + b + '</button>';
//     } else {
//         button.innerHTML += '<button id="somethingwrong" onclick="pressedwrong()" >' + 'hi' + '</button>';
//         wrongPress = true
//     }
    
   
// }


// //functies voor wanneer de knoppen geklikt worden
// function pressed(x, y){
//     console.log("hi")
//     score++;
//     console.log(score)
//     if(smallBord = true && score == 10){
//         alert("You won")
//         const flip = document.querySelectorAll('#something', '#somethingwrong')
//         flip.forEach(el => el.style.backgroundColor = "green");
//         const flipWrong = document.querySelectorAll('#somethingwrong')
//         flipWrong.forEach(el => el.style.backgroundColor = "green");
//         reset = true;
//         score = 0;
//         if(reset = true){
//             setTimeout(function reseten(){
//                 i = 0;
//                 const round = document.querySelector('#game-grid')
//                         round.innerHTML = " ";
//                         reset = false;
//             } , delayInMilliseconds);
//         }
//     } else if (mediumBord = true && score == 20){
//         alert("You won")
//         const flip = document.querySelectorAll('#something', '#somethingwrong')
//         flip.forEach(el => el.style.backgroundColor = "green");
//         const flipWrong = document.querySelectorAll('#somethingwrong')
//         flipWrong.forEach(el => el.style.backgroundColor = "green");
//         reset = true;
//         score = 0;
//         if(reset = true){
//             setTimeout(function reseten(){
//                 i = 0;
//                 const round = document.querySelector('#game-grid')
//                         round.innerHTML = " ";
//                         reset = false;
//             } , delayInMilliseconds);
//         }
//     } else if (largeBord = true && score == 42){
//         alert("You won")
//         const flip = document.querySelectorAll('#something', '#somethingwrong')
//         flip.forEach(el => el.style.backgroundColor = "green");
//         const flipWrong = document.querySelectorAll('#somethingwrong')
//         flipWrong.forEach(el => el.style.backgroundColor = "green");
//         reset = true;
//         score = 0;
//         if(reset = true){
//             setTimeout(function reseten(){
//                 i = 0;
//                 const round = document.querySelector('#game-grid')
//                         round.innerHTML = " ";
//                         reset = false;
//             } , delayInMilliseconds);
//         }
//     }
// }

// function pressedwrong(){
//     console.log("hello")
//     if (wrongPress = true) {
//         alert("you lost")
//         const flip = document.querySelectorAll('#something', '#somethingwrong')
//         flip.forEach(el => el.style.backgroundColor = "green");
//         const flipWrong = document.querySelectorAll('#somethingwrong')
//         flipWrong.forEach(el => el.style.backgroundColor = "green");
//         wrongPress = false;
//         reset = true;
//         lost = true;
//         if(reset = true){
//             setTimeout(function reseten(){
//                 i = 0;
//                 const round = document.querySelector('#game-grid')
//                         round.innerHTML = " ";
//                         reset = false;
//             } , delayInMilliseconds);
//         }
//     }
// }
// //actieve bord verwijderen
// function clearBord(){
//     i = 0;
//     score = 0;
//     const round = document.querySelector('#game-grid')
//             round.innerHTML = " ";
//             reset = false;
// }
//Regels


//bak for extra code
// let speelveld = [
    //[ 0, 1, 4, 0, 1, 3],
    //[ 5, 3, 1, 1, 1, 3],
    //[ 0, 1, 2, 0, 1, 3],
    //[ 0, 1, 1, 0, 1, 3],
//];
// const vield = document.querySelector('#Vield')
//vield.innerHTML += '<button id="something" onclick="update('+x+','+y+')">' + b + '</button>'
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//