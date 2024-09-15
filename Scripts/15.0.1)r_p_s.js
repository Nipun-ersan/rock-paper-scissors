let randomNumber;
let computerMove = '';
let result = '';
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};   

updateScoreElement(); 

/*
same as above after ||
if (!score) {
    score = {
        wins: 0,
        loses: 0,
        ties: 0
    };
}
*/   

let isAutoPlaying = false;
let intervalId;


// const autoPlay = () => {};

// this type of function writing was preferred here    
function autoPlay() {

    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickCompMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;

        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;

        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
    playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock')
    }
    else if (event.key === 'p') {
        playGame('Paper')
    }
    else if (event.key === 's') {
        playGame('Scissors')
    }
    else if (event.key === 'a') {
        autoPlay();
    }
    else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    showResetConfirmation();
});

function playGame(playerMove) {
    
    console.log(pickCompMove());

    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You Lose';
        }
        else if (computerMove === 'Paper') {
            result = 'You Win';
        }
        else if (computerMove === 'Scissors') {
            result = 'Tie';
        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You Win';
        }
        else if (computerMove === 'Paper') {
            result = 'Tie';
        }
        else if (computerMove === 'Scissors') {
            result = 'You Lose';
        }
    }
    else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        }
        else if (computerMove === 'Paper') {
            result = 'You Lose';
        }
        else if (computerMove === 'Scissors') {
            result = 'You Win';
        }
    }

    if (result === 'You Win') {
        score.wins += 1;
    }
    else if (result === 'You Lose') {
        score.loses += 1;
    }
    else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function updateScoreElement () {
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, loses: ${score.loses}, ties: ${score.ties}`;
}

function pickCompMove() {
    randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } 
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
}

function resetScore() {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    resetScore();
});

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = `
        <p class="reset-question">
            Are you sure, you want to reset the score?
        </p>
        <button class="js-reset-confirm-yes reset-confirm-button">
            Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
            No
        </button>
    `;

    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    });

    document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
        hideResetConfirmation();
    });
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}