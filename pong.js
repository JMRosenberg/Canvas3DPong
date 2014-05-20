var maxSize = 510;
var xPos = Math.random() * maxSize;
var yPos = Math.random() * maxSize;
var zPos = Math.random() * maxSize / 2;
var xVel = Math.random() * 2 - 1;
var yVel = Math.random() * 2 - 1;
var zVel = Math.random() * .5 + .5;
var compVel = .9;

var maxX = 2;
var maxY = 2;
var maxZ = 2;
var minX = .2;
var minY = .2;
var minZ = .5;

var canvas = document.getElementById('myCanvas');
var mousePos = {x: maxSize/2, y: maxSize/2};
var compPos = {x: maxSize/2, y: maxSize/2};

//Initialize the game
function start() {
    canvas = document.getElementById('myCanvas');
    if(canvas.getContext) {
      ctx = canvas.getContext('2d');
    }
    canvas.onmousemove = handleMouseMove;
    myInt = setInterval(move, 2);
}

//Update the mouse position
function handleMouseMove(event) {
    event = event || canvas.event;
    var rect = canvas.getBoundingClientRect();
    mousePos = {
	x: event.clientX - rect.left,
	y: event.clientY - rect.top
    };
}


//To Do: Break up this function into reasonable parts
function move() {
    ctx.clearRect(0, 0, maxSize, maxSize);
    compMove();
    checkMax();
    xPos += xVel;
    yPos += yVel;
    zPos += zVel;
    if(xPos > maxSize) {
	xVel += (Math.random() * .4 - .1);
	xVel *= -1;
    }
    if(yPos > maxSize) {
	yVel += (Math.random() * .4 - .1);
	yVel *= -1;
    }
    if(zPos > maxSize) {
	if((xPos > (mousePos.x - 50)) && (xPos < (mousePos.x + 50))){
	    if((yPos > (mousePos.y - 50)) && (yPos < (mousePos.y + 50))){
		zVel += (Math.random() * .3);
		zVel *= -1;
	    }
	}
	else {
	    zVel /= -2;
	    xVel /= 2;
	    yVel /= 2;
	    zPos = maxSize;
	    cScore = document.getElementById('computerScore');
	    cScore.innerHTML = (parseInt(cScore.innerHTML) + 1);
	}
    }
    if(xPos < 0) {
	xVel -= (Math.random() * .3);
	xVel *= -1;
    }
    if(yPos < 0) {
	yVel -= (Math.random() * .3);
	yVel *= -1;
    }
    if(zPos < 0) {
	if((xPos > (compPos.x - 50)) && (xPos < (compPos.x + 50))){
	    if((yPos > (compPos.y - 50)) && (yPos < (compPos.y + 50))){
		zVel -= (Math.random() * .3);
		zVel *= -1;
	    }
	}
	else {
	    zVel /= -2;
	    xVel /= 2;
	    yVel /= 2;
	    zPos = 0;
	    pScore = document.getElementById('playerScore');
	    pScore.innerHTML = (parseInt(pScore.innerHTML) + 1);
	}
    }

    drawBG(); //Background
    //Draw Computer
    ctx.fillStyle = "rgba(150,0,0,.5)";
    ctx.fillRect((compPos.x/2+maxSize/4)-25, (compPos.y/2+maxSize/4)-25, 50, 50);

    //Draw Ball
    newXPos = ((xPos/maxSize)*((1/2)+((zPos/maxSize)/2)) + (1/4)*((maxSize-zPos)/maxSize))*maxSize;
    newYPos = ((yPos/maxSize)*((1/2)+((zPos/maxSize)/2)) + (1/4)*((maxSize-zPos)/maxSize))*maxSize;

    ctx.fillStyle = "rgba(0,200,0,.8)";
    ctx.beginPath();
    var size = parseInt(zPos/20 + 10);
    ctx.arc(newXPos, newYPos, size, 0, 2*Math.PI);
    ctx.fill();
    //Draw Player
    ctx.fillStyle = "rgba(0,0,150,.5)";
    ctx.fillRect(mousePos.x-50, mousePos.y-50, 100, 100);
}

//Checks maximal and minimal velocity
function checkMax() {
    var positive = (xVel > 0);
    if(xVel > maxX) {
	xVel = maxX;
    }
    else if(xVel < minX) {
	xVel = minX;
    }
/*    if(yVel > maxY) {
	yVel = maxY;
    }
    else if(yVel < minY) {
	yVel = minY;
    }
    if(zVel > maxZ) {
	zVel = maxZ;
    }
    else if(xVel < minX) {
	xVel = minX;
    }    */
}

//Move the computer
function compMove() {
    if(compPos.x > xPos) {
	compPos.x -= compVel;
    }
    else {
	compPos.x += compVel;
    }
    if(compPos.y > yPos) {
	compPos.y -= compVel;
    }
    else {
	compPos.y += compVel;
    }
    if(compPos.x < 50) {
	compPos.x = 50;
    }
    if(compPos.x > (maxSize - 50)) {
	compPos.x = maxSize - 50;
    }
    if(compPos.y < 50) {
	compPos.y = 50;
    }
    if(compPos.y > (maxSize - 50)) {
	compPos.y = maxSize - 50;
    }
}

//Draw the Background
function drawBG() {
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(0, 0, maxSize, maxSize);
    ctx.fillStyle = "rgb(150,150,150)";
    ctx.fillRect(maxSize/4, maxSize/4, maxSize/2, maxSize/2);
    ctx.strokeRect(maxSize/4, maxSize/4, maxSize/2, maxSize/2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(maxSize/4, maxSize/4);
    ctx.stroke();
    ctx.moveTo(maxSize, 0);
    ctx.lineTo(maxSize*3/4, maxSize/4);
    ctx.stroke();
    ctx.moveTo(0, maxSize);
    ctx.lineTo(maxSize/4, maxSize*3/4);
    ctx.stroke();
    ctx.moveTo(maxSize, maxSize);
    ctx.lineTo(maxSize*3/4, maxSize*3/4);
    ctx.stroke();

    //Moving Depth Box
    ctx.strokeRect((maxSize-zPos)/4, (maxSize-zPos)/4, maxSize-(maxSize-zPos)/2, maxSize-(maxSize-zPos)/2);
}
