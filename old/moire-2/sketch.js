var map;
var t=0;
function setup() {
    createCanvas(windowWidth, windowHeight);
	background(0,0,100);
	map=new Balls(1000);
	map.born();
	strokeWeight(3);
	stroke(240);
	frameRate(1000);
}

function draw() {
	background(0,0,50);
	t+=0.1;
	map.display();
	map.display(1+(sin(t)),1);
}

function Balls(n){
	this.n=n;
	this.p=[];
	this.born = function(){
		this.die();
		for(var i=0;i<n;i++){
			this.p.push(new Point(random(0,width),random(0,height)));
		}
	};
	this.die = function(){
		this.p=[];
	};
	this.display = function(alpha,scl){
		translate(width/2,height/2);
		scale(scl)
		rotate(radians(alpha));
		for(var i=0;i<this.p.length-1;i++){
			point(this.p[i].x-width/2,this.p[i].y-height/2);
		}
		rotate(-radians(alpha));
		scale(-scl)
		translate(-width/2,-height/2);
	};
	console.log("New "+ n +" balls");
}

function Point(x,y){
	this.x = x;
	this.y = y;
	this.module =function(){
		return sqrt(x*x+y*y)
	};
}