function Game(ctx,width,height) 
{
	this.ctx = ctx;
	this.width = width;
	this.height = height;
	this.paused = true;
	this.gameOver = false;
	this.score = 0;
	this.player = new Player(200,200);
	this.count = 0;
}
Game.prototype.draw = function()
{
	if(this.count%2 == 0) {
		this.player.color = "#07d";
	}else {	
		this.player.color = "#fff";
	}
	this.player.draw(this.ctx,this.width,this.height);
}

function Player(sx,sy)
{
	this.size = 50;
	this.color = "#fff";
	this.x = sx;
	this.y = sy;
	this.cp1x = 220;
	this.cp1y = 195;
	this.cp2x = 230;
	this.cp2y = 180;
	this.epx = 200;
	this.epy = 130;
	this.cp2o =-18;
	this.cp1o = 0;
	
}

Player.prototype.draw = function(ctx,width,height)
{
	ctx.fillStyle = this.color;
	ctx.fillRect(width/2-(this.size/2),height/2-(this.size/2),this.size,this.size);
	
	//bezier(cp1x,cp1y,cp2x,cp2y,epx,epy) -> cp = control point & ep = end point
	
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.bezierCurveTo(this.cp1x+this.cp1o, this.cp1y, this.cp2x+this.cp2o, this.cp2y, this.epx, this.epy);
	ctx.bezierCurveTo(this.cp2x-(this.size+this.cp2o), this.cp2y,this.cp1x-(this.size+this.cp1o), this.cp1y, this.x, this.y);
	ctx.closePath();
	
	// line color
	ctx.strokeStyle = 'white';
	ctx.fillStyle = "#0bf";
	ctx.lineWidth = 3;
	
	ctx.stroke();
	ctx.fill();
}


//check if working
alert('classes.js');
