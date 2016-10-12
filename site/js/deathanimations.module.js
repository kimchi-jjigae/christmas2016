'use strict';



(function() {
    var self = this;
    var DeathAnimations = function() {
        self.deathAnimations = [];
        self.bloodEmitters = [];
        self.animationDuration = 2000;
        self.girlDeathSprite = game.add.sprite(300, 300, 'girl_death');
        self.girlDeathAnimation = self.girlDeathSprite.animations.add('deathAnimation');
        // have various different ones for the sake of variation
        // maybe even different ones depending on headshot or not
        self.girlDeathSprite.visible = false;
    };
  
    DeathAnimations.prototype = {
        update: function() {
            self.bloodEmitters.forEach(function(emitter) {
                if(Date.now() - emitter.emitStartTime > self.animationDuration) {
                    var index = self.bloodEmitters.indexOf(emitter);
                    self.bloodEmitters.splice(index, 1);
                    emitter.destroy();
                    console.log("destroying emitter");
                    self.girlDeathSprite.visible = false;
                }
            });
        },
        killChild: function(child, headshot) {
            if(headshot) {
                console.log("Animating HEDADSHOT!!!");
                var bloodEmitter = game.add.emitter(child.head.x, child.head.y, 100);
                bloodEmitter.makeParticles(['blood_particle1', 'blood_particle2', 'blood_particle3', 'blood_particle4', 'blood_particle5']);
                bloodEmitter.gravity = 800;
                bloodEmitter.start(true, 0, null, 100);
                bloodEmitter.emitStartTime = Date.now();
                bloodEmitters.push(bloodEmitter);
            }
            else {
                console.log("Animating child death");
            }
            self.girlDeathSprite.visible = true;
            self.girlDeathSprite.x = child.head.x;
            self.girlDeathSprite.y = child.head.y;
            self.girlDeathSprite.animations.play('deathAnimation', 4, false); // 4 fps lol, false means no repeat
        },
        destroyEmitter: function() {
            //console.log(self.emitter);
            //self.emitter.destroy();
        }
    };
  
    this.DeathAnimations = DeathAnimations;
    
}).call(self);
