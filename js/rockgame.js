const btns = document.querySelector('.btnCtn');
const userBtns = document.querySelector('.left');
const userChoice = document.querySelector('.userChoice');
const computerChoice = document.querySelector('.computerChoice');
const msg = document.querySelector('.msg');
const reset = document.querySelector('#reset');

const rules = [
    'RockScissors',
    'ScissorsPaper',
    'PaperRock'
];

function compare() {
    let u = userChoice.innerHTML;
    let c = computerChoice.innerHTML;
    if (u.trim().length > 1 && c.trim().length > 1) {
        let msgContent;
        if (u === c) {
            msgContent = 'Tie';
        } else if (rules.indexOf(u+c) !== -1){
            msgContent = 'You win!';
        } else {
            msgContent = 'Computer win!';
        }
        msg.innerHTML = msgContent;
    }
}

btns.addEventListener('click', (e) => {
    //Create an array to store possible options
    let options = [];
    //add the values of the buttons in the user's side to the array options
    userBtns.querySelectorAll('button').forEach((item, i) => options[i] = item.innerHTML);
    let btnClick = e.target.innerHTML;
    //if user clicks their btn choices
    if (options.indexOf(btnClick) !== -1) {
        userChoice.innerHTML = `You play ${btnClick}`;
        compare();
    } else {
        let index = Math.round(Math.random() * (options.length - 1));
        computerChoice.innerHTML = `Computer plays ${options[index]}`;
        compare();
    }
})

//Reset button: click to clear the fields
reset.addEventListener('click', ()=>{
    userChoice.innerHTML = '';
    computerChoice.innerHTML = '';
    msg.innerHTML = '';
})