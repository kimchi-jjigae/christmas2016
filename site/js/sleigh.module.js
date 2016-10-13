'use strict';

(function() {
    var self;
    var Sleigh = function() {
        self = this;
        self.position = {
            x: 300,
            y: 300
        };
        self.sleighSprite = game.add.sprite(self.position.x, self.position.y, 'sleigh');
        self.sleighSprite.scale.setTo(0.3, 0.3);
    };
  
    Sleigh.prototype = {
        update: function() {
            // hovering should be some kind of sin/cos-ish function over time
            // maybe look up simple harmonic motion again
        }
    };
  
    this.Sleigh = Sleigh;
    
}).call(self);
