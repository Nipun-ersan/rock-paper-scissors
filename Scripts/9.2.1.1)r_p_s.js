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