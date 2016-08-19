(function() {
    var self;
    var PointsManager = function() {
        self = this;
        self.totalScore = 0;
        self.scoring = {
            // actually, maybe the children themselves should hold these
            killBefore: 20,
            killAfter: 10,
        }
    };
  
    PointsManager.prototype = {
        add: function(points) {
            self.totalScore += points;
        }
    };
  
    this.PointsManager = PointsManager;
    
}).call(self);
