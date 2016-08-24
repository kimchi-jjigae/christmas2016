'use strict';

(function() {
    var self;
    var ChildManager = function(childGroup) {
        self = this;
        self.childGroup = childGroup;
        self.addChild();
        self.spawnRate = 0.005;
    };
  
    ChildManager.prototype = {
        addChild: function() {
            var child = self.childGroup.create(1400, 670, 'girl');
            game.physics.arcade.enable(child);
            child.scale.setTo(0.2, 0.2);
            child.body.velocity.x = util.randomFloat(-80, -140);
            child.fromVelocity = util.randomFloat(140, 200);
            child.anchor.setTo(0.5, 0.5);
            child.from = false;
            child.ammo = parseInt(util.randomFloat(3));
            child.points = {
                to: 20,
                from: 10
            };
        },
        spawn: function() {
            if(Math.random() < self.spawnRate) {
                self.addChild();
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
            self.spawn();
            self.childGroup.forEach(function(child) {
                self.checkForPresents(child, presentPile);
                self.checkDespawning(child);
            });

        }
    };
  
    this.ChildManager = ChildManager;
    
}).call(self);
