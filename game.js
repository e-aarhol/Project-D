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
    console.log
  const computerMove = generateComputerMove();

  if (userMove === computerMove) {
    setStatus('Tie game!');
  } else if (
    (userMove === 'rock' && computerMove === 'scissors') ||
    (userMove === 'paper' && computerMove === 'rock') ||
    (userMove === 'scissors' && computerMove === 'paper')
  ) {
    setStatus('You win!');
  } else {
    setStatus('Computer wins!');
  }
}

function generateComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function setStatus(message) {
  statusElement.textContent = message;
}
