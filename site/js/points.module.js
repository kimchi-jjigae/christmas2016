'use strict';

(function() {
    var self;
    var PointsManager = function() {
        self = this;
        self.totalScore = 0;
        self.textScore = 0;
        self.multiplier = 1;
        //self.textMultiplier = 1;
        self.pointAnimations = [];
        self.scoreTextFlashDuration = 500;
        self.scoreTextFlashStart;
        self.scoreText = game.add.text(game.width - 200, 0, "score: " + self.totalScore, globals.fonts.f2);
        self.multiplierText = game.add.text(game.width - 250, 50, "multiplier: " + self.multiplier + "x", globals.fonts.f2);
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
            }
            else {
                self.resetMultiplier();
            }
            
            self.add(points);
            self.pointAnimations.push(new PointAnimation(child.sprite.position, points, self.scoreText.position));
        },
        addGrenadePoints: function(child, index) {
            index += 2;
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
            self.updateMultiplierText();
            self.multiplierText.text = "multiplier: " + self.multiplier + "x";
        },
        add: function(points) {
            self.totalScore += points;
        },
        updateMultiplierText: function() {
            self.multiplierTextFlashStart = Date.now();
            self.multiplierText.setStyle(globals.fonts.f2_flash);
            self.multiplierText.text = "multiplier: " + self.multiplier + "x";
        },
        updateScoreText: function(points) {
            self.scoreTextFlashStart = Date.now();
            self.scoreText.setStyle(globals.fonts.f2_flash);
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
                self.scoreText.setStyle(globals.fonts.f2);
            }
            if((Date.now() - self.multiplierTextFlashStart) >= self.scoreTextFlashDuration) {
                self.multiplierText.setStyle(globals.fonts.f2);
            }
        },
    };
  
    this.PointsManager = PointsManager;
    
}).call(self);
