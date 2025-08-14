const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balloonX = 150;
let balloonY = canvas.height / 2;
let balloonRadius = 25;
let velocity = 0;
const gravity = 0.5;
const jumpPower = -8;

let obstacles = [];
let score = 0;
let gameOver = false;

let clouds = Array.from({length: 5}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height / 2,
  r: 40 + Math.random() * 30
}));

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !gameOver) velocity = jumpPower;
  if (gameOver && e.code === "Space") restart();
});
document.addEventListener("click", () => {
  if (!gameOver) velocity = jumpPower;
  else restart();
});

setInterval(() => {
  if (gameOver) return;
  const gap = 200;
  const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
  const bottomHeight = canvas.height - topHeight - gap;
  
  obstacles.push({
    x: canvas.width,
    topHeight,
    bottomHeight,
    width: 60
  });
}, 2000);

function drawClouds() {
  ctx.fillStyle = "white";
  clouds.forEach(cloud => {
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
    ctx.fill();
    cloud.x -= 1;
    if (cloud.x + cloud.r < 0) {
      cloud.x = canvas.width + cloud.r;
      cloud.y = Math.random() * canvas.height / 2;
    }
  });
}

function drawBalloon() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.ellipse(balloonX, balloonY, balloonRadius, balloonRadius * 1.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(balloonX - 12, balloonY + balloonRadius * 1.3, 24, 20);

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(balloonX - 10, balloonY + balloonRadius * 0.8);
  ctx.lineTo(balloonX - 12, balloonY + balloonRadius * 1.3);
  ctx.moveTo(balloonX + 10, balloonY + balloonRadius * 0.8);
  ctx.lineTo(balloonX + 12, balloonY + balloonRadius * 1.3);
  ctx.stroke();
}

function drawObstacles() {
  ctx.fillStyle = "green";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, 0, obs.width, obs.topHeight);
    ctx.fillRect(obs.x, canvas.height - obs.bottomHeight, obs.width, obs.bottomHeight);
  });
}

function restart() {
  balloonY = canvas.height / 2;
  velocity = 0;
  obstacles = [];
  score = 0;
  gameOver = false;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawClouds();

  if (!gameOver) {
    velocity += gravity;
    balloonY += velocity;
    if (balloonY < balloonRadius) balloonY = balloonRadius;
    if (balloonY > canvas.height - balloonRadius) balloonY = canvas.height - balloonRadius;
  }

  drawBalloon();

  obstacles.forEach((obs, i) => {
    if (!gameOver) obs.x -= 4;
    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1);
      score++;
    }

    if (
      balloonX + balloonRadius > obs.x &&
      balloonX - balloonRadius < obs.x + obs.width &&
      (balloonY - balloonRadius < obs.topHeight ||
       balloonY + balloonRadius > canvas.height - obs.bottomHeight)
    ) {
      gameOver = true;
    }
  });

  drawObstacles();

  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 120, canvas.height / 2 - 20);
    ctx.font = "28px Arial";
    ctx.fillText("Final Score: " + score, canvas.width / 2 - 90, canvas.height / 2 + 20);
    ctx.fillText("Click or Press Space to Restart", canvas.width / 2 - 180, canvas.height / 2 + 60);
  }

  requestAnimationFrame(update);
}

update();
