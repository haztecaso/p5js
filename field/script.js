var f;
var points=[];
var a=0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    f = new Field(30,50);
    stroke(255);
    frameRate(30);
    noCursor();
    points.push(createVector(0,0));
    points.push(createVector(0,0));
}

function draw() {
    a+=0.001;
    background(0);
    points[0]=createVector(mouseX-width/2,mouseY-height/2);
    f.calc(points);
    translate(width / 2, height / 2);
    f.display(true,false);
    fill(255,0,0);

    for(var i=0; i<points.length;i++){
    ellipse(points[i].x,points[i].y,20,20);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    f.defx = width / floor(width / f.def);
    f.defy = height / floor(height / f.def);
    f.calc();
}
