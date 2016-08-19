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
    }
};
