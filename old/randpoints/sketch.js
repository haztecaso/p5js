var points = [];
var t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  points.push(new Point(createVector(width / 2, height / 2), 50, true));
  strokeWeight(1);
}

function draw() {
  background(0);
  t += 0.01;
  for (var i = 0; i < points.length; i++) {
    points[i].display();
    points[i].actualize(t);
  }
  for (var i = 0; i < points.length; i++) {
      if (points[i].active == true) {
          var p = true;
          for (var j = 0; j < points.length; j++) {
              if (i != j) {
                  var dx = points[i].satellite.x-points[i].position.x,
                  dy = points[i].satellite.y-points[i].position.y;
                  var d = sqrt(dx*dx+dy*dy);
                  console.log(d);
                  if (2*d < points[j].orbit) {
                      p = false;
                  }
              }
          }
          if (p) {
              points[i].color=color(0,0,255);
              if (random()>0.9){
              points[i].stabilize();}
          }
          else {
              fill(255,255,0);
              rect(0,0,10,10);
          }
      }

  }}

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(255);
  }

  function Point(position, orbit, active = false) {
    this.position = position;
    this.orbit = orbit;
    this.active = true;
    this.radius = 20;
    this.color = color(255);
    this.offset = [random(TWO_PI), 1];
    this.satellite = createVector(0, 0);
    this.display = function() {

      fill(this.color);
      noStroke();
      ellipse(this.position.x, this.position.y, this.radius, this.radius);

      if (this.active) {
        stroke(0, 255, 0);
        noFill();
        ellipse(this.position.x, this.position.y, this.orbit * 2, this.orbit * 2);

        fill(255, 0, 0);
        noStroke();
        ellipse(this.satellite.x, this.satellite.y, this.radius * 0.75, this.radius * 0.75);
      } else {
        stroke(255);
        noFill();
        ellipse(this.position.x, this.position.y, this.orbit * 2, this.orbit * 2);
      }
    }
    this.actualize = function(t) {
      if (this.active) {
        this.satellite.x = this.position.x + cos(this.offset[0] + t * this.offset[1]) * this.orbit;
        this.satellite.y = this.position.y + sin(this.offset[0] + t * this.offset[1]) * this.orbit;
      }
    }
    this.actualize(0);
    this.stabilize = function() {
      if (this.active) {
        this.active = false;
        points.push(new Point(this.satellite, random(50,100), true));
      }
    }
  }
