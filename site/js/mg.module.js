(function() {
    var self;
    var MachineGun = function() {
        self = this;
        self.bulletsGroup = game.add.group();
        self.bulletsGroup.enableBody = true;
        self.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.bulletAmount = 9999999999999; // do I need this haha
        self.bulletVelocity = 2000; // argh, kinda want this really quick but the fps!
        self.bulletFireRate = 1000; // milliseconds -- I think we want some kind of [re]loading bar for this
        self.timeLastBulletFired = 0;

        self.grenadeGroup = game.add.group();
        self.grenadeGroup.enableBody = true;
        self.grenadeGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.grenadeAmount = 30; 
        self.grenadeFireRate = 1000;
        self.timeLastGrenadeFired = 0;
        self.timeStartGrenadeFire = 0;
        self.startedGrenadeFire = false;

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
        self.bulletAmountText = game.add.text(20, 50, "ammo: " + self.bulletAmount, style);
        self.grenadeAmountText = game.add.text(20, 80, "grenades: " + self.grenadeAmount, style);
    };
  
    MachineGun.prototype = {
        fireBullet: function() {
            if(Date.now() - self.timeLastBulletFired >= self.bulletFireRate &&
               self.bulletAmount > 0) {
                var bullet = self.bulletsGroup.create(self.position.x, self.position.y, 'bullet');
                // check here if rotation is >= 0 or Math.PI
                game.physics.arcade.moveToPointer(bullet, self.bulletVelocity);
                self.timeLastBulletFired = Date.now();
                self.bulletAmount--;
                self.bulletAmountText.text = "ammo: " + self.bulletAmount;
            }
        },
        startFiringGrenade: function() {
            if(self.startedGrenadeFire == false) {
                console.log('starting fire grenade!');
                if(Date.now() - self.timeLastGrenadeFired >= self.grenadeFireRate &&
                   self.grenadeAmount > 0) {
                    self.startedGrenadeFire = true;
                }
            }
            else {
                console.log('powering up grenade!');
                self.timeStartGrenadeFire++;
            }
        },
        fireGrenade: function() {
            console.log('firing grenade!');
            var grenade = self.grenadeGroup.create(self.position.x, self.position.y, 'grenade');
            game.physics.arcade.enable(grenade);
            grenade.body.bounce.y = 0.2;
            grenade.body.gravity.y = 2000;
            grenade.body.collideWorldBounds = true;
            grenade.body.velocity.x = self.timeStartGrenadeFire * 50;
           // game.physics.arcade.moveToPointer(grenade, 100);
            self.timeLastGrenadeFired = Date.now();
            self.timeStartGrenadeFire = 0;
            self.grenadeAmount--;
            self.grenadeAmountText.text = "ammo: " + self.grenadeAmount;
            self.startedGrenadeFire = false;
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
