'use strict';

var game = new Phaser.Game(1366, 768, Phaser.AUTO, '');


var MainState = function() {};

MainState.prototype = {
    preload: function() {
        // load only the splashscreen and loading state necessaries here
        game.load.image('splashscreen', 'assets/sprites/splashscreen.png');
        game.load.script('SplashState', 'js/splash.state.js');
    },
    create: function() {
        game.state.add('SplashState', SplashState);
        game.state.add('LoadingState',  LoadingState);
        game.state.start('SplashState');
    }
};

game.state.add('MainState', MainState);
game.state.start('MainState');
