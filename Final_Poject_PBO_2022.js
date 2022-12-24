var platforms = [];
var player;
var widthGame;
var score = 0;
var life = 3;

class Map {
    constructor(posX) {
      this.rw = random(20, 70);
      this.rh = random(30, 270);
        this.rx = posX;
      this.ry = height - this.rh;  
      this.colour = color('blue');
    }
  
      show (){
        fill(this.colour);
        noStroke();
        rect(this.rx, this.ry , this.rw, this.rh);
      }
  }


class Entity {

	constructor() {
		this.location = createVector(width/2, 0);
		this.velocity = createVector(0, 0);
		this.acceleration  = createVector(0, 0.2);
		this.colour = color(0);
		this.radius = 26;
		this.side=0;
		this.speedX=7;
		this.minSpeed=0;
	}

	
	show() {
		noStroke();
		fill(this.colour);
		ellipse(this.location.x, this.location.y, this.radius * 2, this.radius * 2);
		textSize(20);

		if(this.velocity.y < this.minSpeed){
			this.minSpeed=this.velocity.y;
		}
	}

	applyVelocityGravity() {
		this.velocity.add(this.acceleration); 
		this.location.add(this.velocity); 
	}

	
	bounceEdges(){

		if (this.location.y > height - this.radius) {
			this.velocity.x = 0;
			this.velocity.y = 0;
			this.location.y = 0;
		}
		if (this.location.y < this.radius-100) {
			this.velocity.y = this.velocity.y * (-2);
			this.location.y = this.radius;
		}
	}

	collisionCircleRect(rx, ry, rw, rh) {

		let testX = this.location.x;
		let testY = this.location.y;

			
		if (this.location.x < rx){
				testX = rx;
				this.side=12;
		}
		else if (this.location.x > rx+rw) { 
				testX = rx+rw; 
				this.side=6;
		}
		if (this.location.y < ry)  { 
				testY = ry; 
				this.side=3;
		}
		else if (this.location.y > ry+rh) { 
					testY = ry+rh; 
					this.side=9;
		}

		if(this.location.x<rx && this.location.y<ry){
			if(ry-this.location.y<rx-this.location.x){
				this.side=1;
				testX = rx;
			}else {
				this.side=2;
				testY = ry;
			}
		}
		if(this.location.x>rx+rw && this.location.y<ry){
			if(this.location.y-ry<(rx+rw)-this.location.x){
					this.side=4;
					testY = ry;
				}else {
					this.side=5;
					testX = rx+rw;
			}
		}
		if(this.location.x>rx+rw && this.location.y>ry+rh){
			if(this.location.y-(ry+rh)<this.location.x-(rx+rw) ){
				this.side=7;
				testX = rx+rw;
			}else {
				this.side=8;
				testY = ry+rh;
			}
		}
		if(this.location.x<rx && this.location.y>ry+rh){
			if( this.location.y-(ry+rh)<rx-this.location.x){
				this.side=13;
				testX = rx;
			}else {
				this.side=10;
				testY = ry+rh;
			}
		}

		let distX = this.location.x - testX;
		let distY = this.location.y - testY;
		let distance = sqrt((distX * distX) + (distY * distY));

		if (distance <= this.radius) {
			if( this.side == 1){
				this.velocity.x = this.velocity.y *-1;
				this.location.x = rx - this.radius;
			}
			if( this.side == 2){
				this.velocity.x = this.velocity.y *-1;
				this.location.x = rx - this.radius; 
			}
			if( this.side == 3){
				this.minSpeed=0;
				if(this.velocity.y>10){
					this.velocity.y=10;
				}
				this.velocity.y = this.velocity.y * (-1.05);
				this.location.y = ry - this.radius;
				this.velocity.x = 0;
			}
			if(this.side == 4){
				this.velocity.x = this.velocity.y *1;
				this.location.x = rx+rw + this.radius;
			}
			if(this.side == 5){
				this.velocity.x = this.velocity.y  *1;
				this.location.x = rx+rw + this.radius;
			}
			if(this.side == 6){
				this.velocity.x = this.velocity.x * (-1);
				this.location.x = rx+rw + this.radius;
			}
			if(this.side == 7){
				this.velocity.y = this.velocity.x * (-1);
				this.location.x = rx+rw + this.radius;
			}
			if(this.side == 8){
				this.velocity.x = this.velocity.y * (-1);
				this.location.y = ry +rh +this.radius;
			}
			if(this.side == 9 ){
				this.velocity.y = this.velocity.y * (-1);
				this.location.y = ry +rh +this.radius;
			}
			if(this.side == 10){
				this.velocity.x = this.velocity.y;
				this.location.y = ry +rh +this.radius;
			}
			if(this.side == 11){
				this.velocity.y =	this.velocity.x ;
				this.location.x = rx - this.radius; 
			}
			if( this.side == 12){
				this.velocity.x = this.velocity.x * (-1);
				this.location.x = rx - this.radius;
			}
			
			return true;
		}
		return false;
	}

