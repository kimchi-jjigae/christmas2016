'use strict';

var PointAnimation = function(position, points) {
    var style = {
        font: 'bold 40px Arial',
        fill: '#ff9486',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    };
    this.text = game.add.text(position.x, position.y, points, style);
    this.position = position;
    this.points = points;
    this.hovering = true;
    this.hoverTime = 2000;
    this.creationTime = Date.now();
};

PointAnimation.prototype = {
    update: function() {
        if(this.hovering) {
            this.text.position.y -= 0.1;
            if((Date.now() - self.creationTime) >= this.hoverTime) {
                this.hovering = false;
            }
        }
        else {
            // get velocity towards text position
            // kill if within proximity of text position
        }
    },
    kill: function() {
        this.text.kill();
    }
}
