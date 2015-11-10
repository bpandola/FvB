/** @namespace */
var FvB = {

    TIC_BASE: 60,   // 60hz

    GRAVITY: 98,  

    FART_ROPE_SPEED: 120,
    BASIC_PROJECTILE_SPEED: 200,
    SUPER_PROJECTILE_SPEED: 300,
    ANGLED_PROJECTILE_SPEED: 200,  // Has to be large enough to cover the entire screen distance at 45 degree angle.

    BASIC_PROJECTILE_SPEED_OVER_RANGE_RATIO: 200 / 384,

    BASIC_PROJECTILE_Y: 100,
    HUGE_PROJECTILE_Y: 40,

    SCREENWIDTH: 640,

    //FARTSAC: 0,
    //BOOGERBOY: 1,


    DIR_LEFT: 1,
    DIR_RIGHT: 0,

    BT_LEFT: 0,
    BT_RIGHT: 1,
    BT_UP: 2,
    BT_DOWN: 3,
    BT_PRIMARY_ATTACK: 4,
    BT_SECONDARY_ATTACK: 5,
    BT_FATALITY: 6,

    NUM_PLAYER_BUTTONS: 7

   

};

FvB.setConsts = function (C) {
    for (var a in C) {
        if (C.hasOwnProperty(a) && !(a in FvB)) {
            FvB[a] = C[a];
        }
    }
};

FvB.noop = function () { };

FvB.log = function (str) {
    /*
    if (typeof console != "undefined") {
        var t = new Date(),
            e = new Error(),
            f = "";
        if (typeof str == "object" && typeof e.stack == "string") { 
            // ugly hack to get some kind of reference to where the log call originated
            var s = e.stack.split("\n")[2]+"",
                m = s.match(/at (.*)$/);
            f = m ? "\t[" + m[1] + "]" : "";
        }
        console.log(t.toLocaleTimeString() + ": " + str + f);
    }
	*/
};