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
    jump: 900,
    gravity: 2000,
    bounce: 0.2,
};

function preload() {
    game.load.image('mg',       'assets/sprites/mg.png');
    game.load.image('santa',    'assets/sprites/santa.png');
    game.load.image('girl',     'assets/sprites/girl.png');
    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('bullet',   'assets/sprites/bullet.png');
    game.load.image('present',   'assets/sprites/platform.png');
}

var santa;
var children;
var bullets;
var platforms;
var presents;
var machineGun;
var points;

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
    points = new PointsManager();
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

    var presentGroup = game.add.group();
    presentGroup.enableBody = true;
    presents = new PresentPile(presentGroup);

    var childGroup = game.add.group();
    children = new ChildManager(childGroup);
    machineGun = new MachineGun(mgPos);

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
    children.update(presents); // maybe children should just hold this presentPile variable instead
    machineGun.update();
    points.update();
    game.physics.arcade.collide(machineGun.bulletsGroup, children.childGroup, killChild);
    game.physics.arcade.collide(santa, platforms);

    function killChild(bullet, child) {
        machineGun.bulletsGroup.remove(bullet);
        children.childGroup.remove(child);
        if(child.from) {
            points.add(child.points.from);
        }
        else {
            points.add(child.points.to);
        }
        bullet.kill();
        child.kill();
    };


    santa.body.velocity.x = 0;

    if(game.input.activePointer.isDown) {
        machineGun.fireBullet();
    }

    if(movement.inactive) {
        // please get this to work THANKS
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
