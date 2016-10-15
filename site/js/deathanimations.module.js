'use strict';

(function() {
    var self = this;
    var DeathAnimations = function() {
        self.deathSprites = [];
        self.bloodEmitters = [];
        self.animationDuration = 2000;
    };
  
    DeathAnimations.prototype = {
        update: function() {
            self.bloodEmitters.forEach(function(emitter) {
                if(Date.now() - emitter.emitStartTime > self.animationDuration) {
                    var index = self.bloodEmitters.indexOf(emitter);
                    self.bloodEmitters.splice(index, 1);
                    emitter.destroy();
                }
            });
            self.deathSprites.forEach(function(sprite) {
                if(Date.now() - sprite.startTime > self.animationDuration) {
                    var index = self.deathSprites.indexOf(sprite);
                    self.deathSprites.splice(index, 1);
                    sprite.destroy();
                }
            });
        },
        killChild: function(child, headshot) {
            if(headshot) {
                // particle effects
                var bloodEmitter = game.add.emitter(child.head.x, child.head.y, 100);
                bloodEmitter.makeParticles([
                    'blood_particle1',
                    'blood_particle2',
                    'blood_particle3',
                    'blood_particle4',
                    'blood_particle5'
                ]);
                bloodEmitter.gravity = 800;
                bloodEmitter.start(true, 0, null, 100);
                bloodEmitter.emitStartTime = Date.now();
                self.bloodEmitters.push(bloodEmitter);

            }
            // death animation
            var sprite = game.add.sprite(child.head.x, child.head.y, 'girl_death');
            sprite.animations.add('deathAnimation');
            sprite.x = child.head.x;
            sprite.y = child.head.y;
            if(child.right == true) {
                sprite.scale.x = -1;
            }
            sprite.animations.play('deathAnimation', 4, false); // 4 fps lol, false means no repeat
            sprite.startTime = Date.now();
            self.deathSprites.push(sprite);
        }
    };
  
    this.DeathAnimations = DeathAnimations;
    
}).call(self);
