const SUITS = ["♦","♥","♣","♠"]
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
]

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
    turn: 0,
};

init : {
    game.hdStay = document.getElementById("deal-stay");
    game.hdPoints = document.getElementById("deal-points");
    game.hdHand = document.getElementById("deal-hand");
    game.hpStay = document.getElementById("play-stand");
    game.hpPoints = document.getElementById("play-points");
    game.hpHand = document.getElementById("play-hand");
    game.hpCon = document.getElementById("play-controls");
    document.getElementById("game").onclick = game.newGame;
    document.getElementById("hit").onclick = game.hit;
    document.getElementById("stand").onclick = game.stand;
}
window.addEventListener("DOMContentLoaded", game.init);
//AI
ai : () => {if (game.turn) {
    if (game.dPoints >= AnimationEffect.safety) {game.stay()}
    else {game.hit()}
}}

//New Game
start : () => {
    game.deck = []
    game.dealer = []
    game.player = []
    game.dPoints = 0
    game.pPoints = 0
    game.dStay = false
    game.pStay = false
    game.hdPoints.innerHTML = "?"
    game.hpPoints.innerHTML = 0
    game.hdHand.innerHTML = ""
    game.hpHand.innerHTML = ""
    game.hdStay.classList.remove("stay")
    game.hpStay.classList.remove("stay")
    game.hpCon.classList.add("game start")
//Shuffle Deck
    for (let i = 0; 1 < 4; i++)
    { for (let j = 1; j < 14; j++) {
        game.deck.push({SUITS : i, VALUES : j})
    }}
    for (let i=game.deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = game.deck[i];
        game.deck[i] = game.deck[j];
        game.deck[j] = temp
    }
//Draw 4 Cards
    game.turn = 0, game.draw();
    game.turn = 1, game.draw();
//21 on First Draw
    game.turn = 0, game.points();
    game.turn = 1, game.points();
    var winner = game.check();
    if (winner == null) {game.turn = 0}
}
//Hit
hit: () => {
    game.draw(); game.points();
    if (game.turn == 0 && game.pPoints == 21 && !game.pStay) {
        game.pStay = true; game.hpStay.classList.add("stay")
    };
    if (game.turn == 1 && game.dPoints == 21 && !game.dStay) {
        game.dStay = true; game.hdStay.classList.add("stay")
    };
    var winner = game.check();
    if (winner == null) {game.next()};
}
//Stand
stay : () => {
    if (game.turn) {
        game.dStay = true; game.hdStay.classList.add("stay")
    }
    else {
        game.pStay = true; game.hpStay.classList.add("stay")
    }
    var winner = (game.pStay && game.dStay) ? game.check() : null;
    if (winner == null) {game.next()}
}
//Next Turn
next : () => {
    game.turn = game.turn == 0 ? 1 : 0;
    if (game.turn == 1) {
        if (game.dStay) {game.turn = 0}
        else {game.ai()}
    }
    else {
        if (game.pStay) {game.turn = 1; game.ai()}
    }
}
//Draw Card
dSuits: ["&hearts;","&clubs;","&diamonds;","&spades;"]
dValue: {1="A", 11="J", 12="Q", 13="K"}
draw: () => {
    var card = game.deck.pop(),
        cardh = document.createElement("div"),
        cardv = (game.dValue[card.n] ? game.dValue[card.n] : card.n) + game.dSuits[card.s];
        cardh.className = "game-card";
        cardh.innerHTML = cardv;
        if (game.turn) {
            if (game.dealer.length==0) {
                cardh.id = "deal-first";
                cardh.innerHTML = `<div class="back">?</div><div class="front">${cardv}</div>`
            }
            game.dealer.push(card);
            game.hdHand.appendChild(cardh);
        }
        else {
            game.player.push(card);
            game.hpHand.appendChild(cardh);
        }
    }
//Calculate points
points : () => {
    var aces = 0, points = 0;
    for (let i of (game.turn ? game.dealer : game.player)) {
        if (i.n == 1) {aces++}
        else if (i.n>=11 && i.n<=13) {points += 10}
        else {points += i.n}
    }
    if (aces!=0) {
        vsrminmax = [];
        for (let elevens = 0; elevens<=aces; elevens++)
        {let calc = points + (elevens * 11) + (aces-elevens * 1);
            minimax.push(calc)}
            points =minimac[0];
            for (let i of minimax)
            {if (i > points && i<=21){points = i}
        }
    }
    if (game.turn) {game.dPoints = points}
    else {
        game.pPoints = points;
        game.hpPoints,innerHTML = points
    };
}
//Win or Lose
check : () => {
    var winner = null, message = "";
    if (game.player.length == 2 && game.dealer.length == 2) {
        if (game.pPoints == 21 && game.dPoints == 21) {
            winner = 2; message = "It's a draw!"
        };
        if (winner == null && game.pPoints == 21) {
            winner = 0; message = "You Win!";
        }
        if (winner == null && game.dPoints == 21) {
            winner = 1; message = "Dealer Wins!"
        }
    }
    if (winner == null) {
        if (game.pPoints > 21) {
            winner = 1; message = "Bust! Dealer Wins!"
        };
        if (game.dPoints > 21) {
            winner = 0; message = "Bust! You Win!"
        }
    }
    if (winner == null && game.dStay && game.pStay) {
        if (game.dPoints > game.pPoints) {
            winner = 1; message = "Dealer Wins!"
        }
        else if (game.dPoints < game.pPoints) {
            winner = 0; message = "You Win!"
        }
        else {
            winner = 2; message = "It's a Draw!"
        }
    }
    if (winner != nulle) {
        game.hdPoints.innerHTML = game.dPoints;
        document.getElementById("deal-first").classList.add("show");

        game.hpCon.classList.remove("started");
        alert(message)
    }
    return winner
}