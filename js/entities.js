/** 
 * @namespace 
 * @description Entities
 */
FvB.Entities = (function () {

    FvB.setConsts({
        
        FL_SHOOTABLE: 1,
        FL_BONUS: 2,
        FL_NEVERMARK: 4,
        FL_VISABLE: 8,
        FL_ATTACKMODE: 16,
        FL_FIRSTATTACK: 32,
        FL_AMBUSH: 64,
        FL_NONMARK: 128,

        NUMSTATES: 34
    });

    FvB.setConsts({
        ob_None: -1,
        ob_Player: 0,
        ob_BasicProjectile: 1,
        ob_HugeProjectile: 2
    });

    FvB.setConsts({
        en_None: -1,
        en_Player1: 0,
        en_Player2: 1,
        en_Fartsac: 0,
        en_Boogerboy: 1,
        en_Fartball: 2,
        en_Booger: 3,
        en_HugeFartball: 4,
        en_HugeBooger: 5,
        en_Explosion: 6
    });

    FvB.setConsts({
        st_stand: 0,
        st_walk: 1,
        st_jump: 2,
        st_crouch: 3,
        st_path3: 4,
        st_path3s: 5,
        st_path4: 6,
        st_pain: 7,
        st_pain1: 8,
        st_shoot1: 9,
        st_shoot2: 10,
        st_shoot3: 11,
        st_shoot4: 12,
        st_shoot5: 13,
        st_shoot6: 14,
        st_shoot7: 15,
        st_shoot8: 16,
        st_shoot9: 17,
        st_chase1: 18,
        st_chase1s: 19,
        st_chase2: 20,
        st_chase3: 21,
        st_chase3s: 22,
        st_chase4: 23,
        st_die1: 24,
        st_die2: 25,
        st_die3: 26,
        st_die4: 27,
        st_die5: 28,
        st_die6: 29,
        st_die7: 30,
        st_die8: 31,
        st_die9: 32,
        st_dead: 33,
        st_remove: 34
    });

    /**
     * @description Create new entity.
     * @memberOf FvB.Entities
     * @param {object} game The game object.
     * @returns {object} The new actor object.
     */
    function getNewEntity(game) {

        var entity = {
            x: 0,
            y: 0,
            angle: 0,
            type: 0,
            health: 0,
            max_health: 0,
            speed: 0,
            ticcount: 0,
            temp2: 0,
            distance: 0,
            tile: {
                x: 0,
                y: 0
            },
            hitBox: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0
            },
            flags: 0,            //    FL_SHOOTABLE, etc
            state: 0,
            dir: 0,
            sprite: 0,
            player: -1,
            frames: [0],
            frame: 0,
            _index: 0,
            objClass: FvB.ob_None,
            parent: null
        };
        game.entities.push(entity);

        return entity;
    }

    /**
     * @description Process a single actor.
     * @private
     * @param {object} ent The actor object.
     * @param {object} level The level object.
     * @param {object} player The player object.
     * @param {number} tics The number of tics.
     * @returns {boolean} False if actor should be removed, otherwise true.
     */
    function doEntity(ent, game, tics) { // FIXME: revise!
        var think;

        //assert( ent->tilex >= 0 && ent->tilex < 64 );
        //assert( ent->tiley >= 0 && ent->tiley < 64 );
        //assert( ent->dir >= 0 && ent->dir <= 8 );
        if (ent.state == FvB.st_remove) {
            return false;
        }

        // ticcounts fire discrete actions separate from think functions
        //if (ent.ticcount) {
        //    ent.ticcount -= tics;

        //    while (ent.ticcount <= 0) {
        //        //assert( ent->type >= 0 && ent->type < NUMENEMIES );
        //        //assert( ent->state >= 0 && ent->state < NUMSTATES );

        //        think = FvB.objstate[ent.type][ent.state].action; // end of state action
        //        if (think) {
        //            think(ent, game, tics);
        //            if (ent.state == Wolf.st_remove) {
        //                return false;
        //            }
        //        }

        //        ent.state = FvB.objstate[ent.type][ent.state].next_state;
        //        if (ent.state == Wolf.st_remove) {
        //            return false;
        //        }

        //        if (!FvB.objstate[ent.type][ent.state].timeout) {
        //            ent.ticcount = 0;
        //            break;
        //        }

        //        ent.ticcount += FvB.objstate[ent.type][ent.state].timeout;
        //    }
        //}
        //
        // think
        //
        //assert( ent->type >= 0 && ent->type < NUMENEMIES );
        //assert( ent->state >= 0 && ent->state < NUMSTATES );
        think = FvB.objstate[ent.type][ent.state].think;

        if (think) {
            think(ent, game, tics);
            if (ent.state == FvB.st_remove) {
                return false;
            }
        }

        return true;
    }


    /**
     * @description Changes etities state to that defined in newState.
     * @memberOf Wolf.Actors
     * @param {object} ent The actor object.
     * @param {number} newState The new state.
     */
    function stateChange(ent, newState) {
        ent.state = newState;
        // assert( ent->type >= 0 && ent->type < NUMENEMIES );
        if (newState == FvB.st_remove) {
            ent.ticcount = 0;
        } else {
            // assert( ent->state >= 0 && ent->state < NUMSTATES );
            ent.ticcount = FvB.objstate[ent.type][ent.state].timeout; //0;
        }
    }

    /**
     * @description Process all the entities
     * @memberOf FvB.Entities
     * @param {object} level The level object.
     * @param {object} player The player object.
     * @param {number} tics The number of tics.
     */
    function process(game, tics) {
        for (var i = 0; i < game.entities.length; i++) {
            doEntity(game.entities[i], game, tics);
        }
    }
   

    function spawnExplosion(obj, game) {
        self = getNewEntity(game);

        if (!self)
            return;

        self.x = obj.x-15;
        self.y = obj.y-15;
        self.state = FvB.st_stand;
        self.type = FvB.en_Explosion;
        self.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        self.speed = 16;

        return self;
    }

    function spawnHugeProjectile(player, game) {
        var self = getNewEntity(game);

        if (!self)
            return;

        self.dir = player.dir;
        self.y = player.y + 6;
        self.x = player.x + 32 - (self.dir == FvB.DIR_LEFT ? 24 : 0);
        self.state = FvB.ST_PATH;
        self.objClass = FvB.ob_HugeProjectile;
        self.parent = player;

        self.hitBox.x1 = 0;
        self.hitBox.x2 = 24;
        self.hitBox.y1 = 0;
        self.hitBox.y2 = 24;

        switch (player.type) {
            case FvB.en_Fartsac:
                self.type = FvB.en_HugeFartball;
                break;
            case FvB.en_Boogerboy:
                self.type = FvB.en_HugeBooger;
                break;

        }

        return self;

    }
    
    function haveCollided(a, b) {

        if ((a.x + a.hitBox.x2) >= (b.x + b.hitBox.x1)) {
            if ((a.x + a.hitBox.x1) <= (b.x + b.hitBox.x2)) {
                if ((a.y + a.hitBox.y2) >= (b.y + b.hitBox.y1)) {
                    if ((a.y + a.hitBox.y1) <= (b.y + b.hitBox.y2)) {
                        return true;
                    }
                }
            }

        }
        return false;
        
    }
    function spawnBasicProjectile(player, game) {
        var self = getNewEntity(game);

        if (!self)
            return;

        self.dir = player.dir;
        self.y = player.y + 32;
        self.x = player.x + 32;
        self.state = FvB.ST_PATH;
        self.objClass = FvB.ob_BasicProjectile;
        self.parent = player;

        self.hitBox.x1 = 0;
        self.hitBox.x2 = 6;
        self.hitBox.y1 = 0;
        self.hitBox.y2 = 6;

        switch (player.type) {
            case FvB.en_Fartsac:
                self.type = FvB.en_Fartball;
                break;
            case FvB.en_Boogerboy:
                self.type = FvB.en_Booger;
                break;

        }

        return self;

    }
   

    return {
        process: process,
        getNewEntity: getNewEntity,
        spawnBasicProjectile: spawnBasicProjectile,
        spawnHugeProjectile: spawnHugeProjectile,
        spawnExplosion: spawnExplosion,
        stateChange: stateChange,
        haveCollided: haveCollided
    };

})();