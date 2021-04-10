

var s = 5;
var diam = 40;
var velx = 20,vely=20;
var a = 0;
var time = 0;
var posX, posY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(50);
  noStroke();

  a = random(TWO_PI);
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  //background(0);
  var g = random(50, 100);
  posX += cos(a) * vel;
  posY += sin(a) * vel;

  if (time < 0) {
    time = random(20,30);
    a = 1;
    velx=random(-20,20);
    velx=random(-20,20);
  }
  
  if (posX > width || posX <0) {
	  velx*=-1;
	  
  }
  if (posY > height || posY <0) {
	  vely*=-1; 
  }
 
  time--;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  redraw();
}



























var x;
var y;
var a;
var angle=1;
var radius=100;

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
background(0);
    	stroke(255);
    	angle+=0.05;
    	radius=200;
    	a+=random(-1,1)*3;
		 x = width/2+cos(angle)*(random(1,1.01)*radius+random(-3,3));
		 y = height/2+sin(angle)*(random(1,1.01)*radius+random(-3,3));
		image(img, x, y);
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