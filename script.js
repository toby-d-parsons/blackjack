const playerCont = document.querySelector("#container-player");
const playerHandCont = document.querySelector("#player-hand");
const playerHandValueDisplayed = document.querySelector("#player-hand-value");
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerHandValue;
let dealerHandValue;

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
    let card = getRandomCard();
    hand.push(card[0]);
    const cardContainer = Object.assign(document.createElement("div"), {
        className: "container-card",
    });
    const cardText = Object.assign(document.createElement("b"), {
        className: "card-text",
        textContent: card[0].name
    });
    const image = Object.assign(document.createElement("img"), {
        src: "https://placehold.co/200.png",
        alt: "placeholder image",
        width: 200,
        height: 200
    })
    cardContainer.appendChild(cardText);
    cardContainer.appendChild(image);
    playerHandCont.appendChild(cardContainer);
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
    playerHandValue = handValue(playerHand);
    playerHandValueDisplayed.textContent = playerHandValue;
    dealerHandValue = handValue(dealerHand);
    console.log(playerHandValue);
    console.log(dealerHandValue);
    checkWin();
    checkLose();
}

playGame();

function checkWin() {
    if (isBlackjack(playerHandValue) && isBlackjack(dealerHandValue)) {
        console.log("It's a draw!");
    } else if (isBlackjack(playerHandValue)) {
        console.log("You win!") 
    } else if (isBlackjack(dealerHandValue)) {
        console.log("You lose!");
    } else {
        console.log("No winners yet");
    }
    function isBlackjack(hand) {
        return hand.some((value) => value === 21);
    }
}

function checkLose() {
    if (isBust(playerHandValue)) {
        console.log("You lose!");
    } else if (isBust(dealerHandValue)) {
        console.log("You win!") 
    } else {
        console.log("No losers yet");
    }
    function isBust(hand) {
        return hand.every((value) => value > 21);
    }
}

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