'use strict';

var GameplayState = function() {
    //this santa = new Santa();
};

GameplayState.prototype = {

    create: function() {
        this.santa = new Santa();
        var childGroup = game.add.group();
        this.children = new ChildManager(childGroup);
        this.platforms;
        this.presents;
        this.machineGun;
        this.points;
        this.gameOver;
        game.input.keyboard.onDownCallback = function(event) {
        };
    },
    update: function() {
    }
};
