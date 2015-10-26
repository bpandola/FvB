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

       // NUMSTATES: 34
    });

    FvB.setConsts({
        ob_None: -1,
        ob_Player: 0,
        ob_BasicProjectile: 1,
        ob_HugeProjectile: 2,
        ob_Line: 3
    });

    FvB.setConsts({
        // Characters have to be first and in order
        en_Fartsac: 0,
        en_Boogerboy: 1,
        en_Yohan: 2,
        en_Ryu: 3,

        en_Fartball: 4,
        en_Booger: 5,
        en_HugeFartball: 6,
        en_HugeBooger: 7,
        en_Explosion: 8,
        en_HugeExplosion: 9,
        en_Static: 10,
        en_Hadouken: 11
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

        st_Explosion1: 19,
        st_Explosion2: 21,
        st_Explosion3: 22,
        st_Explosion4: 23,
        st_Explosion5: 24,
        st_Explosion6: 25,
        st_Explosion7: 26,
        st_Explosion8: 27,
        st_Explosion9: 28,
        st_Explosion10: 29,
        st_Explosion11: 30,
        st_Explosion12: 31,
        st_Explosion13: 32,
      

        st_Victorious: 41,
        st_NearlyDead: 42, // Player is dead, but fatality move hasn't been performed
        st_Dead: 43,
        st_Remove: 44,

        st_Idle1: 45,
        st_Idle2: 46,
        st_Idle3: 47,
        st_Idle4: 48,

        st_Walk1: 49,
        st_Walk2: 50,
        st_Walk3: 51,
        st_Walk4: 52,
        st_Walk5: 53,

        st_JumpStart: 54,
        st_JumpEnd: 55,

        st_Hadouken1: 56,
        st_Hadouken2: 57,
        st_Hadouken3: 58,
        st_Hadouken4: 59,
        st_Hadouken5: 60,

        st_FartTurd1: 61,
        st_FartTurd2: 62,
        st_FartTurd3: 63,
        st_FartTurd4: 64,
        st_FartTurd5: 65,
        st_FartTurd6: 66,
        st_FartTurd7: 67,
        st_FartTurd8: 68,
        st_FartTurd9: 69,
        st_FartTurd10: 70,

        st_BlowBoog1: 71,
        st_BlowBoog2: 72,
        st_BlowBoog3: 73,
        st_BlowBoog4: 74,
        st_BlowBoog5: 75,
        st_BlowBoog6: 76,
        st_BlowBoog7: 77,
        st_BlowBoog8: 78,
        st_BlowBoog9: 79,
        st_BlowBoog10: 80


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
            //angle: 0,
            type: 0,
            health: 0,
            //max_health: 0,
            speed: 0,
            ticcount: 0,
            temp2: 0,
            //distance: 0,
            //tile: {
            //    x: 0,
            //    y: 0
            //},
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
            flip: 0,
            //player: -1,
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

                //ent.state = FvB.objstate[ent.type][ent.state].next_state;
                nextState(ent);
                if (ent.state == FvB.st_Remove) {
                    return false;
                }

                if (!ent.ticcount) {
                    break;
                }
                //if (!FvB.objstate[ent.type][ent.state].timeout) {
                //    ent.ticcount = 0;
                //    break;
                //}

                //ent.ticcount += FvB.objstate[ent.type][ent.state].timeout;
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

        var sprite = FvB.Sprites.getSprite(ent.sprite);

        if (sprite.hitBox != null) {
            // ent.hitBox = sprite.hitBox doesn't work!  It then modifies the sprite hitBox later...  
            ent.hitBox.x1 = sprite.hitBox.x1;
            ent.hitBox.x2 = sprite.hitBox.x2;
            ent.hitBox.y1 = sprite.hitBox.y1;
            ent.hitBox.y2 = sprite.hitBox.y2;
        } else {
            // Default to sprite size
            ent.hitBox.x1 = -sprite.width/2;
            ent.hitBox.x2 = sprite.width/2;
            ent.hitBox.y1 = -sprite.height;
            ent.hitBox.y2 = 0;
        }
    }
    /**
     * @description Changes etities state to that defined in newState.
     * @memberOf Wolf.Actors
     * @param {object} ent The actor object.
     * @param {number} newState The new state.
     */
    function nextState(ent) {
        stateChange(ent, FvB.objstate[ent.type][ent.state].next_state);
    }
    function stateChange(ent, newState) {
        // assert( ent->type >= 0 && ent->type < NUMENTITIES );
        ent.state = newState;
        ent.flip = FvB.objstate[ent.type][ent.state].flip;
        ent.sprite = FvB.objstate[ent.type][ent.state].texture;

        if (!FvB.objstate[ent.type][ent.state].timeout) {
            ent.ticcount = 0;
        } else {
            
            ent.ticcount += FvB.objstate[ent.type][ent.state].timeout;
        }

        if (newState == FvB.st_Remove) {
            ent.ticcount = 0;
            return;
        } 
            setHitBox(ent);
        
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
   
    /**
     * @description Returns the center point of two entities
     * @memberOf FvB.Entities
     * @param {object} Entity1.
     * @param {object} Entity2.
     */
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

    /**
    * @description Determine if two entities have collided
    * @memberOf FvB.Entities
    * @param {object} Entity1.
    * @param {object} Entity2.
    */
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

        var pos = centerPoint(e1, e2);
        
        switch (e1.objClass) {
            case FvB.ob_HugeProjectile:
                FvB.Sound.playSound(FvB.SFX_HUGE_EXPLOSION);
                self.type = FvB.en_HugeExplosion;
                self.x = pos.x;
                self.y = pos.y + 20;
                break;
            case FvB.ob_BasicProjectile:
                //FvB.Sound.playSound(FvB.SFX_SPLAT);
                self.type = FvB.en_Explosion;
                self.x = pos.x;
                self.y = pos.y + 10;
                break;
            default:
                ;
        }

        stateChange(self, FvB.st_Explosion1);

        return self;
    }

    function A_SpawnHadouken(player, game, tics) {
        var self = getNewEntity(game);

        if (!self)
            return;

        self.dir = player.dir;
        
            self.y = player.y + 7;
            self.x = player.x + 36 - (self.dir == FvB.DIR_LEFT ? 24 : 0);
        

        self.objClass = FvB.ob_HugeProjectile;
        self.parent = player;
        self.type = FvB.en_Hadouken;
        self.hitBox.x1 = 0;
        self.hitBox.x2 = 24;
        self.hitBox.y1 = 8;
        self.hitBox.y2 = 16;

        stateChange(self, FvB.st_Path);

        return self;
    }

    function spawnHugeProjectile(player, game) {
        var self = getNewEntity(game);

        if (!self)
            return;

        self.dir = player.dir;
        if (player.type == FvB.en_Boogerboy) {
            self.y = player.y -40;
            self.x = player.x + (self.dir == FvB.DIR_LEFT ? -16 : 16);
        } else {
            self.y = player.y - 14;
            self.x = player.x + (self.dir == FvB.DIR_LEFT ? -20 : 20);
        }
        
        
        self.objClass = FvB.ob_HugeProjectile;
        self.parent = player;

        switch (player.type) {
            case FvB.en_Fartsac:
                self.type = FvB.en_HugeFartball;
                FvB.Sound.playSound(FvB.SFX_HUGE_FARTBALL);
                break;
            case FvB.en_Boogerboy:
                self.type = FvB.en_HugeBooger;
                FvB.Sound.playSound(FvB.SFX_HUGE_BOOGER);
                break;

        }

        stateChange(self, FvB.st_Path);

        return self;

    }
    
    

    function spawnBasicProjectile(player, game) {
        var self = getNewEntity(game);

        if (!self)
            return;

        self.dir = player.dir;
        self.y = player.y - 26;
        self.x = player.x + (player.dir == FvB.DIR_LEFT ? -8 : 8);
        self.objClass = FvB.ob_BasicProjectile;
        self.parent = player;

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

        stateChange(self, FvB.st_Path);

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
        nextState: nextState,
        haveCollided: haveCollided,
        A_SpawnHadouken: A_SpawnHadouken
    };

})();