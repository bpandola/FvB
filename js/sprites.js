
FvB.Sprites = (function () {

    FvB.setConsts({

        GFX_PATH: 'img'
    });
    //
    // sprite constants
    //
    var spriteNames = [
        "SPR_BACKGROUND",
        //
        // Fartsac
        //
        "SPR_FARTSAC_STAND_1", "SPR_FARTSAC_STAND_2",
        "SPR_FARTSAC_CROUCH_1", "SPR_FARTSAC_CROUCH_2",
        "SPR_FARTSAC_JUMP_1", "SPR_FARTSAC_JUMP_2",
        "SPR_FART_BLOW_1", "SPR_FART_BLOW_2", "SPR_FART_BLOW_3", "SPR_FART_BLOW_4", "SPR_FART_BLOW_5",
        "SPR_FART_BLOW_6", "SPR_FART_BLOW_7", "SPR_FART_BLOW_8", "SPR_FART_BLOW_9", "SPR_FART_BLOW_10",
        "SPR_FARTSAC_DAMAGED",
        "SPR_BUTT_EATS_BOOG_1", "SPR_BUTT_EATS_BOOG_2", "SPR_BUTT_EATS_BOOG_3", "SPR_BUTT_EATS_BOOG_4", "SPR_BUTT_EATS_BOOG_5", "SPR_BUTT_EATS_BOOG_6",
        //
        // Boogerboy
        //
        "SPR_BOOGERBOY_STAND_1", "SPR_BOOGERBOY_STAND_2",
        "SPR_BOOGERBOY_CROUCH_1", "SPR_BOOGERBOY_CROUCH_2",
        "SPR_BOOGERBOY_JUMP_1", "SPR_BOOGERBOY_JUMP_2",
        "SPR_BOOG_BLOW_1", "SPR_BOOG_BLOW_2", "SPR_BOOG_BLOW_3", "SPR_BOOG_BLOW_4", "SPR_BOOG_BLOW_5",
        "SPR_BOOG_BLOW_6", "SPR_BOOG_BLOW_7", "SPR_BOOG_BLOW_8", "SPR_BOOG_BLOW_9", "SPR_BOOG_BLOW_10",
        "SPR_BOOGERBOY_DAMAGED",
        "SPR_BOOG_HEAD","SPR_BOOG_HEADLESS",
        //
        // Static Sprites
        //
        "SPR_FARTBALL",
        "SPR_BOOGER",
        "SPR_HUGE_FARTBALL", "SPR_HUGE_FARTBALL_1",
        "SPR_HUGE_BOOGER","SPR_HUGE_BOOGER_1",
        "SPR_EXPLOSION_0", "SPR_EXPLOSION_1", "SPR_EXPLOSION_2", "SPR_EXPLOSION_3", "SPR_EXPLOSION_4", "SPR_EXPLOSION_5", "SPR_EXPLOSION_6",
        "SPR_EXPLOSION_7", "SPR_EXPLOSION_8", "SPR_EXPLOSION_9", "SPR_EXPLOSION_10", "SPR_EXPLOSION_11", "SPR_EXPLOSION_12"
    ];

    var spriteConsts = {};
    for (var i = 0, n = spriteNames.length; i < n; i++) {
        spriteConsts[spriteNames[i]] = i;
    }

    // 
    // Each sprite constant is an index into this array
    //
    var sheets = [
        { sheet: "background.PNG", size: 640, idx: 0, num: 1},
        { sheet: "FARTSAC0.PNG", size: 64, idx: 0, num: 6 },
        { sheet: "FARTSAC0.PNG", size: 64, idx: 1, num: 6 },
        { sheet: "FARTSAC0.PNG", size: 64, idx: 2, num: 6 },
        { sheet: "FARTSAC0.PNG", size: 64, idx: 3, num: 6 },
        { sheet: "FARTSAC0.PNG", size: 64, idx: 4, num: 6 },
        { sheet: "FARTSAC0.PNG", size: 64, idx: 5, num: 6 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 0, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 2, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 4, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 6, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 8, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 10, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 12, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 14, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 16, num: 20 },
        { sheet: "FARTBLOW.PNG", size: 64, idx: 18, num: 20 },
        { sheet: "DAMAGED.PNG", size: 64, idx: 0, num: 4 },
        { sheet: "BUTTHEAD.PNG", size: 64, idx: 0, num: 6 },
        { sheet: "BUTTHEAD.PNG", size: 64, idx: 1, num: 6 },
        { sheet: "BUTTHEAD.PNG", size: 64, idx: 2, num: 6 },
        { sheet: "BUTTHEAD.PNG", size: 64, idx: 3, num: 6 },
        { sheet: "BUTTHEAD.PNG", size: 64, idx: 4, num: 6 },
        { sheet: "BUTTHEAD.PNG", size: 64, idx: 5, num: 6 },
        { sheet: "BOOGBOY0.PNG", size: 64, idx: 0, num: 6 },
        { sheet: "BOOGBOY0.PNG", size: 64, idx: 1, num: 6 },
        { sheet: "BOOGBOY0.PNG", size: 64, idx: 2, num: 6 },
        { sheet: "BOOGBOY0.PNG", size: 64, idx: 3, num: 6 },
        { sheet: "BOOGBOY0.PNG", size: 64, idx: 4, num: 6 },
        { sheet: "BOOGBOY0.PNG", size: 64, idx: 5, num: 6 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 0, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 2, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 4, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 6, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 8, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 10, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 12, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 14, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 16, num: 20 },
        { sheet: "BOOGBLOW.PNG", size: 64, idx: 18, num: 20 },
        { sheet: "DAMAGED.PNG", size: 64, idx: 2, num: 4 },
        { sheet: "BOOGHEAD.PNG", size: 12, idx: 0, num: 1 },
        { sheet: "HEADLESS.PNG", size: 64, idx: 0, num: 2 },
        { sheet: "FARTBOOG.PNG", size: 6, idx: 0, num: 2 },
        { sheet: "FARTBOOG.PNG", size: 6, idx: 1, num: 2 },
        { sheet: "HUGE.PNG", size: 24, idx: 0, num: 6 },
        { sheet: "HUGE.PNG", size: 24, idx: 1, num: 6 },
        { sheet: "HUGE.PNG", size: 24, idx: 2, num: 6 },
        { sheet: "HUGE.PNG", size: 24, idx: 3, num: 6 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 0, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 1, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 2, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 3, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 4, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 5, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 6, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 7, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 8, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 9, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 10, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 11, num: 13 },
        { sheet: "EXPLODEY.PNG", size: 40, idx: 12, num: 13 }
    ];

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

        for (i = 0; i < sheets.length; i++) {

            if (fileName == sheets[i].sheet) {
                // already did this one
                continue;
            } else {
                fileName = sheets[i].sheet;
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

    function getSheet(id) {
        return sheets[id];
    }

    function getTexture(id) {
        return gfxResources[sheets[id].sheet];
    }

    return {
        init: init,
        isReady: isReady,
        getTexture: getTexture,
        getSheet: getSheet
    };

})();