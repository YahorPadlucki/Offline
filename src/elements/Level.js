var Level = (function () {

    function Level() {

        this.columns = 10;
        this.rows = 10;
        this.tileSize = GameModel.getInstance().TILE;

        this.level = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

    }


    Level.prototype.draw = function () {
        var ctx = GameModel.getInstance().ctx;
        ctx.fillStyle = "#000000";
        for(i=0;i<this.rows;i++){
            for(j=0;j<this.columns;j++){
                if(this.level[i][j]==1){
                    ctx.fillRect(j*this.tileSize,i*this.tileSize,this.tileSize,this.tileSize);
                }
            }
        }
    };


    return Level;
}());