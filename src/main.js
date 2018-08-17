init = function () {
    kontra.init();

    const player  = new Player();

    let loop = kontra.gameLoop({
        update: function() {
            player.update();
        },
        render: function() {
            player.render();
        }
    });

    loop.start();


};

window.addEventListener('load', init, false);