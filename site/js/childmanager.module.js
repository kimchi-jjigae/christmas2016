'use strict';

(function() {
    var self;
    var ChildManager = function(wave) {
        self = this;
        self.childGroup = game.add.group();
        self.headGroup = game.add.group();
        self.spawnPoint = new Phaser.Point(1400, 670);
        self.addChild();
        //self.spawnRate = 0.05;
        self.spawnRate = 0.005;
        self.wave = wave;
    };
  
    ChildManager.prototype = {
        addChild: function() {
            var child = self.childGroup.create(self.spawnPoint.x, self.spawnPoint.y, 'girl_body');
            var head = game.add.sprite(self.spawnPoint.x, self.spawnPoint.y - 64, 'girl_head');
            game.physics.arcade.enable(child);
            game.physics.arcade.enable(head);
            child.scale.setTo(0.2, 0.2);
            var leftVelocity = util.randomFloat(-200, -260);
            var rightVelocity = util.randomFloat(240, 300);
            child.body.velocity.x = leftVelocity;
            child.fromVelocity = rightVelocity;
            child.anchor.setTo(0.5, 0.5);
            child.from = false;
            head.scale.setTo(0.2, 0.2);
            head.body.velocity.x = leftVelocity;
            head.fromVelocity = rightVelocity;
            head.anchor.setTo(0.5, 0.5);
            head.from = false;
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
