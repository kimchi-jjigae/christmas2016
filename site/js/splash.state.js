'use strict';

var SplashState = function() {
    var self = this;
};

SplashState.prototype = {

  /*
  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },
  */
    init: function() {
        // show splashscreen here
    },
    preload: function() {
    },
    create: function() {
        // this is kept isolated to this state by overriding
        // it in other states -- kinda hacky!
        game.input.keyboard.onDownCallback = function(event) {
            game.state.start('LoadingState');
        };
    },
    update: function() {
        console.log('splashinggg');
    }
};
