function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);
  x=width/2;
  y=height/2;
  frameRate(1);
  draw()
   
}

function draw() {
	for (var i=0; i<1000; i++) {
		strokeWeight(1);
    	stroke(255);

		 x = random(width);
		 y = random(height);
		point(x,y);
		strokeWeight(5);
		stroke(0);
		point(x+(random(-1,1)*10),y+(random(-1,1)*10));
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(1);

  frameRate(1);
}