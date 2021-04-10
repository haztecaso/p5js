var x;
var y;
var a;
var b;
var radius;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(2);
  x=width/2;
  y=height/2;
  frameRate(100);
  noCursor();
   
}

function draw() {
	for (var i=0; i<100; i++) {
    	strokeWeight(0);
    	fill(255, random(10));
    	radius=random(5,70);
		x+=(random(2)-1)*30;
		y+=(random(2)-1)*30;
		ellipse(x, y,radius,radius);
		stroke(random(230,255), random(100));
		strokeWeight(int(random(1,3)));
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