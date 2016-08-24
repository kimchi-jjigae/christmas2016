(function() {
    var self;
    var MachineGun = function() {
        self = this;
        self.bulletsGroup = game.add.group();
        self.bulletsGroup.enableBody = true;
        self.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.bulletAmount = 10;
        self.bulletVelocity = 800;
        self.fireRate = 100; // milliseconds
        self.timeLastFired = 0;
        self.position = {
            x: game.world.centerX,
            y: 100
        };
        self.maxAngle = 0;
        self.mgSprite = game.add.sprite(self.position.x, self.position.y, 'mg');
        self.mgSprite.scale.setTo(0.5, 0.5);
        self.mgSprite.anchor.setTo(0.5, 0.5);
        self.active = false;
        var style = {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.text = game.add.text(0, 0, "ammo: " + self.bulletAmount, style);
    };
  
    MachineGun.prototype = {
        fireBullet: function() {
            if(self.active) {
                if(Date.now() - self.timeLastFired >= self.fireRate &&
                   self.bulletAmount > 0) {
                    var bullet = self.bulletsGroup.create(self.position.x, self.position.y, 'bullet');
                    game.physics.arcade.moveToPointer(bullet, self.bulletVelocity);
                    self.timeLastFired = Date.now();
                    self.bulletAmount--;
                    self.text.text = "ammo: " + self.bulletAmount;
                }
            }
        },
        fireGrenade: function() {
        },
        rotateMachineGun: function() {
            var rotation;
            if(self.active) {
                rotation = game.physics.arcade.angleToPointer(self.mgSprite);
                //                 -PI/2
                //
                //
                //
                //    -PI || PI      +           0
                //
                //
                //
                //                  PI/2
                // if in the TL quadrant
                if(rotation < 0 && rotation < -Math.PI / 2) {
                    rotation = Math.PI;
                }
                // if in the TR quadrant
                else if(rotation <= 0) {
                    rotation = 0;
                }
                // if in the BL quadrant
                if(rotation > 0 && rotation > Math.PI / 2) {
                    rotation = rotation - Math.PI;
                    self.mgSprite.scale.setTo(-0.5, 0.5);
                }
                // if in the BR quadrant
                else {
                    self.mgSprite.scale.setTo(0.5, 0.5);
                }
            }
            else {
                rotation = Math.PI / 2;
            }
            self.mgSprite.rotation = rotation;
        },
        update: function() {
            // check if bullets should disappear here
            self.rotateMachineGun();
        }
    };
  
    this.MachineGun = MachineGun;
    
}).call(self);
