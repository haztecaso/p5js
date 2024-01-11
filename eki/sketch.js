const VERSION = 1;
let t = 0;

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

        d0: 0,
        d0Min: -100,
        d0Max: 400,
        d0Step: .1,

        dS: 100,
        dSMin: 1,
        dSMax: 250,
        dSStep: 1,

        dS2: 0,
        dS2Min: -10,
        dS2Max: 10,
        dS2Step: .1,

        dFormula: ["A", "B", "C"],

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

        nFormula: ["A", "B", "C"],

        nm: ["A: nI", "B: n", "C: (n + nI) / 2"],

        angleIncrement: 360 / ((1 + Math.sqrt(5)) / 2),
        angleIncrementMax: 360,
        angleIncrementStep: .1,

        angleIncrementB: 0,
        angleIncrementBMin: -5,
        angleIncrementBMax: 5,
        angleIncrementBStep: .01,
    },

    dir: {
        angleDeltaI: 0,
        angleDeltaIMax: 30,
        angleDeltaIStep: .01,

        angleDeltaNoiseS: 0,
        angleDeltaNoiseSMax: 1,
        angleDeltaNoiseSStep: .01,

        angleDeltaNoiseL: 0,
        angleDeltaNoiseLMax: 1,
        angleDeltaNoiseLStep: .01,
    },
}

let guis, els;
let showdom = true;

let points;

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);
    // createCanvas(windowWidth, windowHeight);
    stroke(255);

    guis = mkgui(p);
    els = mkdom();

    placeguis(guis);
    placedom(els);
    noLoop();

    // Object.values(guis).forEach((gui) => gui.hide())
}

function draw() {
    t += p.shape.tD;
    background(0);
    strokeWeight(p.shape.weight);
    fill(255);
    points = rings();
    points.forEach((point) => point.draw())
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
            nMax = p.grid.nI;
            break;
        case 'B':
            nMax = number;
            break;
        case 'C':
            nMax = (p.grid.nI + number) / 2;
            break;
    }
    while (i < nMax) {
        const angleIncrement = p.grid.angleIncrement + p.grid.angleIncrementB;
        // const angle = iter * angleIncrement * PI / 180 + iter * i * TAU / number;
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


function keyPressed() {
    switch (key) {
        case 'h':
        case ' ':
            showdom = !showdom;
            Object.values(els).forEach((el) => {
                if (showdom) { el.show() }
                else { el.hide() }
            })
            Object.values(guis).forEach((gui) => gui.prototype.toggleVisibility())
            draw();
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    placeguis(guis);
    placedom(els);
}

function mkgui(params) {
    let guis = {};

    guis.shape = createGui("Shape");
    guis.shape.addObject(params.shape);
    guis.shape.prototype.saveInLocalStorage("shape");


    guis.grid = createGui("Grid");
    guis.grid.addObject(params.grid);
    guis.grid.prototype.saveInLocalStorage("grid");

    guis.dir = createGui("Direction");
    guis.dir.addObject(params.dir);
    guis.dir.prototype.saveInLocalStorage("dir");

    return guis
}

function mkdom() {
    let els = {};

    els.exportButton = createButton("export")
    els.exportButton.mousePressed(downloadCSV);

    els.saveButton = createButton("save")
    els.saveButton.mousePressed(misaveJSON);

    els.loadSelect = createSelect();
    els.loadSelect.changed(loadSave);

    // load select options
    els.loadSelect.option("load")

    let saves = localStorage.getItem("saves");
    if (saves) {
        saves = JSON.parse(saves)
        for (let i = 1; i <= saves.length; i++) {
            els.loadSelect.option(`${i}`)
        }
    }

    return els
}

function placeguis(guis) {
    guis.shape.setPosition(20, 20);
    guis.grid.setPosition(240, 20);
    guis.dir.setPosition(windowWidth - 220, 20);
}

function placedom(els) {
    els.exportButton.position(20, windowHeight - 40)
    els.saveButton.position(80, windowHeight - 40)
    els.loadSelect.position(130, windowHeight - 40)
}

function misaveJSON() {
    let result = {};
    for (const [name, gui] of Object.entries(guis)) {
        result[name] = gui.prototype.getValuesAsJSON()
        result.version = VERSION;
    }
    let oldSaves = localStorage.getItem("saves");
    let saves;

    if (!oldSaves) {
        saves = [result]
    }
    else {
        saves = JSON.parse(oldSaves)
        let alreadySaved = false;
        saves.forEach((save) => {
            if (JSON.stringify(save) == JSON.stringify(result)) alreadySaved = true;
        })
        if (!alreadySaved) {
            saves.push(result);
            els.loadSelect.option(saves.length)
        }
    }
    localStorage.setItem("saves", JSON.stringify(saves));
}

function loadSave() {
    const i = parseInt(els.loadSelect.selected())
    if (i == NaN) return;
    let saves = localStorage.getItem("saves");
    if (!saves) return;
    saves = JSON.parse(saves)
    console.log(saves[i - 1])
    Object.keys(p).forEach((key) => {
        guis[key].prototype.setValuesFromJSON(saves[i - 1][key])
    })
    draw()
}

function downloadCSV() {
    var time = new Date();
    time = Math.floor(time / 1000) - 1612303066;
    const el = document.querySelector(".p5Canvas > svg")
    console.log(el)
    // svgExport.downloadSvg(el, "eki" + time);
    save(`eki${time}.svg`);
}
