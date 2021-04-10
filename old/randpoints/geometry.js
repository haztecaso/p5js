function axis() {
  stroke(0);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
}

function grid() {
  stroke(180);
  strokeWeight(1);
  var i = width / 2;
  while (i < width) {
    line(i, 0, i, height);
    line(width - i, 0, width - i, height);
    i += zoom;
  }
  var i = height / 2;
  while (i < height) {
    line(0, i, width, i);
    line(0, height - i, width, height - i);
    i += zoom;
  }
}

function Point(pos) {
  this.pos = pos;
  this.color = color(random(200), random(200), random(200));
  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(pos.x * zoom, -pos.y * zoom, psize, psize);
  }
}

function Cloud(points = []) {
  this.points = points;
  this.add = function(point) {
    this.points.push(point)
  }
  this.comp = function() {
    for (var i = 0; i < this.points.length; i++) {
      for (var j = 0; j < this.points.length; j++) {
        if (this.points[i].pos.x == this.points[j].pos.x && i != j) {
          this.points.splice(j, 1);
        }

      }
    }
  }
}


function displayPoly(poly, t) {
  for (var x = t; x < width / 2; x += 1) {
    point(x, -poly.eval(x / zoom) * zoom);
  }
  for (var x = -t; x > -width / 2; x -= 1) {
    point(x, -poly.eval(x / zoom) * zoom);
  }
}
