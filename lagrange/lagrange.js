function Interpolation() {
  this.poly = new Poly([]);
  this.pols = [];
  this.texts = function() {
    var result = "";
    for (var i = 0; i < this.pols.length; i++) {
      result += this.pols[i].text() + "\n";
    }
    return result;
  }
  this.calc = function(cloud) {
    this.storePols(cloud);
    this.poly = new Poly([]);
    for (var i = 0; i < cloud.points.length; i++) {
      var factor = this.pols[i];
      factor.multByNumber(cloud.points[i].pos.y);
      this.poly.add(factor);
      console.log(factor.text())
    }
  }
  this.storePols = function(cloud) {
    this.pols = [];
    for (var i = 0; i < cloud.points.length; i++) {
      this.pols.push(this.calcPol(cloud, cloud.points[i]));
    }
    console.log(this.texts());
  }
  this.calcPol = function(cloud, point) {
    var pol = arrayToPoly([
      [1, 0]
    ]);
    for (var i = 0; i < cloud.points.length; i++) {
      if (point.pos.x != cloud.points[i].pos.x && point.pos.y != cloud.points[i].pos.y) {
        var delta = point.pos.x - cloud.points[i].pos.x;
        var factor = arrayToPoly([
          [1 / delta, 1],
          [cloud.points[i].pos.x / delta, 0]
        ]);
        //console.log(factor.text());
        pol.mult(factor)
      }
    }
    return pol;
  }


  /*
    this.calc = function(cloud) {
      this.pols = [];
      var result = 0;
      if (cloud.points.length > 1) {
        for (var j = 0; j < cloud.points.length; j++) {
          var y_j = cloud.points[j].pos.y;
          var x_j = cloud.points[j].pos.x;
          var s_j = arrayToPoly([
            [y_j, 0]
          ]);
          for (var i = 0; i < j; i++) {
            var x_i = cloud.points[i].pos.x;
            var delta = x_j - x_i;
            var factor = arrayToPoly([
              [1 / delta, 1],
              [x_i / delta, 0]
            ]);
            s_j.mult(factor);
          }
          for (var i = j + 1; i < cloud.points.length; i++) {
            var x_i = cloud.points[i].pos.x;
            var delta = x_j - x_i;
            var factor = arrayToPoly([
              [1 / delta, 1],
              [x_i / delta, 0]
            ]);
            s_j.mult(factor);
          }

          this.pols.push(s_j);
          if (result == 0) {
            result = s_j
          } else {
            result.add(s_j);
          }
        }
        this.poly = result;
      } else {
        this.poly = arrayToPoly([
          [cloud.points[0].pos.y, 0]
        ]);
      }
    }
  */
}
