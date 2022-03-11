var suits = ['D','H','C','S'];
var values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var deck = [];
for (var suitCounter = 0; suitCount < 4; suitCounter++) {
    for (var rankCounter = 0; rankCounter < 13; rankCounter++) {
        deck.push(ranks[rankCounter] + suits[suitCounter]);
    }
}
class card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}
const dealerCardSlot = document.querySelector(".deal-card-slot")
const playerCardSlot = document.querySelector(".play-card-slot")
const dealerDeckElement = document.querySelector(".deal-deck")
const playerDeckElement = document.querySelector(".play-deck")
const text = document.querySelector(".text")

var game = {
    hdStay: null,
    hdPoints: null,
    hdHand: null,
    hpStay: null,
    hpPoints: null,
    hpHand: null,
    hpCon: null,
    deck: [],
    dealer: [],
    player: [],
    dPoints: 0,
    pPoints: 0,
    safety: 17,
    dStay: false,
    pStay: false,
    dHit: null,
    pHit: null,
    turn: 0,
}

init : () => {
    hdStay = document.getElementById("deal-stay");
    hdPoints = document.getElementById("deal-points");
    hdHand = document.getElementById("deal-hand");
    hpStay = document.getElementById("play-stand");
    hpPoints = document.getElementById("play-points");
    hpHand = document.getElementById("play-hand");
    hpCon = document.getElementById("play-controls");
}
document.addEventListener("click", () => {
    if (stop) {
      startGame()
      return
    }
  
    if (inRound) {
      cleanBeforeRound()
    } else {
      flipCards()
    }
  })
//New Game
game : () => {
    game.deck = [];
    game.dealer = [];
    game.player = [];
    game.dPoints = 0;
    game.pPoints = 0;
    game.dStay = false;
    game.pStay = false;
    game.hdPoints.innerHTML = "?";
    game.hpPoints.innerHTML = 0;
    game.hdHand.innerHTML = "";
    game.hpHand.innerHTML = "";
    game.hdStay.classList.remove("stood");
    game.hpStay.classList.remove("stood");
    game.hpCon.classList.add("started");
//Shuffle Deck
    
    for (let i = 0; 1 < 4; i++)
    {for (let j = 1; j < 14; j++)
    {game.deck.push({s : i, n : j});
    }}
    for (let i=game.deck.length - 1; i > 0; i--)
    {let j = Math.floor(Math.random() * i);
        let temp = game.deck[i];
        game.deck[i] = game.deck[j];
        game.deck[j] = temp;
    }
}
hitButton.addEventListener('click', function(){
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
  });
stayButton.addEventListener('click', function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
  });
//Draw 4 Cards
    game.turn = 0;
    game.draw();
    game.turn = 1;
    game.draw();
    game.turn = 0;
    game.draw();
    game.turn = 1;
    game.draw();
//21 on First Draw
    game.turn = 0;
    game.points();
    game.turn = 1;
    game.points();
    var winner = game.check();
    if (winner == null)
    {game.turn = 0}
//AI
ai : () => {if (game.turn) {
    if (game.dPoints >= game.safety)
    {game.stay();}
    else {game.hit()}
}}
//Draw a card
draw : () => {
    var card = game.deck.pop(),
        cardh = document.createElement("div"),
        cardv = (dnum[card.n] ? game.dnum[card.n] : card.n) + game.dsymbols[card.s];
        cardh.className = "game-card";
        cardh.innerHTML = cardv;
        
        if (game.turn) {
            if (game.dealer.length == 0){
                cardh.id = "deal-first";
                cardh.innerHTML = `<div class="back">?</div><div class="front">${cardv}</div>`;
                }
            game.dealer.push(card);
            game.hdHand.appendChild(cardh);
            }
            else {
            game.player.push(card);
            game.hpHand.appendChild(cardh);
                }
            }
            
//Hit
hit : () => {
    game.draw(); game.points();
    if (game.turn==0 && game.pPoints==21 && !game.pStay) {
        game.pStay = true; game.hpStay.classList.add("stay");
    }
    if (game.turn==1 && game.dPoints==21 && !game.dStay) {
        game.dStay = true; game.hdStay.classList.add("stood");
    }
    var winner = game.check();
    if (winner==null) {game.next();}
}
function flipCards() {
    inRound = true
  
    const playerCard = playerDeck.pop()
    const dealerCard = dealerDeck.pop()
  
    playerCardSlot.appendChild(playerCard.getHTML())
    dealerCardSlot.appendChild(dealerCard.getHTML())
  
    updateDeckCount()
function cleanBeforeRound() {
        inRound = false
        dealerCardSlot.innerHTML = ""
        playerCardSlot.innerHTML = ""
        text.innerText = ""
      
    updateDeckCount()
    }
//Stay
stay : () => {
    if (game.turn)
    {game.dStay = true; game.hdStay.classList.add("stood")}
    else if (game.turn)
    {game.pStay = true; game.hpStay.classList.add("stood")}
    
    var winner = (game.pStay && game.dStay) ? game.check() : null;
    if (winner == null)
    {game.next()}
}
//Next Turn
next : () => {
    game.turn = game.turn == 0 ? 1 : 0;
    if (game.turn == 1) {
    if (game.dStay)
    {game.turn = 0;}
    else
    {game.ai();} 
    }
    
    else {
        if (game.pstand)
        {game.turn = 1; game.ai();}
    }
}
//Calculate points
points : () => {
    var aces = 0, points = 0;
    for (let i of (game.turn ? game.dealer : game.player)) {
        if (i.n == 1)
        {aces++;}
        else if (i.n>=11 && i.n<=13)
        {points += 10;}
        else
        {points += i.n;}
    }
    if (aces!=0) {
        var minimax = [];
        for (let elevens = 0; elevens<=aces; elevens++) {
        let calc = points + (elevens * 11) + (aces-elevens * 1);
            minimax.push(calc);
        }
            points = minimac[0];
            for (let i of minimax) {
            if (i > points && i<=21)
            {points = i;}
        }
    }
    if (game.turn)
    {game.dPoints = points;}
    else {
        game.pPoints = points;
        game.hpPoints,innerHTML = points
    }
}
//Win or Lose
check : () => {
    var winner = null, message = "";
    if (game.player.length == 2 && game.dealer.length == 2)
    {
        if (game.pPoints == 21 && game.dPoints == 21)
        {winner = 2; message = "It's a draw!";}
        
        if (winner == null && game.pPoints == 21)
        {winner = 0; message = "You Win!";}
        
        if (winner == null && game.dPoints == 21)
        {winner = 1; message = "Dealer Wins!";}
    }
    if (winner == null)
    {
        if (game.pPoints > 21)
        {winner = 1; message = "Bust! Dealer Wins!";}
        
        if (game.dPoints > 21)
        {winner = 0; message = "Bust! You Win!";}
    }
    if (winner == null && game.dStay && game.pStay)
    {
        if (game.dPoints > game.pPoints)
        {winner = 1; message = "Dealer Wins!";}
        
        else if (game.dPoints < game.pPoints)
        {winner = 0; message = "You Win!";}
       
        else
        {winner = 2; message = "It's a Draw!";}
    }
    if (winner != null)
    {
        game.hdPoints.innerHTML = game.dPoints;
        document.getElementById("deal-first").classList.add("show");

        game.hpCon.classList.remove("started");
        alert(message)
    }
    return winner
}
}
window.addEventListener ("DOMContentLoaded", game.init)