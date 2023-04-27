//creates the board
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

// parses the pieceID and returns the index of that piece
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

//player variables
let greenScore = 12;
let blueScore = 12;
let playerPieces;
let turn = true;

// selected piece properties
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpot: false,
    ninthSpot: false,
    fourteenthSpot: false,
    eighteenthSpot: false,
    minusSeventhSpot: false,
    minusNinthSpot: false,
    minusFourteenthSpot: false,
    minusEighteenthSpot: false
}
 //matches to documents
const cells = document.querySelectorAll("td");
let greensPieces = document.querySelectorAll("p");
let bluesPieces = document.querySelectorAll("span")
const greenTurnText = document.querySelectorAll(".green-turn-text");
const blueTurntext = document.querySelectorAll(".blue-turn-text");
const divider = document.querySelector("#divider")

// add listeners to the pieces
function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < greensPieces.length; i++) {
            greensPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < bluesPieces.length; i++) {
            bluesPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}
//the length of the players piece amount
function getPlayerPieces() {
    if (turn) {
        playerPieces = greensPieces;
    } else {
        playerPieces = bluesPieces;
    }
    removeClick();
    resetBorders();
}

// makes sure old moves are not kept)
function removeClick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resets borders to default
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

// resets selected piece properties
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpot = false;
    selectedPiece.ninthSpot = false;
    selectedPiece.fourteenthSpot = false;
    selectedPiece.eighteenthSpot = false;
    selectedPiece.minusSeventhSpot = false;
    selectedPiece.minusNinthSpot = false;
    selectedPiece.minusFourteenthSpot = false;
    selectedPiece.minusEighteenthSpot = false;
}

// gets ID and index of the board cell its on
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

// checks if selected piece is a king
function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpots();
}

// gets the moves that the selected piece can make
function getAvailableSpots() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPiece") !== true) {
        selectedPiece.seventhSpot = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPiece") !== true) {
        selectedPiece.ninthSpot = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPiece") !== true) {
        selectedPiece.minusSeventhSpot = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPiece") !== true) {
        selectedPiece.minusNinthSpot = true;
    }
    checkAvailableJumpSpots();
}

// gets the moves that the selected piece can jump
function checkAvailableJumpSpots() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpot = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpot = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
        && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpot = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
        && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpot = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpot = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpot = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] < 12 
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpot = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] < 12
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpot = true;
        }
    }
    checkPieceConditions();
}

// restricts movement if the piece is a king
function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpot = false;
            selectedPiece.minusNinthSpot = false;
            selectedPiece.minusFourteenthSpot = false;
            selectedPiece.minusEighteenthSpot = false;
        } else {
            selectedPiece.seventhSpot = false;
            selectedPiece.ninthSpot = false;
            selectedPiece.fourteenthSpot = false;
            selectedPiece.eighteenthSpot = false;
        }
        givePieceBorder();
    }
}

// guves piece red border when moveable
function givePieceBorder() {
    if (selectedPiece.seventhSpot || selectedPiece.ninthSpot || selectedPiece.fourteenthSpot || selectedPiece.eighteenthSpot
    || selectedPiece.minusSeventhSpot || selectedPiece.minusNinthSpot || selectedPiece.minusFourteenthSpot || selectedPiece.minusEighteenthSpot) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid red";
        giveCellsClick();
    } else {
        return;
    }
}

// gives the cells on the board a 'click' bassed on the possible moves
function giveCellsClick() {
    if (selectedPiece.seventhSpot) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpot) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpot) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpot) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpot) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpot) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpot) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpot) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}


// makes the move that was clicked
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="green-piece king" id="${selectedPiece.pieceId}"></p>`;
            greensPieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="green-piece" id="${selectedPiece.pieceId}"></p>`;
            greensPieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="blue-piece king" id="${selectedPiece.pieceId}"></span>`;
            bluesPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="blue-piece" id="${selectedPiece.pieceId}"></span>`;
            bluesPieces = document.querySelectorAll("span");
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blueScore--
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            greenScore--
        }
    }
    resetSelectedPieceProperties();
    removeClick();
    removeEventListeners();
}

// removes the 'onClick' event listeners for pieces
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < greensPieces.length; i++) {
            greensPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < bluesPieces.length; i++) {
            bluesPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

// Checks for a win
function checkForWin() {
    if (blueScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < greenTurnText.length; i++) {
            greenTurnText[i].style.color = "white";
            blueTurntext[i].style.display = "none";
            greenTurnText[i].textContent = "GREEN WINS!";
        }
    } else if (greenScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < blueTurntext.length; i++) {            
            blueTurntext[i].style.color = "white";
            greenTurnText[i].style.display = "none";
            blueTurntext[i].textContent = "BLUE WINS!";
        }
    }
    changePlayer();
}

// Switches players turn
function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < greenTurnText.length; i++) {
            greenTurnText[i].style.color = "white";
            blueTurntext[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blueTurntext.length; i++) {
            blueTurntext[i].style.color = "white";
            greenTurnText[i].style.color = "black";
        }
    }
    givePiecesEventListeners();
}
 //stopwatch
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var stopwatchInterval;

function startStopwatch() {
  stopwatchInterval = setInterval(setTime, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  totalSeconds = 0;
  minutesLabel.innerHTML = "00";
  secondsLabel.innerHTML = "00";
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


givePiecesEventListeners();