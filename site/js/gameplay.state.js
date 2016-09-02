'use strict';

var GameplayState = function() {
    //this santa = new Santa();
};

GameplayState.prototype = {

    create: function() {
        this.santa = new Santa();
        this.children = new ChildManager();
        this.points = new PointsManager();

        this.platforms = game.add.group();
        // move these platform things to their own class! :)
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'platform');
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;
        //var ledge = platforms.create(400, 400, 'platform');
        //ledge.body.immovable = true;

        this.presents = new PresentPile();
        this.machineGun = new MachineGun();
        game.input.keyboard.onDownCallback = function(event) {
            if(keycodes.left.includes(event.key)) {
                // ← left
                this.santa.movement.left = true;
            }
            else if(keycodes.right.includes(event.key)) {
                // → right
                this.santa.movement.right = true;
            }
            else if(keycodes.up.includes(event.key)) {
                // ↑ up
                this.santa.movement.up = true;
                splashscreen.next();
            }
            else if(keycodes.down.includes(event.key)) {
                // ↓ down
                this.santa.movement.down = true;
            }
        };
        game.input.keyboard.onUpCallback = function(event) {
            if(keycodes.action.includes(event.key)) {
                // E action
                this.santa.use(machineGun);
            }
            else if(keycodes.left.includes(event.key)) {
                // ← left
                this.santa.movement.left = false;
            }
            else if(keycodes.right.includes(event.key)) {
                // → right
                this.santa.movement.right = false;
            }
            else if(keycodes.up.includes(event.key)) {
                // ↑ up
                this.santa.movement.up = false;
            }
            else if(keycodes.down.includes(event.key)) {
                // ↓ down
                this.santa.movement.down = false;
            }
        };
    },
    update: function() {
        // physics goes first, to make sure the updates work properly
        game.physics.arcade.collide(this.santa.santa, platforms);
        game.physics.arcade.collide(machineGun.bulletsGroup, children.childGroup, killChild);

        children.update(presents); 
        machineGun.update();
        this.santa.update(presents);

        if(game.input.activePointer.isDown) {
            machineGun.fireBullet();
        }

        function killChild(bullet, child) {
            if(child.present != undefined) {
                presents.dropPresent(child.present);
            }
            else {
                // drop ammo, but should the children holding presents drop ammo too?
            }
            machineGun.bulletsGroup.remove(bullet);
            children.childGroup.remove(child);
            if(child.from) {
                points.add(child.points.from);
            }
            else {
                points.add(child.points.to);
            }
            bullet.kill();
            child.kill();
        };
    }
};
