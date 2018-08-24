var Player = (function () {

    function Player() {

        this.x = 32;
        this.y = 32;

        this.dx = 0;
        this.dy = 0;

        this.friction = 1 / 6;
        this.accel = 1 / 2;
        this.gravity = 9.8 * 6;
        this.impulse = 1500;

        this.maxdx = 15;     // default max horizontal speed (15 tiles per second)
        this.maxdy = 60;      // default max vertical speed   (60 tiles per second)

        this.falling = false;
        this.jumping = false;
        this.jump = false;

        this.tileSize = GameModel.getInstance().TILE;
        this.TILE = GameModel.getInstance().TILE;
        this.levelWidth = GameModel.getInstance().columns;

        this.level = GameModel.getInstance().level;

        this.cells = [];
        for (var i = 0; i < this.level.length; i++) {
            this.cells = this.cells.concat(this.level[i]);
        }


        this.canvasWidth = GameModel.getInstance().ctx.canvas.width;
    }


    Player.prototype.draw = function (dt) {
        var ctx = GameModel.getInstance().ctx;
        ctx.fillStyle = "#ff2900";

        ctx.fillRect(this.x + (this.dx * dt), this.y + (this.dy * dt), this.tileSize, this.tileSize)
    };


    Player.prototype.update = function (dt) {
        var wasleft = this.dx < 0,
            wasright = this.dx > 0,
            falling = this.falling,
            friction = this.friction * (falling ? 0.5 : 1),
            accel = this.accel * (falling ? 0.5 : 1);

        this.ddx = 0;
        this.ddy = this.gravity;

        if (this.left)
            this.ddx = this.ddx - accel;
        else if (wasleft)
            this.ddx = this.ddx + friction;

        if (this.right)
            this.ddx = this.ddx + accel;
        else if (wasright)
            this.ddx = this.ddx - friction;

        if (this.jump && !this.jumping && !falling) {
            this.ddy = this.ddy - this.impulse; // an instant big force impulse
            this.jumping = true;
        }

        this.x = this.x + (dt * this.dx);
        this.y = this.y + (dt * this.dy);
        this.dx = bound(this.dx + (dt * this.ddx), -this.maxdx, this.maxdx);
        this.dy = bound(this.dy + (dt * this.ddy), -this.maxdy, this.maxdy);

        if ((wasleft && (this.dx > 0)) ||
            (wasright && (this.dx < 0))) {
            this.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
        }

        var tx = this.p2t(this.x),
            ty = this.p2t(this.y),
            nx = this.x % this.TILE,
            ny = this.y % this.TILE,
            cell = this.tcell(tx, ty),
            cellright = this.tcell(tx + 1, ty),
            celldown = this.tcell(tx, ty + 1),
            celldiag = this.tcell(tx + 1, ty + 1);

        if (this.dy > 0) {
            if ((celldown && !cell) ||
                (celldiag && !cellright && nx)) {
                this.y = this.t2p(ty);
                this.dy = 0;
                this.falling = false;
                this.jumping = false;
                ny = 0;
            }
        }
        else if (this.dy < 0) {
            if ((cell && !celldown) ||
                (cellright && !celldiag && nx)) {
                this.y = this.t2p(ty + 1);
                this.dy = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
            }
        }

        if (this.dx > 0) {
            if ((cellright && !cell) ||
                (celldiag && !celldown && ny)) {
                this.x = this.t2p(tx);
                this.dx = 0;
            }
        }
        else if (this.dx < 0) {
            if ((cell && !cellright) ||
                (celldown && !celldiag && ny)) {
                this.x = this.t2p(tx + 1);
                this.dx = 0;
            }
        }

        /* if (this.monster) {
             if (this.left && (cell || !celldown)) {
                 this.left = false;
                 this.right = true;
             }
             else if (this.right && (cellright || !celldiag)) {
                 this.right = false;
                 this.left  = true;
             }
         }*/

        this.falling = !(celldown || (nx && celldiag));

    };


    function bound(x, min, max) {
        return Math.max(min, Math.min(max, x));
    }

    Player.prototype.t2p = function (t) {
        return t * this.TILE;
    };
    Player.prototype.p2t = function (p) {
        return Math.floor(p / this.TILE);
    };
    Player.prototype.cell = function (x, y) {
        return this.tcell(this.p2t(x), this.p2t(y));
    };
    Player.prototype.tcell = function (tx, ty) {
        return this.cells[tx + (ty * this.levelWidth)];
    };

    Player.prototype.onkey = function (ev, key, down) {
        switch (key) {
            case KEY.LEFT:
                this.left = down;
                ev.preventDefault();
                return false;
            case KEY.RIGHT:
                this.right = down;
                ev.preventDefault();
                return false;
            case KEY.SPACE:
                this.jump = down;
                ev.preventDefault();
                return false;
        }
    };

    KEY = {SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};



    return Player;

}());




