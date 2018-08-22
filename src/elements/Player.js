var Player = (function () {

    function Player() {
        this.width = 15;
        this.height = 15;
        this.x = 0;
        this.y = 0;
        this.speed = 100;

        this.canvasWidth = GameModel.getInstance().ctx.canvas.width;
    }

    Player.prototype.update = function (deltaTime) {
        this.x += this.speed * deltaTime;
        if (this.x > this.canvasWidth)
            this.x = - this.width;
    };

    Player.prototype.draw = function () {
        var ctx = GameModel.getInstance().ctx;
        ctx.fillStyle = "#ff2900";
        ctx.fillRect(this.x, this.y, this.width, this.height)
    };

    return Player;
}());


