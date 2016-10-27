'use strict';

var SplashState = function() {};

SplashState.prototype = {
    init: function() {
        this.splashscreen = game.make.sprite(0, 0, 'splashscreen');
    },
    preload: function() {
        game.add.existing(this.splashscreen);
    },
    create: function() {
    },
    update: function() {
        setTimeout(function() {
            game.state.start("LoadingState");
        }, 2000);
    }
};
