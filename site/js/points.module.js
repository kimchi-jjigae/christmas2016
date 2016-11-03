'use strict';

(function() {
    var self;
    var PointsManager = function() {
        self = this;
        self.totalScore = 0;
        self.textScore = 0;
        self.multiplier = 1;
        self.pointAnimations = [];
        var style = {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.scoreText = game.add.text(game.width - 200, 0, "score: " + self.totalScore, style);
        self.multiplierText = game.add.text(game.width - 200, 50, "multiplier: " + self.multiplier, style);
        self.childPoints = {
            normal: 1,
            headshot: 10
        };
    };
  
    PointsManager.prototype = {
        addChildPoints: function(child, headshot) {
            var points = headshot ? self.childPoints.headshot : self.childPoints.normal;
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
            self.pointAnimations.push(new PointAnimation(child.position, points));
        },
        resetMultiplier: function() {
            self.multiplier = 1;
            self.multiplierText.text = "multiplier: " + self.multiplier;
        },
        add: function(points) {
            self.totalScore += points;
            self.scoreText.text = "score: " + self.totalScore;
        },
        update: function() {
            self.pointAnimations.forEach(function(anim) {
                anim.update();
                if(anim.finished) {
                    var index = self.pointAnimations.indexOf(anim);
                    self.pointAnimations.splice(index, 1);
                    anim.kill();
                }
            });
        },
    };
  
    this.PointsManager = PointsManager;
    
}).call(self);
