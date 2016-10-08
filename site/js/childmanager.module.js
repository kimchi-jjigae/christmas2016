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
        addChild: function() {
            var child = new Child(self.spawnPoint);
            self.children.push(child);
        },
        removeChild: function(child) {
            var index = self.children.indexOf(child);
            self.children.splice(index, 1);
            child.kill();
        },
        killChild: function(child, headshot) {
            // runs when shot or exploded
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
                if(game.math.distance(child.body.x, 0, present.x, 0) < 20 && !child.right) {
                    child.runAway();
                    presentPile.takePresent(present, child);
                }
            });
        },
        checkDespawning: function(child) {
            if(child.body.x > 1500 || child.body.x < -200) {
                self.removeChild(child);
            }
        },
        update: function(presentPile) {
            if(self.wave.childrenLeft > 0) {
                self.spawn();
            }
            else if(self.children.length == 0) {
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
