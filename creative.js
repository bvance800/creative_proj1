

var myGamePiece;
var WIDTH = 400;
var HEIGHT = 400;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

var game = {	
	
	keys : [],

	canvas : document.createElement("canvas"),

	start : function(){
		//alert("start()");
		this.canvas.width = WIDTH;
		this.canvas.height = HEIGHT;
		this.canvas.id = "game-screen";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[2]);		
		this.interval = setInterval(updateGame, 20);
		
		window.addEventListener('keydown', function(e) {
			//game.keys = (game.keys || []);		
			game.keys[e.keyCode] = true;
		})

		window.addEventListener('keyup', function(e) {
			game.keys[e.keyCode] = false;
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
		if(myGamePiece.x > WIDTH)
		{
			myGamePiece.x = 0;
		}
		else if(myGamePiece.x < -myGamePiece.width)
		{
			myGamePiece.x = WIDTH;
		}

		if(myGamePiece.y > WIDTH)
		{
			myGamePiece.y = 0;
		}
		else if(myGamePiece.y < -myGamePiece.height)
		{
			myGamePiece.y = HEIGHT;
		}
	}

	this.update = function(){
		this.boundCheck();			
		game.context.fillStyle = color;
		game.context.fillRect(this.x, this.y, this.width, this.height);
		alert("update()");
	}


}

function keysPressed()
{

	if(game.keys === undefined)
	{
		alert("undefined");
	}
	
	if(game.keys && game.keys[LEFT]){myGamePiece.x-=myGamePiece.speed;}
	if(game.keys && game.keys[UP]){myGamePiece.y-=myGamePiece.speed;}
	if(game.keys && game.keys[RIGHT]){myGamePiece.x+=myGamePiece.speed;}
	if(game.keys && game.keys[DOWN]){myGamePiece.y+=myGamePiece.speed;}
}

function updateGame()
{
	game.clear();
	keysPressed();
	myGamePiece.update();
	
}
