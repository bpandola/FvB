/** 
 * @namespace 
 * @description Entities
 */
FvB.Entities = (function () {

    FvB.setConsts({
        
        FL_SHOOTABLE: 1,
        FL_BONUS: 2,
        FL_NEVERMARK: 4,
        FL_VISIBLE: 8,
        FL_ATTACKMODE: 16,
        FL_FIRSTATTACK: 32,
        FL_AMBUSH: 64,
        FL_SINGLE_FRAME: 128,

        NUMSTATES: 34
    });

    FvB.setConsts({
        ob_None: -1,
        ob_Player: 0,
        ob_BasicProjectile: 1,
        ob_HugeProjectile: 2,
        ob_Line: 3
    });

    FvB.setConsts({
        en_Fartsac: 0,
        en_Boogerboy: 1,
        en_Fartball: 2,
        en_Booger: 3,
        en_HugeFartball: 4,
        en_HugeBooger: 5,
        en_Explosion: 6,
        en_Static: 7
    });

    FvB.setConsts({
        st_Stand: 0,
        st_Crouch: 1,
        st_JumpUp: 2,
        st_JumpDown: 3,
        st_Path: 4,
        st_Blow: 5,
        st_Damaged: 6,
        st_StaticOnce: 7,   // loop through frames once and then remove (e.g. explosions)
        st_StaticCyle: 8,   // loop through frames over and over
        st_StartFatality: 9,
        st_FinishFatality: 10,
        st_Decapitated: 11,
        st_FatalityDead: 12,

        st_EatBoog1: 13,
        st_EatBoog2: 14,
        st_EatBoog3: 15,
        st_EatBoog4: 16,
        st_EatBoog5: 17,
        st_EatBoog6: 18,

        st_Victorious: 31,
        st_NearlyDead: 32, // Player is dead, but fatality move hasn't been performed
        st_Dead: 33,
        st_Remove: 34,
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
            parent: null,
            renderFunction: FvB.Renderer.renderEntity
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
        var think, action;

        //assert( ent->tilex >= 0 && ent->tilex < 64 );
        //assert( ent->tiley >= 0 && ent->tiley < 64 );
        //assert( ent->dir >= 0 && ent->dir <= 8 );
        if (ent.state == FvB.st_Remove) {
            return false;
        }

        // ticcounts fire discrete actions separate from think functions
        if (ent.ticcount) {
            ent.ticcount -= (tics * FvB.TIC_BASE);

            while (ent.ticcount <= 0) {
                //assert( ent->type >= 0 && ent->type < NUMENEMIES );
                //assert( ent->state >= 0 && ent->state < NUMSTATES );

                action = FvB.objstate[ent.type][ent.state].action; // end of state action
                if (action) {
                    action(ent, game, tics);
                    if (ent.state == FvB.st_Remove) {
                        return false;
                    }
                }

                ent.state = FvB.objstate[ent.type][ent.state].next_state;
                if (ent.state == FvB.st_Remove) {
                    return false;
                }

                if (!FvB.objstate[ent.type][ent.state].timeout) {
                    ent.ticcount = 0;
                    break;
                }

                ent.ticcount += FvB.objstate[ent.type][ent.state].timeout;
            }
        }
        //
        // think
        //
        //assert( ent->type >= 0 && ent->type < NUMENEMIES );
        //assert( ent->state >= 0 && ent->state < NUMSTATES );
        think = FvB.objstate[ent.type][ent.state].think;

        if (think) {
            think(ent, game, tics);
            if (ent.state == FvB.st_Remove) {
                return false;
            }
        }

        return true;
    }
    // need to make this generic for changing needed entity properties on stateChange
    function setHitBox(ent) {
        switch (ent.state) {
            case FvB.st_Crouch:
                ent.hitBox.x1 = 26;
                ent.hitBox.x2 = 36;
                ent.hitBox.y1 = 32;
                ent.hitBox.y2 = 64;
                break;
            default:
                ent.hitBox.x1 = 26;
                ent.hitBox.x2 = 36;
                ent.hitBox.y1 = 0;
                ent.hitBox.y2 = 64;
        }
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
        if (newState == FvB.st_Remove) {
            ent.ticcount = 0;
        } else {
            // assert( ent->state >= 0 && ent->state < NUMSTATES );
            ent.ticcount = FvB.objstate[ent.type][ent.state].timeout; //0;
            setHitBox(ent);
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
   
    // Calculate midpoint of two entities
    function centerPoint(e1, e2) {

        var x, y, left, right,deltax, deltay;

        if (e1.x + e1.hitBox.x1 < e2.x + e2.hitBox.x1) {
            left = e1;
            right = e2;
        } else {
            left = e2;
            right = e1;
        }

        deltax = (right.x + right.hitBox.x2) - (left.x + left.hitBox.x1);
        x = left.x + left.hitBox.x1 + (deltax / 2);

        if (e1.y + e1.hitBox.y1 < e2.y + e2.hitBox.y1) {
            left = e1;
            right = e2;
        } else {
            left = e2;
            right = e1;
        }

        deltay = (right.y + right.hitBox.y2) - (left.y + left.hitBox.y1);
        y = left.y + left.hitBox.y1 + (deltay / 2);

        return { x: x, y: y };
    }

    function spawnLine(e, game, x1, y1, x2, y2, color) {
        self = getNewEntity(game);

        if (!self)
            return;

        self.type = FvB.en_Static;
        self.flags = FvB.FL_SINGLE_FRAME;  // one and done
        self.objClass = FvB.ob_Line;
        self.renderFunction = FvB.Renderer.renderPrimitive
        self.temp2 = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            color: color 
        };
    }
   
    function spawnSingleFrameSprite(game, x,y, textureId) {
        self = getNewEntity(game);

        if (!self)
            return;

        self.type = FvB.en_Static;
        self.flags = FvB.FL_SINGLE_FRAME;  // one and done
        self.renderFunction = FvB.Renderer.renderSprite
        self.x = x;
        self.y = y;
        self.sprite = textureId;
    }
    function spawnExplosion(e1, e2, game) {
        self = getNewEntity(game);

        if (!self)
            return;

        self.x = centerPoint(e1, e2).x - 20;
        self.y = centerPoint(e1, e2).y - 20;
        self.state = FvB.st_StaticOnce;
        self.type = FvB.en_Explosion;
        self.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        self.speed = 16;

        switch (e1.objClass) {
            case FvB.ob_HugeProjectile:
                FvB.Sound.playSound("sfx/explodey.wav");
                break;
            default:
                ;//FvB.Sound.playSound("sfx/splat.wav");
        }

        return self;
    }

    function spawnHugeProjectile(player, game) {
        var self = getNewEntity(game);

        if (!self)
            return;

        self.dir = player.dir;
        if (player.type == FvB.en_Boogerboy) {
            self.y = player.y + 7;
            self.x = player.x + 36 - (self.dir == FvB.DIR_LEFT ? 24 : 0);
        } else {
            self.y = player.y + 33;
            self.x = player.x + 32 - (self.dir == FvB.DIR_LEFT ? 34 : 0);
        }
        
        self.state = FvB.st_Path;
        self.objClass = FvB.ob_HugeProjectile;
        self.parent = player;

        self.hitBox.x1 = 0;
        self.hitBox.x2 = 24;
        self.hitBox.y1 = 8;
        self.hitBox.y2 = 16;

        switch (player.type) {
            case FvB.en_Fartsac:
                self.type = FvB.en_HugeFartball;
                FvB.Sound.playSound("sfx/fartball.wav");
                break;
            case FvB.en_Boogerboy:
                self.type = FvB.en_HugeBooger;
                FvB.Sound.playSound("sfx/booger.wav");
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
        self.x = player.x + 32 - (player.dir == FvB.DIR_LEFT ? 8 : 0);
        self.state = FvB.st_Path;
        self.objClass = FvB.ob_BasicProjectile;
        self.parent = player;

        self.hitBox.x1 = 0;
        self.hitBox.x2 = 6;
        self.hitBox.y1 = 0;
        self.hitBox.y2 = 6;

        switch (player.type) {
            case FvB.en_Fartsac:
                self.type = FvB.en_Fartball;
                //FvB.Sound.playSound("sfx/fartball.wav");
                break;
            case FvB.en_Boogerboy:
                self.type = FvB.en_Booger;
                //FvB.Sound.playSound("sfx/booger.wav");
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
        spawnSingleFrameSprite: spawnSingleFrameSprite,
        spawnLine: spawnLine,
        stateChange: stateChange,
        haveCollided: haveCollided
    };

})();