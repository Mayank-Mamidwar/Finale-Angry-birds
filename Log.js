class Log extends BaseClass{
  constructor(x,y,height,angle){
    super(x,y,20,height,angle);
    this.image = loadImage("sprites/wood2.png");
    Matter.Body.setAngle(this.body, angle);
    this.visibility = 225;
  }

  display() {
    // console.log(this.body.speed);
 
     if (this.body.speed < 5) {
       super.display();
     }
     else {
 
       World.remove(userWorld, this.body);
       push();
       this.visibility = this.visibility - 5;
       tint(255, this.visibility);
       image(this.image, this.body.position.x, this.body.position.y, 50, 50);
       pop();
 
     }
   }
 
   score(){
     if(this.visibility < 0 && this.visibility > -1005 ){
       score++;
     }
   }
 
}