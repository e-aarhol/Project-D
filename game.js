const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const statusElement = document.getElementById('status');

rockButton.addEventListener('click', () => {
  playGame('rock');
});

paperButton.addEventListener('click', () => {
  playGame('paper');
});

scissorsButton.addEventListener('click', () => {
  playGame('scissors');
});

function playGame(userMove) {
  console.log('played game')
  const computerMove = generateComputerMove();

  if (userMove === computerMove) {
    console.log('tie')
    setStatus('Tie game!');
  } else if (
    (userMove === 'rock' && computerMove === 'scissors') ||
    (userMove === 'paper' && computerMove === 'rock') ||
    (userMove === 'scissors' && computerMove === 'paper')
  ) {
    setStatus('You win!');
    console.log('winner')
    updateGameResult('win');
  } else {
    setStatus('Computer wins!');
    console.log('loser')
    updateGameResult('loss');
  }
}

function updateGameResult(result) {
  fetch('/update-game-result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ result })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.error(error);
  });
}

function generateComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function setStatus(message) {
  statusElement.textContent = message;
}
