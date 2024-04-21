const playerContainer = document.querySelector("#container-player");
const dealerContainer = document.querySelector("#container-dealer");
let deck = [];
let player = {
    value: [],
    hand: []
};
let dealer = {
    value: [],
    hand: []
};

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

function drawCard(drawer, handContainer) {
    let hand = drawer.hand;
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
    handContainer.appendChild(cardContainer);
    drawer.value = handValue(drawer.hand);
    playerContainer.querySelector(".hand-value").textContent = player.value;
    dealerContainer.querySelector(".hand-value").textContent = dealer.value;
    checkGameStatus();
}

function initialDraw() {
    drawCard(player, playerContainer.querySelector(".container-hand"));
    drawCard(dealer, dealerContainer.querySelector(".container-hand"));
    drawCard(player, playerContainer.querySelector(".container-hand"));
    drawCard(dealer, dealerContainer.querySelector(".container-hand"));
}

function startGame() {
    generateDeck();
    initialDraw();
    setupHitMeButton();
    setupStandButton();
}

function setupHitMeButton() {
    const hitMeButton = Object.assign(document.createElement("button"), {
        id: "hit-me",
        type: "button",
        textContent: "Hit Me"
    });
    playerContainer.appendChild(hitMeButton);
    hitMeButton.addEventListener("click", () => drawCard(player, playerContainer.querySelector(".container-hand")));
}

function setupStandButton() {
    const standButton = Object.assign(document.createElement("button"), {
        id: "stand",
        type: "button",
        textContent: "Stand"
    });
    playerContainer.appendChild(standButton);
    standButton.addEventListener("click", () => endPlayerTurn())
}

function endPlayerTurn() {
    const hitMeButton = document.getElementById("hit-me");
    const standButton = document.getElementById("stand");
    playerContainer.removeChild(hitMeButton);
    playerContainer.removeChild(standButton);
    console.log("Turn ended!");
    dealerTurn();
}

startGame();

function checkGameStatus() {
    if (isBlackjack(player.value) && isBlackjack(dealer.value)) {
        alert("It's a draw!");
    } else if (isBlackjack(player.value) || isBust(dealer.value)) {
        alert("You win!") 
    } else if (isBlackjack(dealer.value) || isBust(player.value)) {
        alert("You lose!");
    }
    function isBlackjack(hand) {
        return hand.some((value) => value === 21);
    }
    function isBust(hand) {
        return (hand.length === 0) ? false : hand.every((value) => value > 21);
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

function dealerTurn() {
    let dealerValue = dealer.value;
    if (dealerValue.some((value) => value >= 17 && value <= 21)) {
        endOfGame();
    } else {
        drawCard(dealer, dealerContainer.querySelector(".container-hand"));
        dealerTurn();
    }
}

function endOfGame() {
    let playerValue = player.value;
    let dealerValue = dealer.value;
    let playerBestHandValue = bestHandValue(playerValue);
    let dealerBestHandValue = bestHandValue(dealerValue);
    console.log(playerBestHandValue);
    console.log(dealerBestHandValue);

    playerBestHandValue > dealerBestHandValue ? console.log("you win!") :
    playerBestHandValue < dealerBestHandValue ? console.log("you lose") :
                                                console.log("it's a draw");

    function bestHandValue(valueArray) {
        let arrayModified = valueArray
            .filter((value) => (value <= 21))
            .sort((a, b) => b - a); // filters and sorts so highest value less than 22 so [0] equals best value
        return arrayModified[0];
    }
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