var grid;
var t=0;
function setup() {
  createCanvas(windowWidth, windowHeight);
	background(255,255,255);
	grid=new Lines(500);
	grid.born();
	strokeWeight(0.5);
	stroke(255,255,225);
	frameRate(1000);
}

function draw() {
  background(255,55,255);
	t+=0.1;
	grid.display();
	grid.display(t,1);
}

function Lines(n){
	this.n=n;
	this.l=[];
	this.born = function(){
		this.die();
		for(var i=0;i<n;i++){
			this.p.push(new Line((width/n)*i,0,(width/n)*i,height));
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
			line(this.p[i].x1-width/2,this.p[i].y1-height/2,this.p[i].x2-width/2,this.p[i].y2-height/2);
		}
		rotate(-radians(alpha));
		scale(-scl)
		translate(-width/2,-height/2);
	};
	console.log("New "+ n +" balls");
}

function Line(x1,y1,x2,y2){
	this.x1 = x1;
	this.y1 = y1;

	this.x2 = x2;
	this.y2 = y2;

	this.size =function(){
		return abs(sqrt(pow((this.x1-this.x2),2)+pow((this.y1-this.y2),2)));
	};
}
