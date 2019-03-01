class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.points = this.cleanGameBoard(this.width, this.height);
    }

    drawGameBoard() {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points[i].length; j++) {
                this.drawSinglePoint(j, i, this.points[i][j].color);
            }
        }
    }

    cleanGameBoard(x, y) {
        let points = [];
        for (let i = 0; i < y; i++) {
            let tmp = [];
            for (let j = 0; j < x; j++) {
                tmp.push({"color": null, "placed": false});
            }
            points.push(tmp);
        }
        return points;
    }

    drawSinglePoint(x, y, color) {
        if(color === null) {color = "#00ff00";}
        let newPoint = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const newPointId = x + "-" + y;
        newPoint.id = newPointId;
        $("#gameBoard").append(newPoint);
        $("#" + newPointId).attr({
            "x": x * 50,
            "y": y * 50,
            "width": "50px",
            "height": "50px",
            "fill": color
        });
    }

    drawFigure(block) {
        for(let i = 0; i < 4; i++) {
            this.drawSinglePoint(block.points[i].x, block.points[i].y, block.color);
        }
    }

    mergeFigure(block) {
        for(let i = 0; i < 4; i++) {
            if(block.points[i].y >= 0) {
                for (let j = 0; j < this.points.length; j++) {
                    for (let k = 0; k < this.points[j].length; k++) {
                        if(k === block.points[i].x &&
                            j === block.points[i].y) {
                            this.points[j][k].color = block.color;
                        }
                    }
                }
            }
        }
    }

    removeFigure(block) {
        for(let i = 0; i < 4; i++) {
            if(block.points[i].y >= 0) {
                for (let j = 0; j < this.points.length; j++) {
                    for (let k = 0; k < this.points[j].length; k++) {
                        if(k === block.points[i].x &&
                            j === block.points[i].y) {
                            this.points[j][k].color = null;
                        }
                    }
                }
            }
        }
    }

    checkConflict(block) {
        for (let i = 0; i < 4; i++) {
            if (block.points[i].y >= this.height - 1 || (
                    block.points[i].y >= 0 &&
                    this.points[block.points[i].y + 1][block.points[i].x].placed === true
                    )
                ){
                return true;
            }
        }
        return false;
    }

    checkHorizontalConflict(block, side) {
        for (let i = 0; i < 4; i++) {
            if (block.points[i].x >= this.width - 1 || block.points[i].x < 0 || (
                    this.points[block.points[i].y][block.points[i].x + side].placed === true
                    )
                ){
                return true;
            }
        }
        return false;
    }

    placeFigure(block) {
        for(let i = 0; i < 4; i++) {
            this.points[block.points[i].y][block.points[i].x].placed = true;
        }
    }

    pickNewFigure() {
        return figures[Math.floor(Math.random() * figures.length)];
    }
}