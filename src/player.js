function Player() {
    this.sprite = kontra.sprite({
        x: 0,
        y: 0,
        color: 'red',
        width: 15,
        height: 15,
        dx: 2
    });
}

Player.prototype.update = function () {
    this.sprite.update();

    if (this.sprite.x > kontra.canvas.width) {
        this.sprite.x = -this.sprite.width;
    }
};

Player.prototype.render = function () {
    this.sprite.render();
};


