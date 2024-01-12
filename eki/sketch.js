const VERSION = 1;

let p = {

    shape: {
        weight: 6,
        weightMin: 1,
        weightMax: 20,

        length: 30,
        lengthMin: 3,
        lengthMax: 150,

        scale: 1,
        scaleMin: 0.1,
        scaleMax: 3,
        scaleStep: 0.01,
    },

    grid: {
        iters: 10,
        itersMin: 1,
        itersMax: 60,

        d0: 40,
        d0Min: -100,
        d0Max: 400,
        d0Step: .1,

        dS: 30,
        dSMin: 1,
        dSMax: 250,
        dSStep: 1,

        dS2: 0,
        dS2Min: -10,
        dS2Max: 10,
        dS2Step: .1,

        dFormula: ["A", "B", "C"],

        n0: 10,
        n0Min: 3,
        n0Max: 100,

        nI: 5,
        nIMin: -20,
        nIMax: 60,

        nS: .1,
        nSMin: .1,
        nSMax: 5,
        nSStep: .1,

        nFormula: ["A", "B", "C"],

        nm: ["A: n", "B: nI", "C: (n + nI) / 2"],

        angleI: 0,
        angleIMax: 360,
        angleIStep: .1,

        angleI2: 0,
        angleI2Min: -5,
        angleI2Max: 5,
        angleI2Step: .01,
    },

    dir: {
        angleDeltaI: 0,
        angleDeltaIMax: 30,
        angleDeltaIStep: .01,
    },
}

let guis, exportButton;
let exportButtonShow = true;

let points;

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);
    // createCanvas(windowWidth, windowHeight);
    stroke(255);
    guis = mkgui(p);
    exportButton = createButton("⇩ SVG")
    exportButton.mousePressed(downloadCSV);
    placeguis(guis);
    placeExportButton();
    urlLoad()
    noLoop();
    toggleInterface()
}

function draw() {
    background(0);
    strokeWeight(p.shape.weight);
    fill(255);
    points = rings();
    points.forEach((point) => point.draw())
    urlUpdate()
}

class Stick {
    constructor(pos, angleDelta) {
        this.pos = pos;
        this.angleDelta = angleDelta;
    }
    draw() {
        push()
        translate(width / 2, height / 2);
        scale(p.shape.scale)
        translate(this.pos.x, this.pos.y);
        rotate(atan2(this.pos.y, this.pos.x) + this.angleDelta);
        line(-p.shape.length / 2 + p.shape.weight / 2, 0, p.shape.length / 2 - p.shape.weight / 2, 0);
        pop()
    }
}

function ring(diameter, number, iter) {
    let sticks = [];
    let i = 0;
    let nMax;
    switch (p.grid.nm[0]) {
        case 'A':
            nMax = number;
            break;
        case 'B':
            nMax = p.grid.nI;
            break;
        case 'C':
            nMax = (p.grid.nI + number) / 2;
            break;
    }
    while (i < nMax) {
        const angleIncrement = p.grid.angleI + p.grid.angleI2;
        const angle = iter * angleIncrement * PI / 180 + i * TAU / number;
        const pos = createVector(cos(angle), sin(angle))
        pos.setMag(diameter)
        sticks.push(new Stick(pos, iter * p.dir.angleDeltaI * PI / 180))
        i++;
    }
    return sticks
}

function rings() {
    let sticks = [];
    for (let i = 0; i < p.grid.iters; i += 1) {
        let d, n;

        switch (p.grid.dFormula[0]) {
            case 'A':
                d = p.grid.d0 + i * p.grid.dS;
                break;
            case 'B':
                d = p.grid.d0 + i * p.grid.dS + i ** 2 * p.grid.dS2;
                break;
            case 'C':
                break;
        }

        switch (p.grid.nFormula[0]) {
            case 'A':
                n = p.grid.n0 + i * p.grid.nI;
                break;
            case 'B':
                n = p.grid.n0 + map(cos(i / p.grid.nS), -1, 1, 0, p.grid.nI * i);
                break;
            case 'C':
                n = p.grid.n0 * p.grid.nI ** (i / 10);
                break;
        }

        n = floor(n);
        sticks = sticks.concat(ring(d, n, i))
    }
    return sticks;
}

function toggleInterface() {
    exportButtonShow = !exportButtonShow;
    exportButtonShow ? exportButton.show() : exportButton.hide();
    Object.values(guis).forEach((gui) => gui.prototype.toggleVisibility())
    draw();
}

function keyPressed() {
    switch (key) {
        case 'h':
        case ' ':
            toggleInterface();
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    placeguis(guis);
    placeExportButton();
}

function mkgui(params) {
    let guis = {};

    guis.shape = createGui("Shape");
    guis.grid = createGui("Grid");
    guis.dir = createGui("Direction");

    guis.shape.addObject(params.shape);
    guis.grid.addObject(params.grid);
    guis.dir.addObject(params.dir);

    return guis
}

function compressState(state) {
    return [
        state.version,
        state.shape.weight,
        state.shape.length,
        state.shape.scale,
        state.grid.iters,
        state.grid.d0,
        state.grid.dS,
        state.grid.dS2,
        state.grid.dFormula,
        state.grid.n0,
        state.grid.nI,
        state.grid.nS,
        state.grid.nFormula,
        state.grid.nm,
        state.grid.angleI,
        state.grid.angleI2,
        state.dir.angleDeltaI,
    ]
}

function decompressState(data) {
    return {
        shape: {
            weight: data[1],
            length: data[2],
            scale: data[3],
        },
        grid: {
            iters: data[4],
            d0: data[5],
            dS: data[6],
            dS2: data[7],
            dFormula: data[8].index,
            n0: data[9],
            nI: data[10],
            nS: data[11],
            nFormula: data[12].index,
            nm: data[13],
            angleI: data[14],
            angleI2: data[15],
        },
        dir: {
            angleDeltaI: data[16]
        },
    }
}

function encodeState() {
    let state = { version: VERSION };
    for (const [name, gui] of Object.entries(guis)) {
        state[name] = gui.prototype.getValuesAsJSON()
    }
    return btoa(JSON.stringify(compressState(state)))
}

function decodeState(data) {
    return decompressState(JSON.parse(atob(data)))
}

function urlLoad() {

    let params = window.location.hash.slice(1)
    try {
        const state = decodeState(params)
        Object.keys(guis).forEach((key) => {
            guis[key].prototype.setValuesFromJSON(state[key])
        })
    } catch (err) {
        window.location.hash = "";
    }

}

function urlUpdate() {
    window.location.hash = encodeState()
}

function placeguis(guis) {
    guis.shape.setPosition(20, 20);
    guis.grid.setPosition(240, 20);
    guis.dir.setPosition(windowWidth - 220, 20);
}

function placeExportButton() {
    exportButton.position(20, windowHeight - 40)
}


function downloadCSV() {
    var time = new Date();
    time = Math.floor(time / 1000) - 1612303066;
    save(`eki${time}.svg`);
}
