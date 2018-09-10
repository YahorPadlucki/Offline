var Level = (function () {

    function Level() {

        this.columns = GameModel.getInstance().columns;
        this.rows = GameModel.getInstance().rows;
        this.tileSize = GameModel.getInstance().TILE;
        this.level = GameModel.getInstance().level;
    }


    Level.prototype.draw = function () {

        var model=GameModel.getInstance();
        var ctx = model.ctx;

        if(model.prevLevelImageData){
            // model.prevLevelImageData.width = 200;
            // model.prevLevelImageData.height = 200;
            ctx.putImageData(model.prevLevelImageData,50,50);
        }


        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                if (this.level[i][j] === 1) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);

                }
                if (this.level[i][j] === 2) {
                    ctx.fillStyle = "#ff1037";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);

                }
                if (this.level[i][j] === 3) {
                    if (GameModel.getInstance().levelCompleted)
                        ctx.fillStyle = "#000000";
                    else
                        ctx.fillStyle = "#8a8b87";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);

                }


            }
        }
    };


    return Level;
}());