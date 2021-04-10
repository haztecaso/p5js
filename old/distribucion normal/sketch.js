var numbers = [];
var count = [];
var d = 5; //Standard deviation
var n = 15000; //Amount of numbers
var big = 0;
var small = 0;
var total = 0;

var x, y;
var oldx, oldy;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    //noLoop();
    fill(255);
    strokeWeight(1);
    stroke(255);
    frameRate(1);

}

function draw() {
    background(0);
    d = random(1,5);
    var numbers = [];
	var count = [];
    for (var i = 0; i < n; i++) {
        numbers[i] = int(round(randomGaussian(0, d) * 2));
    }
    big = max(numbers); //Max value of the distribution
    small = min(numbers); //Min value of the distribution
    console.log(big);
    console.log(small);
    for (var i = 0; i <= abs(small) + big; i++) {
        count[i] = 0;
    }
    for (var i = 0; i < n; i++) {
        count[numbers[i] + abs(small)]++;
    }
    for (var i = 0; i < count.length; i++) {
        //fill(count[i] * 255 / max(count), 0, 0);
        x = i * width / (count.length - 1);
        y = height * 0.95 - count[i] * height / max(count) * 0.9;
        ellipse(x, y, 3, 3);
        if (oldx != 0 || oldy != 0) {
            line(oldx, oldy, x, y);
        }
        oldx = x;
        oldy = y;
    }
    oldx = 0;
    oldy = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}