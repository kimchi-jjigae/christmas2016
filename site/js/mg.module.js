(function() {
    var self;
    var MachineGun = function(position) {
        self = this;
        self.bulletsGroup = game.add.group();
        self.bulletsGroup.enableBody = true;
        self.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.bulletAmount = 0;
        self.maxBullets = 500;
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
    };
  
    MachineGun.prototype = {
        fireBullet: function() {
            if(Date.now() - self.timeLastFired >= self.fireRate &&
               self.bulletAmount < self.maxBullets) {
                var bullet = self.bulletsGroup.create(self.position.x, self.position.y, 'bullet');
                game.physics.arcade.moveToPointer(bullet, self.bulletVelocity);
                self.timeLastFired = Date.now();
                self.bulletAmount++;
            }
        },
        fireGrenade: function() {
        },
        update: function() {
            // check if bullets should disappear here
            var rotation = game.physics.arcade.angleToPointer(self.mgSprite);
            // positive angles from -->RIGHT down towards <--LEFT (0 --> PI)
            // negative angles from -->RIGHT upwards towards <--LEFT (0 --> -PI)
            if(rotation < 0 && rotation > -Math.PI / 2) {
                rotation = 0;
            }
            else if(rotation < 0) {
                rotation = Math.PI;
            }
            // also need to make sure that the machine gun points towards the left :o
            //else if(rotation > 
            self.mgSprite.rotation = rotation;
        }
    };
  
    this.MachineGun = MachineGun;
    
}).call(self);
