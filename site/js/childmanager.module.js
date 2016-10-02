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
            console.log('this is what i be addin');
            console.log(child);
            self.children.push(child);
        },
        spawn: function() {
            // make this randomness more time-based
            if(Math.random() < self.spawnRate) {
                console.log('spawninnnnnn mad');
                self.addChild();
                self.wave.childrenLeft--;
            }
        },
        checkForPresents: function(child, presentPile) {
            presentPile.presentGroup.forEach(function(present) {
                if(game.math.distance(child.body.x, 0, present.x, 0) < 20 && !child.right) {
                    console.log('-------------------------------------------------');
                    console.log('the childs rightness is ' + child.right + ' (it should be false)');
                    console.log('there are ' + self.children.length + ' children in total');
                    console.log('my index is ' + self.children.indexOf(child));
                    console.log('running awayyyyy');
                    console.log(child);
                    var hej = child.runAway();
                    console.log(child);
                    console.log('the childs rightness is ' + child.right + ' (it should now become true!)');
                    console.log('the childs hej is ' + hej + ' (it should be true!)');
                    presentPile.takePresent(present, child);
                }
            });
        },
        checkDespawning: function(child) {
            if(child.body.x > 1500 || child.body.x < -200) {
                var index = self.children.indexOf(child);
                console.log('killin mad');
                child.kill();
                self.children.splice(index, 1);
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
