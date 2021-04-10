var s=2.4;
var d=0.0005;

var c=0;
var p=0;
var p2=0;

function setup() {
    createCanvas(windowWidth,windowHeight);
    background(0);
    frameRate(3000);
    stroke(255);
    strokeWeight(1);
    textSize(20);
    fill(255);
}

function draw() {
    if(s+d<=4){
        s+=d;
        var ln=logistic(s);
        colorMode(RGB);
        stroke(255);
        strokeWeight(1);
        for(var k=0;k<ln.length;k++){
            point(map(s,2.4,4,0,width),map(ln[k],0,1,height,0));
        }
        if(rnd(c,2)!=rnd(Math.log(ln.length)/Math.log(2),2)){
            colorMode(HSB);
            line(map(s,2.4,4,0,width),height,map(s,2.4,4,0,width),height-50);
            if(30*(p+2)>height){
                p=0;
                p2++;
            }
            strokeWeight(0);
            //text(rnd(s,4),30+75*p2,50+30*p);
            p++;
        }
        c = Math.log(ln.length)/Math.log(2);
       // console.log("r="+parseFloat(rnd(s,3))+" x="+ln.toString());
    }
    else {
        noLoop();
    }
}

function logistic(w){
    var r=[];
    var x1=0.5;
    var s1=w;
    var points=[];
    for(var i=0;i<1000000;i++){
        x1=s1*x1*(1-x1);
        if(1000000-i<10000){
            r.push(rnd(x1,10));
        }
    }
    for(var i=0;i<r.length;i++){
        if(points.indexOf(r[i])<0){
            if(count(r,r[i])>40){
                points.push(r[i]);
            }
        }
    }
    return points;
}
function count(array,element){
    var r=0;
    for(var i=0;i<array.length;i++){
        if(array[i]==element){
            r++;
        }
    }
    return r;
}

function rnd(n,e){
    return Math.round(n*pow(10,e))/pow(10,e);
}

Array.prototype.removeDuplicates = function (){
  var temp=new Array();
  label:for(i=0;i<this.length;i++){
        for(var j=0; j<temp.length;j++ ){//check duplicates
            if(temp[j]==this[i])//skip if already present
               continue label;
        }
        temp[temp.length] = this[i];
  }
  return temp;
 }
