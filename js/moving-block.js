document.querySelector('#play').addEventListener('click', () => {
    ////----DEFINE VARIABLES----////
    const player = document.querySelector('.player');
    const enemies = document.querySelectorAll('.enemy');
    const field = document.querySelector('.field');
    let blockSize = 48;
    let randPosAll = []; //store the position of the enemies

    //check size of field
    console.log('offset values of field: left, top, width, and height')
    console.log(field.offsetLeft); //position from the left of body in px
    console.log(field.offsetTop); //position from the top of body in px
    console.log(field.offsetWidth); //width of element in px
    console.log(field.offsetHeight); //height of element in px

    ////----DEFINE FUNCTIONS----////
    const showPlayer = () => {
        player.style.cssText = `
            width: ${blockSize}px;
            height: ${blockSize}px;
            display: block;
            left: 0;
            top: 0;
            `;
    };


    //Function to generate position, take in x or y as parameter, return a number as position
    const randPosXY = (coordinate) => {
        let randX = blockSize + 1 + Math.floor(Math.random() * (field.offsetWidth - blockSize * 2));
        let randY = blockSize + 1 + Math.floor(Math.random() * (field.offsetHeight - blockSize * 2));
        return (coordinate === 'x') ? randX : randY;
    }

    const showEnemies = () => {
        //Make enemies appear at random positions

        for (let i = 0; i < enemies.length; i++) {
            let randX = randPosXY('x');
            let randY = randPosXY('y');

            randPosAll.push(randX);
            randPosAll.push(randY);
            //console.log('Iteration i = ' + i + ', value x: ' + randPosAll[2*i] + ', value y: ' + randPosAll[2*i+1]);

            //add styling for each enemy
            enemies[i].style.cssText = `
            width: ${blockSize}px;
            height: ${blockSize}px;
            display: block;
            left: ${randPosAll[2 * i]}px;
            top: ${randPosAll[2 * i + 1]}px;
            `;
        }
    };

    const moveEnemies = () => {
        let increment = [1, -1];
        console.log(randPosAll);
        let maxPosX = field.offsetWidth - blockSize;
        let maxPosY = field.offsetHeight - blockSize;
        console.log('maxPosX and maxPosY:', maxPosX, maxPosY)

        enemies.forEach((enemy, i) => {
            // let moveX = increment[Math.round(Math.random())];
            // let moveY = increment[Math.round(Math.random())];
            let moveX, moveY;
            const generateIncrement = () => {
                let posX = randPosAll[2 * i];
                let posY = randPosAll[2 * i + 1];
                if (posX === 0){
                    moveX = 1;
                    moveY = increment[Math.round(Math.random())];
                }

                if (posY === 0){
                    moveX = increment[Math.round(Math.random())];
                    moveY = 1;
                }

                if (posX === maxPosX) {
                    moveX = -1;
                    moveY = increment[Math.round(Math.random())];
                }

                if (posY === maxPosY){
                    moveX = increment[Math.round(Math.random())];
                    moveY = -1;
                }
                    moveX = increment[Math.round(Math.random())];
                    moveY = increment[Math.round(Math.random())];
            }

            generateIncrement();

            const move = () => {

                let currentPosX = randPosAll[2 * i];
                let currentPosY = randPosAll[2 * i + 1];
                console.log(currentPosX, currentPosY);

                currentPosX += moveX;
                currentPosY += moveY;
                randPosAll[2 * i] = currentPosX;
                randPosAll[2 * i + 1] = currentPosY;
                enemy.style.cssText = `
                        width: ${blockSize}px;
                        height: ${blockSize}px;
                        display: block;
                        left: ${randPosAll[2 * i]}px;
                        top: ${randPosAll[2 * i + 1]}px;
                        `;

                if (currentPosX > 0 && currentPosX < maxPosX && currentPosY > 0 && currentPosY < maxPosY) {
                    setTimeout(move, 100);
                } else {
                    generateIncrement();
                    setTimeout(move, 100);
                }

            }

            move();

        })

        console.log(randPosAll);

    }

    ////----RUN THE FUNCTIONS----////
    showPlayer();
    showEnemies();
    moveEnemies();
})