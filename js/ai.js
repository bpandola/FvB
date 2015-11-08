FvB.AI = (function () {

    ///**
    // * @description Called when projectile is airborne. 
    // * @private
    // * @param {object} self The projectile actor object.
    // * @param {object} game The game object.
    // * @returns {boolean} true if move ok, otherwise false.
    // */
    function projectileTryMove(self, game) {

        if (self.x + self.hitBox.x2 < 0 || self.x + self.hitBox.x1 >= FvB.SCREENWIDTH)
            return false;

        if (self.y > FvB.PLAYER_START_Y) {
            FvB.Entities.spawnExplosion(self, self, game);
            return false;
        }
            

        for (i = 0; i < game.entities.length; i++) {
            var e = game.entities[i];

            if (e === self)
                continue;

            if (FvB.Entities.haveCollided(self,e)) {

                switch (e.objClass) {
                    case self.objClass:
                        e.state = FvB.st_Remove;
                        FvB.Entities.spawnExplosion(self, e, game);
                        return false;

                    case FvB.ob_Player:
                        if (self.parent != e) {
                            FvB.Player.damage(e, self);
                            self.state = FvB.st_Remove;
                            return false;
                        }
                }
            }
        }
        return true;
    }

    function T_Projectile2(self, game, tics) {

        self.time += tics;
        self.x = self.startX + self.xVelocity * self.time;
        self.y = self.startY - ( self.yVelocity * self.time - (1/2 * FvB.GRAVITY * Math.pow(self.time,2)));

        if (!projectileTryMove(self, game)) {
            self.state = FvB.st_Remove;
        }
    }

    function T_Projectile(self, game, tics) {

        var speed = self.objClass == FvB.ob_BasicProjectile ? FvB.BASIC_PROJECTILE_SPEED : FvB.SUPER_PROJECTILE_SPEED;
        speed = self.dir == FvB.DIR_LEFT ? -speed : speed;

        self.x += speed * tics;

        if (!projectileTryMove(self, game)) {
            self.state = FvB.st_Remove;
        }
    }

    function A_PlaySound(self, game, tics) {

        if (self.type == FvB.en_YouWin) {
            if (self.state == FvB.st_Explosion1) {
                FvB.Sound.playSound(FvB.SFX_YOU_WIN);
                
            } else {
                game.roundOver = true;
            }
            return;
        }

        if (self.type == FvB.en_YouLose) {
            if (self.state == FvB.st_Explosion1) {
                FvB.Sound.playSound(FvB.SFX_YOU_LOSE);

            } else {
                game.roundOver = true;
            }
            return;
        }

        switch (self.state) {
            case FvB.st_Explosion1:
                FvB.Sound.playSound(FvB.SFX_ROUND1 + game.round);
                break;
            case FvB.st_Explosion7:
                FvB.Sound.playSound(FvB.SFX_FIGHT);
                game.acceptingInput = true;
                break;
                
        }
    }

    return {
       
        T_Projectile: T_Projectile,
        T_Projectile2: T_Projectile2,
        A_PlaySound: A_PlaySound
    };

})();