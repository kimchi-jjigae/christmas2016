'use strict';

// store the body, head, and whatever other "decorative" things in here
// check for physics and collisions every frame (really suboptimal, DOP would be better!)
(function() {
    var self;
    var Child = function(position) {
        self = this;
        self.position = position;
        self.body = game.add.sprite(position.x, position.y, 'girl_body');
        self.head = game.add.sprite(position.x, position.y, 'girl_head');
        game.physics.arcade.enable(self.body);
        game.physics.arcade.enable(self.head);
        self.leftVelocity  = util.randomFloat(-200, -260);
        self.rightVelocity = util.randomFloat( 240,  300);
        self.body.body.velocity.x = self.leftVelocity;
        self.head.body.velocity.x = self.leftVelocity;
        self.body.anchor.setTo(0.5, 0.5);
        self.head.anchor.setTo(0.5, 0.5);
        self.right = false;
        self.ammo = parseInt(util.randomFloat(3));
        self.points = {
            to: 20,
            from: 10
        };
    };
  
    Child.prototype = {
    }

    this.Child = Child;
    
}).call(self);

