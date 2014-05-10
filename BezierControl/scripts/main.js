//Contains main method, etc.

//All instance fields
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var game = new Game(ctx, canvas.width, canvas.height);

var gameOverBox = document.getElementById('gameOverBox');


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
		update = window.setInterval("Update()", 250);
    	game.paused = false;
	}
    
}
/*function clearUpdate (over)
{
	window.clearInterval(update);
	if(over == true) {gameOver = true}
	paused = true;
}*/



//*************
//Update Method
//method called every xth of a second
//-------------

function Update () 
{
	//alert('Update function');
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    game.draw();
    
    //draw and update background
    
    //update points and such
    
    //draw and update player
    
    //draw player ui
    
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
		game.player.cp1x -= inc;
		//left = true;
		//unset pause if starting controls
		/*if(paused) {
			setUpdate();
		}*/
	}
	//move right
	else if(e.keyCode == 68 || e.keyCode == 39) {
		game.player.cp1y -= inc;
		//right = true;
	}
	//increase speed - forward
	else if(e.keyCode == 87 || e.keyCode == 38) {
		//forward = true;
	}
	//decrease speed - reverse
	else if(e.keyCode == 83 || e.keyCode == 40) {
		game.player.cp1x += inc;
		//reverse = true;
	}
	else if(e.keyCode == 70) {
		game.player.cp1y += inc;
	}
	else if(e.keyCode == 71) {
		game.player.cp2x -= inc;
	}
	else if(e.keyCode == 72) {
		game.player.cp2x += inc;
	}
	else if(e.keyCode == 74) {
		game.player.cp2y -= inc;
	}
	else if(e.keyCode == 75) {
		game.player.cp2y += inc;
	}
	else if(e.keyCode == 90) {
		game.player.epx -= inc;
	}
	else if(e.keyCode == 88) {
		game.player.epx += inc;
	}
	else if(e.keyCode == 67) {
		game.player.epy -= inc;
	}
	else if(e.keyCode == 86) {
		game.player.epy += inc;
	}
	else if(e.keyCode == 66) {
		game.player.cp2o -= inc/2.5;
	}
	else if(e.keyCode == 78) {
		game.player.cp2o += inc/2.5;
	}
	else if(e.keyCode == 77) {
		game.player.cp1o -= inc/2.5;
	}
	else if(e.keyCode == 188) {
		game.player.cp1o += inc/2.5;
	}
}
//unset control booleans
window.onkeyup = function(e)
{
	if(e.keyCode == 65 || e.keyCode == 37) {
		//left = false;
	}
	else if(e.keyCode == 68 || e.keyCode == 39) {
		//right = false;
	}
	else if(e.keyCode == 87 || e.keyCode == 38) {
		//forward = false;
	}
	//decrease speed - reverse
	else if(e.keyCode == 83 || e.keyCode == 40) {
		//reverse = false;
	}
	//pause system
	if(e.keyCode == 27) {
		alert(game.player.cp1x + "," + game.player.cp1y + "," + game.player.cp2x + "," + game.player.cp2y + "," + game.player.epx + "," + game.player.epy + "," + game.player.cp2o);
		/*if(paused == false) {
			clearUpdate();
		}
		else {
			setUpdate();
		}*/
	}
}







//check if working
alert('main.js');