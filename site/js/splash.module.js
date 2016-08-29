'use strict';

(function() {
    var self;
    var SplashScreen = function() {
        self = this;
        self.splashscreen = game.add.sprite(0, 0, 'splashscreen');
    };
  
    SplashScreen.prototype = {
        update: function() {
            self.splashscreen.visible = true;
        },
        next: function() {
            self.splashscreen.visible = false;
            state = states.MENU;
        }
    };
  
    this.SplashScreen = SplashScreen;
    
}).call(self);
