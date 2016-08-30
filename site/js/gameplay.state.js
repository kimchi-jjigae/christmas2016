'use strict';

var GameplayState = function() {
    var self = this;
};

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
