function Mine(cols, n, size) {
    this.cols = cols;
    this.cols = cols;
    this.n = n;
    this.size = size || 20;
    this.covers = [];
    this.numbers = [];
    this.gameover = false;
    this.new = function(k) {
        //Displace bombs
        this.gameover = false;
        for (var n = 0; n < this.cols * this.cols; n++) {
            this.numbers[n] = 0;
            this.covers[n] = true;
        }
        for (var b = 0; b < this.n; b++) {
            var n = floor(random(cols * cols-1));
            if (this.numbers[n] == -1) {
                b--;
            } else {
                this.numbers[n] = -1;
            }
        }
        for (var i = 0; i < this.cols * this.cols; i++) {
            var y = floor(i / this.cols);
            var x = i - y * this.cols;
            // x y to coords => n=y*cols+x
            if (this.numbers[i] == 0) {
                this.numbers[i] = 0;
                if (this.numbers[y * this.cols + x - 1] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[y * this.cols + x + 1] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[(y - 1) * this.cols + x] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[(y + 1) * this.cols + x] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[(y + 1) * this.cols + x + 1] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[(y + 1) * this.cols + x - 1] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[(y - 1) * this.cols + x + 1] == -1) {
                    this.numbers[i]++;
                }
                if (this.numbers[(y - 1) * this.cols + x - 1] == -1) {
                    this.numbers[i]++;
                }
            }
        }

    }
    this.grid = function() {
        stroke(100);
        strokeWeight(3);
        for (var i = 0; i <= width; i += this.size) {
            line(i, 0, i, height);
        }
        for (var j = 0; j <= width; j += this.size) {
            line(0, j, width, j);
        }
    }
    this.display = function() {
        for (var i = 0; i < this.cols * this.cols; i++) {
            if (this.covers[i]) {
                var y = floor(i / this.cols);
                var x = i - y * this.cols;
                fill(150, 150, 150);
                rect(x * this.size, y * this.size, this.size, this.size);
                fill(255);
                //text(this.numbers[i], x * this.size + this.size / 2, y * this.size + this.size / 2);

            } else {
                if (this.numbers[i] > 0) {
                    var y = floor(i / this.cols);
                    var x = i - y * this.cols;
                    fill(255);
                    text(this.numbers[i], x * this.size + this.size / 2, y * this.size + this.size / 2);
                }
            }
            if (this.numbers[i] == -1 && this.gameover) {
                var y = floor(i / this.cols);
                var x = i - y * this.cols;
                fill(255, 0, 0);
                rect(x * this.size, y * this.size, this.size, this.size);

            }
            if (this.gameover) {
                textSize(90);
                var s = "GAME OVER";
                noStroke();
                fill(0, 255, 0);
                text(s, width / 2 - textWidth(s) / 2, height / 2);
                textSize(12);

            }

        }
    }
    this.hover = function() {
        fill(255, 255 / 2);
        var x = floor(mouseX / this.size);
        var y = floor(mouseY / this.size);
        var n = y * this.cols + x;
        if (this.covers[n]) {
            rect(x * this.size, y * this.size, this.size, this.size);
        } else if (this.numbers[n] > 0) {
            fill(0, 0, 255, 50);
            if (this.covers[y * this.cols + x + 1]) {
                rect((x + 1) * this.size, y * this.size, this.size, this.size);
            }
            if (this.covers[y * this.cols + x - 1]) {
                rect((x - 1) * this.size, y * this.size, this.size, this.size);
            }
            if (this.covers[(y + 1) * this.cols + x]) {
                rect(x * this.size, (y + 1) * this.size, this.size, this.size);
            }
            if (this.covers[(y - 1) * this.cols + x]) {
                rect(x * this.size, (y - 1) * this.size, this.size, this.size);
            }
            if (this.covers[(y + 1) * this.cols + x + 1]) {
                rect((x + 1) * this.size, (y + 1) * this.size, this.size, this.size);
            }
            if (this.covers[(y - 1) * this.cols + x - 1]) {
                rect((x - 1) * this.size, (y - 1) * this.size, this.size, this.size);
            }
            if (this.covers[(y - 1) * this.cols + x + 1]) {
                rect((x + 1) * this.size, (y - 1) * this.size, this.size, this.size);
            }
            if (this.covers[(y + 1) * this.cols + x - 1]) {
                rect((x - 1) * this.size, (y + 1) * this.size, this.size, this.size);
            }
        }
    }
    this.click = function() {
        var i = floor(mouseX / this.size);
        var j = floor(mouseY / this.size);
        var n = i + j * this.cols;
        if (this.numbers.length == 0) {
            this.new(n);
        }
        console.log(this.numbers[n]);
        if (this.numbers[n] >= 0) {
            this.uncover(n);
        }
        if (this.gameover) {
            for (var i = 0; i < this.covers.length; i++) {
                this.covers[i] = true;
            }
            this.gameover = false;
        }
        if (this.numbers[n] == -1) {
            this.die();
            console.log("GAME OVER");
        }

    }
    this.uncover = function(n) {
        var y = floor(n / this.cols);
        var x = n - y * this.cols;
        if (this.covers[n]) {
            if (this.numbers[n] == 0) {
                this.covers[n] = false;

                this.uncover(y * this.cols + x - 1);

                this.uncover(y * this.cols + x + 1);

                this.uncover((y + 1) * this.cols + x);

                this.uncover((y - 1) * this.cols + x);

                this.uncover((y - 1) * this.cols + x - 1);

                this.uncover((y + 1) * this.cols + x + 1);

                this.uncover((y + 1) * this.cols + x - 1);

                this.uncover((y - 1) * this.cols + x + 1);


            } else if (this.numbers[n] > 0) {
                this.covers[n] = false;
            }
        }

    }
    this.uncovered = function() {
        var r = 0;
        for (var i = 0; i < this.covers.length; i++) {
            if (this.covers[i]) {} else {
                r++;
            }
        }
        return r;
    }
    this.checkwin = function() {
        if (this.uncovered() + this.n == this.cols * this.cols) {
            alert("You win!");
            this.new(1);
        }
    }
    this.die = function() {
        this.gameover = true;
        for (var i = 0; i < this.covers.length; i++) {
            this.covers[i] = false;
        }
    }
}
