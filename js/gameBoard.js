class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.points = this.cleanGameBoard(this.width, this.height);
        this.defaultColor = "#ffffff";
    }

    drawGameBoard() {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points[i].length; j++) {
                this.drawSinglePoint(j, i, this.points[i][j].color, this.points[i][j].placed);
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

    drawSinglePoint(x, y, color, pl) {
        if(color === null) {color = this.defaultColor;}
        let newPoint = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const newPointId = x + "-" + y;
        newPoint.id = newPointId;
        $("#gameBoard").append(newPoint);
        $("#" + newPointId).attr({
            "x": x * 50,
            "y": y * 50,
            "width": "50px",
            "height": "50px",
            "fill": color,
            "stroke": "black",
            "stroke-width": 1,
        });
        let newTextPoint =document.createElementNS('ttp://www.w3.org/2000/svg', 'text');
        newTextPoint.id = "t" + newPointId;
        $("#gameBoard").append(newTextPoint);
        $("#t" + newPointId).attr({
            "x": x * 50,
            "y": y * 50,
            "fill": "#000000",
            "font-size": 45,
            "font-family": "Verdana",
        });
        $("#t" + newPointId).text(pl);
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
        let tmp = [0, 0];
        for (let i = 0; i < 4; i++) {
            if (block.points[i].y < 0 &&
                this.points[0][block.points[i].x + side].placed === false) {
                return false;
            } else if (block.points[i].y < 0 || block.points[i].x >= this.width ||
                block.points[i].x < 0 ||
                this.points[tmp[1]][block.points[i].x + side].placed === true) {
                return true;
            }
        }
        return false;
    }

    placeFigure(block) {
        for(let i = 0; i < 4; i++) {
            if(this.points[block.points[i].y] === undefined) {
                alert("koniec gry");
                resetGame();
            }
            this.points[block.points[i].y][block.points[i].x].placed = true;
        }
    }

    pickNewFigure() {
        return figures[Math.floor(Math.random() * figures.length)];
    }

    pickNewColor(oldColor) {
        let colorId = Math.floor(Math.random() * colors.length);
        if (oldColor === null) {
            return colors[colorId];
        }
        if (colors[colorId] === oldColor) {
            pickNewColor(oldColor);
        }
        return colors[colorId];
    }

    checkFilledRow() {
        for (let i = 0; i < this.height; i++) {
            let tmp = 0;
            for (let j = 0; j < this.width; j++) {
                if (this.points[i][j].placed) {
                    tmp++;
                }
            }
            if(tmp === this.points[i].length) {
                this.cleanRow(i);
            }
        }
        this.drawGameBoard();
    }

    cleanRow(rowId) {
        for (let i = 0; i < this.points[rowId].length; i++) {
            this.points[rowId][i].placed = false;
            this.points[rowId][i].color = this.defaultColor;
        }
        for (let i = rowId; i >= 0; i--) {
            for (let j = 0; j < this.points[rowId].length; j++) {
                if (i > 0) {
                    this.points[i][j].placed = this.points[i - 1][j].placed;
                    this.points[i][j].color = this.points[i - 1][j].color;
                } else {
                    this.points[i][j].placed = false;
                    this.points[i][j].color = null;
                }
            }
        }
    }
}