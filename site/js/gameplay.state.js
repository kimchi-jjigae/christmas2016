'use strict';

var GameplayState = function() {};

GameplayState.prototype = {
    preload: function() {
    },
    create: function() {
        game.input.keyboard.onDownCallback = function(event) {
        };
    },
    update: function() {
        console.log('playing!');
    }
};
