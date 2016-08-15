(function() {
    var self;
    var Child = function(position, velocity) {
        self = this;
        self.position = position || {
            x: 0,
            y: 0
        };
        self.velocity = velocity || {
            x: 0,
            y: 0
        };
        self.direction = DIRECTION.LEFT;
    };
  
    Child.prototype = {
        
    };
  
    this.Child = Child;
    
}).call(self);
