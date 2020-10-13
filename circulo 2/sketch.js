var x;
var y;
var a;
var b;
var angle=1;
var radius=0;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(1000);
   
}

function draw() {
	//x=width/2;
	//y=height/2;
	for (var i=0; i<1000; i++) {
    	stroke(255);
    	angle*=1.0001;
    	radius+=0.001;
		 x = width/2+cos(angle)*radius;
		 y = height/2+sin(angle)*radius;
		point(x, y);
		//point(x+(random(2)-1)*10, y+(random(2)-1)*10);
		if (x>width) {
			x=width;
    	}
		if (x<0) {
			x=0;
    	}
		if (y>height) {
			y=height;
    	}
		if (y<0) {
			y=0;
    	}
    
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
  angle=1;
  radius=0;
}