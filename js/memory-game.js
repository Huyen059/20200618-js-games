//How to flip a card on click
const cards = document.querySelector('.cards');
console.log(cards);
cards.addEventListener('click',(e)=>{
    //function to flip the card here
    console.log(e.target.tagName === 'IMG');
    if (e.target.tagName === 'IMG'){
        e.target.setAttribute('src', 'img/card1.jpg');
    }
})