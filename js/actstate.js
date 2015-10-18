(function () {    
    /*
        Object State Structures

        State: st_ index constant
        Rotate: 1-if object can be rotated left/right, 0 if one sprite for every direction
        Texture: sprite image or base lef-facing image for rotatable sprites 
        Timeout: how many frames until state change or 0 if state will change externally
        Think:  what to do every frame
        Action: what to do once per state
        NextState: entity state after Timeout
    */

    var objStateData = [
       // en_Fartsac
       [
           [FvB.st_Stand, 1, FvB.SPR_FARTSAC_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Stand],
           [FvB.st_Crouch, 1, FvB.SPR_FARTSAC_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.st_Stand],
           [FvB.st_JumpUp, 1,FvB.SPR_FARTSAC_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_JumpDown],
           [FvB.st_JumpDown,1, FvB.SPR_FARTSAC_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_Stand],
           [FvB.st_Blow,1, FvB.SPR_FART_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.st_Stand],
           [FvB.st_Damaged, 1, FvB.SPR_FARTSAC_DAMAGED, 50, null, null, FvB.st_Stand],
           [FvB.st_NearlyDead, 1, FvB.SPR_FARTSAC_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Dead, 1, FvB.SPR_FARTSAC_STAND_1, 0, null, null, FvB.st_Dead]
       ],
       // en_Boogerboy
       [
           [FvB.st_Stand, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Stand],
           [FvB.st_Crouch, 1, FvB.SPR_BOOGERBOY_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.st_Stand],
           [FvB.st_JumpUp, 1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_JumpDown],
           [FvB.st_JumpDown, 1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_Stand],
           [FvB.st_Blow, 1, FvB.SPR_BOOG_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.st_Stand],
           [FvB.st_Damaged, 1, FvB.SPR_BOOGERBOY_DAMAGED, 50, null, null, FvB.st_Stand],
           [FvB.st_NearlyDead, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Dead, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Dead]
       ],
       // en_Fartball
       [
           [FvB.st_Path, 0, FvB.SPR_FARTBALL, 0, FvB.AI.T_Projectile, null, FvB.st_Path]
       ],
       // en_Booger
       [
           [FvB.st_Path, 0, FvB.SPR_BOOGER, 0, FvB.AI.T_Projectile, null, FvB.st_Path]
       ],
       // en_HugeFartball
       [
           [FvB.st_Path, 1, FvB.SPR_HUGE_FARTBALL, 0, FvB.AI.T_Projectile, null, FvB.st_Path]
       ],
       // en_HugeBooger
       [
           [FvB.st_Path,1, FvB.SPR_HUGE_BOOGER, 0, FvB.AI.T_Projectile, null,  FvB.st_Path]
       ],
       // en_Explosion
       [
           [FvB.st_StaticOnce, 0, FvB.SPR_EXPLOSION_0, 0, FvB.AI.T_Explode, null, FvB.st_Remove],
       ]
    ];
    
    //
    // Convert objStateData to final form: objstate[NUM_ENTITY_TYPES][NUM_ENTITY_STATES]
    // 
    var ST_INFO_NULL = [0, FvB.SPR_DONT_USE, 0, null, null, FvB.st_Remove];

    var objstate = [[]];
    for (var i = 0; i < objStateData.length; i++) {
        // First init all states to ST_INFO_NULL
        objstate[i] = [];
        for (var j = 0; j <= FvB.st_Remove; j++) {
            objstate[i][j] = ST_INFO_NULL;
        }
        // Now fill in all the states we have defined in objStateData
        var obj = objStateData[i];
        for (var j = 0; j < obj.length; j++) {            
            var state = obj[j];
            objstate[i][state[0]] = {
                rotate: state[1],
                texture: state[2],
                timeout: state[3],
                think: state[4],
                action: state[5],
                next_state: state[6]
            };
        }
    }

    FvB.setConsts({
        objstate: objstate
    });

})();