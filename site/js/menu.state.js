'use strict';

var MenuState = function() {};

MenuState.prototype = {
    create: function() {
        var showBackButton = function() {
            playButton.visible = false;
            optionsButton.visible = false;
            highscoreButton.visible = false;
            creditsButton.visible = false;
            backButton.visible = true;
        };
        var playCallback = function() {
            game.state.start("GameplayState");
        };
        var optionsCallback = function() {
            optionsText.visible = true;
            showBackButton();
        };
        var highscoreCallback = function() {
            highscoreText.visible = true;
            showBackButton();
        };
        var creditsCallback = function() {
            creditsText.visible = true;
            showBackButton();
        };
        var backCallback = function() {
            playButton.visible = true;
            optionsButton.visible = true;
            highscoreButton.visible = true;
            creditsButton.visible = true;
            backButton.visible = false;

            optionsText.visible = false;
            creditsText.visible = false;
            highscoreText.visible = false;
        };
        var playButton =      game.add.button(game.world.centerX - 256, 300, 'button_play',       playCallback,      this, 2, 1, 0);
        var optionsButton =   game.add.button(game.world.centerX - 256, 400, 'button_options',    optionsCallback,   this, 2, 1, 0);
        var highscoreButton = game.add.button(game.world.centerX - 256, 500, 'button_highscores', highscoreCallback, this, 2, 1, 0);
        var creditsButton =   game.add.button(game.world.centerX - 256, 600, 'button_credits',    creditsCallback,   this, 2, 1, 0);
        var backButton =      game.add.button(game.world.centerX - 256, 600, 'button_back',       backCallback,      this, 2, 1, 0);
        backButton.visible = false;

        var optionsText = game.add.text(200, 300, "Jk no options for you.\nSometimes you have to take what you're given in life!", {fill: 'white'});
        var creditsText = game.add.text(100, 300, 'I am sooooooo talented I made EVERYTHING', {fill: 'white'});
        var highscoreText = game.add.text(500, 300, '1. kim: 9999999999', {fill: 'white'});
        optionsText.visible = false;
        creditsText.visible = false;
        highscoreText.visible = false;

        var style = {
            font: 'bold 88px Arial',
            fill: '#ee5555',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        game.add.text(100, 100, "super cool christmas game", style);
    },
    update: function() {
    }
};
/* Reference for up over out functions, taken from http://phaser.io/examples/v2/buttons/action-on-click
button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

button.onInputOver.add(over, this);
button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);

}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick() {
    background.visible =! background.visible;
}
*/
