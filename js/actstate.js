(function () {    
    /*
        Object State Structures

        State: st_ index constant
        Rotate: 1-if object can be rotated left/right, 0 if one sprite for every direction
        Texture: sprite image or base left-facing image for rotatable sprites 
        Timeout: how many frames until state change or 0 if state will change externally
        Think:  what to do every frame
        Action: what to do once per state
        NextState: entity state after Timeout
    */

    var objStateData = [
       // en_Fartsac
       [
           [FvB.st_Idle1, 1, FvB.SPR_FARTSAC_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Idle1],
           [FvB.st_Stand, 1, FvB.SPR_FARTSAC_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Stand],
           [FvB.st_Crouch, 1, FvB.SPR_FARTSAC_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.st_Idle1],
           [FvB.st_JumpUp, 1,FvB.SPR_FARTSAC_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_JumpDown],
           [FvB.st_JumpDown,1, FvB.SPR_FARTSAC_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_Idle1],
           //[FvB.st_Blow,1, FvB.SPR_FART_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.st_Stand],
           [FvB.st_Damaged1, 1, FvB.SPR_FARTSAC_DAMAGED_1, 50, null, null, FvB.st_Idle1],
           [FvB.st_NearlyDead, 1, FvB.SPR_FARTSAC_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Dead, 1, FvB.SPR_FARTSAC_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_StartFatality, 1, FvB.SPR_FARTSAC_STAND_1, 0, FvB.Player.T_StartFatality, null,FvB.st_Stand],
           [FvB.st_FinishFatality, 1, FvB.SPR_FARTSAC_STAND_1, 0, FvB.Player.T_FinishFatality, null, FvB.st_Stand],
           [FvB.st_FatalityDead, 1, FvB.SPR_FARTSAC_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_EatBoog1, 0, FvB.SPR_BUTT_EATS_BOOG_1, 60, null, null, FvB.st_EatBoog2],
           [FvB.st_EatBoog2, 0, FvB.SPR_BUTT_EATS_BOOG_2, 5, null, null, FvB.st_EatBoog3],
           [FvB.st_EatBoog3, 0, FvB.SPR_BUTT_EATS_BOOG_3, 5, null, null, FvB.st_EatBoog4],
           [FvB.st_EatBoog4, 0, FvB.SPR_BUTT_EATS_BOOG_4, 5, null, null, FvB.st_EatBoog5],
           [FvB.st_EatBoog5, 0, FvB.SPR_BUTT_EATS_BOOG_5, 5, null, null, FvB.st_EatBoog6],
           [FvB.st_EatBoog6, 0, FvB.SPR_BUTT_EATS_BOOG_6, 5, null, null, FvB.st_Victorious],
           [FvB.st_Victorious, 1, FvB.SPR_FARTSAC_STAND_1, 0, null, null, FvB.st_Victorious],

           [FvB.st_Blow, 1, FvB.SPR_FART_TURD_1, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd2],
           [FvB.st_FartTurd2, 1, FvB.SPR_FART_TURD_2, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd3],
           [FvB.st_FartTurd3, 1, FvB.SPR_FART_TURD_3, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd4],
           [FvB.st_FartTurd4, 1, FvB.SPR_FART_TURD_4, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd5],
           [FvB.st_FartTurd5, 1, FvB.SPR_FART_TURD_5, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd6],
           [FvB.st_FartTurd6, 1, FvB.SPR_FART_TURD_6, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd7],
           [FvB.st_FartTurd7, 1, FvB.SPR_FART_TURD_7, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd8],
           [FvB.st_FartTurd8, 1, FvB.SPR_FART_TURD_8, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd9],
           [FvB.st_FartTurd9, 1, FvB.SPR_FART_TURD_9, 3, FvB.Player.T_FartTurd, null, FvB.st_FartTurd10],
           [FvB.st_FartTurd10, 1, FvB.SPR_FART_TURD_10, 3, FvB.Player.T_FartTurd, FvB.Player.A_FireHugeProjectile, FvB.st_JumpDown],

           [FvB.st_Sneeze1, 1, FvB.SPR_FARTSAC_FARTING, 1, null, FvB.Player.A_Sneeze1, FvB.st_Sneeze1],
           [FvB.st_Sneeze2, 1, FvB.SPR_FARTSAC_FARTING, 1, null, FvB.Player.A_Sneeze2, FvB.st_Sneeze2],
           [FvB.st_Sneeze3, 1, FvB.SPR_FARTSAC_FARTING, 1, null, FvB.Player.A_Sneeze3, FvB.st_Sneeze3]
       ],
       // en_Boogerboy
       [
           [FvB.st_Idle1, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Idle1],
           [FvB.st_Stand, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Idle1],
           [FvB.st_Crouch, 1, FvB.SPR_BOOGERBOY_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.st_Idle1],
           [FvB.st_JumpUp, 1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_JumpDown],
           [FvB.st_JumpDown, 1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_Idle1],
           [FvB.st_Blow, 1, FvB.SPR_BOOG_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.st_Idle1],
           [FvB.st_Damaged1, 1, FvB.SPR_BOOGERBOY_DAMAGED_1, 50, null, null, FvB.st_Idle1],
           [FvB.st_NearlyDead, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Dead, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Decapitated, 1, FvB.SPR_BOOG_HEADLESS, 0, null, null, FvB.st_Dead],
           [FvB.st_FatalityDead, 1, FvB.SPR_BOOG_HEADLESS, 0, null, null, FvB.st_Dead],
           [FvB.st_Victorious, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Victorious],

           [FvB.st_Blow, 1, FvB.SPR_BLOW_BOOG_1, 4, null, null, FvB.st_BlowBoog2],
           [FvB.st_BlowBoog2, 1, FvB.SPR_BLOW_BOOG_2, 4, null, null, FvB.st_BlowBoog3],
           [FvB.st_BlowBoog3, 1, FvB.SPR_BLOW_BOOG_3, 4, null, null, FvB.st_BlowBoog4],
           [FvB.st_BlowBoog4, 1, FvB.SPR_BLOW_BOOG_4, 5, null, null, FvB.st_BlowBoog5],
           [FvB.st_BlowBoog5, 1, FvB.SPR_BLOW_BOOG_5, 4, null, null, FvB.st_BlowBoog6],
           [FvB.st_BlowBoog6, 1, FvB.SPR_BLOW_BOOG_6, 4, null, null, FvB.st_BlowBoog7],
           [FvB.st_BlowBoog7, 1, FvB.SPR_BLOW_BOOG_7, 4, null, null, FvB.st_BlowBoog8],
           [FvB.st_BlowBoog8, 1, FvB.SPR_BLOW_BOOG_8, 5, null, null, FvB.st_BlowBoog9],
           [FvB.st_BlowBoog9, 1, FvB.SPR_BLOW_BOOG_9, 4, null, null, FvB.st_BlowBoog10],
           [FvB.st_BlowBoog10, 1, FvB.SPR_BLOW_BOOG_10, 5, null, FvB.Player.A_FireHugeProjectile, FvB.st_Idle1],

           [FvB.st_Sneeze1, 1, FvB.SPR_BLOW_BOOG_1, 1, null, FvB.Player.A_Sneeze1, FvB.st_Sneeze1],
           [FvB.st_Sneeze2, 1, FvB.SPR_BLOW_BOOG_1, 1, null, FvB.Player.A_Sneeze2, FvB.st_Sneeze2],
           [FvB.st_Sneeze3, 1, FvB.SPR_BLOW_BOOG_1, 1, null, FvB.Player.A_Sneeze3, FvB.st_Sneeze3]
       ],
        // en_Yohan
       [
           [FvB.st_Idle1, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Idle1],
           [FvB.st_Stand, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, FvB.Player.T_Stand, null, FvB.st_Idle1],
           [FvB.st_Crouch, 1, FvB.SPR_BOOGERBOY_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.st_Idle1],
           [FvB.st_JumpUp, 1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_JumpDown],
           [FvB.st_JumpDown, 1, FvB.SPR_BOOGERBOY_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_Idle1],
           [FvB.st_Blow, 1, FvB.SPR_BOOG_BLOW_1, 0, FvB.Player.T_Blow, null, FvB.st_Idle1],
           [FvB.st_Damaged1, 1, FvB.SPR_BOOGERBOY_DAMAGED_1, 50, null, null, FvB.st_Idle1],
           [FvB.st_NearlyDead, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Dead, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Decapitated, 1, FvB.SPR_BOOG_HEADLESS, 0, null, null, FvB.st_Dead],
           [FvB.st_FatalityDead, 1, FvB.SPR_BOOG_HEADLESS, 0, null, null, FvB.st_Dead],
           [FvB.st_Victorious, 1, FvB.SPR_BOOGERBOY_STAND_1, 0, null, null, FvB.st_Victorious],

            [FvB.st_Blow, 1, FvB.SPR_BLOW_BOOG_1, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog2],
           [FvB.st_BlowBoog2, 1, FvB.SPR_BLOW_BOOG_2, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog3],
           [FvB.st_BlowBoog3, 1, FvB.SPR_BLOW_BOOG_3, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog4],
           [FvB.st_BlowBoog4, 1, FvB.SPR_BLOW_BOOG_4, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog5],
           [FvB.st_BlowBoog5, 1, FvB.SPR_BLOW_BOOG_5, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog6],
           [FvB.st_BlowBoog6, 1, FvB.SPR_BLOW_BOOG_6, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog7],
           [FvB.st_BlowBoog7, 1, FvB.SPR_BLOW_BOOG_7, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog8],
           [FvB.st_BlowBoog8, 1, FvB.SPR_BLOW_BOOG_8, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog9],
           [FvB.st_BlowBoog9, 1, FvB.SPR_BLOW_BOOG_9, 3, FvB.Player.T_BlowBoog, null, FvB.st_BlowBoog10],
           [FvB.st_BlowBoog10, 1, FvB.SPR_BLOW_BOOG_10, 0, FvB.Player.T_BlowBoog, null, FvB.st_Idle1]
       ],
       // Ryu
       [
       [FvB.st_Idle1, 1, FvB.SPR_RYU_IDLE_1, 10, FvB.Player.T_Idle, null, FvB.st_Idle2],
        [FvB.st_Idle2, 1, FvB.SPR_RYU_IDLE_2, 10, FvB.Player.T_Idle, null, FvB.st_Idle3],
         [FvB.st_Idle3, 1, FvB.SPR_RYU_IDLE_3, 10, FvB.Player.T_Idle, null, FvB.st_Idle4],
          [FvB.st_Idle4, 1, FvB.SPR_RYU_IDLE_4, 10, FvB.Player.T_Idle, null, FvB.st_Idle1],

           [FvB.st_Walk1, 1, FvB.SPR_RYU_WALK_1, 7, FvB.Player.T_Walk, null, FvB.st_Walk2],
        [FvB.st_Walk2, 1, FvB.SPR_RYU_WALK_2, 7, FvB.Player.T_Walk, null, FvB.st_Walk3],
         [FvB.st_Walk3, 1, FvB.SPR_RYU_WALK_3, 7, FvB.Player.T_Walk, null, FvB.st_Walk4],
         [FvB.st_Walk4, 1, FvB.SPR_RYU_WALK_4, 7, FvB.Player.T_Walk, null, FvB.st_Walk1],
         

          [FvB.st_Crouch, 1, FvB.SPR_RYU_CROUCH_1, 0, FvB.Player.T_Crouch, null, FvB.st_Idle1],

          [FvB.st_JumpStart, 1, FvB.SPR_RYU_JUMP_1, 10, FvB.Player.T_Jump, null, FvB.st_JumpUp],
          [FvB.st_JumpUp, 1, FvB.SPR_RYU_JUMP_2, 0, FvB.Player.T_Jump, null, FvB.st_JumpDown],
          [FvB.st_JumpDown, 1, FvB.SPR_RYU_JUMP_2, 5, FvB.Player.T_Jump, null, FvB.st_JumpEnd],
          [FvB.st_JumpEnd, 1, FvB.SPR_RYU_JUMP_1, 0, FvB.Player.T_Jump, null, FvB.st_Idle1],

            [FvB.st_Hadouken1, 1, FvB.SPR_RYU_HADOUKEN_1, 7, null, null, FvB.st_Hadouken2],
        [FvB.st_Hadouken2, 1, FvB.SPR_RYU_HADOUKEN_2, 7, null, null, FvB.st_Hadouken3],
         [FvB.st_Hadouken3, 1, FvB.SPR_RYU_HADOUKEN_3, 7, null, null, FvB.st_Hadouken4],
         [FvB.st_Hadouken4, 1, FvB.SPR_RYU_HADOUKEN_4, 7, null, /*FvB.Entities.A_SpawnHadouken*/, FvB.st_Hadouken5],
          [FvB.st_Hadouken5, 1, FvB.SPR_RYU_HADOUKEN_5, 7, null, null, FvB.st_Idle1],

           [FvB.st_Damaged1, 1, FvB.SPR_RYU_DAMAGED_1, 7, null, null, FvB.st_Damaged2],
           [FvB.st_Damaged2, 1, FvB.SPR_RYU_DAMAGED_2, 7, null, null, FvB.st_Damaged3],
           [FvB.st_Damaged3, 1, FvB.SPR_RYU_DAMAGED_3, 7, null, null, FvB.st_Damaged4],
           [FvB.st_Damaged4, 1, FvB.SPR_RYU_DAMAGED_2, 7, null, null, FvB.st_Damaged5],
           [FvB.st_Damaged5, 1, FvB.SPR_RYU_DAMAGED_4, 7, null, null, FvB.st_Idle1],


           [FvB.st_NearlyDead, 1, FvB.SPR_RYU_IDLE_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Dead, 1, FvB.SPR_RYU_IDLE_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Decapitated, 1, FvB.SPR_RYU_IDLE_1, 0, null, null, FvB.st_Dead],
           [FvB.st_FatalityDead, 1, FvB.SPR_RYU_IDLE_1, 0, null, null, FvB.st_Dead],
           [FvB.st_Victorious, 1, FvB.SPR_RYU_IDLE_1, 0, null, null, FvB.st_Victorious]
       ],
       // en_Fartball
       [
           [FvB.st_Path, 0, FvB.SPR_FARTBALL, 0, FvB.AI.T_Projectile2, null, FvB.st_Path],
            [FvB.st_Path2, 0, FvB.SPR_FARTBALL, 0, FvB.AI.T_Projectile2, null, FvB.st_Path2]
       ],
       // en_Boogball
       [
           [FvB.st_Path, 0, FvB.SPR_BOOGBALL, 0, FvB.AI.T_Projectile2, null, FvB.st_Path],
           [FvB.st_Path2, 0, FvB.SPR_BOOGBALL, 0, FvB.AI.T_Projectile2, null, FvB.st_Path2]
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
           [FvB.st_Explosion1, 0, FvB.SPR_EXPLOSION_0, 4, null, null, FvB.st_Explosion2],
           [FvB.st_Explosion2, 0, FvB.SPR_EXPLOSION_1, 4, null, null, FvB.st_Explosion3],
           [FvB.st_Explosion3, 0, FvB.SPR_EXPLOSION_2, 4, null, null, FvB.st_Explosion4],
           [FvB.st_Explosion4, 0, FvB.SPR_EXPLOSION_3, 4, null, null, FvB.st_Explosion5],
           [FvB.st_Explosion5, 0, FvB.SPR_EXPLOSION_4, 4, null, null, FvB.st_Explosion6],
           [FvB.st_Explosion6, 0, FvB.SPR_EXPLOSION_5, 4, null, null, FvB.st_Explosion7],
           [FvB.st_Explosion7, 0, FvB.SPR_EXPLOSION_6, 4, null, null, FvB.st_Explosion8],
           [FvB.st_Explosion8, 0, FvB.SPR_EXPLOSION_7, 4, null, null, FvB.st_Explosion9],
           [FvB.st_Explosion9, 0, FvB.SPR_EXPLOSION_8, 4, null, null, FvB.st_Explosion10],
           [FvB.st_Explosion10, 0, FvB.SPR_EXPLOSION_9, 4, null, null, FvB.st_Explosion11],
           [FvB.st_Explosion11, 0, FvB.SPR_EXPLOSION_10, 4, null, null, FvB.st_Explosion12],
           [FvB.st_Explosion12, 0, FvB.SPR_EXPLOSION_11, 4, null, null, FvB.st_Explosion13],
           [FvB.st_Explosion13, 0, FvB.SPR_EXPLOSION_12, 4, null, null, FvB.st_Remove]
       ],
       // en_HugeExplosion
       [
           [FvB.st_Explosion1, 0, FvB.SPR_HUGE_EXPLOSION_0, 4, null, null, FvB.st_Explosion2],
           [FvB.st_Explosion2, 0, FvB.SPR_HUGE_EXPLOSION_1, 4, null, null, FvB.st_Explosion3],
           [FvB.st_Explosion3, 0, FvB.SPR_HUGE_EXPLOSION_2, 4, null, null, FvB.st_Explosion4],
           [FvB.st_Explosion4, 0, FvB.SPR_HUGE_EXPLOSION_3, 4, null, null, FvB.st_Explosion5],
           [FvB.st_Explosion5, 0, FvB.SPR_HUGE_EXPLOSION_4, 4, null, null, FvB.st_Explosion6],
           [FvB.st_Explosion6, 0, FvB.SPR_HUGE_EXPLOSION_5, 4, null, null, FvB.st_Explosion7],
           [FvB.st_Explosion7, 0, FvB.SPR_HUGE_EXPLOSION_6, 4, null, null, FvB.st_Explosion8],
           [FvB.st_Explosion8, 0, FvB.SPR_HUGE_EXPLOSION_7, 4, null, null, FvB.st_Explosion9],
           [FvB.st_Explosion9, 0, FvB.SPR_HUGE_EXPLOSION_8, 4, null, null, FvB.st_Explosion10],
           [FvB.st_Explosion10, 0, FvB.SPR_HUGE_EXPLOSION_9, 4, null, null, FvB.st_Explosion11],
           [FvB.st_Explosion11, 0, FvB.SPR_HUGE_EXPLOSION_10, 4, null, null, FvB.st_Explosion12],
           [FvB.st_Explosion12, 0, FvB.SPR_HUGE_EXPLOSION_11, 4, null, null, FvB.st_Explosion13],
           [FvB.st_Explosion13, 0, FvB.SPR_HUGE_EXPLOSION_12, 4, null, null, FvB.st_Remove]
       ],
       // en_Static
       [],
       // en_FightText
       [
           [FvB.st_Explosion1, 0, FvB.SPR_ROUND1_SMALL, 4, null, FvB.AI.A_PlaySound, FvB.st_Explosion2],
           [FvB.st_Explosion2, 0, FvB.SPR_ROUND1_MEDIUM, 4, null, null, FvB.st_Explosion3],
           [FvB.st_Explosion3, 0, FvB.SPR_ROUND1_LARGE, 90, null, null, FvB.st_Explosion4],
           [FvB.st_Explosion4, 0, FvB.SPR_ROUND1_MEDIUM, 4, null, null, FvB.st_Explosion5],
           [FvB.st_Explosion5, 0, FvB.SPR_ROUND1_SMALL, 4, null, null, FvB.st_Explosion6],
           [FvB.st_Explosion6, 0, FvB.SPR_FIGHT_SMALL, 4, null, null, FvB.st_Explosion7],
           [FvB.st_Explosion7, 0, FvB.SPR_FIGHT_MEDIUM, 4, null, FvB.AI.A_PlaySound, FvB.st_Explosion8],
           [FvB.st_Explosion8, 0, FvB.SPR_FIGHT_LARGE, 60, null, null, FvB.st_Remove]
       ],
       // en_YouWin
       [
           [FvB.st_Explosion1, 0, FvB.SPR_YOUWIN_REGULAR, 1, null, FvB.AI.A_PlaySound, FvB.st_Explosion2],
           [FvB.st_Explosion2, 0, FvB.SPR_YOUWIN_REGULAR, 40, null, null, FvB.st_Explosion3],
           [FvB.st_Explosion3, 0, FvB.SPR_YOUWIN_INVERSE, 4, null, null, FvB.st_Explosion4],
           [FvB.st_Explosion4, 0, FvB.SPR_YOUWIN_REGULAR, 4, null, null, FvB.st_Explosion5],
           [FvB.st_Explosion5, 0, FvB.SPR_YOUWIN_INVERSE, 4, null, null, FvB.st_Explosion6],
           [FvB.st_Explosion6, 0, FvB.SPR_YOUWIN_REGULAR, 4, null, null, FvB.st_Explosion7],
           [FvB.st_Explosion7, 0, FvB.SPR_YOUWIN_INVERSE, 4, null, null, FvB.st_Explosion8],
 [FvB.st_Explosion8, 0, FvB.SPR_YOUWIN_REGULAR, 4, null, null, FvB.st_Explosion9],
           [FvB.st_Explosion9, 0, FvB.SPR_YOUWIN_INVERSE, 4, null, null, FvB.st_Explosion10],
           [FvB.st_Explosion10, 0, FvB.SPR_YOUWIN_REGULAR, 4, null, null, FvB.st_Explosion11],
           [FvB.st_Explosion11, 0, FvB.SPR_YOUWIN_INVERSE, 4, null, null, FvB.st_Explosion12],


[FvB.st_Explosion12, 0, FvB.SPR_YOUWIN_REGULAR, 130, null, FvB.AI.A_PlaySound, FvB.st_Remove]
       ],
       // en_YouLose
       [
           [FvB.st_Explosion1, 0, FvB.SPR_YOULOSE_REGULAR, 1, null, FvB.AI.A_PlaySound, FvB.st_Explosion2],
           [FvB.st_Explosion2, 0, FvB.SPR_YOULOSE_REGULAR, 130, null, FvB.AI.A_PlaySound, FvB.st_Remove]
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
                flip: state[1],
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