'use strict';

(function() {
    var self;
    var Santa = function() {
        self = this;

        self.speed = 300;
        self.jump = 1500;
        self.santa = game.add.sprite(640, 0, 'santa');
        self.santa.scale.setTo(0.2, 0.2);
        self.santa.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(self.santa);
        self.santa.body.bounce.y = 0.2;
        self.santa.body.gravity.y = 2000;
        self.santa.body.collideWorldBounds = true;
        self.movement = {
            inactive: false,
            left : false,
            up   : false,
            right: false,
            down : false
        };
    };
  
    Santa.prototype = {
        update: function(presentPile, mgPosition) {
            self.santa.body.velocity.x = 0;
            self.move();
            self.rotate();
            self.checkForDroppedPresents(presentPile);
        },
        rotate: function() {
            var angle = game.physics.arcade.angleToPointer(self.santa);
            // see mg.module.js for a unit circle diagram
            // if in the TL or BL quadrant
            if(angle <= -Math.PI / 2 || angle > Math.PI / 2) {
                self.santa.scale.setTo(-0.2, 0.2);
            }
            // if in the TR or BR quadrant
            else {
                self.santa.scale.setTo(0.2, 0.2);
            }
        },
        move: function() {
            if(self.movement.left) {
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

            // flip santa depending on which way the mg faces
            if(self.movement.inactive) {
            }
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
            if(game.math.distance(self.santa.x, self.santa.y, mg.position.x, mg.position.y) < 300 &&
               !self.movement.inactive) {
                self.santa.body.moves = false;
                self.santa.x = mg.position.x;
                self.santa.y = mg.position.y;
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
