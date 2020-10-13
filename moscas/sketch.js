var x;
var y;


var img;
function preload() {
  img = loadImage("mosca.png");
}


function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(100);
   
}

function draw() {
		 x +=random(-1,1)*20;
		 y +=random(-1,1)*20;
		 tint(255, 50); 
		image(img, x, y);
	    
    
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(100);
}