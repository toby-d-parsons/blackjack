let deck = [];

generateDeck();
console.log(deck);

function generateDeck() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 14; j++) {
            function getSuit() {
                switch(i) {
                    case 0:
                        return "clubs";
                    case 1:
                        return "diamonds";
                    case 2:
                        return "hearts";
                    case 3:
                        return "spades";
                }
            }

            function getRank() {
                if (j > 1 && j < 11) {
                    return j.toString();
                } else if (j == 11) {
                    return "jack";
                } else if (j == 12) {
                    return "queen";
                } else if (j == 13) {
                    return "king";
                } else if (j == 1) {
                    return "ace";
                }
            }

            function getBlackjackRank() {
                if (j > 1 && j < 11) {
                    return j;
                } else if (j >= 11) {
                    return 10;
                } else if (j == 1) {
                    return [1, 11]; // can use Array.isArray(select this blackjack value) to use this and non array values together later
                }
            }

            let card = {
                "name": getRank() + " of " + getSuit(),
                "suit": getSuit(),
                "rank": getRank(),
                "blackjackValue": getBlackjackRank()
            };
            deck.push(card);
        }
    }
}


function getRandomCardObject() {
    return Math.floor(Math.random() * deck.length);
}

function getRandomCard() {
    return deck.splice(getRandomCardObject(), 1);
}

function drawCard() {
    console.log(getRandomCard()[0].name);
}