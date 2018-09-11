var Player = (function () {

    function Player() {

        this.model = GameModel.getInstance();

        this.tileSize = this.model.TILE;

        this.x = this.tileSize *8;
        this.y = this.tileSize*8;

        this.dx = 0;
        this.dy = 0;

        this.maxdx = 40;     // default max horizontal speed (15 tiles per second)
        this.maxdy = 40;      // default max vertical speed   (60 tiles per second)


        this.levelWidth = this.model.columns;

        this.level = this.model.level;

        this.cells = [];
        this.brokenTiles = 0;

        for (var i = 0; i < this.level.length; i++) {
            this.cells = this.cells.concat(this.level[i]);
        }

        for (var j = 0; j < this.cells.length; j++) {
            if (this.cells [j] === this.model.brokenTileId) {
                this.brokenTiles++;
            }
        }


        this.topBorder = true;
        this.rightBorder = false;
        this.leftBorder = true;
        this.bottomBorder = false;

        this.speed = -300;

        this.transitionToNextLevel = false;
    }


    Player.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#09a90d";

        ctx.fillRect(this.x + (this.dx * dt)+this.tileSize/4, this.y + (this.dy * dt)+this.tileSize/4, this.tileSize/2, this.tileSize/2)
    };


    Player.prototype.update = function (deltaTime) {
        if(this.levelCompleted) return

        if (this.topBorder) {
            this.ddx = this.speed;
            this.ddy = 0;

        }
        if (this.rightBorder) {
            this.ddx = 0;
            this.ddy = this.speed;
        }
        if (this.bottomBorder) {
            this.ddx = -this.speed;
            this.ddy = 0;
        }

        if (this.leftBorder) {
            this.ddx = 0;
            this.ddy = -this.speed;
        }

        if (this.transitionToNextLevel) {
            this.ddx = this.ddy = 0;
            this.dx = this.dy = 0;
        }


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

            if (this.topBorder||this.bottomBorder ) {

                if(this.dx<0) {
                    if (cell === 2 && nx <= this.tileSize / 2) {
                        // console.log(nx)
                        //
                        this.fixBrokenCeil(tx, ty);
                    }
                    if (nx <= this.tileSize / 2 && cellright === 2) {
                        // this.levelCompleted = true

                        this.fixBrokenCeil(tx + 1, ty);
                        // this.levelCompleted=true

                    }
                }

                if(this.dx>0) {
                    if (cell === 2 && nx >= this.tileSize / 2) {
                        // console.log(nx)
                        //
                        this.levelCompleted = true

                        this.fixBrokenCeil(tx, ty);
                    }
                    if (nx >= this.tileSize / 2 && cellright === 2) {
                        // this.levelCompleted = true

                        this.fixBrokenCeil(tx + 1, ty);
                        // this.levelCompleted=true

                    }
                }
            }



            else if (this.rightBorder || this.leftBorder) {

                if (ny >= this.tileSize / 2 && celldown === 2) {
                    this.fixBrokenCeil(tx, ty + 1);


                } else if (ny >= this.tileSize / 2 && cell === 2) {
                    this.fixBrokenCeil(tx, ty);


                }

            }
            if (this.brokenTiles === 0&&!this.model.levelCompleted) {
                this.model.levelCompleted = true;
                // this.model.prevLevelImageData = this.model.ctx.getImageData(0, 0, this.model.ctx.canvas.width, this.model.ctx.canvas.height);
            }
        // }


        if (cellup === 3 && this.model.levelCompleted === true) {
            this.y = this.t2p(ty - 1);
            this.transitionToNextLevel = true

        }
        if (this.dy > 0) { // going down
            if ((!celldown && cell) ||
                (celldiag && !cellright && nx)) {
                this.y = this.t2p(ty);
                this.dx = -this.dy;
                this.dy = 0;
                this.falling = false;
                this.rightBorder = false;
                this.bottomBorder = true;
                ny = 0;
            }
        } else if (this.dy < 0) { //going up
            if ((!cell && celldown) ||
                (cellright && !celldiag && nx)) {
                this.y = this.t2p(ty + 1);
                this.dx = -this.dy;
                this.dy = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
                this.leftBorder = false;
                this.topBorder = true;
            }
        }


        if (this.dx > 0) { //goint right
            if ((!cellright && cell) ||
                (celldiag && !celldown && ny)) {
                this.x = this.t2p(tx);
                this.dy = this.dx;
                this.dx = 0;
                this.topBorder = false;
                this.rightBorder = true;
            }
        } else if (this.dx < 0) { //going left
            if ((!cell && cellright) ||
                (celldown && !celldiag && ny)) {
                this.x = this.t2p(tx + 1);
                this.dy = this.dx;
                this.dx = 0;
                this.bottomBorder = false;
                this.leftBorder = true;
            }
        }
    };

    Player.prototype.fixBrokenCeil = function (tx, ty) {
        if (this.model.level[ty][tx] === this.model.brokenTileId) {
            this.model.level[ty][tx] = 1;
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




