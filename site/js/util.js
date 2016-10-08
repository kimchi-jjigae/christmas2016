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
    circleBoxCollision: function(circleCentre, circleRadius, boxTL, boxWH) {
        var collision = false;
        var boxBR = Phaser.Point.add(boxTL, boxWH);

        // either the circle's centre is inside the rectangle
        if((circleCentre.x >= boxTL.x && circleCentre.x <= boxBR.x &&
            circleCentre.y >= boxTL.y && circleCentre.y <= boxBR.y) 
        || // the top line is within the circle
        (Math.abs(circleCentre.y - boxTL.y)      <= circleRadius &&
                 (circleCentre.x + circleRadius) >  boxTL.x &&
                 (circleCentre.x - circleRadius) <  boxBR.x)
        || // the left line is within the circle
        (Math.abs(circleCentre.x - boxTL.x)      <= circleRadius &&
                 (circleCentre.y + circleRadius) >  boxTL.y &&
                 (circleCentre.y - circleRadius) <  boxBR.y)
        || // the right line is within the circle
        (Math.abs(circleCentre.x - boxBR.x)      <= circleRadius &&
                 (circleCentre.y + circleRadius) >  boxTL.y &&
                 (circleCentre.y - circleRadius) <  boxBR.y)
        || // the bottom line is within the circle
        (Math.abs(circleCentre.y - boxBR.y)      <= circleRadius &&
                 (circleCentre.x + circleRadius) >  boxTL.x &&
                 (circleCentre.x - circleRadius) <  boxBR.x)) {
            collision = true;
        }
        return collision;
    }
};
