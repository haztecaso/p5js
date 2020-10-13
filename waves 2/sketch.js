var a = [];
var b = [];

var n_a = 2;
var n_b = 2;

var freqs = [200, 100, 50, 300, 400];
var zoom = 2;
var box;
var downloaded = false;
var id =[0,0];
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    background(0);
    frameRate(300);
    id[0]=Math.round(random(1000));
    def();
    json_export(a, b);
    box = new Box(width - 315, height - 215, 300, 200, 0.3);
}

function draw() {
    var t = frameCount / 50;
    background(0);
    box.display();


    translate(width / 2, height / 2);
    for (var i = frameCount; i <= frameCount + 1; i += 0.001) {
        strokeWeight(1);
        var x = wave_sum(frameCount + i, a);
        var y = wave_sum(frameCount + i, b);
        stroke(100, 255, 100);
        point(zoom * x, zoom * y);
    }
}

function mousePressed() {
        def();
        json_export(a, b);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    box.x = width - 315;
    box.y = height - 215;
}
