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
        // this callback is kept isolated to this state by
        // overriding it in other states -- kinda hacky!
        game.input.keyboard.onDownCallback = function(event) {
            game.state.start('LoadingState');
        };
    },
    update: function() {
        setTimeout(function() {
            game.state.start("LoadingState");
        }, 2000);
    }
};
