'use strict';

(function() {
    var self;
    var GameOver = function() {
        self = this;
        self.active = false;
        self.gameOverText = {
            style: {
                font: 'bold 32px Arial',
                fill: '#ff9486',
                boundsAlignH: 'center',
                boundsAlignV: 'middle'
            },
            string: "Game Over!"
        }
        self.text = game.add.text(game.world.centerX, game.world.centerY, self.gameOverText.string, self.gameOverText.style);
        self.text.visible = false;
    };

    GameOver.prototype = {
        update: function() {
            if(self.active) {
                self.text.visible = true;
            }
        }
    };

    this.GameOver = GameOver;

}).call(this);
