'use strict';

var game = new Phaser.Game(1366, 768, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
});

function preload() {
    game.load.image('mg',       'assets/sprites/mg.png');
    game.load.image('santa',    'assets/sprites/santa.png');
    game.load.image('girl',     'assets/sprites/girl.png');
    game.load.image('platform', 'assets/sprites/platform.png');

}

var platforms;

function create() {
    game.stage.backgroundColor = "#ddffdd";
    var santa = game.add.sprite(0, 0, 'santa');
    santa.scale.setTo(0.2, 0.2);

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'platform');
    ground.scale.setTo(2, 1);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'platform');
    ledge.body.immovable = true;
}

function update() {
}
