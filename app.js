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

class deck {
    constructor() {
        this.deck = [];
        this.reset
    }
}

class card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new card(suit, value)
        })
    })
}