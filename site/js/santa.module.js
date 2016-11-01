'use strict';

(function() {
    var self;
    var Santa = function() {
        self = this;

        self.speed = 300;
        self.jump = 600;
        self.santa = game.add.sprite(640, 0, 'santa');
        self.santa.animations.add('mountAnimation', [0]);
        self.santa.animations.add('standAnimation', [1]);
        self.santa.animations.add('runAnimation', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
        self.santa.animations.play('runAnimation', 8, true);
        self.santa.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(self.santa);
        self.santa.body.bounce.y = 0.2;
        self.santa.body.gravity.y = 1000;
        self.santa.body.collideWorldBounds = true;
        self.arrowDrawnPercent = 0;
        self.grenadeThrownPercent = 0;
        self.running = false;
        self.movement = {
            inactive: false,
            left : false,
            up   : false,
            right: false,
            down : false
        };
    };
  
    Santa.prototype = {
        update: function(presentPile, mgMountPosition) {
            self.santa.body.velocity.x = 0;
            if(self.movement.inactive) {
                self.santa.animations.play('mountAnimation', 1, false);
                self.santa.x = mgMountPosition.x;
                self.santa.y = mgMountPosition.y;
            }
            else {
                self.move();
                if(self.santa.body.velocity.x == 0) {
                    self.santa.animations.play('standAnimation', 1, false);
                }
                else {
                    self.santa.animations.play('runAnimation', 8, true);
                }
            }
            self.rotate();
            self.checkForDroppedPresents(presentPile);
        },
        rotate: function() {
            var angle = game.physics.arcade.angleToPointer(self.santa);
            // see mg.module.js for a unit circle diagram
            // if in the TL or BL quadrant
            if(angle <= -Math.PI / 2 || angle > Math.PI / 2) {
                self.santa.scale.setTo(-1.0, 1.0);
            }
            // if in the TR or BR quadrant
            else {
                self.santa.scale.setTo(1.0, 1.0);
            }
        },
        move: function() {
            if(self.movement.left && self.movement.right) {
                self.santa.body.velocity.x = 0;
            }
            else if(self.movement.left) {
                //  Move to the left
                self.santa.body.velocity.x = -self.speed;
            }
            else if(self.movement.right) {
                //  Move to the right
                self.santa.body.velocity.x = self.speed;
            }

            //  Allow santa to jump if they are touching the ground.
            if(self.movement.up && self.santa.body.touching.down)
            {
                self.santa.body.velocity.y = -self.jump;
            }

        },
        drawArrow: function(percentage) { 
            self.arrowDrawnPercent = percentage;
        },
        releaseArrow: function() {
            self.arrowDrawnPercent = 0;
        },
        throwGrenade: function(percentage) {
            self.grenadeThrownPercent = percentage;
        },
        releaseGrenade: function() {
            self.grenadeThrownPercent = 0;
        },
        checkForDroppedPresents: function(presentPile) {
            presentPile.presentGroup.forEach(function(present) {
                if(present.dropped) {
                    if(game.math.distance(self.santa.x , 0, present.x, 0) < 20) {
                        presentPile.returnPresent(present);
                    }
                }
            });
        },
        use: function(mg) {
            if(game.math.distance(self.santa.x, self.santa.y, mg.mountPosition.x, mg.mountPosition.y) < 300 &&
               !self.movement.inactive) {
                self.santa.body.moves = false;
                self.santa.x = mg.mountPosition.x;
                self.santa.y = mg.mountPosition.y;
                self.movement.inactive = true;
                mg.active = true;
            }
            else {
                self.movement.inactive = false;
                self.santa.body.moves = true;
                mg.active = false;
            }
        }
    };
  
    this.Santa = Santa;
    
}).call(self);
