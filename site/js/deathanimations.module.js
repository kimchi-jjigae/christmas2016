'use strict';

(function() {
    var self = this;
    var DeathAnimations = function() {
        self.deathAnimations = [];
        self.headExplosions = [];
        self.emitter;
    };
  
    DeathAnimations.prototype = {
        hej: function() {
            console.log('hej');
        },
        killChild: function(child, headshot) {
            if(headshot) {
                console.log("Animating HEDADSHOT!!!");
                self.emitter = game.add.emitter(child.head.x, child.head.y);
                self.emitter.makeParticles('blood_particle');
                self.emitter.gravity = 200;
                self.emitter.start(true, 0, null, 1000);
                //game.time.events.add(10, self.destroyEmitter, this);
                var kalle = function() {
                    self.emitter.destroy();
                }
                game.time.events.add(6000, kalle, this);
            }
            else {
                console.log("Animating child death");
            }
        },
        destroyEmitter: function() {
            //console.log(self.emitter);
            //self.emitter.destroy();
        }
    };
  
    this.DeathAnimations = DeathAnimations;
    
}).call(self);
