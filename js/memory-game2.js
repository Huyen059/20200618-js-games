class Utils {
    //// To shuffle array
    static shuffleArray(array){
        let newArray = [].concat(array);
        for (let i = 0; i < newArray.length; i++) {
            let j = Math.floor(Math.random()*newArray.length);
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

class UI {
    //// Get the number of card pairs that user chooses
    static getNumberOfCardPairs(){
        return parseInt(document.querySelector('#level').value);
    }

    //// Generate an array containing the urls of images
    static getCardUrls(numberOfCardPairs){
        const TOTAL_NUM_OF_IMAGES = 6;
        let cardUrlArray = [];
        while (cardUrlArray.length < numberOfCardPairs){
            let randNum = Math.round(Math.random()*(TOTAL_NUM_OF_IMAGES - 1)) + 1;
            if (cardUrlArray.indexOf(randNum) === -1){
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
    static showCards(){
        let numberOfCardPairs = UI.getNumberOfCardPairs();
        let cardUrlArray = UI.getCardUrls(numberOfCardPairs);
        cardUrlArray.forEach((url, i) => {
            document.querySelector('.cards').innerHTML += `
                <div class="cardCtn">
                    <img src="img/card-back.jpg" data-onclick="${url}" alt="card${i+1}" data-show="false" id="card${i+1}" />
                </div>
            `;
        })
    }
}

//// Click button to start the game
document.querySelector('#startGame').addEventListener('click', function startNewGame(){
    UI.showCards();
    this.removeEventListener('click', startNewGame);
});

//// Reset the game
document.querySelector('#reset').addEventListener('click', ()=>{
    location.reload();
})