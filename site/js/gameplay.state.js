'use strict';
    
var GameplayState = function() {};

GameplayState.prototype = {
    create: function() {
        // all this takes too long to load; move some of it into the loading state
        self = this;
        self.gameOverFlag = false;
        self.bg = game.add.sprite(0, 0, 'bg');
        self.santa = new Santa();
        self.wave = new Wave(1);
        self.children = new ChildManager(self.wave);
        self.points = new PointsManager();
        self.platforms = game.add.group();
        self.platforms.enableBody = true;
        var ground = self.platforms.create(0, game.world.height - 64, 'platform');
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;

        self.presents = new PresentPile();
        self.machineGun = new MachineGun();
        self.sleigh = new Sleigh();
        self.deathAnimations = new DeathAnimations();

        game.input.keyboard.onDownCallback = function(event) {
            if(keycodes.left.includes(event.key)) {
                // ← left
                self.santa.movement.left = true;
            }
            else if(keycodes.right.includes(event.key)) {
                // → right
                self.santa.movement.right = true;
            }
            else if(keycodes.up.includes(event.key)) {
                // ↑ up
                self.santa.movement.up = true;
            }
            else if(keycodes.down.includes(event.key)) {
                // ↓ down
                self.santa.movement.down = true;
            }
        };
        game.input.keyboard.onUpCallback = function(event) {
            if(keycodes.action.includes(event.key)) {
                // E action
                self.santa.use(self.machineGun);
            }
            else if(keycodes.left.includes(event.key)) {
                // ← left
                self.santa.movement.left = false;
            }
            else if(keycodes.right.includes(event.key)) {
                // → right
                self.santa.movement.right = false;
            }
            else if(keycodes.up.includes(event.key)) {
                // ↑ up
                self.santa.movement.up = false;
            }
            else if(keycodes.down.includes(event.key)) {
                // ↓ down
                self.santa.movement.down = false;
            }
        };
    },
    update: function() {
        // physics goes first, to make sure the updates work properly
        game.physics.arcade.collide(self.santa.santa, self.platforms);
        game.physics.arcade.collide(self.santa.santa, self.sleigh.sleighSprite);

        self.deathAnimations.update();
        if(self.wave.active) {
            self.children.update(self.presents); 
        }
        else {
            self.wave.newWaveUpdate();
        }
        self.machineGun.update(self.children, self.presents, self.points, self.deathAnimations);
        self.santa.update(self.presents, self.machineGun.mountPosition);
        self.sleigh.update();
        self.points.update();

        if(self.machineGun.active) {
            if(game.input.activePointer.leftButton.isDown) {
                self.machineGun.startFiringArrow();
                self.santa.drawArrow(self.arrowSpeed / self.maxArrowSpeed);
            }
            else if(game.input.activePointer.leftButton.isUp) {
                if(self.machineGun.startedArrowFire) {
                    self.machineGun.fireArrow();
                    self.santa.releaseArrow();
                }
            }
            if(game.input.activePointer.rightButton.isDown) {
                self.machineGun.startFiringGrenade();
                self.santa.throwGrenade(self.grenadeSpeed / self.maxGrenadeSpeed);
            }
            else if(game.input.activePointer.rightButton.isUp) {
                if(self.machineGun.startedGrenadeFire) {
                    self.machineGun.fireGrenade();
                    self.santa.releaseGrenade();
                }
            }
        }

        // check for game over
        self.gameOverFlag = self.presents.update(); 
        if(self.gameOverFlag) {
            game.state.states['GameOverState'].score = self.points.totalScore;
            game.state.start("GameOverState");
        }
    },
};
