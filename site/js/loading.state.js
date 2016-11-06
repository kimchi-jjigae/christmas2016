'use strict';

var LoadingState = function() {};

LoadingState.prototype = {
    init: function() {
        this.loadingText = game.make.text(game.world.centerX, 380, 'Loading...', {
            fill: 'white',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        });
    },
    preloadSprites: function() {
        // menu sprites //
        //http://www.dafont.com/monofur.font?text=Game+Over%21&back=theme

        // gameplay sprites //
        game.load.image('bg',        'assets/sprites/gamebg.png');
        game.load.image('arrow',     'assets/sprites/arrow.png');
        game.load.image('explosion', 'assets/sprites/explosion.png');
        game.load.image('grenade',   'assets/sprites/grenade.png');
        game.load.image('bow',       'assets/sprites/bow.png');
        game.load.image('santaArm',  'assets/sprites/santaarm.png');
        game.load.image('platform',  'assets/sprites/platform.png');
        game.load.image('present1',  'assets/sprites/present1.png');
        game.load.image('present2',  'assets/sprites/present2.png');
        game.load.image('present3',  'assets/sprites/present3.png');
        game.load.image('present4',  'assets/sprites/present4.png');
        game.load.image('present5',  'assets/sprites/present5.png');
        game.load.image('present6',  'assets/sprites/present6.png');
        game.load.image('present7',  'assets/sprites/present7.png');
        game.load.image('sleigh',    'assets/sprites/sleigh.png');
        game.load.image('blood_particle1', 'assets/sprites/blood_particle1.png');
        game.load.image('blood_particle2', 'assets/sprites/blood_particle2.png');
        game.load.image('blood_particle3', 'assets/sprites/blood_particle3.png');
        game.load.image('blood_particle4', 'assets/sprites/blood_particle4.png');
        game.load.image('blood_particle5', 'assets/sprites/blood_particle5.png');
        game.load.image('button_play',       'assets/sprites/button_play.png');
        game.load.image('button_options',    'assets/sprites/button_options.png');
        game.load.image('button_highscores', 'assets/sprites/button_highscores.png');
        game.load.image('button_credits',    'assets/sprites/button_credits.png');
        game.load.image('button_back',       'assets/sprites/button_back.png');

        game.load.spritesheet('girl_death', 'assets/spritesheets/ss_girldeath.png',  250, 239, 8);
        game.load.spritesheet('girl',       'assets/spritesheets/ss_girl.png',  194, 264, 8);
        game.load.spritesheet('santa',      'assets/spritesheets/ss_santa.png',  175, 225, 10);
    },
    preloadScripts: function() {
        // states
        game.load.script('gameplayStateScript', 'js/gameplay.state.js');
        game.load.script('menuStateScript',     'js/menu.state.js');
	    game.load.script('gameOverStateScript', 'js/gameover.state.js');

        // other
	    game.load.script('utilScript',          'js/util.js');
	    game.load.script('globalsScript',       'js/globals.js');
	    game.load.script('directionEnumScript', 'js/direction.enum.js');
	    game.load.script('keycodesScript',      'js/keycodes.js');

        // classes
	    game.load.script('childScript',           'js/child.module.js');
	    game.load.script('santaScript',           'js/santa.module.js');
	    game.load.script('waveScript',            'js/wave.module.js');
	    game.load.script('pointAnimationScript', 'js/pointanimation.module.js');
	    game.load.script('pointsScript',          'js/points.module.js');
	    game.load.script('mgScript',              'js/mg.module.js');
	    game.load.script('sleighScript',          'js/sleigh.module.js');
	    game.load.script('childManagerScript',    'js/childmanager.module.js');
	    game.load.script('presentPileScript',     'js/presentpile.module.js');
	    game.load.script('deathAnimationsScript', 'js/deathanimations.module.js');
    },
    createGameplayStateAssets: function() {
        // this doesn't work, please fix it
        //game.state.states['GameplayState'].santa = new Santa();
    },
    preload: function() {
        game.add.existing(this.loadingText);
        this.preloadSprites();
        this.preloadScripts();
    },
    create: function() {
        game.input.keyboard.onDownCallback = function(event) {
        };
        game.state.add('MenuState', MenuState);
        game.state.add('GameplayState', GameplayState);
        game.state.add('GameOverState', GameOverState);
        this.createGameplayStateAssets();
    },
    update: function() {
        game.state.start("MenuState");
    }
};
