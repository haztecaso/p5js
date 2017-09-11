var numbers = [];
var count = [];
var d = 5; //Standard deviation
var n = 20000; //Amount of numbers
var big = 0;
var small = 0;
var total = 0;

var t = 0;
var t2 = 1;

var x, y, y2, y3;
var oldx, oldy, oldy2, oldy3;

function setup() {
    createCanvas(windowWidth, windowHeight);
    calc();

}

function draw() {
    background(0);
    t += 0.01;
    t2 += 0.001;
    for (var i = 0; i < count.length; i++) {
        //fill(count[i] * 255 / max(count), 0, 0);
        x = i * width / count.length;
        y2 = height * 0.95 - count[i] * height / max(count) * 0.9 * noise(t, i / 100);
        y = height * 0.95 - count[i] * height / max(count) * 0.9 * noise(t2 + (i / 10));
        if (y2 >= y) {
            y3 = y;
        } else {
            y3 = y2;
        }
        strokeWeight(1);
        fill(0);
        stroke(255);
        ellipse(x, y, 2, 2);
        line(oldx, oldy, x, y);

        fill(255, 0, 0);
        stroke(0, 255, 0);
        line(oldx, oldy2, x, y2);

strokeWeight(10);
        fill(255, 0, 0, 2);
        stroke(255, 0, 0,255/10);
        line(oldx, oldy3, x, y3);

        strokeWeight(3);
        stroke(255, 30);
        line(x, y, x, y2);
        oldx = x;
        oldy = y;
        oldy2 = y2;
        oldy3 = y3;

    }
    oldx = 0;
    oldy = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function calc() {
    for (var i = 0; i < n; i++) {
        numbers[i] = int(round(randomGaussian(0, d) * 2));
    }
    big = max(numbers); //Max value of the distribution
    small = min(numbers); //Min value of the distribution
    for (var i = 0; i <= abs(small) + big; i++) {
        count[i] = 0;
    }
    for (var i = 0; i < n; i++) {
        count[numbers[i] + abs(small)]++;
    }
    fill(0);
    strokeWeight(1);
    frameRate(30);
}

function mouseClicked() {
    calc();
}

function touchStarted() {
    calc();
}