'use strict';
// hmm, perhaps it should be changed to something like a bow+arrow to make it more difficult
(function() {
    var self;
    var MachineGun = function(position) {
        self = this;
        self.bulletsGroup = game.add.group();
        self.bulletsGroup.enableBody = true;
        self.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.bulletAmount = 9999999999999; // do I need this lol
        self.bulletVelocity = 2000; // argh, kinda want this really quick but the fps!
        self.bulletFireRate = 1000; // milliseconds -- I think we want some kind of [re]loading bar for this
        self.timeLastBulletFired = 0;

        self.grenadeGroup = game.add.group();
        self.grenadeGroup.enableBody = true;
        self.grenadeGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.grenadeAmount = 30; 
        self.grenadeFireRate = 1000;
        self.timeLastGrenadeFired = 0;
        self.timeStartedGrenadeFire = 0;
        self.grenadeFuseTimer = 2000;
        self.grenadeSpeed = 0;
        self.startedGrenadeFire = false;
        self.grenadeRadius = 200;

        self.explosionGroup = game.add.group();
        self.explosionDuration = 500;

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
            // initiate grenade firing
            if(self.startedGrenadeFire == false) {
                if(Date.now() - self.timeLastGrenadeFired >= self.grenadeFireRate &&
                   self.grenadeAmount > 0) {
                    self.startedGrenadeFire = true;
                    self.timeStartedGrenadeFire = Date.now();
                }
            }
            // power up grenade firing
            else {
                self.grenadeSpeed++;
                // if you've been powering it up for too long, then explode in hand
                if(Date.now() - self.timeStartedGrenadeFire >= self.grenadeFuseTimer) {
                    var explosion = self.explosionGroup.create(self.position.x, self.position.y, 'explosion');
                    explosion.scale.setTo(3.0, 3.0);
                    explosion.explosionTime = Date.now();
                    self.timeLastGrenadeFired = Date.now();
                    self.grenadeSpeed = 0;
                    self.grenadeAmount--;
                    self.grenadeAmountText.text = "ammo: " + self.grenadeAmount;
                    self.startedGrenadeFire = false;
                }
            }
        },
        fireGrenade: function() {
            var grenade = self.grenadeGroup.create(self.position.x, self.position.y, 'grenade');
            game.physics.arcade.enable(grenade);
            grenade.body.bounce = new Phaser.Point(0.5, 0.5);
            grenade.body.gravity.y = 1000;
            grenade.body.collideWorldBounds = true;
            grenade.timeFired = Date.now();
            grenade.fuseTimeLeft = self.grenadeFuseTimer - (Date.now() - self.timeStartedGrenadeFire);
            var grenadeDirection = Phaser.Point.subtract(game.input.mousePointer, self.position);
            grenade.body.velocity = grenadeDirection.setMagnitude(self.grenadeSpeed * 50);
            self.timeLastGrenadeFired = Date.now();
            self.grenadeSpeed = 0;
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
        checkGrenadeExplosions: function(childManager, presents, points) {
            // this type of check also occurs in startFiringGrenade, if powering 
            // up a grenade explosion to check for explosions in hand
            self.grenadeGroup.forEach(function(grenade) {
                if(Date.now() - grenade.timeFired >= grenade.fuseTimeLeft) {
                    self.grenadeSpeed = 0;
                    self.grenadeAmount--;
                    self.grenadeAmountText.text = "ammo: " + self.grenadeAmount;
                    self.grenadeGroup.remove(grenade);
                    var explosion = self.explosionGroup.create(grenade.x, grenade.y, 'explosion');
                    explosion.anchor.setTo(0.5, 0.5);
                    explosion.scale.setTo(3.0, 3.0);
                    explosion.explosionTime = Date.now();
                    childManager.children.forEach(function(child) {
                        if(Phaser.Point.distance(child.body, grenade) < 200) {
                            // lots of repeated code from killChild() in gameplay.state.js
                            if(child.present != undefined) {
                                presents.dropPresent(child.present);
                            }
                            if(child.right) {
                                points.add(child.points.from);
                            }
                            else {
                                points.add(child.points.to);
                            }
                            childManager.removeChild(child);
                        }
                    });
                    grenade.kill();
                }
            });
        },
        checkExplosionTimeouts: function() {
            self.explosionGroup.forEach(function(explosion) {
                if(Date.now() - explosion.explosionTime > self.explosionDuration) {
                    self.explosionGroup.remove(explosion);
                    explosion.kill();
                }
            });
        },
        update: function(childManager, presents, points) {
            // check if bullets should disappear here
            self.rotateMachineGun();
            self.checkGrenadeExplosions(childManager, presents, points);
            self.checkExplosionTimeouts();
        }
    };
  
    this.MachineGun = MachineGun;
    
}).call(self);
