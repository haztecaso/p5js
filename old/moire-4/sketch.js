var grid;
var t=0;
var j=0;
var k=0;
function setup() {
    createCanvas(windowWidth, windowHeight);
	background(0,0,100);
	grid=new Circs(100);
	grid.born();
	strokeWeight(1);
	stroke(240);
	frameRate(1000);
	noFill();
}

function draw() {
	background(0,0,50);
	
	t+=0.005;
	j=(mouseX/width*200)-100;
	k=(mouseY/height*200)-100;
	j=100*sin(t*10)*cos(t)+10*sin(t*20);
	k=100*sin(t*10)*sin(t)+10*cos(t*20);
	ellipse(j,k,1,1);
	grid.display(-j,-k);
	grid.display(j,k);
}

function Circs(n){
	this.n=n;
	this.c=[];
	this.born = function(){
		this.die();
		for(var i=0;i<n;i++){
			this.c.push(new Circ(width/2,height/2,(sqrt(pow(width,2)+pow(height,2))/(n))*(i+1)));
			console.log(this.c[i].d)
		}
	};
	this.die = function(){
		this.c=[];
	};
	this.display = function(x,y){
		translate(width/2+x,height/2+y);
		for(var i=0;i<this.c.length-1;i++){
			ellipse(this.c[i].x-width/2,this.c[i].y-height/2,this.c[i].d,this.c[i].d);
		}
		translate(-width/2-x,-height/2-y);
	};
}

function Circ(x,y,d){
	this.x = x;
	this.y = y;
	this.d = d;
}