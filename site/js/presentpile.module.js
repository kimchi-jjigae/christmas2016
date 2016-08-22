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
        self.gameOverText = {
            style: {
                font: 'bold 32px Arial',
                fill: '#ff9486',
                boundsAlignH: 'center',
                boundsAlignV: 'middle'
            },
            string: "Game Over!"
        }
        self.setUpPresents = function() {
            //var pyramidArray = [6, 5, 4, 3, 2, 1];
            var pyramidArray = [4, 3, 2, 1];
            var blockSize = 50;

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
            present.x = child.x;
            present.y = child.y - 40;
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
                // this doesn't need to run every frame;
                game.add.text(game.world.centerX, game.world.centerY, self.gameOverText.string, self.gameOverText.style);
            }
        }
    };
    this.PresentPile = PresentPile;
    
}).call(self);
