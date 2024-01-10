const l = 20;
const N = 40;
const noiseScale = 0.001;

const inc = [3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
    1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025,
    121393, 196418, 317811, 514229, 832040, 1346269,
    2178309, 3524578, 5702887, 9227465, 14930352, 24157817,
    39088169, 63245986, 102334155]

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(5);
    strokeCap(ROUND);
    background(0);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    for (let i = 1; i <= N; i += 1) {
        // let d = 20 + i * l * 1.6;
        let d = 20 + i * l * (1.6 - sqrt(i) * 0.02);
        // let n = floor(10 + map(cos(i / 4), -1, 1, 0, 3) * sqrt(inc[i]))
        let n = floor(10 + map(cos(i / 2), -1, 1, 0, 10 * i))
        let a0 = TAU / n * i / noise(i);
        for (let a = a0; a < TAU + a0; a += TAU / n) {
            let x = d * cos(a);
            let y = d * sin(a);
            // palo(x, y, 0);
            palo(x, y, 0.2 * sqrt(i));
            // palo(x, y, 0.4 * sqrt(i) + map(noise(x * noiseScale, y * noiseScale), 0, 1, -0.25, 0.25));
        }
    }
    noLoop();
}

function palo(x, y, d) {
    push()
    translate(x, y);
    rotate(atan2(y, x) + d);
    line(0, 0, l, 0);
    pop()
}
