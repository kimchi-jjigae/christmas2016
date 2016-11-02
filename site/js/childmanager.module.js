'use strict';

(function() {
    var self;
    var ChildManager = function(wave) {
        self = this;
        self.children = [];
        self.spawnPoint1 = new Phaser.Point(1400, 650);
        self.spawnPoint2 = new Phaser.Point(-50, 650);
        //self.spawnRate = 0.05;
        self.spawnRate = 0.003;
        self.wave = wave;
        self.spawnTimeRate = 4000; // milliseconds
        self.spawnTimeLastAdded = Date.now();
    };
  
    ChildManager.prototype = {
        addChild: function() {
            self.spawnTimeLastAdded = Date.now();
            var child;
            if(Math.random() < 0.5) {
                child = new Child(self.spawnPoint1);
            }
            else {
                child = new Child(self.spawnPoint2, true);
            }
            self.children.push(child);
        },
        removeChild: function(child) {
            var index = self.children.indexOf(child);
            self.children.splice(index, 1);
            child.kill();
        },
        spawn: function() {
            if(Date.now() - self.spawnTimeLastAdded >= self.spawnTimeRate ||
               Math.random() < self.spawnRate) {
                self.addChild();
                self.wave.childrenLeft--;
            }
        },
        checkForPresents: function(child, presentPile) {
            var presents = presentPile.presentGroup.children;
            var presentToTake;
            for(var i = 0; i < presents.length; ++i) {
                var present = presents[i];
                if(game.math.distance(child.sprite.x, 0, present.x, 0) < 10 && !child.from) {
                    if(presentToTake === undefined) {
                        presentToTake = present;
                    }
                    else if(present.pyramidPosition > presentToTake.pyramidPosition) {
                        presentToTake = present;
                    }
                }
            }
            if(presentToTake != undefined) {
                child.runAway();
                presentPile.takePresent(present, child);
            }
        },
        checkDespawning: function(child) {
            if(child.sprite.x > 1500 || child.sprite.x < -100) {
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
                child.update();
            });

        }
    };
  
    this.ChildManager = ChildManager;
    
}).call(self);
