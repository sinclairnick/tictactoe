window.onload = function () {

    let x = 'X';
    let o = 'O';

    const buttons = document.querySelectorAll('button');
    console.log(buttons);
    buttons.forEach(button => button.addEventListener('click', function(){
        changeToken(button.dataset.token1, button.dataset.token2)
    }));


    function changeToken(token1, token2){
        x = token1;
        o = token2;
        endGame();
    }

    //initial decision of who's turn it is
    const firstPlayerText = document.querySelector('#firstMove h1');
    function flipCoin() {
        const toss = Math.random() >= 0.5 ? true : false;
        if (toss === false) {
            skynetsTurn();
        } else {
            yourTurn();
        }
        fade(firstPlayerText);
    }

    //vanilla JS for fading in elements
    function fade(element) {
        let opacity = 0;
        let speed = 10;
        const interval = setInterval(function () {
            element.style.opacity = (opacity / 100);
            if (opacity >= 100 || opacity <= -1) {
                clearInterval(interval);
            } else {
                opacity++;
            }
        }, speed);
    }


    let turn;
    const table = document.querySelector('table');
    const cells = document.querySelectorAll('tr td');

    let randCell;

    //sets conditions depending on who's turn it is
    function skynetsTurn() {

        //styles
        firstPlayerText.innerHTML = "SkyNet's turn";
        firstPlayerText.style.color = '#67dcf1';
        table.classList.add('noHover');

        //functionality
        turn = false;
        randCell = cells[Math.floor((Math.random() * 9))];

        addMark();
    }
    function yourTurn() {
        //styles
        firstPlayerText.innerHTML = "Your turn";
        firstPlayerText.style.color = '#f1aa67';
        table.classList.remove('noHover');

        //functionality
        turn = true;
        cells.forEach(cell => cell.addEventListener('click', addMark))
    }

    let gameEnded = false;

    function addMark() {
        if (!gameEnded) {
            if (turn === true) {
                if (this.innerHTML === "") {
                    this.innerHTML = x; //add mark
                    this.classList.add('noHover');
                    checkWin();
                    skynetsTurn();
                }
            } else {
                if (randCell.innerHTML == "") {
                    setTimeout(function () {
                        randCell.innerHTML = o;
                        randCell.classList.add('noHover');
                        checkWin();
                        yourTurn();
                    }, (Math.random() * 2000));
                } else {
                    skynetsTurn();
                }

            }

        }
    }

    //some has won the game so do this
    function endGame() {
        gameEnded = true;
        setTimeout(function () {
            cells.forEach(cell => {
                cell.innerHTML = ''; //remove marks
                cell.classList.remove('noHover');//remove no hovering
                cell.classList.remove('winningLine');
                 
            });
            gameEnded = false;
            flipCoin()
        }, 3000);
        
    }

    const checkWin = () => {
        //update cells array each time
        const updatedCells = Array.from(document.querySelectorAll('tr td'));

        const grid = updatedCells.map(cell => {
            return cell.innerHTML;
        })

        const everySpotTaken = grid.every(cell => {
            return cell !== '';
        })


        if (everySpotTaken) {
            endGame();
        }

        function weHaveAWinner(possibleWinner) {
            if (possibleWinner === x) {
                return x;
            } else if (possibleWinner === o) {
                return o;
            } else{
                return null;
            }
        }

        //check if 3 same in a row: if 'X', do this, if 'O' do this, if '', do nothing
        function printWinner(winner) {
            const skynetScore = document.querySelector('h1#skynetScore');
            const playerScore = document.querySelector('h1#yourScore');

            if (winner === x) {
                playerScore.innerHTML += '|';
                
                endGame();
            } else if (winner === o) {
                skynetScore.innerHTML += '|';
                endGame();
            }
        }


        function highlightLine(cell1, cell2, cell3){
            cells[cell1].classList.add('winningLine');
            cells[cell2].classList.add('winningLine');
            cells[cell3].classList.add('winningLine');
        }


        //check rows
        for (let i = 0; i < 9; i += 3) { //increment by 3 (one row)
            if (grid[i] === grid[i + 1] && grid[i + 1] === grid[i + 2]) { //check 3 in a row match
                if(weHaveAWinner(grid[i])){ //pass the X, O, or '' to the function
                    highlightLine(i, i+1, i+2);
                    printWinner(grid[i]);
            }
            }
        }

        //check verticals
        for (let i = 0; i < 9; i++) {   //go up one col per iteration
            if (grid[i] === grid[i + 3] && grid[i + 3] === grid[i + 6]) {
                if(weHaveAWinner(grid[i])){ //pass the X, O, or '' to the function
                    highlightLine(i, i+3, i+6);
                    printWinner(grid[i]);
            }
            }
        }

        //check diagonals
        if (grid[0] === grid[4] && grid[4] === grid[8]) {     //top left to bottom right
            if(weHaveAWinner(grid[0])){ //pass the X, O, or '' to the function
                highlightLine(0, 4, 8);
                printWinner(grid[0]);
    }
        }

        if (grid[2] === grid[4] && grid[4] === grid[6]) {
            if(weHaveAWinner(grid[2])){ //pass the X, O, or '' to the function
                highlightLine(2, 4, 6);
                printWinner(grid[2]);
    }
        }

    }





    //start the game
    flipCoin();

    
}