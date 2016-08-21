'use strict';

var canvasWidth = 1366;
var canvasHeight = 768;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
});

function preload() {
    game.load.image('mg',       'assets/sprites/mg.png');
    game.load.image('santa',    'assets/sprites/santa.png');
    game.load.image('girl',     'assets/sprites/girl.png');
    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('bullet',   'assets/sprites/bullet.png');
    game.load.image('present',  'assets/sprites/present.png');
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

var mgPos = {
    x: canvasWidth / 2,
    y: 100
};

function create() {
    points = new PointsManager();
    santa = new Santa();
    game.stage.backgroundColor = "#ddffdd";

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'platform');
    ground.scale.setTo(2, 1);
    ground.body.immovable = true;
    //var ledge = platforms.create(400, 400, 'platform');
    //ledge.body.immovable = true;

    presents = new PresentPile();

    var childGroup = game.add.group();
    children = new ChildManager(childGroup);
    machineGun = new MachineGun(mgPos);
    
    game.input.keyboard.onDownCallback = function(event) {
        if(keycodes.left.includes(event.key)) {
            // ← left
            santa.movement.left = true;
        }
        else if(keycodes.right.includes(event.key)) {
            // → right
            santa.movement.right = true;
        }
        else if(keycodes.up.includes(event.key)) {
            // ↑ up
            santa.movement.up = true;
        }
        else if(keycodes.down.includes(event.key)) {
            // ↓ down
            santa.movement.down = true;
        }
    };
    game.input.keyboard.onUpCallback = function(event) {
        if(keycodes.action.includes(event.key)) {
            // E action
            //santa.movement.inactive = !santa.movement.inactive;
            santa.use(machineGun);
        }
        else if(keycodes.left.includes(event.key)) {
            // ← left
            santa.movement.left = false;
        }
        else if(keycodes.right.includes(event.key)) {
            // → right
            santa.movement.right = false;
        }
        else if(keycodes.up.includes(event.key)) {
            // ↑ up
            santa.movement.up = false;
        }
        else if(keycodes.down.includes(event.key)) {
            // ↓ down
            santa.movement.down = false;
        }
    };

}

function update() {
    // physics goes first, to make sure the updates work properly
    game.physics.arcade.collide(santa.santa, platforms);
    game.physics.arcade.collide(machineGun.bulletsGroup, children.childGroup, killChild);

    children.update(presents); 
    machineGun.update();
    santa.update(presents);
    presents.update();

    if(game.input.activePointer.isDown) {
        machineGun.fireBullet();
    }

    function killChild(bullet, child) {
        if(child.present != undefined) {
            presents.dropPresent(child.present);
        }
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
}
