'use strict';

var Child = function(position, leftSide) {
    this.position = position;
    this.sprite = game.add.sprite(position.x, position.y, 'girl');
    this.sprite.animations.add('runAnimation', [0, 1, 2, 3, 4, 5, 6, 7]);
    this.sprite.animations.add('presentAnimation', [8, 9, 10, 11, 12, 13, 14, 15]);
    this.sprite.animations.play('runAnimation', 8, true); 
    game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.toVelocity  = util.randomFloat(-200, -260);
    this.fromVelocity = util.randomFloat( 240,  300);
    this.leftSide = leftSide;
    if(leftSide) {
        this.toVelocity *= -1;
        this.fromVelocity *= -1;
        this.sprite.scale.x *= -1;
    }
    this.sprite.body.velocity.x = this.toVelocity;
    this.sprite.headCollisionBox = {
        TL: new Phaser.Point(-89, -105),
        TL_mirrored: new Phaser.Point(11, -105),
        WH: new Phaser.Point(87, 79)
    };
    this.sprite.bodyCollisionBox = {
        TL: new Phaser.Point(-43, -56),
        WH: new Phaser.Point(98, 160)
    };
    this.from = false;
    this.jumping = false;
    this.ammo = Math.random() < 0.1 ? 1 : 0;
    this.hasPresent = false;
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

        // change animation when a present is picked up
        if(this.hasPresent == false && this.present != undefined) {
            this.hasPresent = true;
            this.sprite.animations.play('presentAnimation', 8, true);
        }
    },
    jump: function() {
    }
}
