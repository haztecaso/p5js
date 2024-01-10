const l = 40;
const N = 5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(6);
    strokeCap(ROUND);
    background(0);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    ellipse(0, 0, 2, 2);

    for (let i = 1; i <= N; i += 1) {
        let d = i * l * 1.6;
        console.log(d)
        for (let a = 0; a < TAU; a += TAU / (20 * i)) {
            let x = d * cos(a);
            let y = d * sin(a);
            palo(x, y);
        }
    }
}

function palo(x, y) {
    push()
    translate(x, y);
    rotate(atan2(y, x));
    line(0, 0, l, 0);
    pop()
}
