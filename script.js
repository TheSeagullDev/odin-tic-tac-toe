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
            Gameboard.displayBoard();
            displayInfo();
        }
        else {
            console.log("Invalid Move");
            displayInfo();
        }
    }

    displayInfo();
    Gameboard.displayBoard();

    return {getCurrentPlayer, switchPlayer, playMove};
})();