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
    this.jumping = false;
    this.ammo = parseInt(util.randomFloat(3));
    this.points = {
        left: 20,
        right: 10
    };
};

Child.prototype = {
    runAway: function() {
        this.body.scale.x *= -1;
        this.head.scale.x *= -1;
        this.body.body.velocity.x = this.rightVelocity;
        this.head.body.velocity.x = this.rightVelocity;
        this.right = true;
    },
    kill: function() {
        this.head.kill();
        this.body.kill();
    },
    update: function() {
        if(this.jumping) {
            if(this.body.y >= this.position.y) {
                this.body.y = this.position.y;
                this.head.y = this.position.y - 60;
                this.body.body.velocity.y = 0;
                this.head.body.velocity.y = 0;
                this.body.body.gravity.y = 0;
                this.head.body.gravity.y = 0;
                this.jumping = false;
            }
        }
        else if(Math.random() < 0.03) {
            this.jumping = true;
            this.body.body.velocity.y = -600;
            this.head.body.velocity.y = -600;
            this.body.body.gravity.y = 1000;
            this.head.body.gravity.y = 1000;
        }
    },
    jump: function() {
    }
}
