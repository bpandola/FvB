FvB.AI = (function () {

    ///**
    // * @description Called when projectile is airborne. 
    // * @private
    // * @param {object} self The projectile actor object.
    // * @param {object} game The game object.
    // * @returns {boolean} True if move ok, otherwise false.
    // */
    function projectileTryMove(self, game) {

        if (self.x < 0 || self.x >= FvB.SCREENWIDTH)
            return false;

        for (i = 0; i < game.entities.length; i++) {
            var e = game.entities[i];

            if (e === self)
                continue;

            if (FvB.Entities.haveCollided(self,e)) {

                switch (e.objClass) {
                    case self.objClass:
                        e.state = FvB.st_remove;
                        FvB.Entities.spawnExplosion(self, e, game);
                        return false;

                    case FvB.ob_Player:
                        if (self.parent != e) {
                            FvB.Player.damage(e, self);
                            self.state = FvB.st_remove;
                            return false;
                        }
                }
            }
        }
        return true;
    }

    function T_Explode(self, game, tics) {
        

        self._index += self.speed * tics;
        if (self.speed > 0) {
            var max = self.frames.length;
            var idx = Math.floor(self._index);
            self.frame = self.frames[idx % max];

            if (idx >= max) {
                self.state = FvB.st_remove;
                return false;
            }
        }
        else {
            
            self.frame = self.frames[0];
        }
    }

    
    function T_Projectile(self, game, tics) {

        var speed = self.dir == FvB.DIR_LEFT ? -FvB.SUPER_PROJECTILE_SPEED : FvB.SUPER_PROJECTILE_SPEED;

        self.x += speed * tics;

        if (!projectileTryMove(self, game)) {
            self.state = FvB.st_remove;
        }
    }
  


    return {
       
        T_Projectile: T_Projectile,
        T_Explode: T_Explode
    };

})();