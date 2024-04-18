let deck = [];
let playerHand = [];
let dealerHand = [];

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
                    return [1, 11];
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

function drawCard(hand) {
    hand.push(getRandomCard()[0]);
}

function initialDraw() {
    drawCard(playerHand);
    drawCard(dealerHand);
    drawCard(playerHand);
    drawCard(dealerHand);
    console.log("Player hand: " + playerHand[0].name + " and " + playerHand[1].name);
    console.log("Dealer hand: " + dealerHand[0].name + " and " + dealerHand[1].name);
}

function playGame() {
    generateDeck();
    initialDraw();
    let playerHandValue = handValue(playerHand);
    let dealerHandValue = handValue(dealerHand);
    console.log(playerHandValue);
    console.log(dealerHandValue);
    checkWin();

    function checkWin() {
        if (check21(playerHandValue) && check21(dealerHandValue)) {
            console.log("It's a draw!");
        } else if (check21(playerHandValue)) {
            console.log("You win!") 
        } else if (check21(dealerHandValue)) {
            console.log("You lose!");
        } else {
            console.log("No winners yet");
        }
        function check21(hand) {
            return hand.some((element) => element === 21);
        }
    }
}

playGame();

function handValue(hand) {
    let handValue = [];
    let aceCards = hand.filter((card) => card.rank == 'ace');
    let nonAceCards = hand.filter((card) => card.rank != 'ace');
    let aceValues = getSumOfAceIterations();
    let nonAceValue = nonAceCards.reduce((acc, currentValue) => {
        return acc + currentValue.blackjackValue;
    }, 0);

    (aceCards.length > 0) ? handValue = (getSumAceNonAce()) : handValue.push(nonAceValue);

    function getSumAceNonAce() {
        return aceValues.map((x) => x + nonAceValue);
    }

    function getSumOfAceIterations() {
        let tempArr = [];
        let totalsArr = [1, 11];
        for (let k = 0; k < aceCards.length - 1; k++) {
            totalsArr.forEach((element) => {
                tempArr.push(element + 1);
                tempArr.push(element + 11);
            });
            totalsArr = tempArr;
            tempArr = [];
        }
        return Array.from(new Set(totalsArr)); // Returns one of each value
    }
    return handValue;
}

/* let testHand = [
    {
        "name": "10 of diamonds",
        "suit": "diamonds",
        "rank": "10",
        "blackjackValue": 10
    },
    {
        "name": "10 of diamonds",
        "suit": "diamonds",
        "rank": "10",
        "blackjackValue": 10
    },
    {
        "name": "ace of clubs",
        "suit": "clubs",
        "rank": "ace",
        "blackjackValue": [
            1,
            11
        ]
    },
    {
        "name": "ace of spades",
        "suit": "spades",
        "rank": "ace",
        "blackjackValue": [
            1,
            11
        ]
    },
    {
        "name": "ace of hearts",
        "suit": "hearts",
        "rank": "ace",
        "blackjackValue": [
            1,
            11
        ]
    },
    {
        "name": "ace of hearts",
        "suit": "hearts",
        "rank": "ace",
        "blackjackValue": [
            1,
            11
        ]
    }
] */