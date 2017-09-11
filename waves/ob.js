function def(n_a, n_b) {
    background(0);
    a = [];
    b = [];
    // FIRST CHANNEL EQUATIONS
    for (n = 0; n < n_a; n++) {
        a.push({
            type: ["sin"].rand(),
            amplitude: random(100, 150) / n_a,
            frequency: freqs.rand(),
            phase: random(1)
        });
    }

    // SECOND CHANNEL EQUATIONS
    for (n = 0; n < n_b; n++) {
        b.push({
            type: ["sin"].rand(),
            amplitude: random(100, 150) / n_b,
            frequency: freqs.rand(),
            phase: random(1)
        });
    }
}

function load(json) {
    var data = new Object();
    data.func = json;
    var jsonVal = JSON.stringify(data);
    var newObj = JSON.parse(jsonVal);
    console.log("loaded");
    background(0);
    eval(newObj.func);
}

function json_export(a, b) {
    var result = "a =" + JSON.stringify(a, null, 1) + ";\n\n";
    result += "b =" + JSON.stringify(b, null, 1) + ";";
    document.getElementById('download').download = "config-" + Math.round(random(1000)) + ".json";
    document.getElementById('download').href = 'data:application/json;charset=utf-8,' + encodeURIComponent(result);
    downloaded = false;
}
document.addEventListener('DOMContentLoaded', function() {
    document.forms['form'].elements['config_file'].onchange = function(evt) {
      console.log("triggered");
        if (!window.FileReader) return; // Browser is not compatible
        var reader = new FileReader();
        reader.onload = function(evt) {
            if (evt.target.readyState != 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }
            filecontent = evt.target.result;
            load(filecontent);
        };
        reader.readAsText(evt.target.files[0]);
    };
});


function wave_sum(x, waves) {
    var result = 0;
    for (var j = 0; j < waves.length; j++) {
        switch (waves[j].type) {
            case "sin":
                result += waves[j].amplitude * sin((waves[j].frequency / (2 * PI)) * x + waves[j].phase * (PI / 2));
                break;
            case "cos":
                result += waves[j].amplitude * cos((waves[j].frequency / (2 * PI)) * x + waves[j].phase * (PI / 2));
                break;
            case "square":
                result += waves[j].amplitude * sq((waves[j].frequency / (2 * PI)) * x + waves[j].phase * (PI / 2));
                break;
            case "triangle":
                result += waves[j].amplitude * tr((waves[j].frequency / (2 * PI)) * x + waves[j].phase * (PI / 2));
                break;
        }

    }
    return result;
}

function Box(x, y, wdt, hgt, z) {
    this.x = x;
    this.y = y;
    this.w = wdt;
    this.h = hgt;
    this.z = z;
    this.view = true;
    this.display = function() {
        if (this.view) {
            push();
            fill(50);
            stroke(200);
            strokeWeight(1);
            rect(this.x, this.y, this.w, this.h);
            line(this.x + this.w / 2, this.y, this.x + this.w / 2, this.y + this.h);
            line(this.x, this.y + this.h / 2, this.x + this.w, this.y + this.h / 2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            for (var s = -this.w / 2 / this.z; s < this.w / 2 / this.z; s += 1) {
                d = s / 1000;

                var alpha = wave_sum(d, a);
                var beta = wave_sum(d, b);

                stroke(255, 100, 100);
                point(s * this.z, alpha * this.z);
                stroke(100, 100, 255);
                point(s * this.z, beta * this.z);
                stroke(200, 200, 200);
                point(s * this.z, ((alpha + beta) / 2) * this.z);
            }
            pop();
        } else {
            fill(0);
            stroke(0);
            strokeWeight(3);
            rect(this.x, this.y, this.w, this.h);
        }
    };
    this.update = function(x, y, wdt, hgt,z){
      this.x = x;
      this.y = y;
      this.w = wdt;
      this.h = hgt;
      this.z = z;
    };
    this.toggle = function() {
        if (this.view) {
            this.view = false;
        } else {
            this.view = true;
        }
    };
}

function refresh() {
    def(ns.rand(), ns.rand());
    json_export(a, b);
}

function sgn(x) {
    if (x > 0) {
        return 1;
    } else {
        if (x < 0) {
            return -1;
        } else {
            return 0;
        }
    }
}

function sq(x) {
    return sgn(sin(x));
}
function zoom_button(delta){
  background(0);
  zoom+=delta;
}
function tr(x) {
    var a = (2 / PI) * (x - PI * (floor(x / PI + 1 / 2))) * ((-1) ** floor(x / PI + 1 / 2));
    return a;
}

Array.prototype.rand = function() {
    return this[Math.floor(Math.random() * this.length)]
}
