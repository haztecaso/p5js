function Monom(coef, exp) {
  this.coef = coef;
  this.exp = exp;
  this.add = function(monom) {
    if (this.exp == monom.exp) {
      this.coef = this.coef + monom.coef;
    }
  }

  this.mult = function(monom) {
    this.coef = this.coef * monom.coef;
    this.exp = this.exp + monom.exp;
  }
  this.eval = function(x) {
    return this.coef * pow(x, this.exp);
  }
  this.text = function() {
    var result = "";
    if (this.coef == 1) {
      if (this.exp == 0) {
        result = "1"
      } else {
        result = ""
      }
    } else if (this.coef == -1) {
      if (this.exp == 0) {
        result = "-1";
      } else {
        result = "-";
      }
    } else if (this.coef < 0) {
      result = "-";
      result += -round(this.coef*1000)/1000;
    } else {
      result += round(this.coef*1000)/1000;
    }
    if (this.exp == 0) {
      result += "";
    } else if (this.exp == 1) {
      result += "x";
    } else {
      result += "x^";
      result += this.exp;
    }
    return result;
  }
}

function Poly(monoms) {
  this.monoms = monoms;
  this.text = function() {
    var result = "y=";
    for (var i = 0; i < this.monoms.length; i++) {
      if (i + 1 != this.monoms.length) {
        if (this.monoms[i + 1].coef > 0) {
          result += this.monoms[i].text() + "+";
        } else {
          result += this.monoms[i].text();
        }
      } else {
        result += this.monoms[i].text();
      }
    }
    return result;
  }
  this.comp = function() {
    var len = this.monoms.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (this.monoms[j - 1].exp > this.monoms[j].exp) {
          var temp = this.monoms[j - 1];
          this.monoms[j - 1] = this.monoms[j];
          this.monoms[j] = temp;
        }
      }
    }
    for (var i = 0; i < this.monoms.length; i++) {
      for (var j = 0; j < this.monoms.length; j++) {
        if (this.monoms[i].exp == this.monoms[j].exp && i != j) {
          this.monoms[i].add(this.monoms[j]);
          this.monoms.splice(j, 1);
        }
      }
    }
    for (var i = 0; i < this.monoms.length; i++) {
      if (this.monoms[i].coef == 0) {
        this.monoms.splice(i, 1);
      }
    }
    this.monoms.reverse();
  }
  this.add = function(poly) {
    for (var i = 0; i < poly.monoms.length; i++) {
      append(this.monoms, poly.monoms[i]);
    }
    this.comp();
    return this.text();
  }
  this.mult = function(poly) {
    var m = this.monoms;
    this.monoms = [];
    for (var i = 0; i < m.length; i++) {
      for (var j = 0; j < poly.monoms.length; j++) {
        append(this.monoms, mult_monoms(m[i], poly.monoms[j]));
      }
    }
    this.comp();
    return this.text();
  }
  this.multByNumber = function(n) {
    for (var i = 0; i < this.monoms.length; i++) {
      this.monoms[i].coef = this.monoms[i].coef * n;
    }
    return this.text();
  }
  this.eval = function(x) {
    this.comp();
    var result = 0;
    for (var i = 0; i < this.monoms.length; i++) {
      result += this.monoms[i].eval(x);
    }
    return result;
  }
  this.comp();
}

function arrayToPoly(array) {
  var monoms = [];
  for (var i = 0; i < array.length; i++) {
    append(monoms, new Monom(array[i][0], array[i][1]));
  }
  return new Poly(monoms);
}

function mult_monoms(monom1, monom2) {
  var coef = monom1.coef * monom2.coef;
  var exp = monom1.exp + monom2.exp;
  return new Monom(coef, exp);
}
