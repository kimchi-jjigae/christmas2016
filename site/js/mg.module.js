(function() {
    var self;
    var MachineGun = function(bulletsGroup, position) {
        self = this;
        self.bulletsGroup = bulletsGroup;
        self.bulletAmount = 0;
        self.maxBullets = 5;
        self.bulletVelocity = 800;
        self.fireRate = 100; // milliseconds
        self.timeLastFired = 0;
        self.position = position || {
            x: 680,
            y: 100
        };
        self.direction = DIRECTION.RIGHT;
    };
  
    MachineGun.prototype = {
        fireBullet: function() {
            if(Date.now() - self.timeLastFired >= self.fireRate) {
                if(self.bulletAmount < self.maxBullets) {
                    var bullet = self.bulletsGroup.create(self.position.x, self.position.y, 'bullet');
                    game.physics.arcade.moveToPointer(bullet, self.bulletVelocity);
                    self.timeLastFired = Date.now();
                    self.bulletAmount++;
                }
            }
        },
        fireGrenade: function() {
        }
    };
  
    this.MachineGun = MachineGun;
    
}).call(self);
