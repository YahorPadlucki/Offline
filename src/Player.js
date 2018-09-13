var Player = (function () {


    function Player() {

        this.model = GameModel.getInstance();

        this.tileSize = this.model.TILE;

        this.x = this.tileSize * 4;
        this.y = this.tileSize * 7;

        this.speed = 100;

        this.dx = 0;
        this.ddx = this.speed;
        this.dy = 0;
        this.ddy = 0;

        this.levelWidth = this.model.columns;

        this.level = this.model.level;

        this.cells = [];
        this.cellsToFixIndexes = [2, 3, 4, 5];

        saveLevelData.call(this);
    }


    Player.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#ffcf3d";

        if (this.model.lifes == 0)
            ctx.fillStyle = "#ff1037";


        ctx.fillRect(this.x + (this.dx * dt) + this.tileSize / 4, this.y + (this.dy * dt) + this.tileSize / 4, this.tileSize / 2, this.tileSize / 2)
    };


    Player.prototype.update = function (deltaTime) {
        if (this.model.gameEnded || this.model.lifes === 0) {
            this.dx = 0;
            this.dy = 0;
            return;
        }

        this.x = this.x + (deltaTime * this.dx);
        this.y = this.y + (deltaTime * this.dy);
        this.dx = bound(this.dx + (deltaTime * this.ddx), -this.speed, this.speed);
        this.dy = bound(this.dy + (deltaTime * this.ddy), -this.speed, this.speed);


        var tx = this.p2t(this.x),
            ty = this.p2t(this.y),
            nx = this.x % this.tileSize,
            ny = this.y % this.tileSize,
            cell = this.tcell(tx, ty),
            cellright = this.tcell(tx + 1, ty),
            cellright2 = this.tcell(tx + 2, ty),
            cellleft = this.tcell(tx - 1, ty),
            celldown = this.tcell(tx, ty + 1),
            celldown2 = this.tcell(tx, ty + 2),
            celldiag = this.tcell(tx + 1, ty + 1),
            cellup = this.tcell(tx, ty - 1);


        if (this.dx < 0) { // going left
            if (this.cellsToFixIndexes.indexOf(cell) !== -1 && nx <= this.tileSize / 2) {
                this.onBrokenTileEntered(tx, ty);
            } else if (nx <= this.tileSize / 2 && this.cellsToFixIndexes.indexOf(cellright) !== -1) {
                this.onBrokenTileEntered(tx + 1, ty);
            }

            if (this.cellsToFixIndexes.indexOf(cellright2) !== -1) {
                this.setNotFixed(tx + 2, ty)
            }
        }

        if (this.dx > 0) { // going right

            if (this.cellsToFixIndexes.indexOf(cell) !== -1 && nx >= this.tileSize / 2) { //second half
                this.onBrokenTileEntered(tx, ty);
            } else if (nx >= this.tileSize / 2 && this.cellsToFixIndexes.indexOf(cellright) !== -1) { //first half
                this.onBrokenTileEntered(tx + 1, ty);
            }

            if (this.cellsToFixIndexes.indexOf(cellleft) !== -1) {
                this.setNotFixed(tx - 1, ty)
            }
        }

        if (this.dy > 0) { // going down
            if (ny >= this.tileSize / 2 && this.cellsToFixIndexes.indexOf(celldown) !== -1) { // first half
                this.onBrokenTileEntered(tx, ty + 1);
            }
            if (ny >= this.tileSize / 2 && this.cellsToFixIndexes.indexOf(cell) !== -1) { //second half
                this.onBrokenTileEntered(tx, ty);
            }

            if (this.cellsToFixIndexes.indexOf(cellup) !== -1) {
                this.setNotFixed(tx, ty - 1)

            }

        }

        if (this.dy < 0) { // going up
            if (ny <= this.tileSize / 2 && this.cellsToFixIndexes.indexOf(celldown) !== -1) { //second
                this.onBrokenTileEntered(tx, ty + 1);
            }
            if (ny <= this.tileSize / 2 && this.cellsToFixIndexes.indexOf(cell) !== -1) { //first
                this.onBrokenTileEntered(tx, ty);
            }

            if (this.cellsToFixIndexes.indexOf(celldown2) !== -1) {
                this.setNotFixed(tx, ty + 2)

            }

        }
        if (this.dy > 0) {//going down
            if (!celldown && cellleft) { //turn left
                this.y = this.t2p(ty);
                this.ddx = -this.speed;
                this.dx = -this.speed;
                this.ddy = 0;
                this.dy = 0;
            } else {
                if (!celldown && cellright) { //turn right
                    this.y = this.t2p(ty);
                    this.ddx = this.speed;
                    this.dx = this.speed;
                    this.ddy = 0;
                    this.dy = 0;
                }
            }
        } else if (this.dy < 0) { //going up
            if (!cell && celldiag) { //turn right
                this.y = this.t2p(ty + 1);
                this.ddx = this.speed;
                this.dx = this.speed;
                this.ddy = 0;
                this.dy = 0;

            } else {
                if (!cell) { //turn left
                    this.y = this.t2p(ty + 1);
                    this.ddx = -this.speed;
                    this.dx = -this.speed;
                    this.ddy = 0;
                    this.dy = 0;

                    if (tx === 4 && ty === 6) {
                        this.onServerReached()

                    }
                }
            }


        } else {


            if (this.dx > 0) { // going right
                if ((!cellright && celldown)) {//   turn down
                    this.x = this.t2p(tx);
                    this.ddy = this.speed;
                    this.dy = this.speed;
                    this.ddx = 0;
                    this.dx = 0;
                } else {
                    if ((!cellright && cellup)) {//   turn up
                        this.x = this.t2p(tx);
                        this.ddy = -this.speed;
                        this.dy = -this.speed;
                        this.ddx = 0;
                        this.dx = 0;
                    } else {
                        if ((!cellright && cell)) {//   turn left
                            this.x = this.t2p(tx);
                            this.ddx = -this.speed;
                            this.dx = -this.speed;
                            this.ddy = 0;
                            this.dy = 0;
                            this.onDisplayReached()
                        }
                    }
                }
            } else if (this.dx < 0) {//going left
                if (!cell && !celldiag) { // turn up
                    this.x = this.t2p(tx + 1);
                    this.ddy = -this.speed;
                    this.dy = -this.speed;
                    this.ddx = 0;
                    this.dx = 0;

                } else {
                    if (!cell && celldiag) { //turn dow
                        this.x = this.t2p(tx + 1);
                        this.ddy = this.speed;
                        this.dy = this.speed;
                        this.ddx = 0;
                        this.dx = 0;
                    }
                }
            }
        }
    };

    Player.prototype.onBrokenTileEntered = function (tx, ty) {

        var fixed = false;
        var cell = this.model.level[ty][tx];

        if (cell === 2 && this.upPressed) {
            fixed = true;

        }
        if (cell === 3 && this.rightPressed) {
            fixed = true;

        }
        if (cell === 4 && this.downPressed) {
            fixed = true;

        }
        if (cell === 5 && this.leftPressed) {
            fixed = true;

        }

        if (fixed && this.cellsToFixIndexes.indexOf(cell) !== -1) {
            this.model.level[ty][tx] = 1;
            this.cells[tx + (ty * this.levelWidth)] = 1;
            this.brokenTiles--;
        }

        return fixed;
    };
    Player.prototype.setNotFixed = function (tx, ty) {

        if (this.model.level[ty][tx] !== 8) {
            this.model.level[ty][tx] = 8;
            this.model.lifes--;

        }
    };

    Player.prototype.onDisplayReached = function () {
        this.model.currentLevel++;


        if (this.model.currentLevel === 4)
            this.model.gameEnded = true;

        this.speed = 800;
        var columns = GameModel.getInstance().columns;
        var rows = GameModel.getInstance().rows;

        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                var currenCell = this.model.level[i][j];


                if (currenCell === 8) {
                    this.model.level[i][j] = 1;
                }

            }
        }

        this.model.showTutor = false;
        saveLevelData.call(this);

    };

    Player.prototype.onServerReached = function () {

        var columns = GameModel.getInstance().columns;
        var rows = GameModel.getInstance().rows;
        if (this.model.currentLevel === 1)
            this.speed = 150;
        if (this.model.currentLevel === 2)
            this.speed = 200;
        if (this.model.currentLevel === 3)
            this.speed = 250;
        if (this.model.currentLevel === 4)
            this.speed = 300;

        var obstaclesOnLevel = [0, 5, 8, 10, 5, 8, 10];
        var reservedTiles = [36, 41, 42, 44, 48, 49, 50, 51, 52, 56, 60, 69, 73, 84];
        var count = 0;
        var freeTiles = [];

        for (var tileNumber = 1; tileNumber < 84; tileNumber++) {
            if (reservedTiles.indexOf(tileNumber) === -1)
                freeTiles.push(tileNumber)
        }


        var newLevelObstaclesCount = obstaclesOnLevel[this.model.currentLevel];
        var countsWithObstacles = [];

        for (var obstacles = 0; obstacles <= newLevelObstaclesCount; obstacles++) {
            var num = Math.floor(Math.random() * freeTiles.length);
            var roll = freeTiles.splice(num, 1);
            countsWithObstacles.push(roll[0]);
        }


        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                var currenCell = this.model.level[i][j];


                if (currenCell === 8) {
                    this.model.level[i][j] = 1;
                }

                if (currenCell !== 0) {
                    count++;
                    if (countsWithObstacles.indexOf(count) !== -1) {

                        var randomObstacle = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
                        this.model.level[i][j] = randomObstacle;
                    }

                }


            }
        }

        saveLevelData.call(this);


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

    function saveLevelData() {
        this.cells = [];
        for (var i = 0; i < this.model.level.length; i++) {
            this.cells = this.cells.concat(this.model.level[i]);
        }
    }

    Player.prototype.onkey = function (ev, key, down) {
        switch (key) {
            case KEY.LEFT:
                this.leftPressed = down;
                ev.preventDefault();
                return false;
            case KEY.RIGHT:
                this.rightPressed = down;
                ev.preventDefault();
                return false;
            case KEY.UP:
                this.upPressed = down;
                ev.preventDefault();
                return false;
            case KEY.DOWN:
                this.downPressed = down;
                ev.preventDefault();
                return false;
        }
    };

    KEY = {SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};


    return Player;

}());




