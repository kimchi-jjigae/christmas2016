'use strict';

var canvasWidth = 1366;
var canvasHeight = 768;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
});

var santaValues = {
    speed: 300,
    jump: 600,
    gravity: 2000,
    bounce: 0.2,
};

function preload() {
    game.load.image('mg',       'assets/sprites/mg.png');
    game.load.image('santa',    'assets/sprites/santa.png');
    game.load.image('girl',     'assets/sprites/girl.png');
    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('bullet',   'assets/sprites/bullet.png');
}

//var Children = new ChildSpawner();
var santa;
var children;
var childSpawner;
var bullets;
var platforms;
var presents;
var machineGun;

var keycodes = {
    left  : [ 'a', 'ArrowLeft'],
    up    : [ 'w', 'ArrowUp', ' '], 
    right : [ 'd', 'ArrowRight'], 
    down  : [ 's', 'ArrowDown'],
    action: [ 'e']
};

var movement = {
    inactive: false,
    left : false,
    up   : false,
    right: false,
    down : false
};

var mgPos = {
    x: canvasWidth / 2,
    y: 100
};

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

    children = game.add.group();
    childSpawner = new ChildSpawner(children);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    machineGun = new MachineGun(bullets, mgPos);

    game.input.keyboard.onDownCallback = function(event) {
        if(keycodes.left.includes(event.key)) {
            // ← left
            movement.left = true;
        }
        else if(keycodes.right.includes(event.key)) {
            // → right
            movement.right = true;
        }
        else if(keycodes.up.includes(event.key)) {
            // ↑ up
            movement.up = true;
        }
        else if(keycodes.down.includes(event.key)) {
            // ↓ down
            movement.down = true;
        }
    }
    game.input.keyboard.onUpCallback = function(event) {
        if(keycodes.action.includes(event.key)) {
            // E action
            movement.inactive = !movement.inactive;
        }
        else if(keycodes.left.includes(event.key)) {
            // ← left
            movement.left = false;
        }
        else if(keycodes.right.includes(event.key)) {
            // → right
            movement.right = false;
        }
        else if(keycodes.up.includes(event.key)) {
            // ↑ up
            movement.up = false;
        }
        else if(keycodes.down.includes(event.key)) {
            // ↓ down
            movement.down = false;
        }
    }
}

function update() {
    childSpawner.update();
    machineGun.update();
    game.physics.arcade.collide(santa, platforms);

    santa.body.velocity.x = 0;

    if(game.input.activePointer.isDown) {
        machineGun.fireBullet();
    }

    if(movement.inactive) {
        if(game.math.distance(santa.x, santa.y, mgPos.x, mgPos.y) < 50) {
            santa.x = mgPos.x;
            santa.y = mgPos.y;
            santa.body.moves = false;
        }
        else {
            santa.body.moves = true;
        }
    }

    if(movement.left) {
        //  Move to the left
        santa.body.velocity.x = -santaValues.speed;
    }
    else if(movement.right) {
        //  Move to the right
        santa.body.velocity.x = santaValues.speed;
    }

    //  Allow the player to jump if they are touching the ground.
    if(movement.up && santa.body.touching.down)
    {
        santa.body.velocity.y = -santaValues.jump;
    }
}
