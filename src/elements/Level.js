var Level = (function () {

    function Level() {

        this.columns = GameModel.getInstance().columns;
        this.rows = GameModel.getInstance().rows;
        this.tileSize = GameModel.getInstance().TILE;
        this.level = GameModel.getInstance().level;
    }


    Level.prototype.draw = function () {
        var ctx = GameModel.getInstance().ctx;
        ctx.fillStyle = "#000000";
        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                if (this.level[i][j] == 1) {
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    };


    return Level;
}());