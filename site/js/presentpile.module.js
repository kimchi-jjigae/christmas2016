'use strict';

(function() {
    var self;
    var PresentPile = function() {
        self = this;
        self.presentGroup = game.add.group();
        self.presentGroup.enableBody = true;
        self.fromPresentGroup = game.add.group();
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
            }
        };

        self.setUpPresents();
    };

    PresentPile.prototype = {
        takePresent: function(present, child) {
            self.presentGroup.remove(present);
            self.fromPresentGroup.add(present);
            present.x = child.x;
            present.y = child.y - 40;
            present.child = child;
            child.present = present;
        },
        returnPresent: function(present) {
            self.fromPresentGroup.remove(present);
            self.presentGroup.add(present);
        },
        update: function() {
            self.fromPresentGroup.forEach(function(fromPresent) {
                fromPresent.x = fromPresent.child.x;
                fromPresent.y = fromPresent.child.y - 40;
                if(fromPresent.x > 1500) {
                    self.fromPresentGroup.remove(fromPresent);
                    fromPresent.kill();
                    self.presentCount--;
                }
            });
            if(self.presentCount == 0) {
                console.log('GAME OVER');
                // game over
            }
        }
    };
    this.PresentPile = PresentPile;
    
}).call(self);
