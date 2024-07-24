// main game controller
// construct the game board
// contains player details
// controls functionalities like:
// switch player after turn
// get active player details
// print new round 
// play round function by taking in row, column
// put in game logic here
// after playing a round, switch active player and print updated board
// print the board initially before any round is played
// just return the play Round, and get Active Player

// main game controller
function mainGameController(playerOneName = "Player One", playertwoName = "Player Two") {

    if (isGameOver == false) {
        // construct the game board
        const board = gameBoard();

        // contains player details
        let players = [{
            name: playerOneName,
            symbol: "X"
        },
        {
            name: playertwoName,
            symbol: "O"
        }]

        //let active player be player one for the initial part
        let activePlayer = players[0];

        // controls functionalities like:
        // switch player after turn
        const switchPlayerAfterTurn = () => {
            if (isGameOver == false) {
                activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
            }

        }

        // get active player details
        const getActivePlayer = () => activePlayer;

        // print new round 
        const printNewRound = () => {
            board.printBoard();
            if (isGameOver == false) {
                gameResult = `It is ${activePlayer.name}'s turn`;
                console.log(gameResult)
            } else {
                return;

            }
        }

        // play round function by taking in row, column
        const playRound = (row, column) => {
            console.log(`marking ${getActivePlayer().symbol} on row: ${row} and column: ${column}`);

            //put mark on specific location
            board.putMark(row, column, getActivePlayer().symbol);

            // put in game logic here
            //----------game logic goes here------------------------

            // take the board after putting the mark
            const gameLogic = () => {

                // holds active player's symbol, to use in winning condition
                let symbolOfActivePlayer = getActivePlayer().symbol;

                //holds the symbol of cell, takes in row and column co-ordinates
                let cellSymbol = (r, c) => {
                    return board.getBoard()[r][c].getSymbol()
                }

                // put the conditions to check winning combination here
                // check for the 8 winning condition for active player

                if ((cellSymbol(0, 0) == symbolOfActivePlayer && cellSymbol(0, 1) == symbolOfActivePlayer && cellSymbol(0, 2) == symbolOfActivePlayer) ||
                    (cellSymbol(1, 0) == symbolOfActivePlayer && cellSymbol(1, 1) == symbolOfActivePlayer && cellSymbol(1, 2) == symbolOfActivePlayer) ||
                    (cellSymbol(2, 0) == symbolOfActivePlayer && cellSymbol(2, 1) == symbolOfActivePlayer && cellSymbol(2, 2) == symbolOfActivePlayer) ||
                    (cellSymbol(0, 0) == symbolOfActivePlayer && cellSymbol(1, 0) == symbolOfActivePlayer && cellSymbol(2, 0) == symbolOfActivePlayer) ||
                    (cellSymbol(0, 1) == symbolOfActivePlayer && cellSymbol(1, 1) == symbolOfActivePlayer && cellSymbol(2, 1) == symbolOfActivePlayer) ||
                    (cellSymbol(0, 2) == symbolOfActivePlayer && cellSymbol(1, 2) == symbolOfActivePlayer && cellSymbol(2, 2) == symbolOfActivePlayer) ||
                    (cellSymbol(0, 0) == symbolOfActivePlayer && cellSymbol(1, 1) == symbolOfActivePlayer && cellSymbol(2, 2) == symbolOfActivePlayer) ||
                    (cellSymbol(0, 2) == symbolOfActivePlayer && cellSymbol(1, 1) == symbolOfActivePlayer && cellSymbol(2, 0) == symbolOfActivePlayer)) {

                    isGameOver = true;
                    // return `${getActivePlayer().name} WON !!!`
                    gameResult = `${getActivePlayer().name} WON !!!`

                }

                // checks for draw after each round
                function checkForDraw() {
                    let emptyCellCounter = 0;
                    for (let x = 0; x < 3; x++) {
                        for (let y = 0; y < 3; y++) {
                            if (cellSymbol(x, y) == '_') {
                                emptyCellCounter++;
                            }
                        }
                    }
                    if (emptyCellCounter == 0) {
                        isGameOver = true;
                        // console.log("DRAW!!!")
                        gameResult = "DRAW!!"
                    }
                }
                checkForDraw()
            }

            // if any condition matches, end game, display winner
            // see for draw condition after this


            //------------------------------------------------------

            // after playing a round, switch active player and print updated board
            if (isGameOver == false) {

                gameLogic();
                console.log(gameResult)
                switchPlayerAfterTurn();
                printNewRound();
            } else {
                return;
            }
        }

        // print the board initially before any round is played
        printNewRound();
        // just return the play Round, and get Active Player
        return { playRound, getActivePlayer, players };
    } else {

        return;
    }

}

