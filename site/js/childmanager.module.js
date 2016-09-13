'use strict';

(function() {
    var self;
    var ChildManager = function(wave) {
        self = this;
        self.childGroup = game.add.group();
        self.addChild();
        self.spawnRate = 0.05;
        self.wave = wave;
    };
  
    ChildManager.prototype = {
        addChild: function() {
            var child = self.childGroup.create(1400, 670, 'girl');
            game.physics.arcade.enable(child);
            child.scale.setTo(0.2, 0.2);
            child.body.velocity.x = util.randomFloat(-200, -260);
            child.fromVelocity = util.randomFloat(240, 300);
            //child.body.velocity.x = util.randomFloat(-80, -140);
            //child.fromVelocity = util.randomFloat(140, 200);
            child.anchor.setTo(0.5, 0.5);
            child.from = false;
            child.ammo = parseInt(util.randomFloat(3));
            child.points = {
                to: 20,
                from: 10
            };
        },
        spawn: function() {
            // make this randomness more time-based
            if(Math.random() < self.spawnRate) {
                self.addChild();
                self.wave.childrenLeft--;
            }
        },
        checkForPresents: function(child, presentPile) {
            presentPile.presentGroup.forEach(function(present) {
                if(game.math.distance(child.x , 0, present.x, 0) < 20 && !child.from) {
                    child.scale.x *= -1;
                    child.body.velocity.x = child.fromVelocity;
                    child.from = true;
                    presentPile.takePresent(present, child);
                }
            });
        },
        checkDespawning: function(child) {
            if(child.x > 1500 || child.x < -200) {
                self.childGroup.remove(child);
                child.kill();
            }
        },
        update: function(presentPile) {
            if(self.wave.childrenLeft > 0) {
                self.spawn();
            }
            else if(self.childGroup.children.length == 0) {
                // uhhh all the new wave checking should probably be somewhere else
                self.wave.startNewWave();
            }
            self.childGroup.forEach(function(child) {
                self.checkForPresents(child, presentPile);
                self.checkDespawning(child);
            });

        }
    };
  
    this.ChildManager = ChildManager;
    
}).call(self);
