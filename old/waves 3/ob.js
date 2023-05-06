function def(){
  a = [];
  b = [];
  // FIRST CHANNEL EQUATIONS
  for (n = 0; n < n_a; n++) {
      a.push({
          amplitude: random(100, 150) / n_a,
          frequency: freqs.rand(),
          phase: random(1)
      });
  }

  // SECOND CHANNEL EQUATIONS
  for (n = 0; n < n_b; n++) {
      b.push({
          amplitude: random(100, 150) / n_b,
          frequency: freqs.rand(),
          phase: random(1)
      });
  }
}

function json_export(a, b) {
    var result = "a =" + JSON.stringify(a, null, 1) + ";\n\n";
    result += "b =" + JSON.stringify(b, null, 1) + ";";
    document.getElementById('download').download = "config-" + Math.round(random(1000)) + ".json";
    document.getElementById('download').href = 'data:application/json;charset=utf-8,' + encodeURIComponent(result);
    downloaded = false;
}

function wave_sum(x, waves) {
    var result = 0;
    for (var j = 0; j < waves.length; j++) {
        result += waves[j].amplitude * sin((waves[j].frequency / (2 * PI)) * x + waves[j].phase * (PI / 2))
    }
    return result;
}

function Box(x, y, wdt, hgt, z) {
    this.x = x;
    this.y = y;
    this.w = wdt;
    this.h = hgt;
    this.z = z;
    this.display = function() {
        push();
        fill(50);
        stroke(200);
        rect(this.x, this.y, this.w, this.h);
        line(this.x + this.w / 2, this.y, this.x + this.w / 2, this.y + this.h);
        line(this.x, this.y + this.h / 2, this.x + this.w, this.y + this.h / 2);
        translate(this.x + this.w / 2, this.y + this.h / 2);
        for (var s = -this.w / 2 / this.z; s < this.w / 2 / this.z; s += 1) {
            d = s / 1000;
            strokeWeight(1);

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
    }
}

Array.prototype.rand = function() {
    return this[Math.floor(Math.random() * this.length)]
}
