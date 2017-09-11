var x;
var y;
var a;
var b;
var angle=0;
var radius=0;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(10000);
   
}

function draw() {
	//x=width/2;
	//y=height/2;
	for (var i=0; i<500; i++) {
    	stroke(255);
    	angle+=0.001;
    	radius+=0.01;
		 x = width/2+cos(angle)*radius;
		 y = height/2+sin(angle)*radius;
		//point(x, y)
		//stroke(random(255),random(255),random(255));
		point(x+random(-1,1)*50, y+random(-1,1)*1);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(100);
  angle=0;
  radius=0;
}