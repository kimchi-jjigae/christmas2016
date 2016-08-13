'use strict';

var game = new Phaser.Game(1366, 768, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
});

var santaValues = {
    speed: 300,
    jump: 600,
    gravity: 2000,
    bounce: 0.2,
}

function preload() {
    game.load.image('mg',       'assets/sprites/mg.png');
    game.load.image('santa',    'assets/sprites/santa.png');
    game.load.image('girl',     'assets/sprites/girl.png');
    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('bullet',   'assets/sprites/bullet.png');

}

var santa;
var children;
var mg;
var bullets;
var platforms;
var presents;

var keycodes = {
    left : [ 'a', 'ArrowLeft'],
    up   : [ 'w', 'ArrowUp'], 
    right: [ 'd', 'ArrowRight'], 
    down : [ 's', 'ArrowDown']
};

var movement = {
    left : false,
    up   : false,
    right: false,
    down : false
}

function create() {
    game.stage.backgroundColor = "#ddffdd";
    santa = game.add.sprite(0, 0, 'santa');
    santa.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(santa);
    santa.body.bounce.y = santaValues.bounce;
    santa.body.gravity.y = santaValues.gravity;
    santa.body.collideWorldBounds = true;

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'platform');
    ground.scale.setTo(2, 1);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'platform');
    ledge.body.immovable = true;

    presents = game.add.group();
    presents.enableBody = true;
    var present1 = presents.create(0, 64, 'platform');
    present1.scale.setTo(0.1, 1);

    mg = game.add.sprite(680, 100, 'mg');
    mg.scale.setTo(0.5, 0.5);
    mg.anchor.setTo(0.5, 0.5);

    children = game.add.group();
    var girl = children.create(1000, 600, 'girl');
    girl.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(children);
    girl.body.velocity.x = -50;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    game.input.keyboard.onDownCallback = function(e) {
        if(keycodes.left.includes(e.key)) {
            // ← left
            movement.left = true;
        }
        else if(keycodes.right.includes(e.key)) {
            // → right
            movement.right = true;
        }
        else if(keycodes.up.includes(e.key)) {
            // ↑ up
            movement.up = true;
        }
        else if(keycodes.down.includes(e.key)) {
            // ↓ down
            movement.down = true;
        }
    }
    game.input.keyboard.onUpCallback = function(e) {
        if(keycodes.left.includes(e.key)) {
            // ← left
            movement.left = false;
        }
        else if(keycodes.right.includes(e.key)) {
            // → right
            movement.right = false;
        }
        else if(keycodes.up.includes(e.key)) {
            // ↑ up
            movement.up = false;
        }
        else if(keycodes.down.includes(e.key)) {
            // ↓ down
            movement.down = false;
        }
    }
}

function update() {
    game.physics.arcade.collide(santa, platforms);

    santa.body.velocity.x = 0;
    mg.rotation = game.physics.arcade.angleToPointer(mg);

    if(game.input.activePointer.isDown)
    {
        var bullet = bullets.create(680, 100, 'bullet');
        game.physics.arcade.moveToPointer(bullet, 300);
    }

    if(movement.left)
    {
        //  Move to the left
        santa.body.velocity.x = -santaValues.speed;
    }
    else if(movement.right)
    {
        //  Move to the right
        santa.body.velocity.x = santaValues.speed;
    }

    //  Allow the player to jump if they are touching the ground.
    if(movement.up && santa.body.touching.down)
    {
        //santa.kill();
        santa.body.velocity.y = -santaValues.jump;
    }
}
