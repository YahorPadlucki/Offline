var GameModel = (function () {
    var instance;

    function init() {
        return {
            ctx: "",
            doc: "",
            engine: "",
            score: 0,
            device: "",
            TILE: 32,
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