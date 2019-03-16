const playerX = {
    type: "x",
    sign: '&times;',
    shots: []
};
const playerO = {
    type: "o",
    sign: '&bigcirc;',
    shots: []
};
let currentPlayer;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.grid-item');
const header = document.getElementById('move');
const newGameBtn = document.getElementById('new-game');

cells.forEach(el => {
    el.addEventListener('click', turnClick);
});

newGameBtn.addEventListener('click', newGame);

function newGame() {
    playerX.shots = [];
    playerO.shots = [];
    currentPlayer = playerX;

    cells.forEach(el => {
        el.classList.remove('unclickable');
        el.innerHTML = '';
    });
    header.innerHTML = "current move: " + currentPlayer.type;
    newGameBtn.style.display = "none";
}

function turnClick() {
    updateGameBoard(this);

    if (hasWon()) {
        showWinningScreen();
    }
    else if (isDraw()) {
        showDrawScreen();
    }
    else {
        changePlayer();
    }

}

function changePlayer() {
    currentPlayer = currentPlayer == playerX ? playerO : playerX;
    header.innerHTML = "current move: " + currentPlayer.type;
}

function showWinningScreen() {
    header.innerHTML = currentPlayer.type + " has won!";
    cells.forEach(el => {
        el.classList.add('unclickable');
    });
    newGameBtn.style.display = "block";
}

function showDrawScreen() {
    header.innerHTML = "draw!";
    newGameBtn.style.display = "block";
}

function updateGameBoard(el) {
    el.classList.add('unclickable');
    el.innerHTML = '<p class="sign-' + currentPlayer.type + '">' + currentPlayer.sign + '</p>';
    currentPlayer.shots.push(Number(el.id));

    console.log(currentPlayer.type + " has clicked " + el.id);
}

function hasWon() {
    if (currentPlayer.shots.length < 3) return false;

    for (let i = 0; i < winningCombos.length; i++) {
        // if array of player's shots contains all elements of whichever of sub-arrays in winningCombos, he wins
        if (winningCombos[i].every(el => {
            return currentPlayer.shots.includes(el);
        })) return true;
    }
    return false;
}

function isDraw() {
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].classList.contains('unclickable')) return false;
    }
    return true;
}

function displayWinMessage() {
    header.innerHTML = "Congratulations! Player " + currentPlayer.type + " has won!";
}
