var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.width-paddleWidth)/2;
var rightPressedUp = false;
var leftPressedUp = false;
var rightPressedDown = false;
var leftPressedDown = false;
var scoreUp = 0; 
var scoreDown = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

// Движение платформ 
function keyDown(e) {
    if(e.key === "в") {
        rightPressedUp = true;
    }
    else if(e.key === "ф") {
        leftPressedUp = true;
    }
}

function keyUp(e) {
    if(e.key == "Right" || e.key === "в") {
        rightPressedUp = false;
    }
    else if(e.key == "Left" || e.key == "ф") {
        leftPressedUp = false;
    }
}

function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressedDown = true;
    }
    else if(e.key == "ArrowLeft") {
        leftPressedDown = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressedDown = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressedDown = false;
    }
}

// Отображение шарика
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Отображение платформ
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-10, paddleWidth, paddleHeight);
    ctx.rect(paddleY, paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    //Отскоки шарика от стен и платформ
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    else if(y + dy < ballRadius+10) {
        if (x > paddleY && x < paddleY + paddleWidth) {
            dy = -dy;
        }
    }
    else if(y + dy > canvas.height-ballRadius-10) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
    }
    // Подсчет очков
    if(y + dy < ballRadius) {
        scoreUp++;
    } else if (y + dy > canvas.height-ballRadius) {
        scoreDown++;
        
    }
    // Сброс положения шарика при пропуске
    if ((y < 15 || y > canvas.height-15) && !ballRadius.resetting) {    
        ballRadius.resetting = true; 
         setTimeout(() => {    
            ballRadius.resetting = false;   
            x = canvas.width/2;
            y = canvas.height/2;   
            }, 20); 
        }
    
    //Движение платформ
    if(rightPressedDown && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressedDown && paddleX > 0) {
        paddleX -= 7;
    }

    if(rightPressedUp && paddleY < canvas.width-paddleWidth) {
        paddleY += 7;
    }
    else if(leftPressedUp && paddleY > 0) {
        paddleY -= 7;
    }
    
    x += dx;
    y += dy;

    ctx.fillStyle = "#000";
    ctx.font = "50px Verdana";
    ctx.fillText(scoreUp + ":" + scoreDown, 220, 270);
}

var interval = setInterval(draw, 10);

    