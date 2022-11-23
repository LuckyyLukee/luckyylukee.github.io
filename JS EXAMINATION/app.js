const cardContainer = document.querySelector(".card-container");
const playerTurnText = document.querySelector(".player-turn-text");
const playerOneScoreText = document.querySelector(".player-one-score");
const playerTwoScoreText = document.querySelector(".player-two-score");


const gameState = {
    gameStarted: false,
    cardsFlipped: 0,
    playerTurn: 0,
    playerOneScore: 0,
    playerTwoScore: 0,

}

let firstCard, secondCard, firstCardSymbol, secondCardSymbol;
let symbols = ["A", "B", "C", "D", "E", "F"];


function randomizeSymbolArray(array) {
    // Duplicera hela arrayen så man får 2 av varje
    symbols.forEach(e => symbols.push(e));
    // Tar varje item i arrayen och stoppar in det på en random plats.
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

symbols = randomizeSymbolArray(symbols);

function createCards() {
    for (let i = 0; i < symbols.length; i++) {
        card = document.createElement("div");
        card.innerText = symbols[i];
        card.classList.add('card');
    
        cardContainer.append(card);

        card.addEventListener("click", e => {
            flipCard(e, symbols[i]);
        })

    }
}

function addPoint() {
    //Ge poäng till rätt person beroende på vems tur det var
    if (gameState.playerTurn == 0) {
        gameState.playerOneScore += 1;
    } else if (gameState.playerTurn == 1){
        gameState.playerTwoScore += 1;
    }
}

function updateGraphics() {
    if (gameState.playerTurn == 0) {
        playerTurnText.innerText = "Spelare 1 TUR";
    } else {
        playerTurnText.innerText = "Spelare 2 TUR";
    }
    playerOneScoreText.innerText = gameState.playerOneScore;
    playerTwoScoreText.innerText = gameState.playerTwoScore;
}

function checkIfCardsMatch(firstCard, secondCard) {
    if (firstCardSymbol == secondCardSymbol) {
        //Detta körs om båda korten matchar varandra
        console.log("Båda korten matchar");

        addPoint()
        updateGraphics();
        firstCard.remove();
        secondCard.remove();
    } else {
        console.log("Korten matchade inte");
        gameState.playerTurn = 1 - gameState.playerTurn;
        updateGraphics();
    }
    
}

function flipBackCards() {
    // Vänd tillbaka alla kort med klassen flip
    let allFlippedCards = document.querySelectorAll('.flip');
    allFlippedCards.forEach(card => card.classList.toggle("flip"));
    
}

function flipCard(card, symbol){

    card = card.target;
    card.classList.toggle('flip');
    

    if (gameState.cardsFlipped == 0) {
        //Körs när första kortet väljs.
        
        firstCard = card;
        firstCardSymbol = symbol;
        console.log("First card: " + firstCardSymbol);
        console.log(firstCard);
        gameState.cardsFlipped += 1;
    
    } else {
        
        secondCard = card;
        secondCardSymbol = symbol;
        console.log("Second card: " + secondCardSymbol);
        console.log(secondCard);
        gameState.cardsFlipped = 0;
        
        checkIfCardsMatch(firstCard, secondCard)
        
        //Flippa tillbaka alla kort 
        setTimeout(flipBackCards, 2000);
    }
}

createCards();
