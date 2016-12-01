'use strict';

(function() {
    var self = this;
    var DeathAnimations = function() {
        self.deathSprites = [];
        self.headSprites = [];
        self.bloodEmitters = [];
        self.animationDuration = 5000;
        self.groundY = 650;
        self.bloodParticles = [];
        self.bloodTime = 8000;
        self.bloodMax = 600;
    };
  
    DeathAnimations.prototype = {
        update: function(points) {
            self.bloodEmitters.forEach(function(emitter) {
                var particlesToDestroy = [];
                emitter.children.forEach(function(particle) {
                    if(particle.position.y > globals.ground) {
                        var bloodparticle = 'blood_particle' + util.randomInt(1, 5);
                        var blood = game.add.sprite(particle.position.x, particle.position.y, bloodparticle);
                        blood.timeCreated = Date.now();
                        self.bloodParticles.push(blood);

                        particlesToDestroy.push(particle);
                    }
                });
                particlesToDestroy.forEach(function(particle) {
                    var index = emitter.children.indexOf(particle);
                    emitter.children.splice(index, 1);
                    particle.kill();
                });
                if(Date.now() - emitter.emitStartTime > self.animationDuration) {
                    var index = self.bloodEmitters.indexOf(emitter);
                    self.bloodEmitters.splice(index, 1);
                    emitter.destroy();
                }
            });

            var bloodParticlesToDestroy = [];
            bloodParticles.forEach(function(bloodParticle) {
                if(Date.now() - bloodParticle.timeCreated > self.bloodTime) {
                    bloodParticlesToDestroy.push(bloodParticle);
                }
            });
            bloodParticlesToDestroy.forEach(function(bloodParticle) {
                var index = self.bloodParticles.indexOf(bloodParticle);
                self.bloodParticles.splice(index, 1);
                bloodParticle.kill();
            });
            while(bloodParticles.length > self.bloodMax) {
                bloodParticles.splice(-50, 50);
            }

            var headSpritesToKill = [];
            self.headSprites.forEach(function(sprite) {
                sprite.rotation += sprite.rotationSpeed;
                sprite.position = Phaser.Point.add(sprite.position, sprite.velocity);
                sprite.velocity = Phaser.Point.add(sprite.velocity, sprite.acceleration);

                var textPosition = new Phaser.Point(game.width - 200, 50);
                var vectorToText = Phaser.Point.subtract(textPosition, sprite.position);
                vectorToText = vectorToText.normalize();
                var velocityVector = sprite.velocity.normalize();
                var angle = Math.acos(vectorToText.dot(velocityVector));
                if(angle < 0.3) {
                    sprite.acceleration = sprite.velocity.rotate(0, 0, 0.01);
                    sprite.magnitude += 0.3;
                }
                else {
                    sprite.acceleration = sprite.velocity.rotate(0, 0, 0.05);
                    sprite.magnitude += 0.02;
                }
                sprite.acceleration.setMagnitude(sprite.magnitude);
                if((sprite.position.x > game.width  || sprite.position.x < 0) &&
                   (sprite.position.y > game.height || sprite.position.y < 0)) {
                    headSpritesToKill.push(sprite);
                    points.updateMultiplierText();
                }
            });
            headSpritesToKill.forEach(function(sprite) {
                var index = self.headSprites.indexOf(sprite);
                self.headSprites.splice(index, 1);
                sprite.kill();
            });

            self.deathSprites.forEach(function(sprite) {
                if(Date.now() - sprite.startTime > self.animationDuration) {
                    var index = self.deathSprites.indexOf(sprite);
                    self.deathSprites.splice(index, 1);
                    sprite.destroy();
                }
                else if(Math.abs(sprite.y - self.groundY) <= 20) {
                    sprite.y = self.groundY;
                    sprite.body.velocity.x = 0;
                    sprite.body.velocity.y = 0;
                    sprite.body.gravity.y = 0;
                }
            });
        },
        killChild: function(child, headshot, grenade) {
            if(headshot) {
                // particle effects
                var bloodEmitter = game.add.emitter(child.sprite.x, child.sprite.y - 28, 50);
                bloodEmitter.minParticleSpeed.setTo(-50, -100);
                bloodEmitter.maxParticleSpeed.setTo(50, -500);
                bloodEmitter.makeParticles([
                    'blood_particle1',
                    'blood_particle2',
                    'blood_particle3',
                    'blood_particle4',
                    'blood_particle5'
                ]);
                bloodEmitter.gravity = 500;
                bloodEmitter.start(true, 0, null, 100);
                bloodEmitter.emitStartTime = Date.now();
                self.bloodEmitters.push(bloodEmitter);
                
                // head
                var headSprite = game.add.sprite(0, 0, 'girl_head');
                headSprite.anchor.setTo(0.5, 0.5);
                headSprite.x = child.sprite.x;
                headSprite.y = child.sprite.y - 68;
                if(child.sprite.scale.x < 0) {
                    headSprite.scale.x = -1;
                }
                headSprite.rotationSpeed = util.randomFloat(-0.05, 0.05);
                var textPosition = new Phaser.Point(game.width - 200, 50);
                var vectorToText = Phaser.Point.subtract(textPosition, headSprite.position);
                vectorToText = vectorToText.setMagnitude(200);
                headSprite.velocity = vectorToText.rotate(0, 0, Math.PI / 2);
                headSprite.acceleration = headSprite.velocity.rotate(0, 0, 0.1);
                headSprite.magnitude = 8;
                headSprite.acceleration.setMagnitude(headSprite.magnitude);
                self.headSprites.push(headSprite);
            }
            // death animation
            var sprite = game.add.sprite(child.sprite.x, child.sprite.y, 'girl_death');
            if(headshot) {
                sprite.animations.add('deathAnimation', [8, 9, 10, 11, 12, 13, 14, 15]);
            }
            else if(grenade) {
                sprite.animations.add('deathAnimation', [16, 17, 18, 19, 20, 21, 22, 23]);
            }
            else {
                sprite.animations.add('deathAnimation', [0, 1, 2, 3, 4, 5, 6, 7]);
            }
            sprite.anchor.setTo(0.5, 0.5);
            sprite.x = child.sprite.x;
            sprite.y = child.sprite.y;
            game.physics.arcade.enable(sprite);
            sprite.body.gravity = child.sprite.body.gravity;
            sprite.body.velocity = child.sprite.body.velocity;
            if(child.sprite.scale.x < 0) {
                sprite.scale.x = -1;
            }
            sprite.animations.play('deathAnimation', 8, false); 
            sprite.startTime = Date.now();
            self.deathSprites.push(sprite);
        }
    };
  
    this.DeathAnimations = DeathAnimations;
    
}).call(self);
