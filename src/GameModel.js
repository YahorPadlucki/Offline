var GameModel = (function () {
    var instance;

    function init() {

        //2 - up, 3 - right, 4-down, 5- left
        this.level = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 4, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        return {
            ctx: "",
            doc: "",
            engine: "",
            score: 0,
            device: "",
            TILE: 32,
            columns: 15,
            rows: 15,
            level: this.level,
            levelCompleted: false,
            brokenTileId: 2,
            currentLevel:0,
            gameEnded:false,
            lifes:3,
            showTutor:true,
            showHello:true


        };


    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };

}());