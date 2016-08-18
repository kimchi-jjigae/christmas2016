(function() {
    var self;
    var PresentPile = function(presentGroup) {
        self = this;
        self.presentGroup = presentGroup;
        self.presentCount = 20;
        self.position = {
            x: 200,
            y: 700
        };
        self.setUpPresents = function() {
            for(var i = 0; i < self.presentCount; ++i) {
                var x_offset = (Math.random() * 250) - 50;
                var y_offset = -(Math.random() * 250);
                var x = self.position.x + x_offset;
                var y = self.position.y + y_offset;
                var present = self.presentGroup.create(x, y, 'present');
                present.scale.setTo(0.1, 1.0);
            }
        };

        self.setUpPresents();
    };
    this.PresentPile = PresentPile;
    
}).call(self);
