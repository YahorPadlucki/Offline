init = function () {
    var engine = new Engine();
    engine.init();

    var player = new Player();
    engine.elementsToDraw.push(player);
    engine.elementsToUpdate.push(player);
};

addEventListener('load', init, false);