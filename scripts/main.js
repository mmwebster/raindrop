//Contains main method, etc.

//All instance fields
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var game = new Game(ctx, canvas.width, canvas.height);
var raindrop = new Raindrop(150,150,10);
game.objects[0] = raindrop;

var gameOverBox = document.getElementById('gameOverBox');
var update;


window.onload = function () 
{
    //at end of start method, begin the update loop
    setUpdate();
    
}


//************
//loop to call update method
//-------------

function setUpdate () 
{
	if(!game.gameOver) {
		update = setInterval("Update()", 10);
    	game.paused = false;
	}
    
}
function clearUpdate ()
{
	clearInterval(update);
	alert('Game Over: You reached a score of ' + game.score);
}



//*************
//Update Method
//method called every xth of a second
//-------------

function Update () 
{
	//alert('Update function');
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //update game logic
    game.update();
    
    game.generate();
    
    game.draw();
    
    //draw and update background
    
    //update points and such
    
    //draw and update player
    
    //draw player ui
    
    //Check game over
    if(game.gameOver == true) {
    	clearUpdate();
    }
    
    //update game time count
    game.count += 1;
}



//************
//Key detection functions
//set control booleans on detection
window.onkeydown = function(e)
{
	var inc = 5;
	//alert(e.keyCode);
	//move left
	if(e.keyCode == 65 || e.keyCode == 37) {
		game.player.left = true;
	}
	//move right
	else if(e.keyCode == 68 || e.keyCode == 39) {
		game.player.right = true;
	}
	//increase speed - forward
	else if(e.keyCode == 87 || e.keyCode == 38) {
		//forward = true;
	}
	//decrease speed - reverse
	else if(e.keyCode == 83 || e.keyCode == 40) {
		//reverse = true;
	}
}
//unset control booleans
window.onkeyup = function(e)
{
	if(e.keyCode == 65 || e.keyCode == 37) {
		game.player.left = false;
		game.player.currentSwing = game.player.leftX;
		game.player.currentDir = "left";
		game.player.leftX = 0;
	}
	else if(e.keyCode == 68 || e.keyCode == 39) {
		game.player.right = false;
		game.player.currentSwing = game.player.rightX;
		game.player.currentDir = "right";
		game.player.rightX = 0;
	}
	else if(e.keyCode == 87 || e.keyCode == 38) {
		//forward = false;
	}
	//decrease speed - reverse
	else if(e.keyCode == 83 || e.keyCode == 40) {
		//reverse = false;
	}else if(e.keyCode == 80) {
		if(game.powerups > 0) {
			game.powerUp();
		}
	}
	//pause system
	if(e.keyCode == 27) {
		//alert("offX = " + game.player.offX + ", offY = " + game.player.offY + ", cp1x = " + game.player.cp1x + ", cp1y = " + game.player.cp1y + ", cp2x = " + game.player.cp2x + ", cp2y = " + game.player.cp2y + ", epx = " + game.player.epx + ", epy = " + game.player.epy + ", cp2o = " + game.player.cp2o + ", cp1o = " + game.player.cp1o);
		if(game.paused == false) {
			game.paused = true;
		}else {
			game.paused = false;
		}
			
	}
}







//check if working
alert('Use the WASD keys to control the rain drop. Press P to use a power up');