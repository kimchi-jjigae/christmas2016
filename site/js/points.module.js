'use strict';

(function() {
    var self;
    var PointsManager = function() {
        self = this;
        self.totalScore = 0;
        self.textScore = 0;
        self.multiplier = 1;
        self.pointAnimations = [];
        self.style = {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.flashStyle = {
            font: 'bold 32px Arial',
            fill: '#ffffff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.scoreTextFlashDuration = 500;
        self.scoreTextFlashStart;
        self.scoreText = game.add.text(game.width - 200, 0, "score: " + self.totalScore, self.style);
        self.multiplierText = game.add.text(game.width - 200, 50, "multiplier: " + self.multiplier, self.style);
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
            self.pointAnimations.push(new PointAnimation(child.sprite.position, points, self.scoreText.position));
        },
        addGrenadePoints: function(child, index) {
            var points = (Math.pow(2, index)) * self.multiplier;
            self.add(points);
            self.pointAnimations.push(new PointAnimation(child.sprite.position, points, self.scoreText.position));
        },
        checkGrenadeChildren: function(childAmount) {
            if(childAmount == 0) {
                self.resetMultiplier();
            }
        },
        resetMultiplier: function() {
            self.multiplier = 1;
            self.multiplierText.text = "multiplier: " + self.multiplier;
        },
        add: function(points) {
            self.totalScore += points;
        },
        updateScoreText: function(points) {
            self.scoreTextFlashStart = Date.now();
            self.scoreText.setStyle(self.flashStyle);
            self.textScore += points;
            self.scoreText.text = "score: " + self.textScore;
        },
        update: function() {
            self.pointAnimations.forEach(function(anim) {
                anim.update();
                if(anim.finished) {
                    var index = self.pointAnimations.indexOf(anim);
                    self.pointAnimations.splice(index, 1);
                    anim.kill();
                    self.updateScoreText(anim.points);
                }
            });
            if((Date.now() - self.scoreTextFlashStart) >= self.scoreTextFlashDuration) {
                self.scoreText.setStyle(self.style);
            }
        },
    };
  
    this.PointsManager = PointsManager;
    
}).call(self);