	moveLeft(){
    this.location.x = constrain(this.location.x-this.speedX, this.radius, widthGame-this.radius);
  }

  moveRight(){
    this.location.x = constrain(this.location.x+this.speedX, this.radius, widthGame-this.radius);
  }

	moveUp() {
		if(this.velocity.y<0){
			this.velocity.y=this.velocity.y-0.6;
			if(this.velocity.y<-9){
				this.velocity.y=-9;
			}
		}
	}
}

class Level{
    constructor(currentLevel, latestLevel, maxLevel){
      this.currentLevel = currentLevel
      this.latestLevel = latestLevel
      this.maxLevel = maxLevel
    }
    setLevel(currentLevel){
       if (this.currentLevel<this.latestLevel){
        this.currentLevel++
      }else if (this.currentLevel>this.latestLevel){
        this.currentLevel = this.latestLevel
      }
    }
    
    getCurrentLevel(){
      return this.currentLevel
    }
  }

class Monster extends Entity{
    constructor() {
		this.location = createVector(width/2, 0);

		this.radius = 26;
	}
    
    show() {
		noStroke();
		fill('YELLOW');
		ellipse(this.location.x, this.location.y, this.radius * 2, this.radius * 2);
		textSize(20);
	}
}

class Hero extends Entity{
    constructor(x,y,score){
    super(x,y)
    this.pos = createVector(x, y);
    this.r = 24;
    this.speed = 3;
    this.score = score;
    }
    
    jalan(){
      return this.move()
    }
  
    increaseScore(){
      return this.score++
    }
  }

function gameOver(){
    noStroke();
    fill(0, 128);
    rect(-1000, 0, width*3, height);
    textAlign(CENTER, CENTER);
    textSize(55);
    fill('RED');
    text("GAME OVER", player.location.x,300);
    textSize(40);
    fill('RED');
    text("TRY AGAIN!",player.location.x,355);
    textSize(20);
    fill('Orange');
    text("Your Score Is:",player.location.x,400);
    text(score,player.location.x,450);
    noLoop();
  }

function edgeLines(){
	stroke('#E85243');
	strokeWeight(80);
	line(-39,0,-39,height);
	line(widthGame+39,0,widthGame+39,height);
	noStroke();
}

function playerMovementInput(){
	if (keyIsDown(LEFT_ARROW))  {
    	player.moveLeft();
    	score++;
 	}
  	if (keyIsDown(RIGHT_ARROW)) {
    	player.moveRight();
    	score++;
  	}
	if (keyIsDown(UP_ARROW)) {
    	player.moveUp();
  	}
}

function data(){
  textAlign(CENTER, CENTER);
  fill('green');
  text("Score : " +score,player.location.x,50);
  fill('red');
  text("Nyawa : " +life,player.location.x,70);

  textAlign(RIGHT, RIGHT);
  fill('blue');
  text("Untuk mendapatkan poin" ,player.location.x-500,50);
  text("Gunakan tombol kanan" ,player.location.x-500,70);
  text("Gunakan tombol kiri" ,player.location.x-500,90);
}


function setup() {
    createCanvas(1500, 700);
  
    player = new Entity();
    let countDistanceX = 0;
    for (let i=0;i<14;i++) {
        let platformTemp = new Map(countDistanceX);
        platforms.push(platformTemp);
        
        countDistanceX = countDistanceX + platformTemp.rw + 130;
    }
    widthGame = countDistanceX-130;
}
  
function draw() {
    background('#F4EDDD');
  
    translate(-player.location.x + width / 2, 0);
    
    data();
    
    player.show();
    player.applyVelocityGravity();
    player.bounceEdges()
    playerMovementInput();
  
    for(let i=0;i<platforms.length;i++){
        platforms[i].show();
        player.collisionCircleRect(platforms[i].rx, platforms[i].ry, platforms[i].rw, platforms[i].rh);
    }
    edgeLines();
    
    if (player.location.y == 0){
        life--;
        if(life < 0){
            gameOver();
        }
    }
    
}
