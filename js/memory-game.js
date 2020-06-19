document.querySelector('#startGame').addEventListener('click', ()=>{
    let numCard = Number(document.querySelector('#level').value);
    play(numCard);
})

document.querySelector('#reset').addEventListener('click', ()=>{
    document.querySelector('#level').value = 2;
    document.querySelector('.cards').innerHTML = '';
    document.querySelector('.msg').innerHTML = '';
})


const play = (num) => {
    //Number of distinct img in the game
    let level = num;

//Function that returns an array with double number of cards, each card appears twice
    const createUnshuffleImgSrcs = () => {
        let distinctImgSrcs = [];
        let i=0;
        while (distinctImgSrcs.length < level) {
            let imgSrc = `img/card${Math.round(Math.random()*5) + 1}.jpg`;
            if (distinctImgSrcs.indexOf(imgSrc) === -1){
                distinctImgSrcs.push(imgSrc);
            }
            i++;
        }

        return(distinctImgSrcs.concat(distinctImgSrcs));
    }

//Function to shuffle the elements in the array
    const shuffle = originalArray => {
        let array = [].concat(originalArray);
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

//Final array position to be used to play
    let imgSrcs = shuffle(createUnshuffleImgSrcs());
    console.log(imgSrcs);

//Create corresponding cards in html
    imgSrcs.forEach((imgSrc, i) => {
        document.querySelector('.cards').innerHTML += `
    <div class="cardCtn">
        <img src="img/card-back.jpg" data-onclick="${imgSrc}" alt="card${i+1}" data-show="false" id="card${i+1}" />
    </div>
    `;
    })

//How to flip card and show the corresponding card-front
//Array to store imgs being shown
    let shownCard = [];
    let count=0;
    document.querySelector('.cards').addEventListener('click',(e)=>{

        //function to flip the card here
        if (e.target.tagName === 'IMG'){
            // Flip to a specific card
            e.target.setAttribute('src', e.target.getAttribute('data-onclick'));
            e.target.setAttribute('data-show', true);

            //add card to shownCard array
            shownCard.push(e.target);
            if(shownCard.length === 2){
                console.log(shownCard);
                let src1 = shownCard[0].getAttribute('src');
                let src2 = shownCard[1].getAttribute('src');
                if (src1 !== src2) {
                    shownCard.forEach(card => {
                        setTimeout(()=>{
                            card.setAttribute('src', 'img/card-back.jpg');
                            card.setAttribute('data-show', false);
                        },1000)
                    })
                    shownCard=[];
                } else {
                    count+=1;
                    console.log(count);
                    shownCard = [];
                    if (count===level){
                        document.querySelector('.msg').innerHTML = 'You win.';
                    }
                }
            }
        }

    })
};

