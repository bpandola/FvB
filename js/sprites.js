
FvB.Sprites = (function () {

    FvB.setConsts({
        GFX_PATH: 'gfx'
    });

// hitBoxes are relative to the entity x,y position, which is center x, bottom y
    var sprites = [
        { sprite: "SPR_RYU_BACKGROUND", sheet: "RYU-STAGE.PNG", xOffset: 0, yOffset: 0, width: 640, height: 400, hitBox: null },
        { sprite: "SPR_PLAYER_HEALTH_BAR", sheet: "HEALTH.PNG", xOffset: 0, yOffset: 0, width: 640, height: 30, hitBox: null },
        // Title Screen
        { sprite: "SPR_TITLE_FARTSAC", sheet: "GAME.PNG", xOffset: 1, yOffset: 1, width: 220, height: 16, hitBox: null },
        { sprite: "SPR_TITLE_VS", sheet: "GAME.PNG", xOffset: 1, yOffset: 19, width: 62, height: 16, hitBox: null },
        { sprite: "SPR_TITLE_BOOGERBOY", sheet: "GAME.PNG", xOffset: 1, yOffset: 37, width: 286, height: 16, hitBox: null },
        { sprite: "SPR_NUM_PLAYERS", sheet: "GAME.PNG", xOffset: 1, yOffset: 55, width: 142, height: 44, hitBox: null },
         { sprite: "SPR_TITLE_TURD", sheet: "FARTSAC.PNG", xOffset: 832, yOffset: 0, width: 22, height: 10, hitBox: null },
        { sprite: "SPR_TITLE_BOOG", sheet: "BOOGERBOY.PNG", xOffset: 832, yOffset: 10, width: 22, height: 10, hitBox: null },
        // Choose a character
        { sprite: "SPR_CHARACTER_SELECT_TEXT", sheet: "CHARSELECT.PNG", xOffset: 0, yOffset: 0, width: 640, height: 22, hitBox: null },
        { sprite: "SPR_1P", sheet: "CHARSELECT.PNG", xOffset: 68, yOffset: 148, width: 34, height: 22, hitBox: null },
        { sprite: "SPR_2P", sheet: "CHARSELECT.PNG", xOffset: 510, yOffset: 152, width: 34, height: 22, hitBox: null },
        { sprite: "SPR_1P_SELECT", sheet: "CHARSELECT.PNG", xOffset: 8, yOffset: 42, width: 52, height: 82, hitBox: null },
        { sprite: "SPR_2P_SELECT", sheet: "CHARSELECT.PNG", xOffset: 62, yOffset: 42, width: 52, height: 82, hitBox: null },
        { sprite: "SPR_BOTH_SELECT", sheet: "CHARSELECT.PNG", xOffset: 116, yOffset: 42, width: 52, height: 82, hitBox: null },
        { sprite: "SPR_VERSUS", sheet: "CHARSELECT.PNG", xOffset: 459, yOffset: 40, width: 126, height: 94, hitBox: null },
        { sprite: "SPR_CHARACTER_SELECT_MATRIX", sheet: "CHARSELECT.PNG", xOffset: 244, yOffset: 80, width: 152, height: 82, hitBox: null },
        // Round/Fight!
        { sprite: "SPR_ROUND1_SMALL", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 1, width: 50, height: 8, hitBox: null },
        { sprite: "SPR_ROUND2_SMALL", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 55, width: 50, height: 8, hitBox: null },
        { sprite: "SPR_ROUND3_SMALL", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 109, width: 50, height: 8, hitBox: null },
        { sprite: "SPR_ROUND1_MEDIUM", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 11, width: 100, height: 16, hitBox: null },
         { sprite: "SPR_ROUND2_MEDIUM", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 65, width: 106, height: 16, hitBox: null },
          { sprite: "SPR_ROUND3_MEDIUM", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 119, width: 106, height: 16, hitBox: null },
        { sprite: "SPR_ROUND1_LARGE", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 29, width: 150, height: 24, hitBox: null },
         { sprite: "SPR_ROUND2_LARGE", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 83, width: 158, height: 24, hitBox: null },
          { sprite: "SPR_ROUND3_LARGE", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 137, width: 158, height: 24, hitBox: null },
        { sprite: "SPR_FIGHT_SMALL", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 163, width: 44, height: 8, hitBox: null },
        { sprite: "SPR_FIGHT_MEDIUM", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 173, width: 88, height: 16, hitBox: null },
        { sprite: "SPR_FIGHT_LARGE", sheet: "ROUNDS.PNG", xOffset: 1, yOffset: 191, width: 132, height: 24, hitBox: null },
        // Character sprites must be in enum order for easier rendering
        // For example: to render SPR_BOOGER_TEXT we can just to renderSprite(SPR_FARTSAC_TEXT + characterEntityNum)
        { sprite: "SPR_FARTSAC_TEXT", sheet: "CHARSELECT.PNG", xOffset: 5, yOffset: 181, width: 96, height: 14, hitBox: null },
        { sprite: "SPR_BOOGERBOY_TEXT", sheet: "CHARSELECT.PNG", xOffset: 441, yOffset: 178, width: 124, height: 14, hitBox: null },
        { sprite: "SPR_YOHAN_TEXT", sheet: "CHARSELECT.PNG", xOffset: 270, yOffset: 179, width: 72, height: 14, hitBox: null },
        { sprite: "SPR_RYU_TEXT", sheet: "CHARSELECT.PNG", xOffset: 655, yOffset: 173, width: 40, height: 14, hitBox: null },
        { sprite: "SPR_FARTSAC_MUG", sheet: "CHARSELECT.PNG", xOffset: 3, yOffset: 198, width: 202, height: 205, hitBox: null },
        { sprite: "SPR_BOOGERBOY_MUG", sheet: "CHARSELECT.PNG", xOffset: 429, yOffset: 199, width: 202, height: 205, hitBox: null },
        { sprite: "SPR_YOHAN_MUG", sheet: "CHARSELECT.PNG", xOffset: 215, yOffset: 199, width: 202, height: 205, hitBox: null },
        { sprite: "SPR_RYU_MUG", sheet: "CHARSELECT.PNG", xOffset: 646, yOffset: 199, width: 202, height: 206, hitBox: null },
        // Fartsac
        { sprite: "SPR_FARTSAC_STAND_1", sheet: "FARTSAC.PNG", xOffset: 0, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FARTSAC_CROUCH_1", sheet: "FARTSAC.PNG", xOffset: 64, yOffset: 0, width: 64, height: 64, hitBox: { x1: -12, x2: 14, y1: -36, y2: 0 } },
        { sprite: "SPR_FARTSAC_JUMP_1", sheet: "FARTSAC.PNG", xOffset: 128, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_1", sheet: "FARTSAC.PNG", xOffset: 192, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_2", sheet: "FARTSAC.PNG", xOffset: 256, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_3", sheet: "FARTSAC.PNG", xOffset: 320, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_4", sheet: "FARTSAC.PNG", xOffset: 384, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_5", sheet: "FARTSAC.PNG", xOffset: 448, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_6", sheet: "FARTSAC.PNG", xOffset: 512, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_7", sheet: "FARTSAC.PNG", xOffset: 576, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_8", sheet: "FARTSAC.PNG", xOffset: 640, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_9", sheet: "FARTSAC.PNG", xOffset: 704, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FART_TURD_10", sheet: "FARTSAC.PNG", xOffset: 768, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_FARTSAC_DAMAGED_1", sheet: "FARTSAC.PNG", xOffset: 0, yOffset: 128, width: 64, height: 64, hitBox: null },
        { sprite: "SPR_FARTSAC_DAMAGED_2", sheet: "FARTSAC.PNG", xOffset: 64, yOffset: 128, width: 64, height: 64, hitBox: null },
        // Boogerboy
        { sprite: "SPR_BOOGERBOY_STAND_1", sheet: "BOOGERBOY.PNG", xOffset: 0, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BOOGERBOY_CROUCH_1", sheet: "BOOGERBOY.PNG", xOffset: 64, yOffset: 0, width: 64, height: 64, hitBox: { x1: -12, x2: 14, y1: -36, y2: 0 } },
        { sprite: "SPR_BOOGERBOY_JUMP_1", sheet: "BOOGERBOY.PNG", xOffset: 128, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_1", sheet: "BOOGERBOY.PNG", xOffset: 192, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_2", sheet: "BOOGERBOY.PNG", xOffset: 256, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_3", sheet: "BOOGERBOY.PNG", xOffset: 320, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_4", sheet: "BOOGERBOY.PNG", xOffset: 384, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_5", sheet: "BOOGERBOY.PNG", xOffset: 448, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_6", sheet: "BOOGERBOY.PNG", xOffset: 512, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_7", sheet: "BOOGERBOY.PNG", xOffset: 576, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_8", sheet: "BOOGERBOY.PNG", xOffset: 640, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_9", sheet: "BOOGERBOY.PNG", xOffset: 704, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BLOW_BOOG_10", sheet: "BOOGERBOY.PNG", xOffset: 768, yOffset: 0, width: 64, height: 64, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_BOOGERBOY_DAMAGED_1", sheet: "BOOGERBOY.PNG", xOffset: 0, yOffset: 128, width: 64, height: 64, hitBox: null },
        { sprite: "SPR_BOOGERBOY_DAMAGED_2", sheet: "BOOGERBOY.PNG", xOffset: 64, yOffset: 128, width: 64, height: 64, hitBox: null },
        { sprite: "SPR_BOOG_HEAD", sheet: "BOOGERBOY.PNG", xOffset: 64, yOffset: 306, width: 12, height: 14, hitBox: null },
        { sprite: "SPR_BOOG_HEADLESS", sheet: "BOOGERBOY.PNG", xOffset: 0, yOffset: 256, width: 64, height: 64, hitBox: null },
        // These need to be in charEntity order as well
        { sprite: "SPR_FARTBALL", sheet: "FARTSAC.PNG", xOffset: 861, yOffset: 0, width: 6, height: 6, hitBox: null },
        { sprite: "SPR_BOOGBALL", sheet: "BOOGERBOY.PNG", xOffset: 861, yOffset: 0, width: 6, height: 6, hitBox: null },
        { sprite: "SPR_HUGE_FARTBALL", sheet: "FARTSAC.PNG", xOffset: 832, yOffset: 0, width: 22, height: 10, hitBox: null },
        { sprite: "SPR_HUGE_BOOGER", sheet: "BOOGERBOY.PNG", xOffset: 832, yOffset: 0, width: 22, height: 10, hitBox: null },
        // Explosion
        { sprite: "SPR_EXPLOSION_0", sheet: "SMALLEXPLOSION.PNG", xOffset: 0, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_1", sheet: "SMALLEXPLOSION.PNG", xOffset: 20, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_2", sheet: "SMALLEXPLOSION.PNG", xOffset: 40, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_3", sheet: "SMALLEXPLOSION.PNG", xOffset: 60, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_4", sheet: "SMALLEXPLOSION.PNG", xOffset: 80, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_5", sheet: "SMALLEXPLOSION.PNG", xOffset: 100, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_6", sheet: "SMALLEXPLOSION.PNG", xOffset: 120, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_7", sheet: "SMALLEXPLOSION.PNG", xOffset: 140, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_8", sheet: "SMALLEXPLOSION.PNG", xOffset: 160, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_9", sheet: "SMALLEXPLOSION.PNG", xOffset: 180, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_10", sheet: "SMALLEXPLOSION.PNG", xOffset: 200, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_11", sheet: "SMALLEXPLOSION.PNG", xOffset: 220, yOffset: 0, width: 20, height: 20, hitBox: null },
        { sprite: "SPR_EXPLOSION_12", sheet: "SMALLEXPLOSION.PNG", xOffset: 240, yOffset: 0, width: 20, height: 20, hitBox: null },
        // Huge Explosion
        { sprite: "SPR_HUGE_EXPLOSION_0", sheet: "EXPLODEY.PNG", xOffset: 0, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_1", sheet: "EXPLODEY.PNG", xOffset: 40, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_2", sheet: "EXPLODEY.PNG", xOffset: 80, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_3", sheet: "EXPLODEY.PNG", xOffset: 120, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_4", sheet: "EXPLODEY.PNG", xOffset: 160, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_5", sheet: "EXPLODEY.PNG", xOffset: 200, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_6", sheet: "EXPLODEY.PNG", xOffset: 240, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_7", sheet: "EXPLODEY.PNG", xOffset: 280, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_8", sheet: "EXPLODEY.PNG", xOffset: 320, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_9", sheet: "EXPLODEY.PNG", xOffset: 360, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_10", sheet: "EXPLODEY.PNG", xOffset: 400, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_11", sheet: "EXPLODEY.PNG", xOffset: 440, yOffset: 0, width: 40, height: 40, hitBox: null },
        { sprite: "SPR_HUGE_EXPLOSION_12", sheet: "EXPLODEY.PNG", xOffset: 480, yOffset: 0, width: 40, height: 40, hitBox: null },
        // Ryu Idle
        { sprite: "SPR_RYU_IDLE_1", sheet: "RYU.PNG", xOffset: 5, yOffset: 17, width: 46, height: 82, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_RYU_IDLE_2", sheet: "RYU.PNG", xOffset: 54, yOffset: 17, width: 46, height: 82, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_RYU_IDLE_3", sheet: "RYU.PNG", xOffset: 104, yOffset: 17, width: 46, height: 82, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        { sprite: "SPR_RYU_IDLE_4", sheet: "RYU.PNG", xOffset: 153, yOffset: 17, width: 46, height: 82, hitBox: { x1: -5, x2: 5, y1: -64, y2: 0 } },
        // Ryu Walk
        { sprite: "SPR_RYU_WALK_1", sheet: "RYU.PNG", xOffset: 204, yOffset: 17, width: 46, height: 82, hitBox: null },
        { sprite: "SPR_RYU_WALK_2", sheet: "RYU.PNG", xOffset: 251, yOffset: 17, width: 46, height: 82, hitBox: null },
        { sprite: "SPR_RYU_WALK_3", sheet: "RYU.PNG", xOffset: 300, yOffset: 17, width: 46, height: 82, hitBox: null },
        { sprite: "SPR_RYU_WALK_4", sheet: "RYU.PNG", xOffset: 350, yOffset: 17, width: 46, height: 82, hitBox: null },
        { sprite: "SPR_RYU_WALK_5", sheet: "RYU.PNG", xOffset: 400, yOffset: 17, width: 46, height: 82, hitBox: null },
        // Ryu Crouch
        { sprite: "SPR_RYU_CROUCH_1", sheet: "RYU.PNG", xOffset: 1159, yOffset: 17, width: 46, height: 82, hitBox: null },
        // Ryu Jump
        { sprite: "SPR_RYU_JUMP_1", sheet: "RYU.PNG", xOffset: 537, yOffset: 17, width: 44, height: 82, hitBox: null },
        { sprite: "SPR_RYU_JUMP_2", sheet: "RYU.PNG", xOffset: 575, yOffset: 17, width: 44, height: 82, hitBox: null },
        // Ryu Hadouken
        { sprite: "SPR_RYU_HADOUKEN_1", sheet: "RYU.PNG", xOffset: 4, yOffset: 636, width: 52, height: 85, hitBox: null },
        { sprite: "SPR_RYU_HADOUKEN_2", sheet: "RYU.PNG", xOffset: 60, yOffset: 636, width: 66, height: 85, hitBox: null },
        { sprite: "SPR_RYU_HADOUKEN_3", sheet: "RYU.PNG", xOffset: 131, yOffset: 636, width: 68, height: 85, hitBox: null },
        { sprite: "SPR_RYU_HADOUKEN_4", sheet: "RYU.PNG", xOffset: 202, yOffset: 636, width: 96, height: 85, hitBox: null },
        { sprite: "SPR_RYU_HADOUKEN_5", sheet: "RYU.PNG", xOffset: 299, yOffset: 636, width: 72, height: 85, hitBox: null },
        // Ryu Damaged
        { sprite: "SPR_RYU_DAMAGED_1", sheet: "RYU.PNG", xOffset: 4, yOffset: 754, width: 46, height: 82, hitBox: null },
        { sprite: "SPR_RYU_DAMAGED_2", sheet: "RYU.PNG", xOffset: 54, yOffset: 754, width: 50, height: 82, hitBox: null },
        { sprite: "SPR_RYU_DAMAGED_3", sheet: "RYU.PNG", xOffset: 107, yOffset: 754, width: 54, height: 82, hitBox: null },
        { sprite: "SPR_RYU_DAMAGED_4", sheet: "RYU.PNG", xOffset: 162, yOffset: 754, width: 46, height: 82, hitBox: null },
        // Hadouken Projectile
        { sprite: "SPR_HADOUKEN_1", sheet: "RYU.PNG", xOffset: 131, yOffset: 636, width: 68, height: 85, hitBox: null },
        { sprite: "SPR_HADOUKEN_2", sheet: "RYU.PNG", xOffset: 202, yOffset: 636, width: 96, height: 85, hitBox: null },
        { sprite: "SPR_HADOUKEN_3", sheet: "RYU.PNG", xOffset: 299, yOffset: 636, width: 72, height: 85, hitBox: null }
    ];

    var spriteConsts = {};
    for (var i = 0, n = sprites.length; i < n; i++) {
        spriteConsts[sprites[i].sprite] = i;
    }
    FvB.setConsts(spriteConsts);

    var gfxResources = {};

    function loadImage(fileName) {
        var img = new Image();
        img.onload = function () {
            gfxResources[fileName] = img;
        };

        gfxResources[fileName] = false;
        img.src = FvB.GFX_PATH + '/' + fileName;
    }

    function init() {

        var fileName;

        for (i = 0; i < sprites.length; i++) {

            if (fileName == sprites[i].sheet) {
                // already did this one
                continue;
            } else {
                fileName = sprites[i].sheet;
            }

            loadImage(fileName);
        }
    }

    function isReady() {
        var ready = true;
        for (var k in gfxResources) {
            if (gfxResources.hasOwnProperty(k) &&
               !gfxResources[k]) {
                ready = false;
                break;
            }
        }
        return ready;
    }

    function getSprite(id) {
        return sprites[id];
    }

    function getTexture(id) {
        return gfxResources[sprites[id].sheet];
    }

    return {
        init: init,
        isReady: isReady,
        getTexture: getTexture,
        getSprite: getSprite
    };

})();