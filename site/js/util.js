var util = {
    randomFloat: function(a, b) {
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
    },
    circleBoxCollision: function(circleTL, circleRadius, boxTL, boxWH) {
        var collision = false;
        var circleCentre = Phaser.Point.add(circleTL, circleRadius);
        // either the circle's centre is inside the rectangle
        if(circleCentre.x >= boxTL.x && circleCentre.x <= (boxTL + boxWH) &&
           circleCentre.y >= boxTL.y && circleCentre.y <= (boxTL + boxWH)) {
            collision = true;
            console.log('omg collision');
        }
        else {
            console.log('nah no collision');
        }
        /*
        // or a rectangle edge is inside the circle
        // if rect.x is within circle radius && circle.y is between rect.y??
        // and the other way around
        else if(boxTL.x
        else if(circleCentre.x >= boxTL.x && circleCentre.x <= (boxTL + boxWH) &&
           circleCentre.y >= boxTL.y && circleCentre.y <= (boxTL + boxWH)) {
        }
        */
        return collision;
    }
};
