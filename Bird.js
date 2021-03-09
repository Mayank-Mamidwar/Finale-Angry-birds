class Bird extends BaseClass {
  constructor(x, y) {
    super(x, y, 50, 50);
    this.image = loadImage("sprites/bird.png");
    this.smokeImage = loadImage("sprites/smoke.png");

    this.trajectory = []; //empty array

    //var array = ["oil", 123, "cheese", "medicine", "covid mask"];
    //console.log(array);
  }

  display() {
    // this.body.position.x = mouseX;
    // this.body.position.y = mouseY;
    super.display();
    //console.log(this.body.velocity.x);


    
    //if (bird.body.velocity.x > 8 && bird.body.position.x > 220 && slingshot.sling.bodyA == null)
  /*  if (this.body.velocity.x > 8 && this.body.position.x > 220) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
    } */
  }
}
