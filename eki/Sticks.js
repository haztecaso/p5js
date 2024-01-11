class Stick {
    constructor(pos, angleDelta) {
        this.pos = pos;
        this.angleDelta = angleDelta;
    }
    draw() {
        push()
        translate(width / 2, height / 2);
        scale(p.shape.scale)
        translate(this.pos.x, this.pos.y);
        rotate(atan2(this.pos.y, this.pos.x) + this.angleDelta);
        line(-p.shape.length / 2 + p.shape.weight / 2, 0, p.shape.length / 2 - p.shape.weight / 2, 0);
        pop()
    }
}

class StickCollection {
    constructor(sticks = []) {
        this.sticks = sticks
    }
    draw() {
        this.sticks.forEach((stick) => stick.draw())
        stick.draw()
    }
    push(stick) {
        this.sticks.push(stick);
    }
}

class StickRing extends StickCollection {
    constructor(diameter, number, iter) {
        for (let i = 0; i < number; i += 1) {
            const angleIncrement = p.grid.angleIncrement + p.grid.angleIncrementB;
            const angle = iter * angleIncrement * PI / 180 + i * TAU / number;
            const pos = createVector(cos(angle), sin(angle))
            pos.setMag(diameter)
            this.push(new Stick(pos, iter * p.dir.angleDeltaI * PI / 180))
        }
    }
}
