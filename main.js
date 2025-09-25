const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game settings
const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let leftPaddleY = canvas.height/2 - paddleHeight/2;
let rightPaddleY = canvas.height/2 - paddleHeight/2;
let leftScore = 0, rightScore = 0;

let ballX = canvas.width/2 - ballSize/2;
let ballY = canvas.height/2 - ballSize/2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);

// Keyboard controls
let upPressed = false, downPressed = false, wPressed = false, sPressed = false;
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') upPressed = true;
  if (e.key === 'ArrowDown') downPressed = true;
  if (e.key === 'w' || e.key === 'W') wPressed = true;
  if (e.key === 's' || e.key === 'S') sPressed = true;
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp') upPressed = false;
  if (e.key === 'ArrowDown') downPressed = false;
  if (e.key === 'w' || e.key === 'W') wPressed = false;
  if (e.key === 's' || e.key === 'S') sPressed = false;
});

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "#fff";
  ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth - 10, rightPaddleY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Draw score
  ctx.font = "32px Arial";
  ctx.fillText(leftScore, canvas.width/4, 40);
  ctx.fillText(rightScore, 3*canvas.width/4, 40);
}

// Update game objects
function update() {
  // Paddle movement
  if (wPressed && leftPaddleY > 0) leftPaddleY -= 6;
  if (sPressed && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 6;
  if (upPressed && rightPaddleY > 0) rightPaddleY -= 6;
  if (downPressed && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += 6;

  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top/bottom
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (ballX <= 20 && ballY + ballSize > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballX = 20; // Prevent sticking
  }
  if (ballX + ballSize >= canvas.width - 20 && ballY + ballSize > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width - 20 - ballSize; // Prevent sticking
  }

  // Score update
  if (ballX < 0) {
    rightScore++;
    resetBall();
  }
  if (ballX + ballSize > canvas.width) {
    leftScore++;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width/2 - ballSize/2;
  ballY = canvas.height/2 - ballSize/2;
  ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
