'use strict';

var Child = function(position, leftSide) {
    this.position = position;
    this.sprite = game.add.sprite(position.x, position.y, 'girl');
    this.sprite.animations.add('runAnimation');
    this.sprite.animations.play('runAnimation', 8, true); 
    game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.toVelocity  = util.randomFloat(-200, -260);
    this.fromVelocity = util.randomFloat( 240,  300);
    if(leftSide) {
        this.toVelocity *= -1;
        this.fromVelocity *= -1;
        this.sprite.scale.x *= -1;
    }
    this.sprite.body.velocity.x = this.toVelocity;
    this.sprite.headCollisionBox = {
        TL: {
            x: 102, // relative to 0, 0
            y: 22
        },
        WH: {
            x: 83,
            y: 83
        },
    };
    this.sprite.bodyCollisionBox = {
        TL: {
            x: 63,
            y: 94
        },
        WH: {
            x: 80,
            y: 140
        },
    };
    this.from = false;
    this.jumping = false;
    this.ammo = Math.random < 0.05 ? 1 : 0;
    this.points = {
        to: 20,
        from: 10
    };
};

Child.prototype = {
    runAway: function() {
        this.sprite.scale.x *= -1;
        this.sprite.body.velocity.x = this.fromVelocity;
        this.from = true;
    },
    kill: function() {
        this.sprite.kill();
    },
    update: function() {
        if(this.jumping) {
            if(this.sprite.y >= this.position.y) {
                this.sprite.y = this.position.y;
                this.sprite.body.velocity.y = 0;
                this.sprite.body.gravity.y = 0;
                this.jumping = false;
            }
        }
        else if(Math.random() < 0.03) {
            this.jumping = true;
            this.sprite.body.velocity.y = -600;
            this.sprite.body.gravity.y = 1000;
        }
    },
    jump: function() {
    }
}
