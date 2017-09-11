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
  noCursor();
   
}

function draw() {
	//x=width/2;
	//y=height/2;
	for (var i=0; i<100; i++) {
		strokeWeight(1);
    	stroke(255,random(255));
    	angle=random(6.285);
    	radius=random(100);
		 x = mouseX+cos(angle)*radius;
		 y = mouseY+sin(angle)*radius;
		point(x, y);
		stroke(0);
		strokeWeight(5);
		point(x+(random(2)-1)*10, y+(random(2)-1)*10);
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
  angle=0;
  radius=0;
}