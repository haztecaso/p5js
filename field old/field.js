function Field(def, mag) {
    this.vectors = [];
    this.def = def;
    this.mag = mag;
    this.defx = width / floor(width / this.def);
    this.defy = height / floor(height / this.def);
    this.calc = function(points) {
        this.vectors = [];
        for (var x = -width / 2; x < width / 2; x += this.def) {
            for (var y = -height / 2; y < height / 2; y += this.def) {
                var v = createVector(0,0);
                for (var i = 0; i < points.length; i++) {
                    var v_i = createVector(points[i].x - x, points[i].y - y);
                    var d = dist(x, y, points[i].x, points[i].y) / 1000;
                    v_i.setMag(1 / pow(d,2));
                    v_i.setMag(constrain(v_i.mag(), 0, d*1000));
                    v.add(v_i);
                }

                this.vectors.push([v, createVector(x, y)]);
            }
        }
    }
    this.display = function(v = true, p = false) {
        for (var i = 0; i < this.vectors.length; i++) {
            var x = this.vectors[i][1].x;
            var y = this.vectors[i][1].y;
            var vector = this.vectors[i][0];
            if (v == true) {
                arrow(vector, x, y);
            }
            if (p == true) {
                stroke(255);
                strokeWeight(2);
                point(x, y);
                strokeWeight(0);
                fill(255);
                text("(" + floor(x / this.defx) + "," + floor(y / this.defy) + ")", x + 5, y + 15);
            }
        }
    }
}

function arrow(vector, x, y) {
    var m = vector.mag();
    var v = createVector(vector.x / m, vector.y / m);
    stroke(255);
    strokeWeight(1);
    fill(255);
    line(x, y, x + m * v.x, y + m * v.y);
    noStroke();
    var f = createVector(1, -1 / (v.y / v.x));
    var m2 = m * 0.2;
    m2 = constrain(m2, 7, 30);
    f.setMag(m2 / 2);
    beginShape();
    vertex(x + (m - m2) * v.x - f.x, y + (m - m2) * v.y - f.y);
    vertex(x + (m - m2 * 0.6) * v.x, y + (m - m2 * 0.6) * v.y);
    vertex(x + (m - m2) * v.x + f.x, y + (m - m2) * v.y + f.y);
    vertex(x + (m + 1) * v.x, y + (m + 1) * v.y);
    endShape();
}
