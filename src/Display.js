var Display = (function () {
    function Display() {
        this.tileSize = GameModel.getInstance().TILE;
    }


    Display.prototype.draw = function () {

        var model = GameModel.getInstance();
        var ctx = model.ctx;

        var str = ["Offline", "   li   ", "O  li  e ", "O line ", "Online)"];

        var win = GameModel.getInstance().currentLevel === 4;


        ctx.fillStyle = "#14486e";
        ctx.fillRect(15 * this.tileSize, 10 * this.tileSize, this.tileSize * 3, this.tileSize);
        ctx.fillRect(16 * this.tileSize, 9 * this.tileSize, this.tileSize, this.tileSize);
        ctx.fillStyle = "#910429";

        if (model.lifes === 0) {
            model.currentLevel = 0
            ctx.fillStyle = "#910429";

        }
        else if (win)
            ctx.fillStyle = "#269113"
        else if (model.currentLevel > 0)
            ctx.fillStyle = "#65666a";


        ctx.fillRect(14 * this.tileSize, 6 * this.tileSize, this.tileSize * 5, this.tileSize * 3);

        if (model.lifes === 0)
            ctx.fillStyle = "#000000"; //off
        if (win)
            ctx.fillStyle = "#FFFFFF";
        else
            ctx.fillStyle = "#000000";

        ctx.font = "40px arial";
        ctx.fillText(str[GameModel.getInstance().currentLevel], 14 * this.tileSize + 15, 8 * this.tileSize, 300);


    };

    return Display;

}());