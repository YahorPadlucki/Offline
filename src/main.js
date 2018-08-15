init = function () {
    kontra.init()

    console.log('!')

    let sprite = kontra.sprite({
        x: 100,
        y: 80,
        color: 'red',
        width: 20,
        height: 40,
        dx: 2
    });

    let loop = kontra.gameLoop({
        update: function() {
            sprite.update();

            if (sprite.x > kontra.canvas.width) {
                sprite.x = -sprite.width;
            }
        },
        render: function() {
            sprite.render();
        }
    });

    loop.start();


};

window.addEventListener('load', init, false);