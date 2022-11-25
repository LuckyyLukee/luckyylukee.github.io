//Start meny element
const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const startGameBtn = document.querySelector(".start-game-btn");
const startMenu = document.querySelector(".start-menu");
const playerMenu = document.querySelector(".player-menu");
const gameDisplay = document.querySelector(".game-display");
const firstPlayerName = document.querySelector(".first-player-name");
const secondPlayerName = document.querySelector(".second-player-name");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

//Declare variables

const gameState = {
    gameStarted: false,
    cardsFlipped: 0, 
    playerTurn: 0, // 0 = spelar 1s tur, 1 = spelar 2s tur
    playerOneScore: 0,
    playerTwoScore: 0,
    currentlyFlipped: false,

    //player one name?
    //player two name?
    playerOneName: "Spelare 1",
    playerTwoName: "Spelare 2"
}

//Start button
const startClick = () => {
  startMenu.style.visibility = "hidden";
  playerMenu.style.visibility = "visible";
};

startBtn.addEventListener("click", startClick);

//Back button
const backClick = () => {
  startMenu.style.visibility = "visible";
  gameDisplay.style.visibility = "hidden";
  playerMenu.style.visibility = "hidden";
};

backBtn.addEventListener("click", backClick);

//Start Game button
const startGameClick = () => {
  playerMenu.style.visibility = "hidden";
  gameDisplay.style.visibility = "visible";

  gameState.playerOneName = player1.value;
  gameState.playerTwoName = player2.value;

  console.log(gameState.playerOneName);

// HÄR STARTAR SPEL LOGIKEN
  createCards();
};

startGameBtn.addEventListener("click", startGameClick);







/*

Hela spellogiken här nere 

*/





const cardContainer = document.querySelector(".card-container");
const playerTurnText = document.querySelector(".player-turn-text");
const playerOneScoreText = document.querySelector(".player-one-score");
const playerTwoScoreText = document.querySelector(".player-two-score");
const playerOneNameLabel = document.querySelector(".player-one-name-label");
const playerTwoNameLabel = document.querySelector(".player-two-name-label");
const winnerText = document.querySelector(".winner-text")
const resultLabel = document.querySelector(".result-label");

let firstCard, secondCard, firstCardSymbol, secondCardSymbol;

//Använda emojis istället för bokstäver??
let symbols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
// Duplicera hela arrayen så man får 2 av varje
symbols.forEach(e => symbols.push(e));

function randomizeSymbolArray(array) {
    // Tar varje item i arrayen och stoppar in det på en random plats.
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



function createCards() {


    //Börja med att ta bort befintliga kort och resetta alla poäng
    deleteAllCards();
    symbols = randomizeSymbolArray(symbols);
    gameState.playerOneScore = 0;
    gameState.playerTwoScore = 0;
    gameState.cardsFlipped = 0;

    winnerText.style.display = "none";
    playerTurnText.style.display = "block";
    updateGraphics();

    for (let i = 0; i < symbols.length; i++) {
        card = document.createElement("div");
        
        front = document.createElement("div");
        back =  document.createElement("div");
        front.classList.add("front");
        back.classList.add("back");
        

        back.innerText = symbols[i];
        card.classList.add('card');
    
        cardContainer.append(card);
        card.append(front, back);

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
    // Uppdaterar speltur och poäng
    if (gameState.playerTurn == 0) {
        playerTurnText.innerText = gameState.playerOneName + "'s tur";
    } else {
        playerTurnText.innerText = gameState.playerTwoName + "'s tur";
    }
    playerOneNameLabel.innerText = gameState.playerOneName + ": ";
    playerTwoNameLabel.innerText = gameState.playerTwoName + ": ";
    playerOneScoreText.innerText = gameState.playerOneScore;
    playerTwoScoreText.innerText = gameState.playerTwoScore;
}

function checkIfCardsMatch(firstCard, secondCard) {
    if (firstCardSymbol == secondCardSymbol) {
        //Detta körs om båda korten matchar varandra
        console.log("Båda korten matchar");

        addPoint()
        updateGraphics();
        firstCard.classList.add("correct");
        secondCard.classList.add("correct");
        setTimeout(() => {
            firstCard.classList.add("hide");
            secondCard.classList.add("hide");
            checkIfGameEnded();
        }, 1000);
        
        


    } else {
        console.log("Korten matchade inte");
        gameState.playerTurn = 1 - gameState.playerTurn; // Ändrar till andra spelarens tur
        updateGraphics();
    }
    
}

function checkCardsLeft() {
    let cardsLeft = 0; 
    let allCards = document.querySelectorAll(".card");
    for (let i = 0; i < allCards.length; i++) {
        if (!allCards[i].classList.contains("hide")){
            cardsLeft += 1;
        }
    }
    return cardsLeft;
}

function checkIfGameEnded() {
    const playerNameLabel = document.querySelector(".player-name-label");
    if (checkCardsLeft() == 0) {
        // Detta körs när det inte finns några kort kvar
        if (gameState.playerOneScore > gameState.playerTwoScore){
            //Spelare ett vann
            playerNameLabel.innerText = gameState.playerOneName;
            resultLabel.innerText = " vann!"
        } else if (gameState.playerTwoScore > gameState.playerOneScore) {
            //Spelare två vann
            playerNameLabel.innerText = gameState.playerTwoName;
            resultLabel.innerText = " vann!"
        } else {
            // Båda fick lika mycket poäng
            playerNameLabel.innerText = ""
            resultLabel.innerHTML = "Oavgjort!";
            console.log("Tie!");
        }
        deleteAllCards();
        winnerText.style.display = "block";
        playerTurnText.innerText = "";
    } else {
        console.log("no winner");
    }
}

function deleteAllCards() {
    let allCards = document.querySelectorAll(".card");
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].remove();
    }
}

function flipBackCards() {
    // Vänd tillbaka alla kort med klassen flip
    let allFlippedCards = document.querySelectorAll('.flip');
    allFlippedCards.forEach(card => card.classList.toggle("flip"));
    gameState.currentlyFlipped = false;
    
}

function flipCard(card, symbol){

    
    //If-sats som förhindrar spelaren att öppna fler än 2 kort samtidigt, eller ett kort som redan är hittat.
    if (!gameState.currentlyFlipped && !card.currentTarget.classList.contains("hide")){
        card = card.currentTarget;
        card.classList.add('flip'); //Lägger till styling-classen flip
        

        if (gameState.cardsFlipped == 0) {
            //Körs när första kortet väljs.
            
            firstCard = card;
            firstCardSymbol = symbol;
            console.log("First card: " + firstCardSymbol);
            console.log(firstCard);
            gameState.cardsFlipped += 1;
        
        } else if (card != firstCard) { // Kollar så att man inte tryckt på samma kort
    
            secondCard = card;
            secondCardSymbol = symbol;
            console.log("Second card: " + secondCardSymbol);
            console.log(secondCard);
            gameState.cardsFlipped = 0;
            
            checkIfCardsMatch(firstCard, secondCard)
            
            //Flippa tillbaka alla kort 
            gameState.currentlyFlipped = true;
            setTimeout(flipBackCards, 1000);
            
        }
    }
}


