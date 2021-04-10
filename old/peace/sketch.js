var bubbles = [];
var x, y, a, b;



function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  a = 0;
  b = 0;
  background(0);

  frameRate(6000);
  document.getElementById("audio").volume = 0.800;
}

function draw() {
  // background(0);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
    if (!bubbles[i].islive()) {
      bubbles.splice(i, 1);
    }
  }
  a += 0.03;

 
  	x = 200 * cos(a) + width / 2;
  	y = 200 * sin(a) + height / 2;
	
  
  var w=0;
  while(w<2){
	  w++;
    b = random(TWO_PI);
    bubbles.push(new Bubble(x, y, cos(b) * 1.5, sin(b) * 1.5));
    
}

  
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 32) {
    if (document.getElementById("audio").paused === true) {
      document.getElementById("audio").play();
    } else {
      document.getElementById("audio").pause();
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
		  bubbles.splice(i, 1);
	  }
}

function Bubble(x, y, velx, vely) {

  this.x = x;
  this.velx = velx;
  this.y = y;
  this.vely = vely;

  this.timer = 200;

  this.move = function() {
    this.x += this.velx;
    this.y += this.vely;
  };

  this.display = function() {
    stroke(255);
    fill(map(this.timer, 0, 200, 20, 255), map(this.timer, 0, 200, 0, 70), map(this.timer, 0, 200, 120, 0));

    this.timer--;
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.timer -= 10;
    }
    if (dist(this.x, this.y, x, y) > 70) {
      this.timer -= 2;
    }
    strokeWeight(0);
    ellipse(this.x, this.y, map(this.timer, 0, 200, 2, 50), map(this.timer, 0, 200, 2, 50));
  };

  this.islive = function() {
	  
    if (this.timer < 0) {
      return false;
    } else {
      return true;
    }
  };
}