init = function () {
    kontra.init();

    var player  = new Player();

    var loop = kontra.gameLoop({
        update: function() {
            player.update();
        },
        render: function() {
            player.render();
        }
    });

    loop.start();


};

addEventListener('load', init, false);