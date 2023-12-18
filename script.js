const playerPaddle = document.getElementById('playerPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const smashSound = document.getElementById('smashSound');
const playSoundButton = document.getElementById('playSoundButton');

let playerScoreCount = 0;
let computerScoreCount = 0;

// Initial positions
let ballX = 300;
let ballY = 200;
let ballSpeedX = -3;
let ballSpeedY = 3;

// Paddle positions
let playerPaddleY = 160;
let computerPaddleY = 160;

const computerReactionSpeed = 0.05;

function update() {
  document.addEventListener('mousemove', (e) => {
    playerPaddleY = e.clientY - playerPaddle.clientHeight / 2;
    if (playerPaddleY < 0) {
      playerPaddleY = 0;
    } else if (playerPaddleY > 320) {
      playerPaddleY = 320;
    }
    playerPaddle.style.top = `${playerPaddleY}px`;
  });


  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;


  if (ballY <= 0 || ballY >= 390) {
    ballSpeedY = -ballSpeedY;
  }

  
  const playerPaddleHit = ballX <= 20 && ballX >= 10 && ballY >= playerPaddleY && ballY <= playerPaddleY + 80;
  const computerPaddleHit = ballX >= 570 && ballX <= 580 && ballY >= computerPaddleY && ballY <= computerPaddleY + 80;

  if (playerPaddleHit || computerPaddleHit) {
    ballSpeedX = -ballSpeedX;
    playSound(smashSound);
  }

  // Computer AI
  if (ballX > 300) {
    const computerPaddleCenter = computerPaddleY + 40; 
    if (computerPaddleCenter < ballY - 15) {
      computerPaddleY += Math.abs(ballY - computerPaddleCenter) * computerReactionSpeed; 
    } else if (computerPaddleCenter > ballY + 15) {
      computerPaddleY -= Math.abs(ballY - computerPaddleCenter) * computerReactionSpeed; 
    }
  }
  computerPaddle.style.top = `${computerPaddleY}px`;

  // Score update
  if (ballX <= 0) {
    computerScoreCount++;
    computerScore.textContent = `Computer: ${computerScoreCount}`;
    reset();
  } else if (ballX >= 590) {
    playerScoreCount++;
    playerScore.textContent = `Player: ${playerScoreCount}`;
    reset();
  }

  // Check for winner
  if (playerScoreCount === 5) {
    alert('Congratulations! You win!');
    resetGame();
  } else if (computerScoreCount === 5) {
    alert('Computer wins! Try again.');
    resetGame();
  }

  requestAnimationFrame(update);
}

function reset() {
  ballX = 300;
  ballY = 200;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  ballSpeedX = -ballSpeedX;
}

function resetGame() {
  playerScoreCount = 0;
  computerScoreCount = 0;
  playerScore.textContent = 'Player: 0';
  computerScore.textContent = 'Computer: 0';
}

const h1Element = document.querySelector('h1');

document.addEventListener('click', (event) => {
  if (event.target !== h1Element) {
    h1Element.style.display = 'none';
  }
});

playSoundButton.addEventListener('click', () => {
  playSound(smashSound);
});

function playSound(sound) {
  sound.currentTime = 0;
  const playPromise = sound.play();
  if (playPromise !== undefined) {
    playPromise
      .then(_ => {
        
      })
      .catch(error => {
        console.error('Audio playback prevented:', error);
      });
  }
}

update();
