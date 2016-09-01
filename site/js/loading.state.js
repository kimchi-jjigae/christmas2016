'use strict';

var LoadingState = function() {};

LoadingState.prototype = {
    init: function() {
        this.loadingText = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    },
    preloadSprites: function() {
        game.load.image('mg',           'assets/sprites/mg.png');
        game.load.image('santa',        'assets/sprites/santa.png');
        game.load.image('girl',         'assets/sprites/girl.png');
        game.load.image('platform',     'assets/sprites/platform.png');
        game.load.image('bullet',       'assets/sprites/bullet.png');
        game.load.image('present',      'assets/sprites/present.png');
    },
    preloadScripts: function() {
        game.load.script('GameplayState', 'js/gameplay.state.js');
    },
    preload: function() {
        game.add.existing(this.loadingText);
        this.preloadSprites();
        this.preloadScripts();
    },
    create: function() {
        game.state.add('GameplayState', GameplayState);
    },
    update: function() {
        game.state.start("GameplayState");
    }
};
