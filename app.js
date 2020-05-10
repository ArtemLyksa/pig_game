/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, dices, roundScore, activePlayer, isGamePlaying, prevDice, winScore;

resetGame();

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (!isGamePlaying) return;

    //Read winner score
    if (!winScore) winScore = document.querySelector('.winner-score').value;

    if (!winScore) {
        //Add error and remove after a delay    
        document.querySelector('.winner-score').classList.add('error');
        setTimeout(() => {
            document.querySelector('.winner-score').classList.remove('error');
        }, 500);
        return;
    } else
    document.querySelector('.winner-score').style.display = 'none';

    throwDices();

    if (dices[0] == 1 || dices[1] == 1) {
        //Next player's turn
        nextPlayer();
    } else {
        //Add to current player's round score
        roundScore += dices[0] + dices[1];
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }

});

document.querySelector('.btn-hold').addEventListener('click', () => {

    if (!isGamePlaying) return;

    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] > winScore) {
        //End the game
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        resetDices();
        isGamePlaying = false;
    } else {
        //Next player's turn
        nextPlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", resetGame);

function nextPlayer() {
    roundScore = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    setCurrent(0, 0);
    setCurrent(1, 0);

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}

function setCurrent(id, value) {
    document.getElementById('current-' + id).textContent = value;
}

function throwDices() {

    for (var i = 0; i < dices.length; i++) {
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDOM0 = document.querySelector('.dice-' + i);
        diceDOM0.style.display = 'block';
        diceDOM0.src = 'dice-' + dice + '.png';

        dices[i] = dice;
    }
}

function resetDices() {
    for (var i = 0; i < dices.length; i++) {
        document.querySelector('.dice-' + i).style.display = 'none';
        dices[i] = 0;
    }
}

function resetGame() {
  scores = [0, 0];
  dices = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  winScore = 0;
  isGamePlaying = true;

  resetDices();
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.querySelector('.winner-score').value = "";
  document.querySelector('.winner-score').style.display = 'block';
  setCurrent(0, 0);
  setCurrent(1, 0);

  //Display winning score input
}