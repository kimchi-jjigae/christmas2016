'use strict';

var PointAnimation = function(position, points, targetPosition) {
    this.text = game.add.text(position.x, position.y - 180, points, globals.fonts.f2);
    this.points = points;
    this.hovering = true;
    this.hoverTime = 2000;
    this.creationTime = Date.now();
    this.finished = false;
    this.targetPosition = targetPosition;
    this.speed = 3;
    var velocity = new Phaser.Point(position.x, position.y - 300);
    velocity = Phaser.Point.subtract(targetPosition, velocity);
    velocity.setMagnitude(this.speed);
    this.velocity = velocity;
};

PointAnimation.prototype = {
    update: function() {
        if(this.hovering) {
            this.text.position.y -= 0.2;
            if((Date.now() - this.creationTime) >= this.hoverTime) {
                this.hovering = false;
            }
        }
        else {
            this.text.position = Phaser.Point.add(this.text.position, this.velocity);
            this.speed *= 1.3;
            this.velocity.setMagnitude(this.speed);
            if((Phaser.Point.distance(this.text.position, this.targetPosition) < 20) ||
                this.text.position.x > 1366 || this.text.position.y < 0) {
                this.finished = true;
            }
        }
    },
    kill: function() {
        this.text.kill();
    }
}
