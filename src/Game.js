init = function () {
    var engine = new Engine();
    engine.init();

    var player = new Player();
    engine.elementsToDraw.push(player);
    engine.elementsToUpdate.push(player);

    var level = new Level();
    engine.elementsToDraw.push(level)
};

addEventListener('load', init, false);