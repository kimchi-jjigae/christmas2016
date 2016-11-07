'use strict';

(function() {
    var self;
    var Santa = function() {
        self = this;

        self.speed = 400;
        self.jump = 700;
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
        self.santaArmRotationMax = -Math.PI;
        self.santaArmReturnSpeed = 0.17;
        self.movingBackArm = false;
        self.santaArmOffsetRev = new Phaser.Point(20, 0);
        self.santaArmOffset = new Phaser.Point(-20, 0);
        self.santaArm = game.add.sprite(self.santa.x + self.santaArmOffset.x, self.santa.y + self.santaArmOffset.y, 'santaArm');
        self.santaArm.visible = false;
        self.arrowDrawnPercent = 0;
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
                self.santaArm.visible = true;
                if(self.santa.scale.x < 0) {
                    self.santaArm.position = Phaser.Point.add(self.santa.position, self.santaArmOffsetRev);
                }
                else {
                    self.santaArm.position = Phaser.Point.add(self.santa.position, self.santaArmOffset);
                }
                self.santa.animations.play('mountAnimation', 1, false);
                self.santa.position.x = mgMountPosition.x;
                self.santa.position.y = mgMountPosition.y;
            }
            else {
                self.move();
                self.santaArm.visible = false;
                if(self.movingBackArm) {
                    self.santa.animations.play('mountAnimation', 1, false);
                    self.santaArm.visible = true;
                }
                else if(self.santa.body.velocity.x == 0) {
                    self.santa.animations.play('standAnimation', 1, false);
                }
                else {
                    self.santa.animations.play('runAnimation', 8, true);
                }
            }
            self.rotate();
            self.checkForDroppedPresents(presentPile);
            if(self.movingBackArm) {
                var finishedMovingBack;
                if(self.santaArm.scale.x < 0) {
                    self.santaArm.rotation -= self.santaArmReturnSpeed;
                    finishedMovingBack = self.santaArm.rotation <= 0;
                }
                else {
                    self.santaArm.rotation += self.santaArmReturnSpeed;
                    finishedMovingBack = self.santaArm.rotation >= 0;
                }
                if(finishedMovingBack) {
                    self.santaArm.rotation = 0;
                    self.movingBackArm = false;
                    self.santaArm.visible = false;
                }
            }
        },
        rotate: function() {
            var angle = game.physics.arcade.angleToPointer(self.santa);
            // see mg.module.js for a unit circle diagram
            // if in the TL or BL quadrant
            if(angle <= -Math.PI / 2 || angle > Math.PI / 2) {
                self.santa.scale.setTo(-1.0, 1.0);
                self.santaArm.scale.setTo(-1.0, 1.0);
            }
            // if in the TR or BR quadrant
            else {
                self.santa.scale.setTo(1.0, 1.0);
                self.santaArm.scale.setTo(1.0, 1.0);
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
            self.santaArm.visible = true;
            if(self.santa.scale.x < 0) {
                self.santaArm.position = Phaser.Point.add(self.santa.position, self.santaArmOffsetRev);
            }
            else {
                self.santaArm.position = Phaser.Point.add(self.santa.position, self.santaArmOffset);
            }
            var rotation = percentage * self.santaArmRotationMax;
            if(self.santaArm.scale.x < 0) {
                rotation = -rotation;
            }
            self.santaArm.rotation = rotation;
        },
        releaseArrow: function() {
            self.movingBackArm = true;
        },
        throwGrenade: function(percentage) {
            self.santaArm.visible = true;
            if(self.santa.scale.x < 0) {
                self.santaArm.position = Phaser.Point.add(self.santa.position, self.santaArmOffsetRev);
            }
            else {
                self.santaArm.position = Phaser.Point.add(self.santa.position, self.santaArmOffset);
            }
            self.santa.animations.play('mountAnimation', [0]);
            var rotation = percentage * self.santaArmRotationMax;
            if(self.santaArm.scale.x < 0) {
                rotation = -rotation;
            }
            self.santaArm.rotation = rotation;
        },
        releaseGrenade: function() {
            self.movingBackArm = true;
        },
        checkForDroppedPresents: function(presentPile) {
            presentPile.presentGroup.forEach(function(present) {
                if(present.dropped) {
                    if(game.math.distance(self.santa.x, self.santa.y, present.x, present.y) < 120) {
                        presentPile.returnPresent(present);
                    }
                }
            });
        },
        use: function(mg) {
            if(game.math.distance(self.santa.x, self.santa.y, mg.mountPosition.x, mg.mountPosition.y) < 300 &&
               !self.movement.inactive) {
                self.santa.body.moves = false;
                self.santa.position.x = mg.mountPosition.x;
                self.santa.position.y = mg.mountPosition.y;
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
