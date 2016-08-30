'use strict';

var LoadingState = function() {
    var self = this;
};

LoadingState.prototype = {
  /*
  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },
  */
    preloadSprites: function() {
        game.load.image('mg',           'assets/sprites/mg.png');
        game.load.image('santa',        'assets/sprites/santa.png');
        game.load.image('girl',         'assets/sprites/girl.png');
        game.load.image('platform',     'assets/sprites/platform.png');
        game.load.image('bullet',       'assets/sprites/bullet.png');
        game.load.image('present',      'assets/sprites/present.png');
        game.load.image('splashscreen', 'assets/sprites/splashscreen.png');
    },
    preload: function() {
        this.preloadSprites();
    },
    create: function() {
    },
    update: function() {
        console.log('loading...');
    }
};
