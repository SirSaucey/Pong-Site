var canvas;
var canvasContext;
// Ball
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 2;
// Score
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 11;
var showingWinScreen = false;
// Paddles
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_VOLUME = 10;

// Mouse Movement
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY,
    };
  }

  function handleMouseClick(evt) {
    if (showingWinScreen) {
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = false;
    }
  }
  
  window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var framesPerSecond = 60;
    setInterval(function () {
      moveEverything();
      drawEverything();
    }, 100 / framesPerSecond);

  canvas.addEventListener("mousedown", handleMouseClick);

  canvas.addEventListener("mousemove", function (evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

// Reset ball
function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
      showingWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
  
  // Player 2
  function computerMovement() {
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
    if (paddle2YCenter < ballY - 35) {
      paddle2Y += 5;
    } else if (paddle2YCenter > ballY - 35) {
      paddle2Y -= 5;
    }
  }

  function moveEverything() {
    if (showingWinScreen) {
      return;
    }
    computerMovement();
  
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    if (ballX < 20) {
      if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
        ballSpeedY = deltaY * 0.34;
      } else {
        player2Score++;
        ballReset();
      }
    }
    if (ballX > canvas.width - 20) {
      if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
        ballSpeedY = deltaY * 0.34;
      } else {
        player1Score++;
        ballReset();
      }
    }
    if (ballY < 0) {
      ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
  }

  function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
      colorRect(canvas.width / 2 - 1, i, 2, 20, "#6495ED");
    }
  }
  
  function drawEverything() {
    // Field
    colorRect(0, 0, canvas.width, canvas.height, "#131313");
  
    if (showingWinScreen) {
      canvasContext.fillStyle = "white";
  
      if (player1Score >= WINNING_SCORE) {
        canvasContext.fillText("Nice one, but can you do it again?", 350, 200);
      } else if (player2Score >= WINNING_SCORE) {
        canvasContext.fillText(
          "Git Gud Nub",
          350,
          200
        );
      }
      canvasContext.fillText("CLICK TO CONTINUE", 350, 500);
      return;
    }
  
    drawNet();

 // Paddle 1
 colorRect(10, paddle1Y, PADDLE_VOLUME, PADDLE_HEIGHT, "#6495ED");

 // Paddle 2
 colorRect(
   canvas.width - 10 - PADDLE_VOLUME,paddle2Y,PADDLE_VOLUME,PADDLE_HEIGHT,"#6495ED");

 // Ball
 colorCircle(ballX, ballY, 10, "#FFFFFF");

 canvasContext.fillText(player1Score, 100, 100);
 canvasContext.fillText(player2Score, canvas.width - 100, 100);
}
function colorCircle(centerX, centerY, radius, drawColor) {
 canvasContext.fillStyle = drawColor;
 canvasContext.beginPath();
 canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
 canvasContext.fill();
}
function colorRect(leftX, topY, width, height, drawColor) {
 canvasContext.fillStyle = drawColor;
 canvasContext.fillRect(leftX, topY, width, height);
}