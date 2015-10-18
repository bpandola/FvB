(function () {
    var ST_INFO_NULL = [0, FvB.SPR_DEMO, 0, null, null, FvB.ST_DEAD]

    /*
        1-if object can be rotated, 0 if one sprite for every direction
        base object's state texture if rotation is on facing player
        after how man frames change state to .next_state
        what to do every frame
        what to do once per state
        next state
    */

    //var objstate[NUM_OBJECTS][NUM_STATES] = [
    var objstate = [
        // Fartsac
        [
            [1, FvB.SPR_FARTSAC_STAND_1, 0, FvB.Player.T_Stand, null, FvB.Player.T_Stand],
            [1, FvB.SPR_FARTSAC_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.Player.T_Crouch],
            [1, FvB.SPR_FARTSAC_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.Player.T_Jump],
            [1, FvB.SPR_FARTSAC_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.Player.T_Jump],
            ST_INFO_NULL,
            [1, FvB.SPR_FART_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.Player.T_Stand]
        ],
        // Boogerboy
        [
            [1, FvB.SPR_BOOGERBOY_STAND_1, 0, FvB.Player.T_Stand, null, FvB.Player.T_Stand],
            [1, FvB.SPR_BOOGERBOY_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.Player.T_Crouch],
            [1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.Player.T_Jump],
            [1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.Player.T_Jump],
            ST_INFO_NULL,
            [1, FvB.SPR_BOOG_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.Player.T_Stand]
        ],
        // Fartball
        [
            ST_INFO_NULL, 
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            [0, FvB.SPR_FARTBALL, 0, FvB.AI.T_Projectile, null, FvB.AI.T_Projectile]
        ],
        // Booger
        [
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            [0, FvB.SPR_BOOGER, 0, FvB.AI.T_Projectile, null, FvB.AI.T_Projectile]
        ],
        // Huge Fartball
        [
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            [1, FvB.SPR_HUGE_FARTBALL, 0, FvB.AI.T_Projectile, null, FvB.AI.T_Projectile]
        ],
        // Huge Booger
        [
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            ST_INFO_NULL,
            [1, FvB.SPR_HUGE_BOOGER, 0, FvB.AI.T_Projectile, null, FvB.AI.T_Projectile]
        ],
        // Explosion
        [
            [0, FvB.SPR_EXPLOSION_0, 0, FvB.AI.T_Explode, null, FvB.ST_DEAD],
        ]



    ];

    /*  
    typedef struct
    {
        char rotate; // 1-if object can be rotated, 0 if one sprite for every direction
        int texture; // base object's state texture if rotation is on facing player
        int timeout; // after how man ticks change state to .next_state
        think_t think; // what to do every frame
        think_t action; // what to do once per state
        en_state next_state; // next state
    } 
    */

    // convert to state structs
    for (var i = 0; i < objstate.length; i++) {
        var obj = objstate[i];
        for (var j = 0; j < obj.length; j++) {
            var state = obj[j];
            obj[j] = {
                rotate: state[0],
                texture: state[1],
                timeout: state[2],
                think: state[3],
                action: state[4],
                next_state: state[5]
            };
        }
    }

    FvB.setConsts({
        objstate: objstate
    });

})();