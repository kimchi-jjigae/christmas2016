'use strict';

(function() {
    var self;
    var PresentPile = function() {
        self = this;
        self.presentGroup = game.add.group();
        self.presentGroup.enableBody = true;
        self.fromPresentGroup = game.add.group();
        self.presentCount = 0;
        self.position = {
            x: 200,
            y: 660
        };
        self.setUpPresents = function() {
            var pyramidBaseSize = 4;
            var blockSize = 50;
            var pyramidArray = [];
            for(var i = pyramidBaseSize; i > 0; --i) {
                pyramidArray.push(i);
            }
            for(var j = 0; j < pyramidArray.length; ++j){
                var pyramidRow = pyramidArray[j];
                for(var k = 0; k < pyramidRow; ++k) {
                    var row_x_offset = (pyramidArray[0] - pyramidArray[j]) * (blockSize / 2);
                    var x_offset = (blockSize * k) + row_x_offset;
                    var y_offset = -(j * blockSize);
                    var x = self.position.x + x_offset;
                    var y = self.position.y + y_offset;
                    var present = self.presentGroup.create(x, y, 'present');
                    present.dropped = false;
                    self.presentCount++;
                }
            }
        };

        self.setUpPresents();
    };

    PresentPile.prototype = {
        takePresent: function(present, child) {
            self.presentGroup.remove(present);
            self.fromPresentGroup.add(present);
            present.x = child.body.x;
            present.y = child.body.y - 40;
            present.child = child;
            child.present = present;
        },
        dropPresent: function(present) {
            self.fromPresentGroup.remove(present);
            self.presentGroup.add(present);
            present.dropped = true;
        },
        returnPresent: function(present) {
            var x_offset = (Math.random() * 250) - 50;
            var y_offset = -(Math.random() * 250);
            var x = self.position.x + x_offset;
            var y = self.position.y + y_offset;
            present.x = x;
            present.y = y;
            present.dropped = false;
        },
        update: function() {
            var gameOverFlag;
            self.fromPresentGroup.forEach(function(fromPresent) {
                fromPresent.x = fromPresent.child.body.x;
                fromPresent.y = fromPresent.child.body.y - 40;
                if(fromPresent.x > 1500) {
                    self.fromPresentGroup.remove(fromPresent);
                    fromPresent.kill();
                    self.presentCount--;
                }
            });
            if(self.presentCount == 0) {
                // this doesn't need to run every frame
                gameOverFlag = true;
            }
            return gameOverFlag;
        }
    };
    this.PresentPile = PresentPile;
    
}).call(self);
