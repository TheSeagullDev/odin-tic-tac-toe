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
        if(Gameboard.place(row, col, currentPlayer)){
            switchPlayer();
            if(checkWin()) {
                Gameboard.displayBoard();
                console.log(`${checkWin().getName()} Wins!`);         
            }
            else {
                displayInfo();
                Gameboard.displayBoard();
            }
        }
        else {
            console.log("Invalid Move");
            displayInfo();
        }
        turnCount++;
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
            return boardArr[0].getState() === "X" ? playerOne : console.log("p2");
        }
        return false;
    }
    //assumes tie has already been checked - return player object for win, null for keep playing
    function checkWin() {
        if(turnCount >= 3) {
            const board = Gameboard.getBoard();
            const diagArrs = [[board[0][0], board[1][1], board[2][2]], [board[2][0], board[1][1], board[0][2]]];
            //check diagonals
            for(let i = 0; i < 2; i++) {
                if(checkLine(diagArrs[i])) {
                    return checkLine(diagArrs[i]);
                }
            }
        }
        return null;
    }
    displayInfo();
    Gameboard.displayBoard();

    return {getCurrentPlayer, switchPlayer, playMove, checkWin};
})();

// Test code
// GameManager.playMove(0,0);
// GameManager.playMove(1,0);
// GameManager.playMove(1,1);
// GameManager.playMove(0,2);
// GameManager.playMove(2,2);