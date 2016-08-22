(function() {
    var self;
    var MachineGun = function(position) {
        self = this;
        self.bulletsGroup = game.add.group();
        self.bulletsGroup.enableBody = true;
        self.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.bulletAmount = 10;
        self.bulletVelocity = 800;
        self.fireRate = 100; // milliseconds
        self.timeLastFired = 0;
        self.position = position || {
            x: 680,
            y: 100
        };
        self.maxAngle = 0;
        self.direction = DIRECTION.RIGHT;
        self.mgSprite = game.add.sprite(position.x, position.y, 'mg');
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
                if(rotation < 0 && rotation > -Math.PI / 2) {
                    rotation = 0;
                }
                else if(rotation < 0) {
                    rotation = Math.PI;
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
