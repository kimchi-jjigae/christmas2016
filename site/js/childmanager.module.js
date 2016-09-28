'use strict';

(function() {
    var self;
    var ChildManager = function(wave) {
        self = this;
        self.children = [];
        self.spawnPoint = new Phaser.Point(1400, 670);
        //self.spawnRate = 0.05;
        self.spawnRate = 0.005;
        self.wave = wave;
    };
  
    ChildManager.prototype = {
        checkForCollisions: function() {
            // check collisions of bullets or grenades or whatever against all the objects in the children
            // then do whatever depending on what part of the child was affected
        },
        addChild: function() {
            var child = new Child(self.spawnPoint);
            self.children.push(child);
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
                if(game.math.distance(child.x , 0, present.x, 0) < 20 && !child.right) {
                    child.scale.x *= -1;
                    child.body.velocity.x = child.rightVelocity;
                    child.right = true;
                    presentPile.takePresent(present, child);
                }
            });
        },
        checkDespawning: function(child) {
            if(child.x > 1500 || child.x < -200) {
                self.childBodyGroup.remove(child);
                child.kill();
            }
        },
        update: function(presentPile) {
            if(self.wave.childrenLeft > 0) {
                self.spawn();
            }
            else if(self.childBodyGroup.children.length == 0) {
                // uhhh all the new wave checking should probably be somewhere else
                self.wave.startNewWave();
            }
            self.children.forEach(function(child) {
                self.checkForPresents(child, presentPile);
                self.checkDespawning(child);
            });

        }
    };
  
    this.ChildManager = ChildManager;
    
}).call(self);
