let t = 0;

let p = {

    tD: 0.001,
    tDMax: 0.1,
    tDStep: 0.001,

    weight: 6,
    weightMin: 1,
    weightMax: 20,

    iters: 10,
    itersMin: 1,
    itersMax: 40,

    length: 30,
    lengthMin: 3,
    lengthMax: 150,

    d0: 0,
    d0Min: -1,
    d0Max: 4,
    d0Step: .1,

    dS: 1.3,
    dSMin: 0.1,
    dSMax: 2,
    dSStep: 0.05,

    n0: 15,
    n0Min: 3,
    n0Max: 100,

    nI: 5,
    nIMin: -30,
    nIMax: 30,

    nS: .1,
    nSMin: .1,
    nSMax: 5,
    nSStep: .1,

    angleIncrement: 360 / ((1 + Math.sqrt(5)) / 2),
    angleIncrementMax: 360,
    angleIncrementStep: .1,

    angleIncrementB: 0,
    angleIncrementBMax: 10,
    angleIncrementBStep: .01,

    angleDeltaI: 0,
    angleDeltaIMax: 30,
    angleDeltaIStep: .01,

    angleDeltaNoiseS: 0,
    angleDeltaNoiseSMax: 1,
    angleDeltaNoiseSStep: .01,

    angleDeltaNoiseL: 0,
    angleDeltaNoiseLMax: 1,
    angleDeltaNoiseLStep: .01,
}

let gui;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeCap(ROUND);

    gui = createGui("Parameters");
    gui.addObject(p);
    gui.prototype.saveInLocalStorage("currentParams");
    gui.hide();
}

function draw() {
    background(0);
    t += p.tD;
    strokeWeight(p.weight);
    translate(width / 2, height / 2);
    for (let i = 1; i <= p.iters; i += 1) {
        let d, n;
        d = p.d0 * p.length + i * p.length * p.dS;
        // d = 20 + i * p.length * (1.6 - sqrt(i) * 0.02);

        // n = p.n0 + map(cos(i / p.nS ** 3), -1, 1, 0, p.nI * i);
        n = p.n0 + i * p.nI;
        n = floor(n)
        for (let j = 0; j < n; j += 1) {
            const angle = i * (p.angleIncrement + p.angleIncrementB) * PI / 180 + j * TAU / n;

            const x = d * cos(angle);
            const y = d * sin(angle);

            let angleDelta = 0;
            angleDelta += i * p.angleDeltaI * PI / 180;
            // angleDelta += sqrt(i * p.angleDeltaI) * p.angleDeltaI;
            angleDelta += p.angleDeltaNoiseL * map(noise(x * p.angleDeltaNoiseS, y * p.angleDeltaNoiseS, t), 0, 1, -1, 1);
            palo(x, y, angleDelta);
            // punto(x, y, p.length);
        }
    }
}

function palo(x, y, d) {
    push()
    translate(x, y);
    rotate(atan2(y, x) + d);
    line(-p.length / 2 + p.weight / 2, 0, p.length / 2 - p.weight / 2, 0);
    pop()
}
function punto(x, y, r) {
    push();
    strokeWeight(0);
    ellipse(x, y, p.weight, p.weight);
    pop();
}


function keyPressed() {
    switch (key) {
        case 'h':
        case ' ':
            gui.prototype.toggleVisibility();
            break;
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

