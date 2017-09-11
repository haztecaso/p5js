var a = [];
var b = [];

var freqs = [200, 100, 50, 300, 400];
var zoom = 2;
var box;
var t = 0;
var ns = [2, 3];
var downloaded = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    background(0);
    frameRate(300);
    def(ns.rand(), ns.rand());
    json_export(a, b);
    box = new Box(width - width / 4 - 15, height - height / 4 - 15, width / 4, height / 4, width * height / 1709400);
}

function draw() {
    t = frameCount / 50;
    //background(0);
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

function keyTyped() {
    if (key == 'r' || key == 'R') {
        refresh();
    }
    if (key == "s" || key == "S") {
        if (downloaded == false) {
            document.getElementById('download').click();
            downloaded = true;
        }
    }
    if (key == "b" || key == "B") {
        box.toggle();
    }
    if (key == "+") {
        zoom_button(0.2);
    }
    if (key == "-") {
        zoom_button(-0.2);
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    box.update(width - width / 4 - 15, height - height / 4 - 15, width / 4, height / 4, width * height / 1709400);
}
