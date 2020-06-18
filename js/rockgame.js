const btns = document.querySelector('.btnCtn');
const userBtns = document.querySelector('.left');
const userChoice = document.querySelector('.userChoice');
const computerChoice = document.querySelector('.computerChoice');
const msg = document.querySelector('.msg');
const reset = document.querySelector('#reset');

// //ADD EVENT LISTENER TO BUTTONS
// //Three buttons rock/scissors/paper for the user to choose from
// userBtns.addEventListener('click', (e)=>{
//     userChoice.innerHTML = e.target.innerHTML;
// })
//
// computerBtn.addEventListener('click', ()=>{
//     //Create an array to store possible options for computer
//     let options = [];
//     //add the values of the buttons in the user's side to the array options
//     userBtns.querySelectorAll('button').forEach((item, i) => options[i] = item.innerHTML);
//     //create random index to choose a random element from array options
//     let index = Math.round(Math.random()*(options.length-1));
//     //display the computer choice in the box below the buttons
//     computerChoice.innerHTML = options[index];
// })

function compare() {
    let u = userChoice.innerHTML;
    let c = computerChoice.innerHTML;
    console.log(u.trim().length, c.trim().length)
    if (u.trim().length > 1 && c.trim().length > 1) {
        let msgContent;
        let winner;
        console.log()
        if (u === c){
            msgContent = 'Tie';
        } else if (u === 'Rock') {
            msgContent = (c ==='Scissors') ? 'You win.' : 'Computer win.';
        } else if (u === 'Scissors') {
            msgContent = (c === 'Paper') ? 'You win.' : 'Computer win.';
        } else {
            msgContent = (c === 'Rock') ? 'You win.' : 'Computer win.';
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
        userChoice.innerHTML = btnClick;
        compare();
    } else {
        let index = Math.round(Math.random() * (options.length - 1));
        computerChoice.innerHTML = options[index];
        compare();
    }


})

//Reset button: click to clear the fields
reset.addEventListener('click', ()=>{
    userChoice.innerHTML = '';
    computerChoice.innerHTML = '';
    msg.innerHTML = '';
})