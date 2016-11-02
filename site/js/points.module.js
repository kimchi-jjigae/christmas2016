'use strict';

(function() {
    var self;
    var PointsManager = function() {
        self = this;
        self.totalScore = 0;
        self.multiplier = 1;
        var style = {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.scoreText = game.add.text(game.width - 200, 0, "score: " + self.totalScore, style);
        self.multiplierText = game.add.text(game.width - 200, 50, "multiplier: " + self.multiplier, style);
    };
  
    PointsManager.prototype = {
        addChildPoints: function(child, headshot) {
            var points = 0;
            if(child.from) {
                points = child.points.from;
            }
            else {
                points = child.points.to;
            }
            if(headshot) {
                // crit
                points = points * self.multiplier;
                self.multiplier++;
                self.multiplierText.text = "multiplier: " + self.multiplier;
            }
            else {
                self.resetMultiplier();
            }

            self.add(points);
        },
        resetMultiplier: function() {
            self.multiplier = 1;
            self.multiplierText.text = "multiplier: " + self.multiplier;
        },
        add: function(points) {
            self.totalScore += points;
            self.scoreText.text = "score: " + self.totalScore;
        },
    };
  
    this.PointsManager = PointsManager;
    
}).call(self);
