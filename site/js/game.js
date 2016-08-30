'use strict';

// HEJ -- have like, initial splash, then loading, then menu


/*
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
var Main = function() {};

Main.prototype = {
    preload: function() {
        game.load.image('stars',    'assets/images/stars.jpg');
        game.load.image('loading',  'assets/images/loading.png');
        game.load.image('brand',    'assets/images/logo.png');
        game.load.script('splash',  'states/splash.js');
    },
    create: function() {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    },
};

game.state.add('Main', Main);
game.state.start('Main');
*/

var canvasWidth = 1366;
var canvasHeight = 768;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
});

game.state.add('SplashState',   SplashState);
game.state.add('LoadingState',  LoadingState);
game.state.add('GameplayState', GameplayState);
game.state.start('SplashState');

function preload() {
}

var splash;
var santa;
var children;
var bullets;
var platforms;
var presents;
var machineGun;
var points;
var gameOver;
var states;
var state; 

var keycodes = {
    left  : ['a', 'ArrowLeft'],
    up    : ['w', 'ArrowUp', ' '], 
    right : ['d', 'ArrowRight'], 
    down  : ['s', 'ArrowDown'],
    action: ['e']
};

function create() {
    splash = new SplashScreen();
    points = new PointsManager();
    santa = new Santa();
    gameOver = new GameOver();
    game.stage.backgroundColor = "#ddffdd";
    states = Object.freeze({
        SPLASH: 0,
        MENU: 1
    });
    state = states.SPLASH;

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
    machineGun = new MachineGun();
    
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
            splashscreen.next();
        }
        else if(keycodes.down.includes(event.key)) {
            // ↓ down
            santa.movement.down = true;
        }
    };
    game.input.keyboard.onUpCallback = function(event) {
        if(keycodes.action.includes(event.key)) {
            // E action
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
    if(state == states.SPLASH) {
        splash.update();
    }
    else if(state == states.MENU) {
        splash.update();
    }
    // physics goes first, to make sure the updates work properly
    game.physics.arcade.collide(santa.santa, platforms);
    game.physics.arcade.collide(machineGun.bulletsGroup, children.childGroup, killChild);

    children.update(presents); 
    machineGun.update();
    santa.update(presents);
    presents.update(gameOver);
    gameOver.update();

    if(game.input.activePointer.isDown) {
        machineGun.fireBullet();
    }

    function killChild(bullet, child) {
        if(child.present != undefined) {
            presents.dropPresent(child.present);
        }
        else {
            // drop ammo, but should the children holding presents drop ammo too?
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
