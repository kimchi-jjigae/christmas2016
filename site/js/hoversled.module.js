'use strict';

(function() {
    var self;
    var Hoversled = function() {
        self = this;
        self.position = {
            x: 300,
            y: 300
        };
        self.hoversprite = game.add.sprite(self.position.x, self.position.y, 'hoversled');
        self.hoversprite.scale.setTo(0.3, 0.3);
    };
  
    Hoversled.prototype = {
        update: function() {
            // hovering should be some kind of sin/cos-ish function over time
            // maybe look up simple harmonic motion again
        }
    };
  
    this.Hoversled = Hoversled;
    
}).call(self);
