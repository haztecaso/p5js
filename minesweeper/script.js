var cols=31;
var bombs;
var s=25;
var mine;
function setup() {
    if(windowHeight<=windowWidth){
        s=(windowHeight/cols);
    }
    else{
        s=(windowWidth/cols);
    }

    createCanvas(cols*s, cols*s);
    background(0);
    bombs=floor(cols*cols*0.1);
    mine = new Mine(cols,bombs,s);
    for(var i =0; i<cols*cols;i++){
        mine.covers[i]=true;
    }
    console.log("There are "+bombs+" bombs.");
}

function draw() {
    background(0);
    mine.grid();
    mine.display();
    mine.hover();
    mine.checkwin();
}

function mouseClicked() {
  mine.click();
}
function windowResized() {
    if(windowHeight<=windowWidth){
        s=(windowHeight/cols);
    }
    else{
        s=(windowWidth/cols);
    }
    mine.size=s;
    resizeCanvas(cols*s, cols*s);
}
