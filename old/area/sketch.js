var x1;
var x2;
var z;
var d;
var formula;
var t=0;
var f;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(200);
    frameRate(7);
    z = createSlider(1,60,30);
    z.position(10, 40);
    z.changed(redraw);
    x1 = createSlider(-50, 50, -5);
    x1.position(10, 70);
    x1.changed(redraw);
    x2 = createSlider(-50, 50, 5);
    x2.position(10, 100);
    x2.changed(redraw);
	d = createSlider(1, 100, 20);
	d.position(10, 130);
	d.changed(redraw);
    formula=createInput("x*x");
    formula.position(15,10);
	formula.changed(frmChanged);
	textSize(32);
	
	translate(width/2,height/2);
	f=new Fx();
	noLoop();
}

function draw() {
	t+=0.1;
	back();
	f.draw();
	console.log(f.area(x1.value(),x2.value(),d.value()/100));
	fill(0);
	text(f.area(x1.value(),x2.value(),d.value()/100), 10, 30);
	
	strokeWeight(7);
	stroke(255,0,0);
	point(x1.value()*z.value(),0);
	point(x2.value()*z.value(),0);
}
function frmChanged(){
	f.frm=formula.value();
	redraw();
}


function Fx(){
	this.frm=formula.value();
	this.h=0.10;
	this.draw=function(){
		stroke(0,0,100);
		strokeWeight(2);
		for(var i=-width/2;i<width/2;i+=this.h){
			var x=i;
			var y=eval(this.frm);
			try {
   				var y=eval(this.frm);
			} catch (e) {
    			
        			alert(e.message);
    				redraw();
			}
			line(x*z.value(),-y*z.value(),oldx*z.value(),-oldy*z.value());
			var oldx=x;
			var oldy=y;
		}
	}
	this.xn=function(n){
		var x=n;
		return  (eval(this.frm));
	}
	this.area=function(x1,x2,delta){
		var dist=abs(x1-x2);
		if(x1>x2){
			var x3=x1;
			x1=x2;
			x2=x3;
		}
		else if(x1==x2){
			return 0;
		}
		stroke(0);
		strokeWeight(0.1);
		fill(0,150,0,70);
		var area=0;
		if(dist%delta!=0){
			var resto = dist%delta;
			var result = round(dist/delta);
			delta=dist/result;
			// distancia = resultado * delta + resto
			// resto = 0
			// distancia = resultado * delta
			// distancia/resto = delta
			
			
		}
		for(var k=x1;k<x2;k+=delta){
			rect(k*z.value(),0,delta*z.value(),-this.xn((2*k+delta)/2)*z.value());
			area+=abs(delta*this.xn((2*k+delta)/2));
		}
		fill(0);
		return Math.round(area,2);
	}
	
}

function back(){
	background(200);
	stroke(0);
	strokeWeight(1.5);
	translate(-width/2,-height/2);
	line(0,height/2,width,height/2);
	line(width/2,0,width/2,height);
	strokeWeight(0.1);
	for(var i=0;i<width/2;i+=z.value()){
		line(width/2+i,0,width/2+i,height);
		line(width/2-i,0,width/2-i,height);
	}
	for(var j=0;j<height/2;j+=z.value()){
		line(0,height/2+j,width,height/2+j);
		line(0,height/2-j,width,height/2-j);
	}
	translate(width/2,height/2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(200);
    translate(width/2,height/2);
    redraw();
}