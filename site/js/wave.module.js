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
        self.updateParameters();
        self.newWaveTime = 6000; // milliseconds
        self.newWavePause = 2000;
        self.newWaveStart;
        var style = {
            font: 'bold 40px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        self.newWaveText = game.add.text(20, 20, "Wave 1", style);
        self.newWaveText.visible = true;
    };
  
    Wave.prototype = {
        startNewWave: function() {
            self.number++;
            self.updateParameters();
            self.newWaveStart = Date.now();
            self.newWaveText.x = game.width / 2;
            self.newWaveText.y = game.height / 2;
            self.newWaveText.text = "Wave " + self.number;
            self.active = false;
        },
        newWaveUpdate: function() {
            if(Date.now() - self.newWaveStart > self.newWaveTime) {
                self.newWaveText.x = 20;
                self.newWaveText.y = 20;
                if(Date.now() - self.newWaveStart > (self.newWaveTime + self.newWavePause)) {
                    self.active = true;
                }
            }
        }
    };
  
    this.Wave = Wave;
    
}).call(self);
