var bubbles = [];
var x, y, a, t;
var time=0;
var tools;
var slider;
var text1 = "Press s to activate tools";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  background(0);
  slider = createSlider(100, 300, 200);
  slider.position(10, 10);
  slider.style('width', '100px');
  slider.hide();

}

function draw() {
  background(0);
  time+=0.01;
  let angle = TWO_PI*noise(time);

  x = width/2 + 200*cos(angle);
  y = height/2 + 200*sin(2*angle);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
    if (!bubbles[i].islive()) {
      bubbles.splice(i, 1);
    }
  }
 /* if (text1 !== "") {
    fill(30);
    textSize(15);
    textFont("Helvetica");
    text(text1, (width / 2) - (textWidth(text1) / 2), height / 2);
  }*/
  if (tools) {
    a = random(TWO_PI);
    bubbles.push(new Bubble(map(x, 0, width, width / 4, (3 * width) / 4), map(y, 0, height, height / 4, (3 * height) / 4), cos(a) * 1.5, sin(a) * 1.5));
    fill(255, 255, 0);
    textSize(40);
    textFont("Helvetica");
    text(bubbles.length, 5, height - 10);
    slider.show();
   
    rect(0, 0, 125, 40);
    cursor();
  } else {

    if (!mouseIsPressed) {
      a = random(TWO_PI);
      bubbles.push(new Bubble(x, y, cos(a) * 1.5, sin(a) * 1.5));
    }
    slider.hide();
    
    noCursor();

  }

}

function keyPressed() {
  if (keyCode == 83) {
    if (tools === true) {
      tools = false;
    } else {
      tools = true;
    }
  }
}

function keyTyped() {
  if (key == 's') {
    text1 = "";
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  noCursor();
}

function Bubble(x, y, velx, vely) {

  this.x = x;
  this.velx = velx;
  this.y = y;
  this.vely = vely;

  this.timer = slider.value();

  this.move = function() {
    this.x += this.velx;
    this.y += this.vely;
  };

  this.display = function() {
    stroke(255);
    fill(map(this.timer, 0, slider.value(), 15, 255));

    this.timer--;
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.timer -= 10;
    }
    if (dist(this.x, this.y, x, y) > 100) {
      this.timer -= 2;
    }
    
    strokeWeight(0);
    ellipse(this.x, this.y, map(this.timer, 0, slider.value(), 5, 50), map(this.timer, 0, slider.value(), 5, 50));
  };

  this.islive = function() {
    if (this.timer < 0) {
      return false;
    } else {
      return true;
    }
  };
}
