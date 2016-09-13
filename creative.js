
var enemyPiece;
var myGamePiece;
var WIDTH = 400;
var HEIGHT = 400;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

var game = {		

	gameMode: 0,
	
	keys : [],

	canvas : document.createElement("canvas"),

	start : function(){
		
		this.canvas.width = WIDTH;
		this.canvas.height = HEIGHT;
		this.canvas.id = "game-screen";
		this.canvas.style.cursor = "none";
		this.context = this.canvas.getContext("2d");
		this.positionText = document.getElementById("coord-text");

		var node = document.getElementById("canvas-wrap");
		
		node.insertBefore(this.canvas, node.childNodes[0]);		
		this.interval = setInterval(updateGame, 20);
		document.getElementById("arrow-button").style.margin = "0 auto";
		document.getElementById("mouse-button").style.padding= "25px";		

		window.addEventListener('keydown', function(e) {
					
			game.keys[e.keyCode] = true;
		})

		window.addEventListener('keyup', function(e) {
			game.keys[e.keyCode] = false;
		})
		
		this.canvas.addEventListener('mousemove', function(e) {
			game.canvasBoundary = game.canvas.getBoundingClientRect();
			game.x = e.clientX-game.canvasBoundary.left;
			game.y = e.pageY-game.canvasBoundary.top;
		})
	},
	
	clear : function(){
	
		this.context.clearRect(0,0,WIDTH, HEIGHT);		

	}
	
}

function startGame(){
	
	//alert("startGame()");
	game.start();
	//alert("second alert startGame()");
	myGamePiece = new gamePiece(30, 30, "red", 50, 50, 10);
	enemyPiece = new gamePiece(20, 20, "black", 200, 200, 0);
}

function gamePiece(width, height, color, x, y, speed)
{
	this.speed = speed;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;

	this.boundCheck = function()
	{
		if(game.gameMode === 0)
		{
			if(myGamePiece.x > WIDTH)
			{
				myGamePiece.x = 0;
			}
			else if(myGamePiece.x < -myGamePiece.width)
			{
				myGamePiece.x = WIDTH;
			}
	
			if(myGamePiece.y > HEIGHT)
			{
				myGamePiece.y = 0;
			}
			else if(myGamePiece.y < -myGamePiece.height)
			{
				myGamePiece.y = HEIGHT;
			}
		}
		else if(game.gameMode === 1)
		{

			if(myGamePiece.x > WIDTH-myGamePiece.width)
			{
				myGamePiece.x = WIDTH-myGamePiece.width;
			}
			else if(myGamePiece.x < 0)
			{
				myGamePiece.x = 0;
			}
	
			if(myGamePiece.y > HEIGHT-myGamePiece.height)
			{
				myGamePiece.y = HEIGHT-myGamePiece.height;
			}
			else if(myGamePiece.y < 0)
			{
				myGamePiece.y = 0;
			
			}
		}
	}

	this.update = function(){
		this.boundCheck();			
		game.context.fillStyle = color;
		game.context.fillRect(this.x, this.y, this.width, this.height);
		
	}


}

function updatePosition()
{
	if(game.gameMode === 0)
	{
		if(game.keys && game.keys[LEFT]){myGamePiece.x-=myGamePiece.speed;}
		if(game.keys && game.keys[UP]){myGamePiece.y-=myGamePiece.speed;}
		if(game.keys && game.keys[RIGHT]){myGamePiece.x+=myGamePiece.speed;}
		if(game.keys && game.keys[DOWN]){myGamePiece.y+=myGamePiece.speed;}
	}
	else if(game.gameMode === 1)
	{

		myGamePiece.x = game.x;
		myGamePiece.y = game.y;	

	}
}

function updatePositionText()
{
	game.positionText.innerHTML = ("(" + myGamePiece.x + "," + myGamePiece.y + ")");
}

function updateGame()
{
	game.clear();
	updatePosition();
	myGamePiece.update();
	enemyPiece.update();
	updatePositionText();	
}

function keyMode()
{
	game.gameMode = 0;
	document.getElementById("instruct-icon").src = "arrow-keys.png";
	document.getElementById("instruct-text").innerHTML = "Use the arrow keys";
}

function mouseMode()
{
	game.gameMode = 1;
	document.getElementById("instruct-icon").src = "mouse-pointer-md.png";
	document.getElementById("instruct-icon").style.width = "150px";
	document.getElementById("instruct-icon").style.height = "150px";
	document.getElementById("instruct-text").innerHTML = "Use the Mouse";
}
