'use strict';

(function() {
    var self;
    var MachineGun = function(position) {
        self = this;
        self.graphics = game.add.graphics(0, 0);
        self.graphics.lineStyle(2, 0x000000, 1);
        self.arrowGroup = game.add.group();
        self.arrowGroup.enableBody = true;
        self.arrowGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.arrowSpeed = 0;
        self.maxArrowSpeed = 50;
        self.startedArrowFire = false;

        self.grenadeGroup = game.add.group();
        self.grenadeGroup.enableBody = true;
        self.grenadeGroup.physicsBodyType = Phaser.Physics.ARCADE;
        self.grenadeAmount = 10;
        self.grenadeFireRate = 1000;
        self.timeLastGrenadeFired = 0;
        self.timeStartedGrenadeFire = 0;
        self.grenadeFuseTimer = 2000;
        self.grenadeSpeed = 0;
        self.maxGrenadeSpeed = 50;
        self.startedGrenadeFire = false;
        self.grenadeRadius = 200;

        self.droppedGrenadesGroup = game.add.group();

        self.explosionGroup = game.add.group();
        self.explosionDuration = 500;

        self.initialPosition = new Phaser.Point(1366 / 2, 350);
        self.position = new Phaser.Point(self.initialPosition.x, self.initialPosition.y);
        // where santa stands
        self.mountPosition = new Phaser.Point(self.initialPosition.x + 75, self.initialPosition.y - 72);
        self.velocity = new Phaser.Point(0.3, 1.0);

        self.sleighSprite = game.add.sprite(self.position.x, self.position.y, 'sleigh');
        self.sleighSprite.animations.add('noHoverAnimation',     [0]);
        self.sleighSprite.animations.add('leftHoverAnimation',   [1]);
        self.sleighSprite.animations.add('bottomHoverAnimation', [2]);
        self.sleighSprite.animations.add('bothHoverAnimation',   [3]);
        self.sleighSprite.enableBody = true;
        self.sleighSprite.anchor.setTo(0.5, 0.5);

        self.bowPositionOffset = new Phaser.Point(145, -60);

        self.bowPosition = new Phaser.Point(
            self.position.x + self.bowPositionOffset.x,
            self.position.y + self.bowPositionOffset.y
        );
        self.mgSprite = game.add.sprite(self.bowPosition.x, self.bowPosition.y, 'bow');
        self.mgSprite.anchor.setTo(0.5, 0.5);

        self.string1Offset = new Phaser.Point(-9, -45);
        self.string2Offset = new Phaser.Point(-9, 45);
        self.stringMiddleOffset = new Phaser.Point(-9, 0);
        self.stringDrawback = -60;
        self.drawnArrow = game.add.sprite(self.mgSprite.position.x, self.mgSprite.position.y, 'arrow');
        self.drawnArrow.visible = false;

        self.active = false;
        var style = {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.arrowAmountText   = game.add.text(20, 50, "arrows: ∞", style);
        self.grenadeAmountText = game.add.text(20, 80, "grenades: " + self.grenadeAmount, style);
    };
    MachineGun.prototype = {
        drawString: function(a, b, c) {
            self.graphics.lineStyle(2, 0x000000, 1);

            self.graphics.moveTo(a.x, a.y);
            self.graphics.lineTo(b.x, b.y);
            self.graphics.lineTo(c.x, c.y);
        },
        updateString: function() {
            var b = new Phaser.Point(self.stringMiddleOffset.x, self.stringMiddleOffset.y);
            var a = new Phaser.Point(self.string1Offset.x, self.string1Offset.y);
            var c = new Phaser.Point(self.string2Offset.x, self.string2Offset.y);

            var drawback = (self.arrowSpeed / self.maxArrowSpeed) * self.stringDrawback;
            b.x = b.x + drawback;

            if(self.active) {
                var rotation = game.physics.arcade.angleToPointer(self.mgSprite.position);
                b = b.rotate(0, 0, rotation);
                a = a.rotate(0, 0, rotation);
                c = c.rotate(0, 0, rotation);
            }

            b = Phaser.Point.add(self.mgSprite.position, b);
            a = Phaser.Point.add(self.mgSprite.position, a);
            c = Phaser.Point.add(self.mgSprite.position, c);

            self.graphics.clear();
            self.drawString(a, b, c);
        },
        startFiringArrow: function() {
            // initiate arrow firing
            if(self.startedArrowFire == false) {
                self.startedArrowFire = true;

                // make drawn arrow visible
                var drawback = (self.arrowSpeed / self.maxArrowSpeed) * self.stringDrawback;
                var b = new Phaser.Point(self.stringMiddleOffset.x, self.stringMiddleOffset.y - 10);
                b.x = b.x + drawback;
                var rotation = game.physics.arcade.angleToPointer(self.mgSprite.position);
                b = b.rotate(0, 0, rotation);
                b = Phaser.Point.add(self.mgSprite.position, b);
                self.drawnArrow.rotation = rotation;
                self.drawnArrow.position = b;
                self.drawnArrow.visible = true;
            }
            // power up arrow firing
            else {
                self.arrowSpeed++;
                // cap the arrow speed if held in for ages
                self.arrowSpeed = Math.min(self.arrowSpeed, self.maxArrowSpeed);

                // adjust drawn arrow position and rotation
                var drawback = (self.arrowSpeed / self.maxArrowSpeed) * self.stringDrawback;
                var b = new Phaser.Point(self.stringMiddleOffset.x, self.stringMiddleOffset.y - 10);
                b.x = b.x + drawback;
                var rotation = game.physics.arcade.angleToPointer(self.mgSprite.position);
                b = b.rotate(0, 0, rotation);
                b = Phaser.Point.add(self.mgSprite.position, b);
                self.drawnArrow.rotation = rotation;
                self.drawnArrow.position = b;
            }
        },
        fireArrow: function() {
            self.drawnArrow.visible = false;
            var arrow = self.arrowGroup.create(self.mgSprite.position.x, self.mgSprite.position.y, 'arrow');
            arrow.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(arrow);
            arrow.body.gravity.y = 1000;
            var arrowDirection = Phaser.Point.subtract(game.input.mousePointer, self.position);
            arrow.body.velocity = arrowDirection.setMagnitude(self.arrowSpeed * 50);
            self.rotateArrows();
            self.arrowSpeed = 0;
            self.startedArrowFire = false;
        },
        startFiringGrenade: function(childManager, presents, points, deathAnimations, santaPosition) {
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
                // cap grenade speed
                self.grenadeSpeed = Math.min(self.grenadeSpeed, self.maxGrenadeSpeed);
                // if you've been powering it up for too long, then explode in hand
                if(Date.now() - self.timeStartedGrenadeFire >= self.grenadeFuseTimer) {
                    self.timeLastGrenadeFired = Date.now();
                    self.grenadeSpeed = 0;
                    self.grenadeAmount--;
                    self.grenadeAmountText.text = "grenades: " + self.grenadeAmount;
                    self.startedGrenadeFire = false;
                    self.explodeGrenade(false, childManager, presents, points, deathAnimations, santaPosition);
                }
            }
        },
        fireGrenade: function(santaPosition) {
            var grenade = self.grenadeGroup.create(santaPosition.x, santaPosition.y, 'grenade');
            game.physics.arcade.enable(grenade);
            grenade.body.bounce = new Phaser.Point(0.5, 0.5);
            grenade.body.gravity.y = 1000;
            grenade.body.collideWorldBounds = true;
            grenade.timeFired = Date.now();
            grenade.fuseTimeLeft = self.grenadeFuseTimer - (Date.now() - self.timeStartedGrenadeFire);
            var grenadeDirection = Phaser.Point.subtract(game.input.mousePointer, santaPosition);
            grenade.body.velocity = grenadeDirection.setMagnitude(self.grenadeSpeed * 50);
            grenade.anchor.setTo(0.5, 0.5);
            grenade.rotationSpeed = util.randomFloat(-self.grenadeSpeed * 0.05, self.grenadeSpeed * 0.05)
            self.timeLastGrenadeFired = Date.now();
            self.grenadeSpeed = 0;
            self.grenadeAmount--;
            self.grenadeAmountText.text = "grenades: " + self.grenadeAmount;
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
                    self.mgSprite.scale.x = -1.0;
                }
                // if in the TR quadrant
                else if(rotation <= 0) {
                    self.mgSprite.scale.x = 1.0;
                }
                // if in the BL quadrant
                if(rotation > 0 && rotation > Math.PI / 2) {
                    rotation = rotation - Math.PI;
                    self.mgSprite.scale.x = -1.0;
                }
                // if in the BR quadrant
                else {
                    self.mgSprite.scale.x = 1.0;
                }
            }
            else {
                rotation = 0;
                self.mgSprite.scale.x = 1.0;
            }
            self.mgSprite.rotation = rotation;
        },
        collideWithChild: function(child, grenade, headshot, points, presents, childManager, deathAnimations) {
            if(!grenade) {
                points.addChildPoints(child, headshot);
            }
            deathAnimations.killChild(child, headshot);
            presents.dropPresent(child);
            self.dropGrenades(child);
            childManager.removeChild(child);
        },
        dropGrenades: function(child) {
            if(child.ammo == 1) {
                var grenade = self.droppedGrenadesGroup.create(child.sprite.x, globals.hoverPosition, 'grenade');
                grenade.hoverSpeed = Math.random() < 0.5? 0.2 : -0.2;
            }
        },
        pickUpGrenades: function(santaPosition) {
            for(var i = 0; i < self.droppedGrenadesGroup.children.length; ++i) {
                var grenade = self.droppedGrenadesGroup.children[i];
                if(game.math.distance(santaPosition.x, santaPosition.y, grenade.x, grenade.y) < 120) {
                    self.grenadeAmount++;
                    self.droppedGrenadesGroup.remove(grenade);
                    grenade.kill();
                    --i;
                    self.grenadeAmountText.text = "grenades: " + self.grenadeAmount;
                }
            }
        },
        hoverDroppedGrenades: function() {
            self.droppedGrenadesGroup.forEach(function(grenade) {
                grenade.position.y += grenade.hoverSpeed;
                if(grenade.position.y <= globals.hoverLimits.y1) {
                    grenade.position.y = globals.hoverLimits.y1;
                    grenade.hoverSpeed *= -1;
                }
                else if(grenade.position.y >= globals.hoverLimits.y2) {
                    grenade.position.y = globals.hoverLimits.y2;
                    grenade.hoverSpeed *= -1;
                }
            });
        },
        checkArrowCollisions: function(childManager, presents, points, deathAnimations) {
            self.arrowGroup.forEach(function(arrow) {
                // this type of for loop required to break; out of it
                for(var i = 0; i < childManager.children.length; ++i) {
                    var child = childManager.children[i];
                    var collision = false;
                    var headshot = false;

                    var arrowCentre = new Phaser.Point(arrow.x, arrow.y);
                    var headTL = Phaser.Point.add(child.sprite, child.sprite.scale.x > 0 ? child.sprite.headCollisionBox.TL : child.sprite.headCollisionBox.TL_mirrored);
                    var bodyTL = Phaser.Point.add(child.sprite, child.sprite.bodyCollisionBox.TL);
                    if(util.circleBoxCollision(arrowCentre, 5, headTL, child.sprite.headCollisionBox.WH)) {
                        collision = true;
                        headshot = true;
                    }
                    else if(util.circleBoxCollision(arrowCentre, 5, bodyTL, child.sprite.bodyCollisionBox.WH)) {
                        collision = true;
                    }

                    if(collision) {
                        self.collideWithChild(child, false, headshot, points, presents, childManager, deathAnimations);
                        self.arrowGroup.remove(arrow);
                        arrow.kill();
                        break; 
                    }
                }
            });
        },
        explodeGrenade: function(grenade, childManager, presents, points, deathAnimations, santaPosition) {
            self.grenadeSpeed = 0;
            var explosion;
            if(grenade != false) {
                self.grenadeGroup.remove(grenade);
                explosion = self.explosionGroup.create(grenade.x, grenade.y, 'explosion');
            }
            else {
                explosion = self.explosionGroup.create(santaPosition.x, santaPosition.y, 'explosion');
            }
            explosion.anchor.setTo(0.5, 0.5);
            explosion.scale.setTo(3.0, 3.0);
            explosion.explosionTime = Date.now();
            var childrenToKill = [];
            childManager.children.forEach(function(child) {
                if(Phaser.Point.distance(child.sprite.position, explosion.position) < 500) {
                    childrenToKill.push(child);
                }
            });
            points.checkGrenadeChildren(childrenToKill.length);
            childrenToKill.forEach(function(child, i) {
                self.collideWithChild(child, true, false, points, presents, childManager, deathAnimations);
                points.addGrenadePoints(child, i);
            });
            if(grenade != false) {
                grenade.kill();
            }
        },
        checkGrenadeExplosions: function(childManager, presents, points, deathAnimations) {
            self.grenadeGroup.forEach(function(grenade) {
                if(Date.now() - grenade.timeFired >= grenade.fuseTimeLeft) {
                    self.explodeGrenade(grenade, childManager, presents, points, deathAnimations);
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
        checkArrowDecay: function(points) {
            self.arrowGroup.forEach(function(arrow) {
                if(arrow.x < -200 || arrow.x > 1500 ||
                   arrow.y < -200 || arrow.y > 1000) {
                    self.arrowGroup.remove(arrow);
                    arrow.kill();
                    points.resetMultiplier();
                }
            });
        },
        rotateArrows: function() {
            // makes sure the arrow sprites are rotated dependant on their velocity
            self.arrowGroup.forEach(function(arrow) {
                var angle = Phaser.Point.angle(new Phaser.Point(0, 0), arrow.body.velocity);
                angle = angle + Math.PI;
                arrow.rotation = angle;
            });
        },
        rotateGrenades: function() {
            // adds a bit of spin to each grenade
            self.grenadeGroup.forEach(function(grenade) {
                grenade.rotation += grenade.rotationSpeed;
            });
        },
        update: function(childManager, presents, points, deathAnimations, santaPosition) {
            self.rotateMachineGun();
            self.checkArrowCollisions(childManager, presents, points, deathAnimations);
            self.checkGrenadeExplosions(childManager, presents, points, deathAnimations);
            self.checkExplosionTimeouts();
            self.checkArrowDecay(points);
            self.rotateArrows();
            self.rotateGrenades();
            self.updateString();
            self.hoverDroppedGrenades();
            self.pickUpGrenades(santaPosition);

            // hovering should be some kind of sin/cos-ish function over time
            // maybe look up simple harmonic motion again
            self.position.x += self.velocity.x;
            self.position.y += self.velocity.y;
            self.mountPosition.x += self.velocity.x;
            self.mountPosition.y += self.velocity.y;
            self.sleighSprite.x += self.velocity.x;
            self.sleighSprite.y += self.velocity.y;
            self.mgSprite.position.x += self.velocity.x;
            self.mgSprite.position.y += self.velocity.y;
            if(self.sleighSprite.y >= self.initialPosition.y + 100 ||
               self.sleighSprite.y <= self.initialPosition.y - 100) {
                self.velocity.y *= -1;
            }
            if(self.sleighSprite.x >= self.initialPosition.x + 50 ||
               self.sleighSprite.x <= self.initialPosition.x - 50) {
                self.velocity.x *= -1;
            }

            if(self.velocity.x > 0 && self.velocity.y < 0) {
                self.sleighSprite.animations.play('bothHoverAnimation',   1, true);
            }
            else if(self.velocity.x > 0) {
                self.sleighSprite.animations.play('leftHoverAnimation',   1, true);
            }
            else if(self.velocity.y < 0) {
                self.sleighSprite.animations.play('bottomHoverAnimation', 1, true);
            }
            else {
                self.sleighSprite.animations.play('noHoverAnimation',     1, true);
            }
        }
    };
  
    this.MachineGun = MachineGun;
    
}).call(self);
