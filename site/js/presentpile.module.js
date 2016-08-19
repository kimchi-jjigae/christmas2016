'use strict';

(function() {
    var self;
    var PresentPile = function(presentGroup) {
        self = this;
        self.presentGroup = presentGroup;
        self.presentCount = 20;
        self.position = {
            x: 200,
            y: 700
        };
        self.setUpPresents = function() {
            for(var i = 0; i < self.presentCount; ++i) {
                var x_offset = (Math.random() * 250) - 50;
                var y_offset = -(Math.random() * 250);
                var x = self.position.x + x_offset;
                var y = self.position.y + y_offset;
                var present = self.presentGroup.create(x, y, 'present');
                present.scale.setTo(0.1, 1.0);
            }
        };

        self.setUpPresents();
    };

    PresentPile.prototype = {
        takePresent: function(present) {
            // find the specific present in the present group
            // either kill it and/or move it to rendering on the child somehow
            self.presentCount--;
            // check for lack of presents, game over if 0
        }
    };
    this.PresentPile = PresentPile;
    
}).call(self);
