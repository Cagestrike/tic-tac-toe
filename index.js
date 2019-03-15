const playerX = {
    type: "x",
    shots: []
};
const playerO = {
    type: "o",
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
    header.innerHTML = "Current move: " + currentPlayer.type.toUpperCase();
}

function turnClick() {
    updateGameBoard(this);
    if (hasWon()) {

        console.log(currentPlayer.type + " has won!");
    }

    currentPlayer = currentPlayer == playerX ? playerO : playerX;
    header.innerHTML = "Current move: " + currentPlayer.type.toLocaleUpperCase();
}

function updateGameBoard(el) {
    el.classList.add('clicked-' + currentPlayer.type, 'unclickable');
    if (currentPlayer.type == 'x') {
        el.innerHTML = '<p class="sign-x">&times;</p>'
    } else if (currentPlayer.type == 'o') {
        el.innerHTML = '<p class="sign-o">&bigcirc;</p>'
    }
    currentPlayer.shots.push(Number(el.id));

    console.log(currentPlayer.type + " has clicked " + el.id);
}

function hasWon() {
    if (currentPlayer.shots.length < 3) return false;

    // currentPlayer.shots = currentPlayer.shots.sort((a, b) => a - b);
    // let stringShots = JSON.stringify(currentPlayer.shots).slice(1, this.length - 1);
    // console.log(stringShots);

    // for (let i = 0; i < winningCombos.length; i++) {
    //     let stringWins = JSON.stringify(winningCombos[i]).slice(1, this.length - 1);
    //     console.log(stringWins);
    //     if (stringShots.includes(stringWins)) return true;
    // }

    // return false;

    for (let i = 0; i < winningCombos.length; i++) {
        // if array of player's shots contains all elements of whichever of sub-arrays in winningCombos, he wins
        if (winningCombos[i].every(el => {
            return currentPlayer.shots.includes(el);
        })) return true;
    }
    return false;
}

function displayWinMessage() {
    header.innerHTML = "Congratulations! Player " + currentPlayer.type + " has won!";
}
