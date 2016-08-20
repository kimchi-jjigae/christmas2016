'use strict';

(function() {
    var self;
    var Santa = function() {
        self = this;

        self.speed = 300;
        self.jump = 900;
        self.santa = game.add.sprite(0, 0, 'santa');
        self.santa.scale.setTo(0.2, 0.2);
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
        update: function(presentPile) {
            self.santa.body.velocity.x = 0;
            self.move();
            self.use();
            self.checkForDroppedPresents(presentPile);
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
        use: function() {
            if(self.movement.inactive) {
                // please get this to work THANKS
                /*
                if(game.math.distance(santa.x, santa.y, mgPos.x, mgPos.y) < 50) {
                    santa.x = mgPos.x;
                    santa.y = mgPos.y;
                    santa.body.moves = false;
                }
                else {
                    santa.body.moves = true;
                }
                */
            }
        }
    };
  
    this.Santa = Santa;
    
}).call(self);


    /*

    */
