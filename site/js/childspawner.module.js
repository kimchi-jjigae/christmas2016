(function() {
    var self;
    var ChildSpawner = function(childGroup) {
        self = this;
        self.childGroup = childGroup;
        self.children = [];
        self.addChild();
        self.spawnRate = 0.05;
    };
  
    ChildSpawner.prototype = {
        addChild: function() {
            var girl = self.childGroup.create(1000, 600, 'girl');
            game.physics.arcade.enable(self.childGroup); // is this really necessary every time a child is spawned?
            girl.scale.setTo(0.2, 0.2);
            girl.body.velocity.x = -50;
        },
        spawn: function() {
            if(Math.random() < self.spawnRate) {
                self.addChild();
            }
        },
        update: function() {
            self.spawn();
        }
    };
  
    this.ChildSpawner = ChildSpawner;
    
}).call(self);
