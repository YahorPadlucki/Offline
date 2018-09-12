var Player = (function () {

    function Player() {

        this.model = GameModel.getInstance();

        this.tileSize = this.model.TILE;

        this.x = this.tileSize;
        this.y = this.tileSize;

        this.maxdx = 100;     // default max horizontal speed (15 tiles per second)
        this.maxdy = 100;      // default max vertical speed   (60 tiles per second)

        this.dx = 0;
        this.ddx = this.maxdx;
        this.dy = 0;
        this.ddy = 0;

        this.levelWidth = this.model.columns;

        this.level = this.model.level;

        this.cells = [];
        this.cellsToFix = [2, 3, 4, 5];
        this.brokenTiles = 0;

        for (var i = 0; i < this.level.length; i++) {
            this.cells = this.cells.concat(this.level[i]);
        }

        for (var j = 0; j < this.cells.length; j++) {
            if (this.cells [j] === this.model.brokenTileId) {
                this.brokenTiles++;
            }
        }

    }


    Player.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#ffcf3d";

        ctx.fillRect(this.x + (this.dx * dt) + this.tileSize / 4, this.y + (this.dy * dt) + this.tileSize / 4, this.tileSize / 2, this.tileSize / 2)
    };


    Player.prototype.update = function (deltaTime) {
        if (this.levelCompleted) return

        this.x = this.x + (deltaTime * this.dx);
        this.y = this.y + (deltaTime * this.dy);
        this.dx = bound(this.dx + (deltaTime * this.ddx), -this.maxdx, this.maxdx);
        this.dy = bound(this.dy + (deltaTime * this.ddy), -this.maxdy, this.maxdy);


        var tx = this.p2t(this.x),
            ty = this.p2t(this.y),
            nx = this.x % this.tileSize,
            ny = this.y % this.tileSize,
            cell = this.tcell(tx, ty),
            cellright = this.tcell(tx + 1, ty),
            cellleft = this.tcell(tx - 1, ty),
            celldown = this.tcell(tx, ty + 1),
            celldiag = this.tcell(tx + 1, ty + 1),
            cellup = this.tcell(tx, ty - 1);


        // if (this.up) {

        // if (this.topBorder||this.bottomBorder ) {

        if (this.dx < 0) { // going left
            if (this.cellsToFix.indexOf(cell) !== -1 && nx <= this.tileSize / 2) {
                // console.log(nx)
                //

                this.fixBrokenCeil(tx, ty);
            } else if (nx <= this.tileSize / 2 && this.cellsToFix.indexOf(cellright) !== -1) {
                // this.levelCompleted = true

                this.fixBrokenCeil(tx + 1, ty);
                // this.levelCompleted=true

            }
        }

        if (this.dx > 0) { // going right

            if (this.cellsToFix.indexOf(cell) !== -1 && nx >= this.tileSize / 2) { //second half
                // console.log(nx)
                //
                // this.levelCompleted = true

                this.fixBrokenCeil(tx, ty);
            } else if (nx >= this.tileSize / 2 && this.cellsToFix.indexOf(cellright) !== -1) { //first half
                // this.levelCompleted = true

                this.fixBrokenCeil(tx + 1, ty);
                // this.levelCompleted=true

            }
        }
        // }


        if (this.dy > 0) { // going down
            if (ny >= this.tileSize / 2 && this.cellsToFix.indexOf(celldown) !== -1) { // first half
                this.fixBrokenCeil(tx, ty + 1);
            }
            if (ny >= this.tileSize / 2 && this.cellsToFix.indexOf(cell) !== -1) { //second half
                this.fixBrokenCeil(tx, ty);
            }

        }

        if (this.dy < 0) { // going up
            if (ny <= this.tileSize / 2 && this.cellsToFix.indexOf(celldown) !== -1) { //second
                this.fixBrokenCeil(tx, ty + 1);
            }
            if (ny <= this.tileSize / 2 && this.cellsToFix.indexOf(cell) !== -1) { //first
                this.fixBrokenCeil(tx, ty);
            }

        }


        /*else if (ny >= this.tileSize / 2 && cell === 2) {
            this.fixBrokenCeil(tx, ty);


        }*/

        if (this.brokenTiles === 0 && !this.model.levelCompleted) {
            this.model.levelCompleted = true;
            // this.model.prevLevelImageData = this.model.ctx.getImageData(0, 0, this.model.ctx.canvas.width, this.model.ctx.canvas.height);
        }
        // }



        if (this.dy > 0) {//going down
            if (!celldown && cellleft) { //turn left
                this.y = this.t2p(ty);
                this.ddx = -this.maxdx;
                this.dx = -this.maxdx;
                this.ddy = 0;
                this.dy = 0;
            } else {
                if (!celldown && cellright) { //turn right
                    this.y = this.t2p(ty);
                    this.ddx = this.maxdx;
                    this.dx = this.maxdx;
                    this.ddy = 0;
                    this.dy = 0;
                }
            }
        } else if (this.dy < 0) { //going up
            if (!cell && celldiag) { //turn right
                this.y = this.t2p(ty + 1);
                this.ddx = this.maxdx;
                this.dx = this.maxdx;
                this.ddy = 0;
                this.dy = 0;

            } else {
                if (!cell) { //turn left
                    this.y = this.t2p(ty + 1);
                    this.ddx = -this.maxdx;
                    this.dx = -this.maxdx;
                    this.ddy = 0;
                    this.dy = 0;
                }
            }
        } else {


            if (this.dx > 0) { // going right
                if ((!cellright && celldown)) {//   turn down
                    this.x = this.t2p(tx);
                    this.ddy = this.maxdy;
                    this.dy = this.maxdy;
                    this.ddx = 0;
                    this.dx = 0;
                } else {
                    if ((!cellright && cellup)) {//   turn up
                        this.x = this.t2p(tx);
                        this.ddy = -this.maxdy;
                        this.dy = -this.maxdy;
                        this.ddx = 0;
                        this.dx = 0;
                    }
                }
            } else if (this.dx < 0) {//going left
                if (!cell && !celldiag) { // turn up
                    this.x = this.t2p(tx + 1);
                    this.ddy = -this.maxdy;
                    this.dy = -this.maxdy;
                    this.ddx = 0;
                    this.dx = 0;

                } else {
                    if (!cell && celldiag) { //turn dow
                        this.x = this.t2p(tx + 1);
                        this.ddy = this.maxdy;
                        this.dy = this.maxdy;
                        this.ddx = 0;
                        this.dx = 0;
                    }
                }
            }
        }
    };

    Player.prototype.fixBrokenCeil = function (tx, ty) {
        if (this.cellsToFix.indexOf(this.model.level[ty][tx]) !== -1) {
            this.model.level[ty][tx] = 1;
            this.cells[tx + (ty * this.levelWidth)] = 1;
            this.brokenTiles--;
        }
    };

    function bound(x, min, max) {
        return Math.max(min, Math.min(max, x));
    };

    Player.prototype.t2p = function (t) {
        return t * this.tileSize;
    };
    Player.prototype.p2t = function (p) {
        return Math.floor(p / this.tileSize);
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
            case KEY.UP:
                this.up = down;
                ev.preventDefault();
                return false;
            case KEY.DOWN:
                this.down = down;
                ev.preventDefault();
                return false;
            case KEY.SPACE:
                ev.preventDefault();
                return false;
        }
    };

    KEY = {SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};


    return Player;

}());




