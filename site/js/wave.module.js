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
        self.newWaveText = game.add.text(20, 20, "Wave 1", globals.fonts.f2);
        self.newWaveText.visible = true;
    };
  
    Wave.prototype = {
        startNewWave: function() {
            self.number++;
            self.updateParameters();
            self.newWaveStart = Date.now();
            self.newWaveText.x = game.world.centerX - 250;
            self.newWaveText.y = game.world.centerY - 100;
            self.newWaveText.text = "Wave " + self.number;
            self.newWaveText.setStyle(globals.fonts.f1);
            self.active = false;
        },
        newWaveUpdate: function() {
            if(Date.now() - self.newWaveStart > self.newWaveTime) {
                self.newWaveText.x = 20;
                self.newWaveText.y = 20;
                self.newWaveText.setStyle(globals.fonts.f2);
                if(Date.now() - self.newWaveStart > (self.newWaveTime + self.newWavePause)) {
                    self.active = true;
                }
            }
        }
    };
  
    this.Wave = Wave;
    
}).call(self);
