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
