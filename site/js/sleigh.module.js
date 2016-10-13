'use strict';

(function() {
    var self;
    var Sleigh = function() {
        self = this;
        self.position = {
            x: 150,
            y: 300
        };
        //self.sleighSprite = game.add.sprite(self.position.x, self.position.y, 'sleigh');
        //self.sleighSprite.scale.setTo(0.3, 0.3);
        //self.sleighSprite.enableBody = true;
        console.log(self.sleighSprite);
        //self.sleighSprite.body.immovable = true;
    };
  
    Sleigh.prototype = {
        update: function() {
        }
    };
  
    this.Sleigh = Sleigh;
    
}).call(self);
