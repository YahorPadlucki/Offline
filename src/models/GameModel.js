var GameModel = (function () {
    var instance;

    function init() {

        this.level = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 2, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 2, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 2, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        return {
            ctx: "",
            doc: "",
            engine: "",
            score: 0,
            device: "",
            TILE: 32,
            columns: 10,
            rows: 6,
            level: this.level
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