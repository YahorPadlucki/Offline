var Player = (function () {

    function Player() {

        this.x = 0;
        this.y = 0;

        this.dx = 0;
        this.dy = 0;

        this.speed = 100;

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


        this.canvasWidth = GameModel.getInstance().ctx.canvas.width;
    }

    Player.prototype.update = function (deltaTime) {
        this.x += this.speed * deltaTime;
        if (this.x > this.canvasWidth)
            this.x = -this.width;
    };

    Player.prototype.draw = function (dt) {
        var ctx = GameModel.getInstance().ctx;
        ctx.fillStyle = "#ff2900";

        ctx.fillRect(this.x + (this.dx * dt), this.y + (this.dy * dt), this.tileSize, this.tileSize)
    };


    Player.prototype.updateEntity = function (dt) {
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

        var tx = p2t(this.x),
            ty = p2t(this.y),
            nx = this.x % TILE,
            ny = this.y % TILE,
            cell = tcell(tx, ty),
            cellright = tcell(tx + 1, ty),
            celldown = tcell(tx, ty + 1),
            celldiag = tcell(tx + 1, ty + 1);

        if (this.dy > 0) {
            if ((celldown && !cell) ||
                (celldiag && !cellright && nx)) {
                this.y = t2p(ty);
                this.dy = 0;
                this.falling = false;
                this.jumping = false;
                ny = 0;
            }
        }
        else if (this.dy < 0) {
            if ((cell && !celldown) ||
                (cellright && !celldiag && nx)) {
                this.y = t2p(ty + 1);
                this.dy = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
            }
        }

        if (this.dx > 0) {
            if ((cellright && !cell) ||
                (celldiag && !celldown && ny)) {
                this.x = t2p(tx);
                this.dx = 0;
            }
        }
        else if (this.dx < 0) {
            if ((cell && !cellright) ||
                (celldown && !celldiag && ny)) {
                this.x = t2p(tx + 1);
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

    var t2p      = function(t)     { return t*this.TILE;                  },
        p2t      = function(p)     { return Math.floor(p/this.TILE);      },
        cell     = function(x,y)   { return tcell(p2t(x),p2t(y));    },
        tcell    = function(tx,ty) { return cells[tx + (ty*MAP.tw)]; };

    return Player;
}());


