function Point(x, y) {
    this.x = x;
    this.y = y;
    this.display = function() {
        point(x, y);
    }
    this.distance = function(other) {
        sqdist = Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
        return Math.sqrt(sqdist);
    }
}

function Segment(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.len = function() {
        return p1.distance(p2);
    }
    this.display = function() {
        line(p1.x, p1.y, p2.x, p2.y);
    }
    this.intersects = function(other) {
        return true;
    }
}
