// PARÁMETROS
let n = 100; // Cantidad de palitos que se añaden en cada frame
let v = 30; // Cantidad de frames por segundo

let palitos = [];
let t = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(v);
    for(let i = 0; i<n; i++){
        palitos[i] = {
            pos : createVector(random(width), random(height)),
            tam : createVector(random(2,6), random(30,100)),
        };
    }
    textSize(32);
    background(0);
}

function draw() {
    t += 0.1;
    // noStroke();
    for(let i = 0; i<palitos.length; i++){ p = palitos[i]; p.rot = TWO_PI*noise(p.pos.x/10,p.pos.y/10); p.pos = createVector(random(width), random(height));
        dibujarPalito(p);
    }
}

function dibujarPalito(palito){
    push();
    translate(palito.pos.x, palito.pos.y);
    rotate(palito.rot);
    rect(-palito.tam.x/2, -palito.tam.y/2, palito.tam.x, palito.tam.y,3);
    pop();
}

//Pulsa cualquier tecla para pausar/continuar
function keyPressed() {
    console.log(frameRate());
    if(frameRate() > 0){
        frameRate(0);
    }
    else{
        frameRate(v);
    }
}
