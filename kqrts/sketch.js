var s = 5;
var diam = 40;
var vel = 20;
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
  for (var x = 0; x < width; x += s) {

    for (var y = 0; y < height; y += s) {
      //fill(map(x,0,width,0,255), map(y,0,width,0,255), map((x+y)/2,0,width,255,0));
      //rect(x,y,s,s);

      var di = dist(x, y, posX, posY);
      if (di < diam) {

        if (random(2) > 0.01) {
          fill(map(di, 0, diam, 255, g), map(di, 0, diam, 255, g), map(di, 0, diam, 255, g),100);
        } else {
          fill(map(di, 0, diam, 255, g), map(di, 0, diam, 255, g), map(di, 0, diam, 255, g),255);
        }
        rect(x, y, s, s);
      }
    }
  }
  posX += cos(a) * vel;
  posY += sin(a) * vel;
  if (time < 0) {
    time = random(50);
    a = random(TWO_PI);
  }
  if (posX > width || posX <0 || posY > height || posY < 0) {
	  
    a = random(TWO_PI);
    time=1;
    
  }
 
  time--;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  redraw();
}