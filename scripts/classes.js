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
	this.objects = new Array();
	this.bgSpeed = .8;
	this.drops = 15;
	this.switchbacks = 15;
	this.powerups = 2;
	
}
function exp(x) {
	return Math.pow(2, (.5*x))-1;
}
Game.prototype.powerUp = function() {
	for(i=0;i<this.objects.length;i++) {
		//check val against player
		//first check y
		if(this.objects[i].y > 0 && this.objects[i].y < this.height) {
			this.score += this.objects[i].r;
			this.player.epy -= this.objects[i].r/1.5;//5
			this.player.cp1o += .75;//.75
			this.objects.splice(i,1);
		}
	}
	this.powerups -= 1;
}
Game.prototype.draw = function()
{
	//draw other objects first
	for(i=0;i<this.objects.length;i++) {
		this.objects[i].draw();
	}
	
	//now draw the main raindrop
	if(this.count%2 == 0) {
		this.player.color = "#07d";
	}else {	
		this.player.color = "#fff";
	}
	this.player.draw(this.ctx,this.width,this.height);
	this.player.cycleF();
	
	//Draw dying red
	//start with 130, end with 182
	opacity = 1 * (1/(185-this.player.epy));
	//alert(opacity);
	ctx.fillStyle = "rgba(250,0,0," + opacity + ")";
	ctx.fillRect(0,0,this.width,this.height);
	
	
	//draw score
	//right padding
	rp = (this.score.toString().length - 1)*16.5;
	if(rp > 0) {
		//alert("rp is " + rp);
	}
	ctx.font="30px Arial";
	ctx.fillStyle = "#aaf";
	ctx.fillText(this.score,this.width-30-rp,40);
	ctx.font="20px Arial";
	ctx.fillText(("Switch Backs: " + this.switchbacks), 15,60);
	ctx.fillText("High Score: 716", 15,30);
	ctx.fillText(("Power Ups: " + this.powerups), 15,90);
	ctx.fillStyle="#f00";
	ctx.fillText("HP:",300,30);
	ctx.fillStyle = "rgba(180,180,250,.9)";
	length = (182-this.player.epy)*2;
	ctx.fillRect(340,10,length,30);
	
}
Game.prototype.update = function()
{
	//check whether game is paused
	if(this.paused == false) {
		this.player.bgY += 1;
		if(this.player.epy >= 182) {
			this.gameOver = true;
			//alert("Set game over");
		}
		if(this.player.currentDir == "left") {
			this.player.offX -= exp(this.player.currentSwing);
			//if moving left and pressing right, decrement swing
			if(this.player.right == true) {
				this.player.currentSwing -= .05;
			}
			if(this.player.currentSwing <= 0) {
				this.player.currentDir = "blank";
			}
		}else if(this.player.currentDir == "right") {
			this.player.offX += exp(this.player.currentSwing);
			//if moving right and pressing left, decrement swing
			if(this.player.left == true) {
				this.player.currentSwing -= .05;
			}
			if(this.player.currentSwing <= 0) {
				this.player.currentDir = "blank";
			}
		}
		//check for control input
		if(this.player.left == true) {
			this.player.offX -= exp(this.player.leftX);
			//this.player.offX -= 1;
			//if(this.player.leftX < 5) {
				this.player.leftX += .05;
			//}
		}
		else if(this.player.right == true) {
			this.player.offX += exp(this.player.rightX);
			//this.player.offX += 1; 
			//if(this.player.rightX < 5) {
				this.player.rightX += .05;
			//}
		}
		
		//CHECK player location outside of canvas and re-locate
		if((this.player.x+this.player.offX-20) > this.width) {
			if(this.switchbacks < 1) {
				this.gameOver = true;
			}
			this.player.offX = -this.player.x-20;
			this.switchbacks --;
		}else if((this.player.x+this.player.offX+20) < 0) {
			if(this.switchbacks < 1) {
				this.gameOver = true;
			}
			this.player.offX = this.width - this.player.x + 20;
			this.switchbacks --;
		}
		
		
		/*
		//Decrement raindrop vals & check positions
		*/
		//object loop
		for(i=0;i<this.objects.length;i++) {
			//decrement y
			this.objects[i].y -= this.bgSpeed;
			if(this.objects[i].y < -20) {
				this.objects.splice(i,1);
			}
			
			//check val against player
			drop = this.objects[i];
			pad = 10;
			//first check y
			if(drop.y < (this.player.y+this.player.offY+10) && drop.y > (this.player.y+this.player.offY-50)) {
				//next check x
				if(drop.x < (this.player.x+this.player.offX+pad) && drop.x > (this.player.x+this.player.offX-pad)) {
					//drop inside player's range
					//handle player score and attributes
					this.score += this.objects[i].r;
					this.player.epy -= this.objects[i].r/1.5;//5
					this.player.cp1o += .75;//.75
					
					this.objects.splice(i,1);
				}
			}
		}
		this.bgSpeed += .0005;

	}
}
Game.prototype.generate = function() {
	for(i = (this.objects.length);i<this.drops;i++) {
		randR = Math.floor(Math.random() * 10) + 3;
		randB = Math.floor(Math.random()*100);
		if(randB == 150) {
			randR += 30;
		}
		randX = Math.floor(Math.random()*(880-(randR*2)))+20;
		randY = Math.floor(Math.random()*(580-(randR*2)))+20;
		this.objects[i] = new Raindrop(randX,randY+500,randR);
		//alert("random raindrop -> r = " + randR + ", x = " + randX + ", y = " + randY);
	}
	for(i=0;i<this.objects.length;i++) {
		this.objects[i].cycleF();
	}
}

