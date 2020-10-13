var x;
var y;
var a;
var b;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(2);
  x=width/2;
  y=height/2;
  frameRate(1000);
  noCursor();
   
}

function draw() {
	for (var i=0; i<100; i++) {
    	stroke(255, random(50));
		x+=(random(2)-1)*5;
		y+=(random(2)-1)*5;
		point(x, y);
		point(x+(random(2)-1)*30, y+(random(2)-1)*30);
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
  strokeWeight(2);
  x=width/2;
  y=height/2;
  frameRate(100);
}