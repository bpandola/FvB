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
    
    function setHitBox(player) {
        switch (player.state) {
            case FvB.ST_CROUCH:
                player.hitBox.x1 = 26;
                player.hitBox.x2 = 36;
                player.hitBox.y1 = 32;
                player.hitBox.y2 = 64;
                break;
            default:
                player.hitBox.x1 = 26;
                player.hitBox.x2 = 36;
                player.hitBox.y1 = 0;
                player.hitBox.y2 = 64;
        }
    }
    function clipMove(player, game) {
        
        if (player.x < 0) {
            player.x = 0;
        }
        else if (player.x > FvB.SCREENWIDTH - FvB.CHAR_SPRITE_WIDTH) {
            player.x = FvB.SCREENWIDTH - FvB.CHAR_SPRITE_WIDTH;
        }

        if (player.player == FvB.en_Player1) {

            if (player.x + FvB.CHAR_SPRITE_WIDTH > game.entities[FvB.en_Player2].x) {
                player.x = game.entities[FvB.en_Player2].x - FvB.CHAR_SPRITE_WIDTH;
            }
        }
        else {

            if (player.x < game.entities[FvB.en_Player1].x + FvB.CHAR_SPRITE_WIDTH) {
                player.x = game.entities[FvB.en_Player1].x + FvB.CHAR_SPRITE_WIDTH;
            }
        }
    }

    function T_Stand(player, game, tics) {
        var p = player.player;

        if (game.buttonState[p][FvB.BT_DOWN] && !game.buttonHeld[p][FvB.BT_DOWN]) {
            player.state = FvB.ST_CROUCH;
            setHitBox(player);
        }

        if (game.buttonState[p][FvB.BT_UP] && !game.buttonHeld[p][FvB.BT_UP]) {
            player.state = FvB.ST_JUMP_UP;
            setHitBox(player);
        }

        if (game.buttonState[p][FvB.BT_LEFT]) {
            player.x -= FvB.PLAYER_SPEED * tics;
        }

        if (game.buttonState[p][FvB.BT_RIGHT]) {
            player.x += FvB.PLAYER_SPEED * tics;
        }

        clipMove(player, game);

        if (game.buttonHeld[p][FvB.BT_PRIMARY_ATTACK] && !game.buttonState[p][FvB.BT_PRIMARY_ATTACK]) {
            FvB.Entities.spawnBasicProjectile(player, game);
        }

        if (game.buttonHeld[p][FvB.BT_SECONDARY_ATTACK] && !game.buttonState[p][FvB.BT_SECONDARY_ATTACK]) {
            FvB.Entities.spawnHugeProjectile(player, game);
        }
    }

    function T_Crouch(player, game, tics) {
        var p = player.player;

        if (game.buttonState[p][FvB.BT_UP] && !game.buttonHeld[p][FvB.BT_UP]) {
            player.state = FvB.ST_STAND;
            setHitBox(player);
        }
    }

    function T_Jump(player, game, tics) {
        var p = player.player;

        switch (player.state) {

            case FvB.ST_JUMP_DOWN:
                player.y += FvB.PLAYER_JUMP_SPEED * tics;
                if (player.y >= FvB.PLAYER_START_Y) {
                    player.y = FvB.PLAYER_START_Y;
                    player.state = FvB.ST_STAND;
                    setHitBox(player);
                }
                break;

            case FvB.ST_JUMP_UP:
                player.y -= FvB.PLAYER_JUMP_SPEED * tics;
                if (player.y <= FvB.PLAYER_START_Y - 40) {
                    player.state = FvB.ST_JUMP_DOWN;
                }
                break;

            default:
                player.state = FvB.ST_STAND;
                setHitBox(player);

        }
        if (game.buttonState[p][FvB.BT_LEFT]) {
            player.x -= FvB.PLAYER_SPEED * tics;
        }

        if (game.buttonState[p][FvB.BT_RIGHT]) {
            player.x += FvB.PLAYER_SPEED * tics;
        }

        clipMove(player, game);
    }

    function spawnPlayer(game, playerNum, playerCharacter) {

        var x = playerNum == 1 ? FvB.SCREENWIDTH / 2 - FvB.CHAR_SPRITE_WIDTH * 2 : FvB.SCREENWIDTH / 2 + FvB.CHAR_SPRITE_WIDTH,
            y = 280,
            direction = playerNum == 1 ? FvB.DIR_RIGHT : FvB.DIR_LEFT,
            type = playerNum == 1 ? FvB.en_Player1 : FvB.en_Player2;

        var player = FvB.Entities.getNewEntity(game);

        if (!player)
            return;

        player.health = FvB.MAX_PLAYER_HEALTH;
        player.x = x;
        player.y = y;
        player.type = playerCharacter;
        player.dir = direction;
        player.player = type;
        player.state = FvB.ST_STAND;
        player.objClass = FvB.ob_Player;

        setHitBox(player);
        
        return player;
    }  

    function damage(player, attacker) {
        var damage = 0;

        switch (attacker.objClass) {
            case FvB.ob_BasicProjectile:
                damage = 10;
                break;
            case FvB.ob_HugeProjectile:
                damage = 25;
                break;
            default:
                damage = 0;
        }

        player.health -= damage;

        if (player.health < 0) {
            player.health = 0;
            // change player state to dead?
        }
    }

    return {
        spawnPlayer: spawnPlayer,
        T_Stand: T_Stand,
        T_Crouch: T_Crouch,
        T_Jump: T_Jump,
        damage: damage
    };

})();