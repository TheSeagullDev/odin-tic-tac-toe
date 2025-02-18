const Gameboard = (function() {
    const board = [];

    const getBoard = () => board;

    function initializeBoard() {
        for(let i = 0; i < 3; i++)
        {
            board[i] = [];
            for(let j = 0; j < 3; j++)
            {
                board[i].push(Piece(i, j));
            }
        }
    }

    function displayBoard() {
        for(let i = 0; i < 3; i++)
            {
                console.log(`${board[i][0].getState()} | ${board[i][1].getState()} | ${board[i][2].getState()}`)
                console.log("-------")
            }
    }

    function place(row, col, player) {
        if(board[row][col].isOccupied()) {
            return "";
        }
        else {
            occupied = true;
            board[row][col].setState(player.getSymbol());
            return board[row][col].getState();
        }
    }

    initializeBoard();
    return {getBoard, displayBoard, place};
})();

function Piece(row, col) {
    let occupied = false;
    let state = "";

    const getState = () => state;
    const getRow = () => row;
    const getCol = () => col;
    const isOccupied = () => occupied;
    function setState(newState) {
        state = newState;
        occupied = true;
    }
    
    return {getState, getRow, getCol, isOccupied, setState};
}

function Player(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
}

const GameManager = (function() {
    let turnCount = 0;

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const playerOne = Player(playerOneName, "X");
    const playerTwo = Player(playerTwoName, "O");

    let currentPlayer = playerOne;

    const getCurrentPlayer = () => currentPlayer;

    function switchPlayer() {
        if(currentPlayer.getSymbol() === playerOne.getSymbol()) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    function displayInfo() {
        console.log(`Current turn: ${currentPlayer.getName()} - ${currentPlayer.getSymbol()}`);
    }

    function playMove(row, col) {
        if(!checkWin() && !checkForTie()) {
            if(Gameboard.place(row, col, currentPlayer)){
                switchPlayer();
                turnCount++;
                if(checkWin()) {
                    Gameboard.displayBoard();
                    console.log(`${checkWin().getName()} Wins!`);         
                }
                else if (checkForTie()) {
                    Gameboard.displayBoard();
                    console.log(`It's a tie!`);   
                } else {
                    Gameboard.displayBoard();
                    displayInfo();
                }
            }
            else {
                console.log("Invalid Move");
                displayInfo();
            }
        }
        else {
            checkWin() ? console.log(`${checkWin().getName()} already won!`) : console.log("It's a tie!"); 
        }
    }

    function checkForTie() {
        return turnCount >= 9;
    }

    function checkLine(boardArr) {
        for(let i = 0; i < 2; i++) {
            if(boardArr[i].getState() !== boardArr[i+1].getState()) {
                return false;
            }
        }
        if(boardArr[0].isOccupied()) {
            return boardArr[0].getState() === "X" ? playerOne : playerTwo;
        }
        return false;
    }
    //return player object for win, null for keep playing
    function checkWin() {
        if(turnCount >= 3) {
            const board = Gameboard.getBoard();
            const diagArrs = [[board[0][0], board[1][1], board[2][2]], [board[2][0], board[1][1], board[0][2]]];
            const cols = [[], [], []];
            //check diagonals
            for(let i = 0; i < 2; i++) {
                if(checkLine(diagArrs[i])) {
                    return checkLine(diagArrs[i]);
                }
            }
            //check rows
            for(let i = 0; i < 3; i++) {
                if(checkLine(board[i])) {
                    return checkLine(board[i]);
                }
            }
            //check cols
            for(let col = 0; col < 3; col++) {
                for(let row = 0; row < 3; row++) {
                    cols[col].push(board[row][col]);
                }
            }
            for(let i = 0; i < 3; i++) {
                if(checkLine(cols[i])) {
                    return checkLine(cols[i]);
                }
            }
        }
        return null;
    }
    Gameboard.displayBoard();
    displayInfo();

    return {getCurrentPlayer, switchPlayer, playMove, checkWin};
})();

// Test code
