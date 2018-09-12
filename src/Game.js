init = function () {
    var engine = new Engine();

    var level = new Level();
    engine.elementsToDraw.push(level)

    var server = new Server();
    engine.elementsToDraw.push(server)

    var display = new Display();
    engine.elementsToDraw.push(display)

    var player = new Player();
    engine.elementsToDraw.push(player);
    engine.elementsToUpdate.push(player);




    addEventListener('keydown', function (ev) {
        return player.onkey(ev, ev.keyCode, true);
    }, false);
    addEventListener('keyup', function (ev) {
        return player.onkey(ev, ev.keyCode, false);
    }, false);

    engine.init();


};

addEventListener('load', init, false);

