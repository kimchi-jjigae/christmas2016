'use strict';

var MenuState = function() {};

MenuState.prototype = {
    create: function() {
        game.add.text(game.world.centerX, 380, 'This is the menu lol', {fill: 'white'});
    },
    update: function() {
    }
};