// game board function
// declared array
// creaes 2d array, every row has it's own array, column filled into that array
// get the whole board, such that it could be reutrned and can be interactively be seen by the user whenever he wishes
// put mark function which takes in row, column and the player making the move
// checks if the cell is available
// return empty if cell unavailable
// if available, set the cell's value to the player's symbol
// print updated board
// return getBoard, putMark, printBoard

// game board function
function gameBoard() {

    // declared array
    const board = [];

    // creaes 2d array, every row has it's own array, column filled into that array
    for (let r = 0; r < 3; r++) {
        board[r] = [];
        for (let c = 0; c < 3; c++) {
            board[r].push(Cell())
        }
    }

    // get the whole board, such that it could be returned and can be interactively seen by the user whenever he wishes
    const getBoard = () => board;

    // put mark function which takes in row, column and the player making the move
    const putMark = (row, column, symbol) => {
        if (board[row][column].getSymbol() === "_") {
            board[row][column].addSymbol(symbol);
        } else {
            return;
        }
    }

    // print updated board
    const printBoard = () => {
        const boardWithMark = board.map((row) => row.map((cell) => cell.getSymbol()));
        console.log(boardWithMark);
    }

    // return getBoard, putMark, printBoard
    return { getBoard, putMark, printBoard }
}

// Cell object factory
// initialize the default value as Y
// add symbol function takes in what the player's symbol is, sets value to that symbol
// get symbol function to get symbol whenever needed
// returns these two: add Symbol and get Symbol

// Cell object factory
function Cell() {

    // initialize the default value as blank
    let symbol = '_';

    // add symbol function takes in what the player's symbol is, sets value to that symbol
    const addSymbol = (playerKaSymbol) => {
        symbol = playerKaSymbol;
    }

    // get symbol function to get symbol whenever needed
    const getSymbol = () => {
        return symbol;
    }

    // returns these two: add Symbol and get Symbol
    return { addSymbol, getSymbol }
}




let gameResult = "";
var isGameOver = false;

const play = (isGameOver == false) ? mainGameController() : "ded";
const players = play.players;

// DOM for left and right panel
let leftPanel = document.querySelector(".leftPanel");
let rightPanel = document.querySelector(".rightPanel");

// initialize opacity
leftPanel.style.opacity = "";
rightPanel.style.opacity = "0.75";

function manageColor() {
    if (play.getActivePlayer().name == players[1].name) {

        leftPanel.style.opacity = "";
        rightPanel.style.opacity = "0.75";

    } else if (play.getActivePlayer().name == players[0].name) {

        leftPanel.style.opacity = "0.75";
        rightPanel.style.opacity = "";
    }
}

// initialize left image
let leftImg = document.querySelector(".leftImg");
leftImg.innerHTML = ' <img src="images/punch_right.png" alt="">';

// initialize right image
let rightImg = document.querySelector(".rightImg");
rightImg.innerHTML = '<img src="images/block_right.png" alt="">';


function updateLeftImg() {

    if (gameResult == "It is Player One's turn") {
        // left punching
        leftImg.innerHTML = ' <img src="images/punch_right.png" alt="">';
        // right blocking
        rightImg.innerHTML = '<img src="images/block_right.png" alt="">';
    }

    if (gameResult == "It is Player Two's turn") {
        // left blocking
        leftImg.innerHTML = '<img src="images/block_right.png" alt="">';
        // right punching
        rightImg.innerHTML = ' <img src="images/punch_right.png" alt="">';
    }

    if (gameResult == "Player One WON !!!") {
        // left won
        leftImg.innerHTML = '<img src="images/won_right.png" alt="">';
        // right lost
        rightImg.innerHTML = '<img src="images/lost_right.png" alt="">';

        leftPanel.style.opacity = "";
        rightPanel.style.opacity = "";
    }

    if (gameResult == "Player Two WON !!!") {
        // left lost
        leftImg.innerHTML = '<img src="images/lost_right.png" alt="">';
        // right won
        rightImg.innerHTML = ' <img src="images/won_right.png" alt="">';

        leftPanel.style.opacity = "";
        rightPanel.style.opacity = "";
    }

    if (gameResult == "DRAW!!") {
        // left idle
        leftImg.innerHTML = '<img src="images/idle_right.png" alt="">';
        // right idle
        rightImg.innerHTML = ' <img src="images/idle_right.png" alt="">';

        leftPanel.style.opacity = "";
        rightPanel.style.opacity = "";
    }
}

function clickBtn(row, column) {

    manageColor()

    console.log(isGameOver)
    if (isGameOver == false) {

        let className = `(${row},${column})`;
        let btn = document.getElementById(className);

        if (btn.innerText == "") {
            btn.innerText = play.getActivePlayer().symbol;
        }
        play.playRound(row, column);
    }
    else {
        alert("Game over, don't click now ヽ(ಠ_ಠ)ノ")
    }
    let msgBox = document.querySelector(".msgBox")
    msgBox.innerText = gameResult;
    updateLeftImg();

}




