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

    // function displayBoard() {
    //     for(let i = 0; i < 3; i++)
    //         {
    //             DisplayManager.writeToOutput(`${board[i][0].getState()} | ${board[i][1].getState()} | ${board[i][2].getState()}`)
    //             DisplayManager.writeToOutput("-------")
    //         }
    // }

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
    return {getBoard, place};
})();

const DisplayManager = (function() {

    
    function initializeDisplay() {
        for(let row = 1; row <= 3; row++) {
            for(let col = 1; col <= 3; col++) {
                domBoard[row-1].push(pieceList[col - 1 + 3*(row-1)]);
            }
        }

        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                domBoard[row][col].addEventListener("click", () => {
                    GameManager.playMove(row, col);
                })
            }
        }
    }

    function updateDisplay() {
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                domBoard[row][col].textContent = Gameboard.getBoard()[row][col].getState();
            }
        }
    }

    function writeToOutput(message) {
        const output = document.querySelector(".output");
        output.textContent = message;
    }

    const pieceList = document.querySelectorAll(".piece");
    const domBoard = [[], [], []];
    initializeDisplay();

    return {updateDisplay, writeToOutput};

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
        DisplayManager.writeToOutput(`Current turn: ${currentPlayer.getName()} - ${currentPlayer.getSymbol()}`);
    }

    function playMove(row, col) {
        if(!checkWin() && !checkForTie()) {
            if(Gameboard.place(row, col, currentPlayer)){
                switchPlayer();
                turnCount++;
                if(checkWin()) {
                    DisplayManager.updateDisplay();
                    DisplayManager.writeToOutput(`${checkWin().getName()} Wins!`);         
                }
                else if (checkForTie()) {
                    DisplayManager.updateDisplay();
                    DisplayManager.writeToOutput(`It's a tie!`);   
                } else {
                    DisplayManager.updateDisplay();
                    displayInfo();
                }
            }
            else {
                DisplayManager.writeToOutput("Invalid Move");
                displayInfo();
            }
        }
        else {
            checkWin() ? DisplayManager.writeToOutput(`${checkWin().getName()} already won!`) : DisplayManager.writeToOutput("It's a tie!"); 
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
    DisplayManager.updateDisplay();
    displayInfo();

    return {getCurrentPlayer, switchPlayer, playMove, checkWin};
})();
