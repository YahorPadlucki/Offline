var Level = (function () {

    function Level() {

        this.columns = GameModel.getInstance().columns;
        this.rows = GameModel.getInstance().rows;
        this.tileSize = GameModel.getInstance().TILE;
        this.level = GameModel.getInstance().level;
    }


    Level.prototype.draw = function () {

        var model = GameModel.getInstance();
        var ctx = model.ctx;

        if (model.prevLevelImageData) {
            // model.prevLevelImageData.width = 200;
            // model.prevLevelImageData.height = 200;
            ctx.putImageData(model.prevLevelImageData, 50, 50);
        }


        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                if (this.level[i][j] === 1) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);

                }
                var angle = null;
                var tile = this.level[i][j];
                if (tile === 2) { //up
                    angle = 270
                }
                if (tile === 3) { //right
                    angle = 360
                }
                if (tile === 4) { //down
                    angle = 90
                }
                if (tile === 5) { //left
                    angle = 180
                }
                if (angle)
                    this.drawArrow(ctx, j * this.tileSize, i * this.tileSize, j * this.tileSize + this.tileSize / 2, i * this.tileSize + this.tileSize / 2, angle)


            }
        }
    };

    Level.prototype.drawArrow = function (context, x, y, x_center, y_center, rotationAngle) {

        var angle;
        var arrowLineX;
        var arrowLineY;
        var r = 10;

        context.fillStyle = "#ff1037";

        context.fillRect(x, y, this.tileSize, this.tileSize)

        context.beginPath();
        angle = rotationAngle * Math.PI / 180;
        arrowLineX = r * Math.cos(angle) + x_center;
        arrowLineY = r * Math.sin(angle) + y_center;
        context.fillStyle = "#ffffff";

        context.moveTo(arrowLineX, arrowLineY);
        // context.fillRect(x_center-2.5, y_center, 5, -15)


        angle += (1 / 3) * (2 * Math.PI);
        arrowLineX = r * Math.cos(angle) + x_center;
        arrowLineY = r * Math.sin(angle) + y_center;

        context.lineTo(arrowLineX, arrowLineY);


        angle += (1 / 3) * (2 * Math.PI);
        arrowLineX = r * Math.cos(angle) + x_center;
        arrowLineY = r * Math.sin(angle) + y_center;

        context.lineTo(arrowLineX, arrowLineY);


        context.closePath();

        context.fill();
    };


    return Level;
}());