function Player(sx,sy)
{
	//Vals at dead
	//offX = 200, offY = 100, cp1x = 220, cp1y = 195, cp2x = 230, cp2y = 180, epx = 203.07999999999998, epy = 183.54408063999477, cp2o = -14.920000000000536, cp1o = -10.272475063997963
	this.size = 50;
	this.color = "#fff";
	this.x = sx;
	this.y = sy;
	this.bgY = 0;
	this.offX = 200;
	this.offY = 100;
	this.cp1x = 220;
	this.cp1y = 195;
	this.cp2x = 230;
	this.cp2y = 180;
	this.epx = 200;
	//normally 130
	this.epy = 130;
	this.cp2o =-18;
	this.cp1o = 0;
	this.left = false;
	this.right = false;
	this.leftX = 0;
	this.rightX = 0;
	this.currentSwing = 0;
	this.currentDir = "blank";
	this.cycle = .07;
	this.cycleInt = 1;
	this.dir = "up";
	this.cycleEnd = 5;
	this.dieP = .005;
}

Player.prototype.draw = function(ctx,width,height)
{
	ctx.fillStyle = this.color;
	//ctx.fillRect(width/2-(this.size/2),height/2-(this.size/2),this.size,this.size);
	
	//bezier(cp1x,cp1y,cp2x,cp2y,epx,epy) -> cp = control point & ep = end point
	
	ctx.beginPath();
	ctx.moveTo(this.x+this.offX, this.y+this.offY);
	ctx.bezierCurveTo(this.cp1x+this.cp1o+this.offX, this.cp1y+this.offY, this.cp2x+this.cp2o+this.offX, this.cp2y+this.offY, this.epx+this.offX, this.epy+this.offY);
	ctx.bezierCurveTo(this.cp2x-(this.size+this.cp2o)+this.offX, this.cp2y+this.offY,this.cp1x-(this.size+this.cp1o)+this.offX, this.cp1y+this.offY, this.x+this.offX, this.y+this.offY);
	ctx.closePath();
	
	// line color
	ctx.strokeStyle = 'white';
	ctx.fillStyle = "#0bf";
	ctx.lineWidth = 3;
	
	ctx.stroke();
	ctx.fill();
}

Player.prototype.cycleF = function()
{
	width = 5;
	height = 15;
	x = this.cycleInt;
	var x_last = this.cycleInt - this.cycle;
	if(this.dir == "down") {
		x_last += this.cycle*2;
	}
	var y;
	var y_last;
	//alert("x = " + x + ", x_last = " + x_last);
	if(this.dir == "up") {	
		this.cycleInt += this.cycle;
		y = Math.round((Math.sqrt((1-(Math.pow((x-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
		y_last = Math.round((Math.sqrt((1-(Math.pow((x_last-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
	}else {
		this.cycleInt -= this.cycle;
		y = Math.round((-Math.sqrt((1-(Math.pow((x-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
		y_last = Math.round((-Math.sqrt((1-(Math.pow((x_last-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
	}
	
	//find direction / quadrant for next iteration
	if(x >= (width-(.7+(this.cycle*2)))) {
		this.dir = "down";
	}else if(x <= (.7+(this.cycle*2))) {
		this.dir = "up";
	}
	
	//add this y and x val to the location
	this.epy = this.epy - y_last + (y*(1+this.dieP));
	this.epx = this.epx - x_last + x;
	//alert("x = " + x + ", x_last = " + x_last + ", y = " + y + ", y_last = " + y_last);
	
	//And change the other vals
	this.cp1o = this.cp1o - (y_last) + (y*(1-this.dieP/10));
	this.cp2o = this.cp2o - x_last + x;
}

//Raindrop class for other raindrop
function Raindrop(x,y,r) {
	//random num for instantiation
	rand = Math.random();
	this.r = r;
	this.x = x;
	this.y = y;
	this.currentSwing = 0;
	this.currentDir = "blank";
	this.cycle = .02+(rand/20);
	this.cycleInt = 1;
	this.dir = "up";
	this.cycleEnd = 5;
}

Raindrop.prototype.draw = function() {
	ctx.beginPath();
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	ctx.strokeStyle = "#fff";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.fillStyle = "#00ddff";
	ctx.fill();
	
	//decrease y val
	this.y -= .1;
}

Raindrop.prototype.cycleF = function() {
	width = 5;
	height = 15;
	x = this.cycleInt;
	var x_last = this.cycleInt - this.cycle;
	if(this.dir == "down") {
		x_last += this.cycle*2;
	}
	var y;
	var y_last;
	//alert("x = " + x + ", x_last = " + x_last);
	if(this.dir == "up") {	
		this.cycleInt += this.cycle;
		y = Math.round((Math.sqrt((1-(Math.pow((x-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
		y_last = Math.round((Math.sqrt((1-(Math.pow((x_last-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
	}else {
		this.cycleInt -= this.cycle;
		y = Math.round((-Math.sqrt((1-(Math.pow((x-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
		y_last = Math.round((-Math.sqrt((1-(Math.pow((x_last-(width/2)),2)/Math.pow((width/2),2)))*Math.pow((height/2),2)) + (height/2))*100000) /100000;
	}
	
	//find direction / quadrant for next iteration
	if(x >= (width-(.7+(this.cycle*2)))) {
		this.dir = "down";
	}else if(x <= (.7+(this.cycle*2))) {
		this.dir = "up";
	}
	
	//set vars now
	//this.r = this.r - y_last + y;
	this.x = this.x - x_last + x;
	this.y = this.y - y_last + y;
}







//check if working
//alert('classes.js');
