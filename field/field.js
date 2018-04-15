function Field(def) {
    this.vectors = [];
    this.def = def;
    this.defx = width / floor(width / this.def);
    this.defy = height / floor(height / this.def);
    this.calc = function() {
        this.vectors = [];
        for (var x = 0; x < width / 2; x += this.def) {
            for (var y = 0; y < height / 2; y += this.def) {
                var v = field(x,y);
                this.vectors.push([v, createVector(x, y)]);
                var v = field(-x,y);
                this.vectors.push([v, createVector(-x, y)]);
                var v = field(x,-y);
                this.vectors.push([v, createVector(x, -y)]);
                var v = field(-x,-y);
                this.vectors.push([v, createVector(-x, -y)]);
            }
        }
    }
    this.display = function() {
        for (var i = 0; i < this.vectors.length; i++) {
            var x = this.vectors[i][1].x;
            var y = this.vectors[i][1].y;
            var vector = this.vectors[i][0];
            vector.setMag(vector.mag()*20)
            arrow(vector, x, y);
        }
    }
}

function Particle(pos){
  this.pos = pos;
  this.oldPos = this.pos;
  this.update = function(){
    var f = field(this.pos.x,this.pos.y);
    var vel = createVector(f.x,f.y);
    this.oldPos = createVector(this.pos.x,this.pos.y);
    this.pos.x += vel.x;
    this.pos.y += vel.y;
    //arrow(vel, this.pos.x, this.pos.y,color(0,255,0));
  }
  this.display = function(){
    stroke(170,55,100);
    strokeWeight(2);
    line(this.pos.x,this.pos.y,this.oldPos.x,this.oldPos.y);
  }
}
function arrow(vector, x, y, col = color(255)) {
    var m = vector.mag();
    var v = createVector(vector.x / m, vector.y / m);
    stroke(col);
    strokeWeight(1);
    fill(col);
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
