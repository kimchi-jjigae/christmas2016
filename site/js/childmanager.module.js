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
            var child = self.childGroup.create(1000, 600, 'girl');
            game.physics.arcade.enable(child);
            child.scale.setTo(0.2, 0.2);
            child.body.velocity.x = randomFloat(-50, -110);
            child.fromVelocity = randomFloat(80, 140);
            child.anchor.setTo(0.5, 0.5);
            child.running = false;
        },
        spawn: function() {
            if(Math.random() < self.spawnRate) {
                self.addChild();
            }
        },
        checkForPresents: function(presentPile) {
            self.childGroup.forEach(function(child) {
                presentPile.presentGroup.forEach(function(present) {
                    if(game.math.distance(child.x , 0, present.x, 0) < 10 && !child.running) {
                        child.scale.x *= -1;
                        child.body.velocity.x = child.fromVelocity;
                        child.running = true;
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

function randomFloat(a, b) {
    var number = Math.random();
    if(arguments.length == 0) {
        return number;
    }
    else if(arguments.length == 1) {
        b = a;
        a = 0;
    }
    var span = b - a;
    number = number * span;
    number = number + a;
    return number;
}
