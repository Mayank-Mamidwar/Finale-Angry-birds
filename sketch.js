/* class 24-34 angrybirds
 developer: Mayank 
 topics: PhysicsEngine,Inheritence,JSON,API,functions,Arrays,Push() and pop()
*/

//Declare variables for game objects and behaviour indicators(FLAGS)
//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var userEngine, userWorld;


var bird;
var pig1, pig2;
var ground, platform;
var log1, log2, log3, log4;
var box1, box2, box3, box4, box5;
var slingshot;

var backgroundImg, bg;
var score;

var timesPlayed;
var gameState;

function preload() {
    //function call to set background image based on time
    setBackgroundImg();
}

function setup() {
    var canvas = createCanvas(1200, 400);

    userEngine = Engine.create();
    userWorld = userEngine.world;


    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);
    bird = new Bird(200, 50);

    //creation of layer 1 using matter.js
    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    
    //creation of layer 2 using matter.js
    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig2 = new Pig(810, 220);
    log2 = new Log(810, 180, 300, PI / 2);

    
    //creation of layer 3 using matter.js
    box5 = new Box(810, 160, 70, 70);
    log3 = new Log(760, 120, 150, PI / 7);
    log4 = new Log(870, 120, 150, -PI / 7);


    //creation of catupalt with sling body of bird will be attached to the sling
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 });

    score = 0;
    timesPlayed = 0;
}

function draw() {
    if (backgroundImg)
        background(backgroundImg);

    Engine.update(userEngine);

    ground.display();
    platform.display();

    bird.display();

    //display  of 1st layer using matter.js
    box1.display();
    box2.display();
    pig1.display();
    log1.display();

    box1.score();
    box2.score();
    pig1.score();
    log1.score();

    //display of 2nd layer using matter.js
    box3.display();
    box4.display();
    pig2.display();
    log2.display();

    box3.score();
    box4.score();
    pig2.score();
    log2.score();

    //display of 3rd layer using matter.js
    log3.display();
    log4.display();
    box5.display();
    
    box5.score();
    log3.score();
    log4.score();

    //display of catapult with sling. Body of bird will be attached to the sling.
    slingshot.display();

    //function call to display smoke Image as cool effect for bird blowing through canvas
    displayrunnerPoofs();

    //display score
    noStroke();
    textSize(50);
    fill("white");
    text("Score: " + score, width - 300, 50);

//    console.log(timesPlayed);
}


//function triggered when a mouse is clicked and dragged
function mouseDragged() {
    if (slingshot.sling.bodyA == bird.body) {
        Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
    }
}

//function triggered when a clicked mouse is released
function mouseReleased() {
    //function call to detach(release) a body from constraint (this.sling.bodyA)
    slingshot.fly();
}

//function triggered when a key on keyboard is pressed
function keyPressed() {
    if (keyCode == 32 && timesPlayed < 4) {
        //function call to attach a body to constraint (this.sling.bodyA)
        slingshot.attach(bird.body);
        timesPlayed += 1;
    }
}

//function definition to display smoke Image as cool effect for bird blowing through canvas
function displayrunnerPoofs() {
    if (bird.body.velocity.x > 8 && bird.body.position.x > 220 && slingshot.sling.bodyA == null) {
        var position = [bird.body.position.x, bird.body.position.y];
        bird.trajectory.push(position);
    }
    for (var i = 0; i < bird.trajectory.length; i++) {
        image(bird.smokeImage, bird.trajectory[i][0], bird.trajectory[i][1]);
    }
}

//function definition to set background image based on time
async function setBackgroundImg() {
    var response = await fetch("https://worldclockapi.com/api/json/est/now");

    //Takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON , 
    //which is a JavaScript value of datatype object, string;
    var responseJSON = await response.json();

    var datetime = responseJSON.currentDateTime;
    var hour = datetime.slice(11, 13);


    if (hour >= 06 && hour <= 19) {
        bg = "sprites/day.png";
    }
    else {
        bg = "sprites/night1.jpeg";
    }

    backgroundImg = loadImage(bg);
}