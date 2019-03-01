class Block {
    constructor(figure, color) {
        this.points = JSON.parse(JSON.stringify(figure.points));
        this.color = color;
        this.permutations = JSON.parse(JSON.stringify(figure.permutations));
        this.currentRotation = 0;
    }

    getColor() {
        return this.color;
    }

    getPosition() {
        return this.points;
    }

    moveDown() {
        for(let i = 0; i < 4; i++) {
            this.points[i].y++;
        }
    }

    moveLeft() {
        for(let i = 0; i < 4; i++) {
            this.points[i].x--;
        }
    }

    moveRight() {
        for(let i = 0; i < 4; i++) {
            this.points[i].x++;
        }
    }

    moveUp() {
        for(let i = 0; i < 4; i++) {
            this.points[i].x--;
        }
    }

    rotate() {
        this.currentRotation += 1;
        if (this.currentRotation >= this.permutations.lenght) {
            this.currentRotation = 0;
        }
        for(let i = 0; i < this.points.lenght; i++) {
            this.points[i].x += this.permutations[currentRotation][i].x;
            this.points[i].y += this.permutations[currentRotation][i].y;
        }
    }
}