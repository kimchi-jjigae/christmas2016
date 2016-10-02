'use strict';

// store the body, head, and whatever other "decorative" things in here
// check for physics and collisions every frame 
var Child = function(position) {
    this.position = position;
    // please resize these
    this.body = game.add.sprite(position.x, position.y, 'girl_body');
    this.head = game.add.sprite(position.x, position.y - 60, 'girl_head');
    game.physics.arcade.enable(this.body);
    game.physics.arcade.enable(this.head);
    this.leftVelocity  = util.randomFloat(-200, -260);
    this.rightVelocity = util.randomFloat( 240,  300);
    this.body.body.velocity.x = this.leftVelocity;
    this.head.body.velocity.x = this.leftVelocity;
    this.body.anchor.setTo(0.5, 0.5);
    this.head.anchor.setTo(0.5, 0.5);
    this.right = false;
    this.ammo = parseInt(util.randomFloat(3));
    this.points = {
        to: 20,
        from: 10
    };
};

Child.prototype = {
    runAway: function() {
        this.body.scale.x *= -1;
        this.head.scale.x *= -1;
        this.body.body.velocity.x = this.rightVelocity;
        this.head.body.velocity.x = this.rightVelocity;
        this.right = true;
        return this.right;
    },
    kill: function() {
        this.head.kill();
        this.body.kill();
    },
    update: function() {
        // check for collisions and physics here
    }
}
