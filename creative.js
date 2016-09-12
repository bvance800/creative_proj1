

var myGamePiece;
var WIDTH = 400;
var HEIGHT = 400;

var game = {	

	canvas : document.createElement("canvas"),

	start : function(){
		//alert("start()");
		this.canvas.width = WIDTH;
		this.canvas.height = HEIGHT;
		this.canvas.id = "game-screen";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[2]);		
		this.interval = setInterval(updateGame, 20);
	},
	
	clear : function(){
	
		this.context.clearRect(0,0,WIDTH, HEIGHT);		

	}
	
}

function startGame(){
	
	//alert("startGame()");
	game.start();
	//alert("second alert startGame()");
	myGamePiece = new gamePiece(30, 30, "red", 50, 50);

}

function gamePiece(width, height, color, x, y)
{

	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;

	this.update = function(){
				
		game.context.fillStyle = color;
		game.context.fillRect(this.x, this.y, this.width, this.height);


	}
}

function updateGame()
{
	game.clear();
	myGamePiece.x += 1;
	myGamePiece.update();
	
}
