/** 
 * @namespace 
 * @description Player management
 */
FvB.Player = (function () {

    FvB.setConsts({
        MIN_DISTANCE: 64,
        
        PLAYER_SPEED: 130,
        PLAYER_JUMP_SPEED: 100,
        PLAYER_START_Y: 330,

        ex_notingame: 0,
        ex_playing: 1,
        ex_dead: 2,
        ex_victory: 4,
        ex_complete: 5,

        MAX_PLAYER_HEALTH: 270

    });
    
    function clipMove(player, game) {
        
        if (player.x - FvB.MIN_DISTANCE/2 < 0) {
            player.x = FvB.MIN_DISTANCE/2;
        } else if (player.x > FvB.SCREENWIDTH - FvB.MIN_DISTANCE / 2) {
            player.x = FvB.SCREENWIDTH - FvB.MIN_DISTANCE/2;
        }

        var otherPlayer = player === game.player1.entity ? game.player2.entity : game.player1.entity;

        if (player.dir == FvB.DIR_RIGHT) {

            if (player.x + FvB.MIN_DISTANCE > otherPlayer.x) {
                player.x = otherPlayer.x - FvB.MIN_DISTANCE;
            }
        }
        else {

            if (player.x < otherPlayer.x + FvB.MIN_DISTANCE) {
                player.x = otherPlayer.x + FvB.MIN_DISTANCE;
            }
        }
    }

    function T_Walk(player, game, tics) {
        var p = player.parent;

        if (p.buttonState[FvB.BT_LEFT] || p.buttonState[FvB.BT_RIGHT]) {

            if (p.buttonState[FvB.BT_LEFT]) {
                player.x -= FvB.PLAYER_SPEED * tics;
            }
            if (p.buttonState[FvB.BT_RIGHT]) {
                player.x += FvB.PLAYER_SPEED * tics;
            }
        }
        else {
            FvB.Entities.stateChange(player, FvB.st_Idle1);
            return;
        }

        clipMove(player, game);
    }
    function T_Idle(player, game, tics) {
        var p = player.parent;

        if (p.buttonState[FvB.BT_LEFT] || p.buttonState[FvB.BT_RIGHT]) {
            FvB.Entities.stateChange(player, FvB.st_Walk1);
            return;
        }

        if (p.buttonState[FvB.BT_DOWN] && !p.buttonHeld[FvB.BT_DOWN]) {
            FvB.Entities.stateChange(player, FvB.st_Crouch);
        }

        if (p.buttonState[FvB.BT_UP] && !p.buttonHeld[FvB.BT_UP]) {
            FvB.Entities.stateChange(player, FvB.st_JumpStart);
        }

       

        // If both fire buttons hit, default to Primary Attack
        if (p.buttonHeld[FvB.BT_PRIMARY_ATTACK] && !p.buttonState[FvB.BT_PRIMARY_ATTACK]) {
            //FvB.Entities.spawnBasicProjectile(player, game);

        } else if (p.buttonHeld[FvB.BT_SECONDARY_ATTACK] && !p.buttonState[FvB.BT_SECONDARY_ATTACK]) {
            FvB.Entities.stateChange(player, FvB.st_Hadouken1);
        }

        
    }
    function T_Stand(player, game, tics) {
        var p = player.parent;

        if (p.buttonState[FvB.BT_DOWN] && !p.buttonHeld[FvB.BT_DOWN]) {
            FvB.Entities.stateChange(player, FvB.st_Crouch);
        }

        if (p.buttonState[FvB.BT_UP] && !p.buttonHeld[FvB.BT_UP]) {
            FvB.Entities.stateChange(player, FvB.st_JumpUp);
        }

        if (p.buttonState[FvB.BT_LEFT]) {
            player.x -= FvB.PLAYER_SPEED * tics;
        }

        if (p.buttonState[FvB.BT_RIGHT]) {
            player.x += FvB.PLAYER_SPEED * tics;
        }

        clipMove(player, game);

        // If both fire buttons hit, default to Primary Attack
        if (p.buttonHeld[FvB.BT_PRIMARY_ATTACK] && !p.buttonState[FvB.BT_PRIMARY_ATTACK]) {
            FvB.Entities.spawnBasicProjectile2(player, game);
        } else if (p.buttonHeld[FvB.BT_SECONDARY_ATTACK] && !p.buttonState[FvB.BT_SECONDARY_ATTACK]) {
            FvB.Entities.stateChange(player, FvB.st_Blow);
        } 

        if (p.buttonHeld[FvB.BT_FATALITY] && !p.buttonState[FvB.BT_FATALITY]) {
            //FvB.Entities.stateChange(player, FvB.st_StartFatality);
            var state;
            switch (Math.floor((Math.random()*3)+1))
            {
                case 1: state = FvB.st_Sneeze1; break;
                case 2: state = FvB.st_Sneeze2; break;
                case 3: state = FvB.st_Sneeze3; break;
            }
            FvB.Entities.stateChange(player, state);
        }
    }

    function T_Crouch(player, game, tics) {
        var p = player.parent;

        if (p.buttonState[FvB.BT_UP] && !p.buttonHeld[FvB.BT_UP]) {
            FvB.Entities.nextState(player);
        }

        if (p.buttonState[FvB.BT_PRIMARY_ATTACK] && !p.buttonHeld[FvB.BT_PRIMARY_ATTACK]) {
            FvB.Entities.spawnBasicProjectile2(player, game);
        }
    }

    function T_Jump(player, game, tics) {
        var p = player.parent;

        switch (player.state) {

            case FvB.st_JumpDown:
                case FvB.st_JumpEnd:
                player.y += FvB.PLAYER_JUMP_SPEED * tics;
                if (player.y >= FvB.PLAYER_START_Y) {
                    player.y = FvB.PLAYER_START_Y;
                    FvB.Entities.nextState(player);
                }
                break;

            case FvB.st_JumpUp:
                case FvB.st_JumpStart:
                player.y -= FvB.PLAYER_JUMP_SPEED * tics;
                if (player.y <= FvB.PLAYER_START_Y - 50) {
                    FvB.Entities.nextState(player);
                }
                break;

            default:
                FvB.Entities.stateChange(player, FvB.st_Stand);

        }
        if (p.buttonState[FvB.BT_LEFT]) {
            player.x -= FvB.PLAYER_SPEED * tics;
        }

        if (p.buttonState[FvB.BT_RIGHT]) {
            player.x += FvB.PLAYER_SPEED * tics;
        }

        clipMove(player, game);
    }

    function T_StartFatality(self, game, tics) {

        var line;
        var otherPlayer = self == game.player1 ? game.player2 : game.player1;

        if (typeof T_StartFatality.firstLine == 'undefined' || T_StartFatality.firstLine == null) {
            T_StartFatality.firstLine = {
                x1: self.x+36,
                y1: self.y+42,
                x2: self.x + 36,
                y2: self.y + 42,
                color: "rgb(160,80,0)"
            };
            FvB.Sound.playSound(FvB.SFX_FATALITY_FART);
        }
        else {
            T_StartFatality.firstLine.x2 += FvB.FART_ROPE_SPEED * tics;

            if (T_StartFatality.firstLine.x2 >= FvB.SCREENWIDTH)
                T_StartFatality.firstLine.x2 = FvB.SCREENWIDTH-1;

            if ((typeof T_StartFatality.secondLine == 'undefined' || T_StartFatality.secondLine == null) && T_StartFatality.firstLine.x2 == FvB.SCREENWIDTH - 1) {
                T_StartFatality.secondLine = {
                    x1: 0,
                    y1: otherPlayer.y + 18,
                    x2: 0,
                    y2: otherPlayer.y + 18,
                    color: "rgb(160,80,0)"
                };
            }
            else if (typeof T_StartFatality.secondLine != 'undefined' && T_StartFatality.secondLine != null) {
                T_StartFatality.secondLine.x2 += FvB.FART_ROPE_SPEED * tics;

                if (T_StartFatality.secondLine.x2 >= otherPlayer.x + 26)
                    T_StartFatality.secondLine.x2 = otherPlayer.x + 26;

            }
            
        }

        line = T_StartFatality.firstLine;
        if (typeof line != 'undefined' && line != null)
            FvB.Entities.spawnLine(self, game, line.x1, line.y1, line.x2, line.y2, line.color);

        line = T_StartFatality.secondLine;
        if (typeof line != 'undefined' && line != null)
            FvB.Entities.spawnLine(self, game, line.x1, line.y1, line.x2, line.y2, line.color);

        if (typeof T_StartFatality.firstLine != 'undefined' && typeof T_StartFatality.secondLine != 'undefined' 
            && T_StartFatality.firstLine.x2 == FvB.SCREENWIDTH - 1 && T_StartFatality.secondLine.x2 == otherPlayer.x + 26) {
            T_StartFatality.firstLine = null;
            T_StartFatality.secondLine = null;

            FvB.Entities.stateChange(self, FvB.st_FinishFatality);
            FvB.Entities.stateChange(otherPlayer, FvB.st_Decapitated);
        }

    }

    function T_FinishFatality(self, game, tics) {

        var line;
        var otherPlayer = self == game.player1 ? game.player2 : game.player1;

        if (typeof T_FinishFatality.firstLine == 'undefined' || T_FinishFatality.firstLine == null) {
            T_FinishFatality.firstLine = {
                x1: 0,
                y1: otherPlayer.y + 18,
                x2: otherPlayer.x + 26,
                y2: otherPlayer.y + 18,
                color: "rgb(160,80,0)"
            };
        }

        if (typeof T_FinishFatality.secondLine == 'undefined' || T_FinishFatality.secondLine == null) {
            T_FinishFatality.secondLine = {
                x1: self.x + 36,
                y1: self.y + 42,
                x2: self.x + FvB.SCREENWIDTH - 1,
                y2: self.y + 42,
                color: "rgb(160,80,0)"
            };
        }

        T_FinishFatality.firstLine.x2 -= FvB.FART_ROPE_SPEED * tics;

        if (T_FinishFatality.firstLine.x2 < -12)   // hack to make boog head go off screen
                T_FinishFatality.firstLine.x2 = -12;

                T_FinishFatality.secondLine.x2 -= FvB.FART_ROPE_SPEED * tics;

                if (T_FinishFatality.secondLine.x2 < self.x + 36)
                    T_FinishFatality.secondLine.x2 = self.x + 36;

        line = T_FinishFatality.firstLine;
        if (typeof line != 'undefined' && line != null) {
            FvB.Entities.spawnLine(self, game, line.x1, line.y1, line.x2, line.y2, line.color);
            FvB.Entities.spawnSingleFrameSprite(game, line.x2, line.y2-6, FvB.SPR_BOOG_HEAD);
        }

        line = T_FinishFatality.secondLine;
        if (typeof line != 'undefined' && line != null) {
            FvB.Entities.spawnLine(self, game, line.x1, line.y1, line.x2, line.y2, line.color);
            FvB.Entities.spawnSingleFrameSprite(game, line.x2, line.y2-6, FvB.SPR_BOOG_HEAD);
        }

        if (typeof T_FinishFatality.firstLine != 'undefined' && typeof T_FinishFatality.secondLine != 'undefined'
        && T_FinishFatality.firstLine.x2 == -12 && T_FinishFatality.secondLine.x2 == self.x + 36) {
            T_FinishFatality.firstLine = null;
            T_FinishFatality.secondLine = null;
            
            FvB.Sound.playSound(FvB.SFX_SLURP);
            FvB.Entities.stateChange(self, FvB.st_EatBoog1);
            //FvB.Entities.stateChange(otherPlayer, FvB.st_FatalityDead);
        }

    }
    function A_FireHugeProjectile(self, game, tics) {
        FvB.Entities.spawnHugeProjectile(self, game);
    }

    function T_FartTurd(self, game, tics) {
        self.y -= FvB.PLAYER_JUMP_SPEED * tics;
        if (self.y <= FvB.PLAYER_START_Y - 26) {
            self.y = FvB.PLAYER_START_Y - 26;
        }
    }

    function playSneezeFart(player) {
        if (player.type == FvB.en_Fartsac) {
            FvB.Sound.playSound(FvB.SFX_FATALITY_FART);
        } else {
            FvB.Sound.playSound(FvB.SFX_NOSE_BLOW);
        }
    }
    function A_Sneeze1(self, game, tics) {

        if (!self.temp2.hasOwnProperty("angle")) {
            playSneezeFart(self);
            //self.temp2 = { angle: -0.785 };
            self.temp2 = { angle: 0 };
        }

        //for (i = 0; i < 3; i++) {
        //if (self.temp2.angle >= 1.565) {
            if (self.temp2.angle >= 25) {
                self.temp2 = {};
                FvB.Entities.stateChange(self, FvB.st_Stand);
                return;
            }

        // count without sin is awesome Math.sin( self.temp2.angle)
            FvB.Entities.spawnBasicProjectile2(self, game, Math.sin(self.temp2.angle), self.x + (self.dir == FvB.DIR_LEFT ? -6 : 6), self.type == FvB.en_Fartsac ? self.y - 20 : self.y - 42);

            self.temp2.angle += 0.1; //.025;
        //}
    }

    function A_Sneeze2(self, game, tics) {

        if (!self.temp2.hasOwnProperty("angle")) {
            playSneezeFart(self);
            self.temp2 = { angle: -0.785 };
            //self.temp2 = { angle: 0 };
        }

        //for (i = 0; i < 3; i++) {
        if (self.temp2.angle >= 1.565) {
        //if (self.temp2.angle >= 25) {
            self.temp2 = {};
            FvB.Entities.stateChange(self, FvB.st_Stand);
            return;
        }

        // count without sin is awesome Math.sin( self.temp2.angle)
        FvB.Entities.spawnBasicProjectile2(self, game, self.temp2.angle, self.x + (self.dir == FvB.DIR_LEFT ? -6 : 6), self.type == FvB.en_Fartsac ? self.y - 20 : self.y - 42);

        self.temp2.angle += 0.025;
        //}
    }

    function A_Sneeze3(self, game, tics) {

        if (!self.temp2.hasOwnProperty("angle")) {
            playSneezeFart(self);
            //self.temp2 = { angle: -0.785 };
            self.temp2 = { angle: 1.565 };
        }

        //for (i = 0; i < 3; i++) {
        if (self.temp2.angle <= -0.785) {
            //if (self.temp2.angle >= 25) {
            self.temp2 = {};
            FvB.Entities.stateChange(self, FvB.st_Stand);
            return;
        }

        // count without sin is awesome Math.sin( self.temp2.angle)
        FvB.Entities.spawnBasicProjectile2(self, game, self.temp2.angle, self.x + (self.dir == FvB.DIR_LEFT ? -6 : 6), self.type == FvB.en_Fartsac ? self.y - 20 : self.y - 42);

        self.temp2.angle -= 0.025;
        //}
    }
    function spawnPlayer(game, playerObj) {

        var player = FvB.Entities.getNewEntity(game);

        if (!player)
            return;
        
        player.x = playerObj == game.player2 ? FvB.SCREENWIDTH / 2 + FvB.MIN_DISTANCE*3 : FvB.SCREENWIDTH / 2 - FvB.MIN_DISTANCE*3;
        player.y = FvB.PLAYER_START_Y;
        player.health = FvB.MAX_PLAYER_HEALTH;
        player.type = playerObj.character;
        player.dir = playerObj == game.player2 == 1 ? FvB.DIR_LEFT : FvB.DIR_RIGHT;
        player.objClass = FvB.ob_Player;
        player.parent = playerObj;

        FvB.Entities.stateChange(player, FvB.st_Idle1);        

        return player;
    }

    function damage(player, attacker) {
        var damage = 0;

        if (player.state == FvB.st_NearlyDead) {
            FvB.Entities.stateChange(player, FvB.st_Dead);
            FvB.Entities.stateChange(attacker.parent, FvB.st_Victorious);
            return;
        }

        switch (attacker.objClass) {
            case FvB.ob_BasicProjectile:
                damage = 1;
                break;
            case FvB.ob_HugeProjectile:
                if ((player.state >= FvB.st_Idle1 && player.state <= FvB.st_Idle4) || player.state == FvB.st_Damaged1 || player.state == FvB.st_Stand) {
                    FvB.Entities.stateChange(player, FvB.st_Damaged1);
                    // HACKY! - Advance damage frame by other character value to get offset into sprite sheet
                    if (player.type != FvB.en_Ryu) {
                        player.sprite += attacker.parent.type;
                    }
                    FvB.Sound.playSound(FvB.SFX_DAMAGE_SCREAM);
                }
                damage = 25;
                break;
            default:
                damage = 0;
        }

        player.health -= damage;
        
        if (player.health <= 0) {
            player.health = 0;
          
            FvB.Entities.stateChange(player, FvB.st_NearlyDead);
        }
        
        
    }
    function otherPlayer(self, game) {
        if (self == game.player1.entity)
            return game.player2.entity;
        else
            return game.player1.entity;
    }
    return {
        spawnPlayer: spawnPlayer,
        T_Stand: T_Stand,
        T_Crouch: T_Crouch,
        T_Jump: T_Jump,
        T_FartTurd: T_FartTurd,
        T_StartFatality: T_StartFatality,
        T_FinishFatality: T_FinishFatality,
        T_Idle: T_Idle,
        T_Walk: T_Walk,
        A_FireHugeProjectile: A_FireHugeProjectile,
        A_Sneeze1: A_Sneeze1,
        A_Sneeze2: A_Sneeze2,
        A_Sneeze3: A_Sneeze3,
        damage: damage,
        otherPlayer: otherPlayer
    };

})();