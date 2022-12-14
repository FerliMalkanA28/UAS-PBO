let p;
function setup() {
  createCanvas(500, 500);
  p = new Entity(10,20,250,250,color(0,100,150));
  p.show();
}

function draw() {
  if (keyIsPressed === true) {
    p.attack();
    p.moveRight();
    p.moveLeft();
    p.moveDown();
    p.moveUp();
  }
}

// class Map{
//   constructor(width, heigth){
//     this._heigth=heigth;
//     this._width=width;
//   }
//   // Edit lagi Walid
  
// }

class Entity{ 
  constructor(heigth, width, x, y){
    this._heigth=heigth;
    this._width=width;
    this._x=x;
    this._y=y;
//     this._map=new Map;
  }
  
  show(){
    background(100);
    noStroke()
    circle(this._x, this._y, this._width, this._heigth);
  }
  
  attack(){
    if (keyCode === 32){
      // "ATTACK!!!"
    }
  }
  
  moveRight(){
    if (keyCode === 68){
      if (this._x>500)
        this._x=0;
      else
        this._x+=1;
    }
  }
  
  moveLeft(){
    if (keyCode === 65){
      if (this._x<0)
        this._x=500;
      else
        this._x-=1;
    }
  }
  
  moveDown(){
    if (keyCode === 83){
      if (this._y>500)
        this._y=0;
      else
        this._y+=1;
    }
  }
  
  moveUp(){
    if (keyCode === 87){
      if (this._y<0)
        this._y=500;
      else
        this._y-=1;
    }
  }  
}

class Monster extends Entity{
    constructor(life, color, effect, type){
        super();
        this.life = life;
        this.color = color;
        this.effect = effect;
        this.type = type;
    }

    moveRandom(){

    }

    saveScore(){

    }
}



class Hero extends Entity{
    constructor(life, score){
        super();
        this.life = life;
        this.score = score;
    }

    increaseScore(){

    }

    calculateLife(){

    }

    saveScore(){

    }
}
