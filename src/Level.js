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



        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {

                var tile = this.level[i][j];


                if (this.level[i][j] === 1) {

                    ctx.fillStyle = "#000000";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);

                }

                if (this.level[i][j] === 8) {
                    ctx.fillStyle = "#ff1037";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);

                }

                var angle = null;
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

        if(model.showTutor)
        {
            ctx.fillStyle = "#343434";
            ctx.font = "20px arial";
            ctx.fillText("press up arrow to fix", 50,25);

            ctx.fillStyle = "#343434";
            ctx.font = "20px arial";
            ctx.fillText("press down arrow to fix", 270,25);
        }


        if(model.currentLevel===1)
        {
            ctx.fillStyle = "#343434";
            ctx.font = "20px arial";
            ctx.fillText("You will need to use all the arrow keys to get online!", 50,25)
        }


        if(model.currentLevel===2)
        {
            ctx.fillStyle = "#343434";
            ctx.font = "20px arial";
            ctx.fillText("Internet is hard! But you can Do It!", 100,25)
        }

        if(model.currentLevel===3)
        {
            ctx.fillStyle = "#343434";
            ctx.font = "20px arial";
            ctx.fillText("That's how dial up looks like!", 100,25)
        }

        if(model.currentLevel===4)
        {
            ctx.fillStyle = "#343434";
            ctx.font = "20px arial";
            ctx.fillText("U are the winner! Thanks for playing!", 80,25)
        }


    };

    Level.prototype.drawArrow = function (context, x, y, x_center, y_center, rotationAngle) {

        var angle;
        var arrowLineX;
        var arrowLineY;
        var r = 10;

        context.fillStyle = "#ffffff";

        context.fillRect(x, y, this.tileSize, this.tileSize)

        context.beginPath();
        angle = rotationAngle * Math.PI / 180;
        arrowLineX = r * Math.cos(angle) + x_center;
        arrowLineY = r * Math.sin(angle) + y_center;
        context.fillStyle = "#ff1037";

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