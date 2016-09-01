'use strict';

var LoadingState = function() {};

LoadingState.prototype = {
    init: function() {
        this.loadingText = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    },
    preloadSprites: function() {
        // menu sprites //

        // gameplay sprites //
        game.load.image('mg',       'assets/sprites/mg.png');
        game.load.image('santa',    'assets/sprites/santa.png');
        game.load.image('girl',     'assets/sprites/girl.png');
        game.load.image('platform', 'assets/sprites/platform.png');
        game.load.image('bullet',   'assets/sprites/bullet.png');
        game.load.image('present',  'assets/sprites/present.png');
    },
    preloadScripts: function() {
        // states
        game.load.script('gameplayStateScript', 'js/gameplay.state.js');
        game.load.script('menuStateScript',     'js/menu.state.js');
	    game.load.script('gameoverStateScript', 'js/gameover.module.js');

        // other
	    game.load.script('utilScript',          'js/util.js');
	    game.load.script('directionEnumScript', 'js/direction.enum.js');

        // classes
	    game.load.script('santaScript',        'js/santa.module.js');
	    game.load.script('pointsScript',       'js/points.module.js');
	    game.load.script('mgScript',           'js/mg.module.js');
	    game.load.script('childManagerScript', 'js/childmanager.module.js');
	    game.load.script('presentPileScript',  'js/presentpile.module.js');
    },
    preload: function() {
        game.add.existing(this.loadingText);
        this.preloadSprites();
        this.preloadScripts();
    },
    create: function() {
        game.input.keyboard.onDownCallback = function(event) {
        };
        game.state.add('GameplayState', GameplayState);
        game.state.add('MenuState', MenuState);
    },
    update: function() {
        game.state.start("MenuState");
    }
};
