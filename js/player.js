/** 
 * @namespace 
 * @description Player management
 */
FvB.Player = (function () {

    FvB.setConsts({
        PLAYERSIZE: FvB.MINDIST, // player radius
        CHAR_SPRITE_WIDTH: 64,

        ex_notingame: 0,
        ex_playing: 1,
        ex_dead: 2,
        ex_victory: 4,
        ex_complete: 5,

        MAX_PLAYER_HEALTH: 270

    });

   
    function clipMove(player, game) {

        if (player.x < 0) {
            player.x = 0;
        }
        else if (player.x > FvB.SCREENWIDTH - FvB.CHAR_SPRITE_WIDTH) {
            player.x = FvB.SCREENWIDTH - FvB.CHAR_SPRITE_WIDTH;
        }

        if (player === game.player1) {

            if (player.x + FvB.CHAR_SPRITE_WIDTH > game.player2.x) {
                player.x = game.player2.x - FvB.CHAR_SPRITE_WIDTH;
            }
        }
        else {

            if (player.x < game.player1.x + FvB.CHAR_SPRITE_WIDTH) {
                player.x = game.player1.x + FvB.CHAR_SPRITE_WIDTH;
            }
        }
    }

    function T_Stand(player, game, tics) {
        var p = player === game.player1 ? 0 : 1;

        if (game.buttonState[p][FvB.BT_DOWN] && !game.buttonHeld[p][FvB.BT_DOWN]) {
            FvB.Entities.stateChange(player, FvB.st_Crouch);
        }

        if (game.buttonState[p][FvB.BT_UP] && !game.buttonHeld[p][FvB.BT_UP]) {
            FvB.Entities.stateChange(player, FvB.st_JumpUp);
        }

        if (game.buttonState[p][FvB.BT_LEFT]) {
            player.x -= FvB.PLAYER_SPEED * tics;
        }

        if (game.buttonState[p][FvB.BT_RIGHT]) {
            player.x += FvB.PLAYER_SPEED * tics;
        }

        clipMove(player, game);

        if (game.buttonHeld[p][FvB.BT_SECONDARY_ATTACK] && !game.buttonState[p][FvB.BT_SECONDARY_ATTACK]) {
            FvB.Entities.stateChange(player, FvB.st_Blow);
        } else if (game.buttonHeld[p][FvB.BT_PRIMARY_ATTACK] && !game.buttonState[p][FvB.BT_PRIMARY_ATTACK]) {
            FvB.Entities.spawnBasicProjectile(player, game);
        }

        
    }

    function T_Crouch(player, game, tics) {
        var p = player === game.player1 ? 0 : 1;

        if (game.buttonState[p][FvB.BT_UP] && !game.buttonHeld[p][FvB.BT_UP]) {
            FvB.Entities.stateChange(player, FvB.st_Stand);
        }
    }

    function T_Jump(player, game, tics) {
        var p = player === game.player1 ? 0 : 1;

        switch (player.state) {

            case FvB.st_JumpDown:
                player.y += FvB.PLAYER_JUMP_SPEED * tics;
                if (player.y >= FvB.PLAYER_START_Y) {
                    player.y = FvB.PLAYER_START_Y;
                    FvB.Entities.stateChange(player, FvB.st_Stand);
                }
                break;

            case FvB.st_JumpUp:
                player.y -= FvB.PLAYER_JUMP_SPEED * tics;
                if (player.y <= FvB.PLAYER_START_Y - 50) {
                    FvB.Entities.stateChange(player, FvB.st_JumpDown);
                }
                break;

            default:
                FvB.Entities.stateChange(player, FvB.st_Stand);

        }
        if (game.buttonState[p][FvB.BT_LEFT]) {
            player.x -= FvB.PLAYER_SPEED * tics;
        }

        if (game.buttonState[p][FvB.BT_RIGHT]) {
            player.x += FvB.PLAYER_SPEED * tics;
        }

        clipMove(player, game);
    }

    function T_Blow(self, game, tics) {

        // First time
        if (self._index === 0 && self.speed === 0) {
            self.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            self.frame = 0;
            self.speed = 20;

            //switch (self.type) {
            //    case FvB.en_Fartsac:
            //        FvB.Sound.playSound("sfx/fartball.wav");
            //        break;
            //    case FvB.en_Boogerboy:
            //        FvB.Sound.playSound("sfx/booger.wav");
            //        break;
            //}

            return true;
        }

        self._index += self.speed * tics;
        if (self.speed > 0) {
            var max = self.frames.length;
            var idx = Math.floor(self._index);
            self.frame = self.frames[idx % max];

            if (self.type == FvB.en_Fartsac) {
                self.y -= FvB.PLAYER_JUMP_SPEED * tics;
                if (self.y <= FvB.PLAYER_START_Y - 26) {
                    self.y = FvB.PLAYER_START_Y - 26;
                }
            } 
            if (idx >= max) {
                if (self.type == FvB.en_Fartsac) {
                    FvB.Entities.stateChange(self, FvB.st_JumpDown);
                } else {
                    FvB.Entities.stateChange(self, FvB.st_Stand);
                }
                self.frames = [0];
                self.frame = 0;
                self.speed = 0;
                self._index = 0;
                FvB.Entities.spawnHugeProjectile(self, game);
                return true;
            }
        }
        else {

            self.frame = self.frames[0];
        }
    }

    function spawnPlayer(game, playerNum, playerCharacter) {

        var x = playerNum == 1 ? FvB.SCREENWIDTH / 2 - FvB.CHAR_SPRITE_WIDTH * 2 : FvB.SCREENWIDTH / 2 + FvB.CHAR_SPRITE_WIDTH,
            y = 280,
            direction = playerNum == 1 ? FvB.DIR_RIGHT : FvB.DIR_LEFT

        var player = FvB.Entities.getNewEntity(game);

        if (!player)
            return;

        player.health = FvB.MAX_PLAYER_HEALTH;
        player.x = x;
        player.y = y;
        player.type = playerCharacter;
        player.dir = direction;
        player.objClass = FvB.ob_Player;

        FvB.Entities.stateChange(player, FvB.st_Stand);

        return player;
    }

    function damage(player, attacker) {
        var damage = 0;

        if (player.state == FvB.st_NearlyDead) {
            FvB.Entities.stateChange(player, FvB.st_Dead);
            return;
        }

        switch (attacker.objClass) {
            case FvB.ob_BasicProjectile:
                damage = 10;
                break;
            case FvB.ob_HugeProjectile:
                if (player.state == FvB.st_Stand || player.state == FvB.st_Damaged) {
                    FvB.Entities.stateChange(player, FvB.st_Damaged);
                }
                damage = 25;
                break;
            default:
                damage = 0;
        }

        player.health -= damage;

        if (player.health < 0) {
            player.health = 0;
            // change player state to dead?
            FvB.Entities.stateChange(player, FvB.st_NearlyDead);
        }
        FvB.Sound.playSound("sfx/025.wav");
        
    }

    return {
        spawnPlayer: spawnPlayer,
        T_Stand: T_Stand,
        T_Crouch: T_Crouch,
        T_Jump: T_Jump,
        T_Blow: T_Blow,
        damage: damage
    };

})();