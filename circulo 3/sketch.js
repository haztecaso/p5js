var x;
var y;
var a;
var b;
var angle=0.01;
var radius=0;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(100000);
   
}

function draw() {
	//x=width/2;
	//y=height/2;
	for (var i=0; i<500; i++) {
    	angle+=noise(angle)*random(-10,10)/100;
    	radius+=0.001;
		 x = width/2+cos(angle)*radius;
		 y = height/2+sin(angle)*radius;
		point(x, y);
		//point(x+(random(2)-1)*2, y+(random(2)-1)*2);
    }
    if(x>1*width){
	    angle=0;
	    radius=0;
	    background(0);
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