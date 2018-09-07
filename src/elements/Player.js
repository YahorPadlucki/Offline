var Player = (function () {

    function Player() {

        this.tileSize = GameModel.getInstance().TILE;

        this.x = this.tileSize * 3;
        this.y = this.tileSize;

        this.dx = 0;
        this.dy = 0;

        this.friction = 1 / 6;
        this.accel = 300;
        this.gravity = 9.8 * 6;
        this.impulse = 150;

        this.maxdx = 30;     // default max horizontal speed (15 tiles per second)
        this.maxdy = 30;      // default max vertical speed   (60 tiles per second)

        this.falling = false;
        this.jumping = false;
        this.jump = false;

        this.xGravity = 0;
        this.yGravity = 1;

        this.levelWidth = GameModel.getInstance().columns;

        this.level = GameModel.getInstance().level;

        this.cells = [];
        for (var i = 0; i < this.level.length; i++) {
            this.cells = this.cells.concat(this.level[i]);
        }


        this.topBorder = true;
        this.rigthBorder = false;
        this.leftBorder = false;
        this.bottomBorder = false;

        this.speed = 30;

        this.canvasWidth = GameModel.getInstance().ctx.canvas.width;
    }


    Player.prototype.draw = function (dt) {
        var ctx = GameModel.getInstance().ctx;
        ctx.fillStyle = "#ff2900";

        ctx.fillRect(this.x + (this.dx * dt), this.y + (this.dy * dt), this.tileSize, this.tileSize)
    };


    Player.prototype.update = function (deltaTime) {
        var wasleft = this.dx < 0,
            wasright = this.dx > 0,
            wasup = this.dy < 0,
            wasdown = this.dy > 0,
            falling = this.falling,
            friction = this.friction * (falling ? 0.5 : 1),
            accel = this.accel * (falling ? 0.5 : 1);


        if (this.topBorder) {
            this.ddx = this.speed;
            this.ddy = 0;

            // if(this.up){
            // }
        }
        if (this.rigthBorder) {
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

        /*   if (this.left)
               this.ddx = this.ddx - accel;
           else if (wasleft)
               this.ddx = this.ddx + friction;

       if (this.right)
           this.ddx = this.ddx + accel;
       else if (wasright)
           this.ddx = this.ddx - friction;

       if (this.up)
           this.ddy = this.ddy - accel;
       else if (wasup)
           this.ddy = this.ddy + friction;

       if (this.down)
           this.ddy = this.ddy + accel;
       else if (wasdown)
           this.ddy = this.ddy - friction;

       if (this.jump && !this.jumping && !falling) {
           this.ddy = this.ddy - this.impulse; // an instant big force impulse
           this.jumping = true;
       }*/


        this.x = this.x + (deltaTime * this.dx);
        this.y = this.y + (deltaTime * this.dy);
        this.dx = bound(this.dx + (deltaTime * this.ddx), -this.maxdx, this.maxdx);
        this.dy = bound(this.dy + (deltaTime * this.ddy), -this.maxdy, this.maxdy);

        /* if ((wasleft && (this.dx > 0)) ||
             (wasright && (this.dx < 0))) {
             this.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
         }*/

        var tx = this.p2t(this.x),
            ty = this.p2t(this.y),
            nx = this.x % this.tileSize,
            ny = this.y % this.tileSize,
            cell = this.tcell(tx, ty),
            cellright = this.tcell(tx + 1, ty),
            celldown = this.tcell(tx, ty + 1),
            celldiag = this.tcell(tx + 1, ty + 1);

//this.up &&
//         console.log(this.cell(tx,ty))

        if(this.up){
            console.log(nx)
            if(this.bottomBorder){
                if(cellright===2)
                    GameModel.getInstance().level[ty][tx+1]=1

            }else
            if(this.leftBorder){
                if(celldown===2)
                    GameModel.getInstance().level[ty+1][tx]=1

            }else
            if ((nx<=this.tileSize/2&&cell==2)) {

                GameModel.getInstance().level[ty][tx]=0
            }
            if(nx>=this.tileSize/2&&cellright==2){
                GameModel.getInstance().level[ty][tx+1]=0
            }
        }



        if (this.dy > 0) {
            if ((!celldown && cell) ||
                (celldiag && !cellright && nx)) {
                this.y = this.t2p(ty);
                this.dx = -this.dy;
                this.dy = 0;
                this.falling = false;
                this.rigthBorder = false;
                this.bottomBorder = true;
                ny = 0;
            }
        } else if (this.dy < 0) {
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


        if (this.dx > 0) {
            if ((!cellright && cell) ||
                (celldiag && !celldown && ny)) {
                this.x = this.t2p(tx);
                this.dy = this.dx;
                this.dx = 0;
                this.topBorder = false;
                this.rigthBorder = true;
            }
        } else if (this.dx < 0) {
            if ((!cell && cellright) ||
                (celldown && !celldiag && ny)) {
                this.x = this.t2p(tx + 1);
                this.dy = this.dx;
                this.dx = 0;
                this.bottomBorder = false;
                this.leftBorder = true;
            }
        }


        /*


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
        */

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

        // this.falling = !(cell || (nx && celldiag));

    };

    Player.prototype.colorCellInBlack = function (tx, ty) {

    }

    function bound(x, min, max) {
        return Math.max(min, Math.min(max, x));
    }

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




