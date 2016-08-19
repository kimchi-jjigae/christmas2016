'use strict';

(function() {
    var self;
    var PointsManager = function() {
        self = this;
        self.totalScore = 0;
        var style = {
            font: 'bold 32px Arial',
            fill: '#f194dd',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.text = game.add.text(canvasWidth - 200, 0, "score: " + self.totalScore, style);
    };
  
    PointsManager.prototype = {
        add: function(points) {
            self.totalScore += points;
            self.text.text = "score: " + self.totalScore;
        },
    };
  
    this.PointsManager = PointsManager;
    
}).call(self);
