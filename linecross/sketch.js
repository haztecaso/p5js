p1 = new Point(100, 100);
p2 = new Point(300, 200);
p3 = new Point(200, 100);
p4 = new Point(200, 300);
s1 = new Segment(p1, p2);
s2 = new Segment(p3, p4);

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    stroke(255);
    strokeWeight(3);
    p1.display();
    p2.display();
    p3.display();
    p4.display();
    strokeWeight(1);
    s1.display();
    s2.display();
    p3.x = mouseX;
    p3.y = mouseY;
    if (s1.intersects(s2)){
        fill(255,0,0);
        stroke(0);
        rect(width-100,height-100,width,height);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}
