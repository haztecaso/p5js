let parametros = {};
let y = 20;
let msg;
let nramas;
let nramasMax = 4000;
let seed;
let id = x => x;

function setup() {
	createCanvas(windowWidth, windowHeight, SVG);
	noFill();
	crearParametro('grosor', 1,50,10, x=>x/10);
	crearParametro('posicion', 0,500,0);
	crearParametro('escala', 1,400,200, x=>x/200);
	crearParametro('escalaMult', 1,150,66, x=>x/100);
	crearParametro('escalaMultRand', 0,500,0, x=>x/500);
	crearParametro('profundidad', 1,10,6);
	crearParametro('angulo', 1,120,30);
	crearParametro('anguloRand', 0,500,0,x => x/500);
	crearParametro('anguloMult', 0,200,100, x=>x/100);
	crearParametro('ramas', 2,4,2);
	msg = createSpan('Haz doble click para exportar como svg');
	msg.position(20,y);
	seed = random(1000);
}

function draw() {
	background(255);
	noPetar();
	strokeWeight(v('grosor'));
	randomSeed(seed);
	push();
	translate(0,-v('posicion'));
	arbol();
	pop();
	noLoop();
	print(nramas);
}

function crearParametro(nombre,min,max,def, reescalar = id){
	parametros[nombre] = {};
	let p = parametros[nombre];
	p.reescalar = reescalar;
	p.input = createSlider(min,max,def);
	p.input.position(20,y);
	p.input.size(160);
	p.input.input(draw);
	p.actualizar = () => {
		p.desc.html(`${nombre}: ${v(nombre)}`);
		draw();
	};
	p.input.input(p.actualizar);
	p.desc = createSpan(`${nombre} ${reescalar(def)}`);
	p.desc.position(200,y);
	p.y = y;
	y += 30;
}

function v(nombreParametro){
	let p = parametros[nombreParametro];
	return p.reescalar(p.input.value());
}

function arbol(){
	nramas = 0;
	translate(width/2,height);
	let h = v('escala')*300;
	line(0,0,0,-h);
	translate(0,-h);
	ramificar(v('profundidad'), h, v('angulo'));
}

function ramificar(prof, h, angulo) {
	let r = 1 + random(-v('escalaMultRand'),v('escalaMultRand'));
	h *= r*v('escalaMult');
	if (prof == 0 || nramas > nramasMax) { return; }
	let k = () => 1 + random(-v('anguloRand'),v('anguloRand'));
	switch (v('ramas')){
		case 2:
			rama(prof, h, angulo, k());
			rama(prof, h, angulo, -k());
			break;
		case 3:
			rama(prof, h, angulo, k());
			rama(prof, h, angulo, k()-k());
			rama(prof, h, angulo, -k());
			break;
		case 4:
			rama(prof, h, angulo, -k());
			rama(prof, h, angulo, -k()/3);
			rama(prof, h, angulo, k()/3);
			rama(prof, h, angulo, k());
			break;
	}
}

function rama(prof, h, angulo, k){
	push();
	rotate(k*radians(angulo));
	line(0, 0, 0, -h);
	translate(0, -h);
	ramificar(prof - 1, h, angulo*v('anguloMult'));
	pop();
	nramas++;
}

function noPetar(){
	switch (v('ramas')){
		case 3:
			if (v('profundidad') > 6) {
				parametros['profundidad'].input.value(5);
				parametros['profundidad'].actualizar();
			}
			break;
		case 4:
			if (v('profundidad') > 5) {
				parametros['profundidad'].input.value(4);
				parametros['profundidad'].actualizar();
			}
			break;
	}
}

function descargar() {
	var time = new Date();
	time = Math.floor ( time / 1000) - 1612303066;
	svgExport.downloadSvg(document.querySelector(".p5Canvas > svg"), "arbol"+time);
}

function doubleClicked() {
	descargar();
}
function mouseWheel() {
	seed = random(10000);
	draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
