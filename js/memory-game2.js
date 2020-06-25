//// Click button to start the game
document.querySelector('#startGame').addEventListener('click', function startNewGame() {
    UI.showCards();
    //// Disable the Start button after the game is already started
    this.removeEventListener('click', startNewGame);
    //// After the cards are shown, we can click on the cards to flip them
    let cards = document.querySelectorAll('.cardCtn > img');
    let numOfClick = 0;
    let numberOfPermanentShownCards = 0;
    //// Add click event to each card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            numOfClick++;
            let numberOfShownCards = 1;

            ////Check how many cards are now shown
            cards.forEach(el => {
                if (el.getAttribute('data-show') === 'true' && el.getAttribute('data-permanentShow') === 'no') {
                    numberOfShownCards++;
                }
            })

            //// Limit the number of shown cards to <= 2
            //// Only when the number of already shown card is 0 or 1, the currently clicked card will be flipped
            if (numberOfShownCards <= 2) {
                //// Flip the card when there is previously 0 or only 1 shown card
                UI.showCardFront(card);
                //// Add cards that are shown (but not permanently shown) to an array to compare them later
                let shownCards = [];
                cards.forEach(el => {
                    if (el.getAttribute('data-show') === 'true' && el.getAttribute('data-permanentShow') === 'no') {
                        shownCards.push(el);
                    }
                })
                //// Start to compare the cards only when two cards are shown
                if (shownCards.length === 2){
                    //// If two shown cards are not alike, they must flip back, otherwise they will be permanently shown
                     if (shownCards[0].src !== shownCards[1].src){
                         shownCards.forEach(shownCard => {
                             setTimeout(()=>{
                                 UI.showCardBack(shownCard);
                             }, 1000);
                         })
                     } else {
                         shownCards.forEach(shownCard => shownCard.setAttribute('data-permanentShow', 'yes'));
                         numberOfPermanentShownCards+=2;
                         //// Check if all the cards are permanently shown, if yes, game ends
                         if (numberOfPermanentShownCards === cards.length){
                             document.querySelector('.msg').innerHTML = `You win. You clicked ${numOfClick} times.`;
                         }
                     }
                }
            }
        });
    })

});

//// Reset the game
document.querySelector('#reset').addEventListener('click', () => {
    location.reload();
})

//// DEFINING NECESSARY FUNCTIONS
class Utils {
    //// To shuffle array
    static shuffleArray(array) {
        let newArray = [].concat(array);
        for (let i = 0; i < newArray.length; i++) {
            let j = Math.floor(Math.random() * newArray.length);
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

class UI {
    //// Get the number of card pairs that user chooses
    static getNumberOfCardPairs() {
        return parseInt(document.querySelector('#level').value);
    }

    //// Generate an array containing the urls of images
    static getCardUrls(numberOfCardPairs) {
        const TOTAL_NUM_OF_IMAGES = 6;
        let cardUrlArray = [];
        while (cardUrlArray.length < numberOfCardPairs) {
            let randNum = Math.round(Math.random() * (TOTAL_NUM_OF_IMAGES - 1)) + 1;
            if (cardUrlArray.indexOf(randNum) === -1) {
                cardUrlArray.push(randNum);
            }
        }
        cardUrlArray = cardUrlArray.concat(cardUrlArray);
        cardUrlArray = Utils.shuffleArray(cardUrlArray);
        cardUrlArray = cardUrlArray.map(num => `img/card${num}.jpg`);
        return cardUrlArray;
    }

    //// Based on the number of card pairs that user chooses, show the pairs on the screen at random position
    //// showCards() accepts number of card pairs as parameter, return an array of the url of the cards
    static showCards() {
        let numberOfCardPairs = UI.getNumberOfCardPairs();
        let cardUrlArray = UI.getCardUrls(numberOfCardPairs);
        cardUrlArray.forEach((url, i) => {
            document.querySelector('.cards').innerHTML += `
                <div class="cardCtn">
                    <img src="img/card-back.jpg" data-onclick="${url}" alt="card${i + 1}" data-show="false" data-permanentShow="no" id="card${i + 1}" />
                </div>
            `;
        })
    }

    static showCardFront(cardHTMLElement) {
        cardHTMLElement.setAttribute('src', cardHTMLElement.getAttribute('data-onclick'));
        cardHTMLElement.setAttribute('data-show', true);
    }

    static showCardBack(cardHTMLElement) {
        cardHTMLElement.setAttribute('src', 'img/card-back.jpg');
        cardHTMLElement.setAttribute('data-show', false);
    }
}
