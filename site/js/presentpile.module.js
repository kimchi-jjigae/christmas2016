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
            x: 400,
            y: 660
        };
        self.pyramidPositions = [];
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
                    self.pyramidPositions.push(new Phaser.Point(x, y));
                    var presentNumber = 'present' + util.randomInt(1, 8);
                    var present = self.presentGroup.create(x, y, presentNumber);
                    present.pyramidPosition = self.pyramidPositions.length - 1;
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
            present.x = child.sprite.x;
            present.y = child.sprite.y - 40;
            present.child = child;
            child.present = present;
        },
        dropPresent: function(child) {
            if(child.present != undefined) {
                var present = child.present;
                self.fromPresentGroup.remove(present);
                self.presentGroup.add(present);
                present.dropped = true;
            }
        },
        returnPresent: function(present) {
            present.x = self.pyramidPositions[present.pyramidPosition].x;
            present.y = self.pyramidPositions[present.pyramidPosition].y;
            present.dropped = false;
        },
        update: function() {
            var gameOverFlag;
            self.fromPresentGroup.forEach(function(fromPresent) {
                fromPresent.x = fromPresent.child.sprite.x;
                fromPresent.y = fromPresent.child.sprite.y - 40;
                if(fromPresent.x > 1500 || fromPresent.x < -100) {
                    self.fromPresentGroup.remove(fromPresent);
                    fromPresent.kill();
                    self.presentCount--;
                }
            });
            if(self.presentCount <= 0) {
                gameOverFlag = true;
            }
            return gameOverFlag;
        }
    };
    this.PresentPile = PresentPile;
    
}).call(self);
