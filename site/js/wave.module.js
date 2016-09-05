'use strict';

(function() {
    var self;
    var Wave = function(number) {
        self = this;
        self.number = number;
        self.active = true;
        self.childrenLeft;
        self.updateParameters = function() {
            self.childrenLeft = self.number * 3;
        };
        self.newWaveTime = 1000; // milliseconds
        self.newWaveStart;
        var style = {
            font: 'bold 32px Arial',
            fill: '#ff9486'
        };
        self.newWaveText = game.add.text(game.width / 2, game.height / 2, "Wave 1", style);
        self.newWaveText.visible = false;
    };
  
    Wave.prototype = {
        startNewWave: function() {
            self.number++;
            self.updateParameters();
            self.newWaveStart = Date.now();
            self.newWaveText.text = "Wave " + self.number;
            self.newWaveText.visible = true;
            self.active = false;
        },
        newWaveUpdate: function() {
            if(Date.now() - self.newWaveStart > self.newWaveTime) {
                self.active = true;
            }
        }
    };
  
    this.Wave = Wave;
    
}).call(self);
