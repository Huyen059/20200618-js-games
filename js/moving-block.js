

document.querySelector('#play').addEventListener('click', () => {
    ////----DEFINE VARIABLES----////
    let startTime = new Date();
    const player = document.querySelector('.player');
    const enemies = document.querySelectorAll('.enemy');
    const field = document.querySelector('.field');
    const livesCtn = document.querySelector('.livesCtn');

    ////----SET THE SIZE OF THE PLAYER AND ENEMIES----////
    let blockSize = (field.offsetWidth < 500) ? 25 : 50;
    let numOfLives = 3;

    //check size of field
    // console.log('offset values of field: left, top, width, and height')
    // console.log('from left', field.offsetLeft); //position from the left of body in px
    // console.log('from top', field.offsetTop); //position from the top of body in px
    // console.log('width', field.offsetWidth); //width of element in px with padding and border
    // console.log('height', field.offsetHeight); //height of element in px with padding and border

    ////----DEFINE FUNCTIONS----////
    const generateLives = (numOfLives) => {
        livesCtn.innerHTML = '';
        for (let i = 0; i < numOfLives; i++) {
            livesCtn.innerHTML += `<div class="live"></div>`;
        }
    }

    generateLives(numOfLives);
    let lives = document.querySelectorAll('.live');

    const setTimer = () => {
        if (lives.length > 0) {
            let now = new Date();
            let timeElapsed = Math.floor((now.getTime() - startTime.getTime())/1000);
            let second = 0, minute = 0, hour = 0;
            if (timeElapsed >= 3600) {
                hour = Math.floor(timeElapsed / 3600);
                let remain = timeElapsed - hour*3600;
                if (remain >=60){
                    minute = Math.floor(remain / 60);
                } else {
                    second = remain;
                }
            } else if (timeElapsed >= 60) {
                minute = Math.floor(timeElapsed / 60);
                second = timeElapsed - minute*60;
            } else {
                second = timeElapsed;
            }

            document.querySelector('.second').innerHTML = (second <10) ? `0${second}` : second;
            document.querySelector('.minute').innerHTML = (minute <10) ? `0${minute}` : minute;
            document.querySelector('.hour').innerHTML = (minute <10) ? `0${hour}` : hour;

            // setTimeout(setTimer, 1000);
        }
    }

    const setBlock = (nameOfBlock, left, top) => {
        nameOfBlock.style.cssText = `
            width: ${blockSize}px;
            height: ${blockSize}px;
            display: block;
            left: ${left}px;
            top: ${top}px;
            `;
    }

    const showPlayer = () => {
        setBlock(player, 0, 0);
    };

    const movePlayer = () => {
        document.addEventListener('keydown', (e) => {
            let posX = player.offsetLeft;
            let posY = player.offsetTop;
            let maxX = field.offsetWidth - blockSize;
            let maxY = field.offsetHeight - blockSize;

            switch (e.key) {
                case 'ArrowDown':
                    if (posY < maxY) {
                        posY+=5;
                        setBlock(player, posX, posY);
                    }
                    break;
                case 'ArrowUp':
                    if (posY > 0) {
                        posY-=5;
                        setBlock(player, posX, posY);
                    }
                    break;
                case 'ArrowRight':
                    if (posX < maxX) {
                        posX+=5;
                        setBlock(player, posX, posY);
                    }
                    break;
                case 'ArrowLeft':
                    if (posX > 0) {
                        posX-=5;
                        setBlock(player, posX, posY);
                    }
                    break;
            }
        })
    }

    //Function to generate position, take in x or y as parameter, return a number as position
    const randPosXY = (coordinate) => {
        //range where enemies can appear: inside div, not overlap player
        let maxPosX = field.offsetWidth - blockSize;
        let maxPosY = field.offsetHeight - blockSize;
        let minPosX = blockSize;
        let minPosY = blockSize;
        let rangeX = maxPosX - minPosX;
        let rangeY = maxPosY - minPosY;

        let randX = blockSize + Math.floor(Math.random() * rangeX);
        let randY = blockSize + Math.floor(Math.random() * rangeY);
        return (coordinate === 'x') ? randX : randY;
    }

    const showEnemies = () => {
        //Make enemies appear at random positions
        //let randPosAll = []; //store the position of the enemies

        for (let i = 0; i < enemies.length; i++) {
            let randX = randPosXY('x');
            let randY = randPosXY('y');

            // randPosAll.push(randX);
            // randPosAll.push(randY);
            //console.log('Iteration i = ' + i + ', value x: ' + randPosAll[2*i] + ', value y: ' + randPosAll[2*i+1]);

            //add styling for each enemy
            //setBlock(enemies[i], randPosAll[2 * i], randPosAll[2 * i + 1]);
            setBlock(enemies[i], randX, randY);
        }
    };

    const moveEnemies = () => {
        let liveNum = lives.length;
        for (let i = 0; i < enemies.length; i++) {
            let dX = (Math.random()>0.5) ? 1 : -1;
            let dY = (Math.random()>0.5) ? 1 : -1;
            let enemy = enemies[i];

            let move = () => {
                if (liveNum > 0) {
                    let posX = enemy.offsetLeft;
                    let posY = enemy.offsetTop;

                    if (enemy.offsetLeft + dX > field.offsetWidth - blockSize){
                        dX = -dX;
                    }

                    if (enemy.offsetLeft + dX < 0) {
                        dX = -dX;
                    }

                    if (enemy.offsetTop + dY > field.offsetHeight - blockSize){
                        dY = -dY;
                    }

                    if (enemy.offsetTop + dX < 0) {
                        dY = -dY;
                    }

                    posX += dX;
                    posY += dY;
                    setBlock(enemy, posX, posY);
                    let playerPosX = player.offsetLeft;
                    let playerPosY = player.offsetTop;

                    if (playerPosX > posX-blockSize && playerPosX < posX+blockSize &&
                        playerPosY > posY-blockSize && playerPosY < posY+blockSize){
                        liveNum--;
                        generateLives(liveNum);
                        setBlock(player, 0, 0);
                    }

                    setTimeout(move, 100);
                } else {
                    clearInterval(time);
                    field.innerHTML = 'Game over!';
                    field.style.cssText = 'display: flex; ' +
                        'justify-content: center; align-items: center; ' +
                        'font-size: 3rem; color: #fff;';
                }
            }

            move();
        }

    }

    ////----RUN THE FUNCTIONS----////
    let time = setInterval(setTimer, 1000);
    showPlayer();
    movePlayer();
    showEnemies();
    moveEnemies();
})