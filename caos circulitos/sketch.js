var x,y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(10000);
  noCursor();
  x=width*100;
  y=height*100;
  background(0);
}

function draw() {
	x=mouseX;
	y=mouseY;
	if(x!=0 && y!=0){
		ellipse(x, y, 50, 50);
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}