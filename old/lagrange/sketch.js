var zoom = 37;
var psize = 10;
var c;
var lagrange;
var t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  c = new Cloud([new Point(createVector(-9, 5)), new Point(createVector(-4, 2)), new Point(createVector(-1, -2)), new Point(createVector(7, 9))]);
  lagrange = new Interpolation(c);
  lagrange.calc(c);
  background(255);
  axis();
  grid();
}

function draw() {
  t = random(0, 100000) / 100000;
  translate(width / 2, height / 2);
  for (var i = 0; i < c.points.length; i++) {
    c.points[i].display();
  }
  strokeWeight(0.5);
  for (var i = 0; i < lagrange.pols.length; i++) {
    stroke(c.points[i].color);
    displayPoly(lagrange.pols[i], t);
  }
  strokeWeight(1.5);
  stroke(0, 0, 200, 255 / 2);
  displayPoly(lagrange.poly, t);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  axis();
  grid();
}

function mouseClicked() {
  background(255);
  axis();
  grid();
  //c.add(new Point(createVector(round(4 * (mouseX - width / 2) / zoom) / 4, round(-4 * (mouseY - height / 2) / zoom) / 4)));
  c.add(new Point(createVector((mouseX - width / 2) / zoom,-(mouseY - height / 2) / zoom)))
  c.comp();
  lagrange.calc(c);
  console.log("y = " + lagrange.poly.text());
}

function keyPressed() {
  if (key == "c" || key == "C") {
    c.points = [];
    background(255);
    axis();
    grid();
    lagrange.poly = new Poly([]);
  }
}
