var f;
var a=0;
var p = [];
var n = 500;
const scale = 0.7;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    f = new Field(30);
    var a = 40;
    for (var i = -width/2; i <= width/2; i+=a){
      for (var j = -height/2; j <= height/2; j+=a){
        p.push(new Particle(createVector(i,j)));
      }
    }
    var delta = n - p.length ;
    for (r = 0; r < delta; r++){
        //p.push(new Particle(createVector(-width/2,-height/2+r*height/delta)));
        //p.push(new Particle(createVector(random(-10,10),random(-10,10))));
    }
    stroke(255);
    frameRate(300);
    //noCursor();
      translate(width / 2, height / 2);
    drawField();

}

function draw() {
    translate(width / 2, height / 2);
    background(0,0,0,0);
    //drawField();
    for (r = 0; r < 2; r++){
      for (var i = 0; i<p.length; i++){
        p[i].update();
        p[i].display();
        if ( p[i].pos.x < -width/2 || p[i].pos.x > width/2 || p[i].pos.y < -height/2 || p[i].pos.y > height/2){
          p.splice(i,1);
        }
      }
    }
    var delta = n - p.length ;
    for (r = 0; r < delta; r++){
        //p.push(new Particle(createVector(-width/2,-height/2+r*height/delta)));
        p.push(new Particle(createVector(random(-width/2,width/2),random(-height/2,height/2))));
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    f.defx = width / floor(width / f.def);
    f.defy = height / floor(height / f.def);
    f.calc();
}

function drawField(){
  f.calc();
  f.display();
}

function field(a,b){
  x = a*scale;
  y = b*scale;
  // var d = Math.sqrt(x*x/4+y*y);
  var o = 0.4;
  var v = createVector(y/10+sin(x), -tan(y*x)/10);
  v.setMag(o*v.mag());
  return v;
}
