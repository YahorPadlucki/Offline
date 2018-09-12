var Server = (function () {
    function Server() {

        this.columns = GameModel.getInstance().columns;
        this.rows = GameModel.getInstance().rows;
        this.tileSize = GameModel.getInstance().TILE;
        this.level = GameModel.getInstance().level;
    }


    Server.prototype.draw = function () {

        var lifes = GameModel.getInstance().lifes;
        var model = GameModel.getInstance();
        var ctx = model.ctx;


        ctx.fillStyle = "#694a15";
        ctx.fillRect(3 * this.tileSize, 3 * this.tileSize, this.tileSize * 2, this.tileSize * 4);


        ctx.fillStyle = "#09e900";
        if (lifes === 0)
            ctx.fillStyle = "#ff1037";


        ctx.fillRect(3 * this.tileSize + 10, 3 * this.tileSize + 10, 10, 10);

        for (var i = 0; i < 3; i++) {

            if (i <= lifes - 1)
                ctx.fillStyle = "#ffcf3d";
            else
                ctx.fillStyle = "#ff1037";

            ctx.fillRect(3 * this.tileSize + 10 * (i + 1) + 3 * i, 3 * this.tileSize + 40, 10, 10);
        }


    };

    return Server;

}());