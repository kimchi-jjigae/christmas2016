(function() {
    var self;
    var ChildManager = function(childGroup) {
        self = this;
        self.childGroup = childGroup;
        self.addChild();
        self.spawnRate = 0.02;
    };
  
    ChildManager.prototype = {
        addChild: function() {
            var girl = self.childGroup.create(1000, 600, 'girl');
            game.physics.arcade.enable(girl);
            girl.scale.setTo(0.2, 0.2);
            girl.body.velocity.x = -50;
        },
        spawn: function() {
            if(Math.random() < self.spawnRate) {
                self.addChild();
            }
        },
        checkForPresents: function(presentPile) {
            self.childGroup.forEach(function(child) {
                presentPile.presentGroup.forEach(function(present) {
                    if(game.math.distance(child.x , 0, present.x, 0) < 10) {
                        console.log('close to the presents! :)');
        /*      
                        take the present and run; :)
        */
                    }
                });
            });
        },
        update: function(presentPile) {
            self.checkForPresents(presentPile);
            self.spawn();
        }
    };
  
    this.ChildManager = ChildManager;
    
}).call(self);
