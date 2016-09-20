'use strict';

(function() {
    var self;
    var Hoversled = function() {
        self = this;
        self.position = {
            x: 300,
            y: 300
        };
        self.hoversprite = game.add.sprite(self.position.x, self.position.y, 'mg');
    };
  
    Hoversled.prototype = {
    };
  
    this.Hoversled = Hoversled;
    
}).call(self);
