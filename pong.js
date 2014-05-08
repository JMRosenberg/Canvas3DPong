var xPos = 43;
var yPos = 24;
var zPos = 189;
var xVel = .3;
var yVel = .5;
var zVel = .6;
var maxSize = 510;

var canvas = document.getElementById('myCanvas');
var mousePos = {};

function draw() {
    canvas = document.getElementById('myCanvas');
    if(canvas.getContext) {
	ctx = canvas.getContext('2d');
    }
    canvas.onmousemove = handleMouseMove;
    myInt = setInterval(move, 2);
}

function handleMouseMove(event) {
    event = event || canvas.event;
    var rect = canvas.getBoundingClientRect();
    mousePos = {
	x: event.clientX - rect.left,
	y: event.clientY - rect.top
    };
}

function move() {
    xPos += xVel;
    yPos += yVel;
    zPos += zVel;
    if(xPos > maxSize) {
	xVel *= -1;
    }
    if(yPos > maxSize) {
	yVel *= -1;
    }
    if(zPos > maxSize) {
	pScore = document.getElementById('playerScore');
	pScore.innerHTML = (parseInt(pScore.innerHTML) + 1);
	zVel *= -1;
    }
    if(xPos < 0) {
	xVel *= -1;
    }
    if(yPos < 0) {
	yVel *= -1;
    }    
    if(zPos < 0) {
	zVel *= -1;
    }
    ctx.clearRect(0, 0, maxSize, maxSize);
    ctx.fillStyle = "rgb(" + parseInt(xPos/2) + ",0," + parseInt(yPos/2) + ")";
    ctx.beginPath();
    var size = parseInt(zPos/15);
    ctx.arc(xPos, yPos, size, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "rgba(100,100,100,.5)";
    ctx.fillRect(mousePos.x-50, mousePos.y-50, 100, 100);    
}

/*function getMousePos(canv, evt) {
    var rect = canv.getBoundingClientRect();
    document.getElementById('playerScore').innerHTML = evt.clientX;
    return {
	x: evt.clientX - rect.left,
	y: evt.clientY - rect.top
    };
}*/

/*canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
}, false);*/
