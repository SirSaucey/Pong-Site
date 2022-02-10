var canvas;
var canvasContext;
var ballx = 50;
var bally = 50;
var ballSpeedx = 10;
var ballSpeedy = 5;

var paddle1y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos= calculateMousePos(evt);
            paddle1y = mousePos.y - (PADDLE_HEIGHT/2);
        });
}

function moveEverything() {
    ballx = ballx + ballSpeedx;
    if(ballx > canvas.width) {
        ballSpeedx = -ballSpeedx;
    }
    if(ballx < 0) {
        ballSpeedx = -ballSpeedx;
    }

    bally = bally + ballSpeedy;
    if(bally > canvas.height) {
        ballSpeedy = -ballSpeedy;
    }
    if(bally < 0) {
        ballSpeedy = -ballSpeedy;
    }
}

function drawEverything() {
    // Black Canvas
    colorRect(0,0,canvas.width, canvas.height, 'black');

    // Player Padel
    colorRect(10,paddle1y,10,PADDLE_HEIGHT, 'white');

    // Ball 
    colorCircle(ballx, bally, 10, 'white');
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,10,0,Math.PI*2,true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}