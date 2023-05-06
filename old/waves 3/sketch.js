var a = [];
var b = [];

var n_a = 3;
var n_b = 3;

var freqs = [200, 100, 50, 300, 400];
var zoom = 7;
var box;
var downloaded = false;
var id =[0,0];
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    background(0);
    frameRate(300);
    id[0]=Math.round(random(1000));
    def();
    json_export(a, b);
    box = new Box(width - 315, height - 215, 300, 200, 0.3);
}

function draw() {
    var t = frameCount / 2000;
    // background(0,map(noise(t/2000),0,1,0*255*1/5,255*2/5));
    background(0,0.001);
    // box.display();


    translate(width / 2, height / 2);
    for (var i = frameCount; i <= frameCount + 1; i += 0.001) {
        zoom = map(0, 10,-1, 1, 8.7+cos(t*10)*sin(t/2+3)*12);
        var x = wave_sum(frameCount + i, a);
        var y = wave_sum(frameCount + i, b);

        // strokeWeight(1*map(noise(t*100), -1,1, 5, 200));
        // stroke(1, noise(sin(t)*10)*3, 10, 10);

        strokeWeight(map(noise(100*t*map(noise(t*10)*5,0,1, 1,1.7)), 0,1, 1, 100));
        // strokeWeight(1*map(-1,1,0,255,cos(t)));
        
        stroke(map(cos(t*7773+.43), -1, 1, 0.000001, 150), map(sin(t*300+.5), -1, 1, 0.00001, 155),map(sin(t*2000*sin(t*2+0.2)+.7), -1, 1, 100, 55));
        point(zoom * x, zoom * y);
    }
}

function mousePressed() {
        def();
        json_export(a, b);9

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    box.x = width - 315;
    box.y = height - 215;
}
