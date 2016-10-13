'use strict';

(function() {
    var self;
    var Sleigh = function() {
        self = this;
        self.position = {
            x: 150,
            y: 300
        };
        self.velocity = {
            x: 0,
            y: 2
        }
        self.sleighSprite = game.add.sprite(self.position.x, self.position.y, 'sleigh');
        self.sleighSprite.scale.setTo(0.3, 0.3);
    };
  
    Sleigh.prototype = {
        update: function() {
            // hovering should be some kind of sin/cos-ish function over time
            // maybe look up simple harmonic motion again
            self.sleighSprite.x += self.velocity.x;
            self.sleighSprite.y += self.velocity.y;
            if(self.sleighSprite.y >= 400 || self.sleighSprite.y <= 200) {
                self.velocity.y *= -1;
            }
        }
    };
  
    this.Sleigh = Sleigh;
    
}).call(self);
