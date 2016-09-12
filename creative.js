

var myGamePiece;


var game = {

	start : function(){
		alert("First alert game.start()");
		this.canvas = document.getElementById("game-screen");
		this.context = this.canvas.getContext("2d");
		
		alert("game.start()");
		
	}
}

function startGame(){
	
	alert("startGame()");
	game.start()
	alert("second alert startGame()");
	myGamePiece = new gamePeice(30, 30, "red", 50, 50);

}

function gamePeice(width, height, color, x, y)
{

	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	game.context.fillStyle = color;
	game.context.fillRect(this.x, this.y, this.width, this.height);

}

