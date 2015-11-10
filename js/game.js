
FvB.Game = (function () {

    FvB.setConsts({
        
        gs_NotInGame: 0,
        gs_Playing: 1,
        gs_AcceptInput: 2,
        gs_Victory: 4,
        gs_RoundComplete: 5
    });

    var game;

    /**
    * @description Initialize game state
    * @memberOf FvB.Game
    * @param {object} game The game object.
    */
    function init() {
        var game = {
            state: FvB.gs_NotInGame,
            isGameOver: false,
            isSinglePlayer: true,
            acceptingInput: false,
            stage: 0,
            round: 0,
            roundOver: false,

            player1: {
                character: FvB.en_Fartsac,
                characterSelected: false,
                numWins: 0,
                entity: null,
                healthMeter: FvB.MAX_PLAYER_HEALTH,
                buttonState: [FvB.NUM_PLAYER_BUTTONS],
                buttonHeld: [FvB.NUM_PLAYER_BUTTONS]
            },
            player2: {
                character: FvB.en_Boogerboy,
                characterSelected: false,
                numWins: 0,
                entity: null,
                healthMeter: FvB.MAX_PLAYER_HEALTH,
                buttonState: [FvB.NUM_PLAYER_BUTTONS],
                buttonHeld: [FvB.NUM_PLAYER_BUTTONS]
            },

            entities: [],
        };

        return game;
    }

    /**
    * @description Start the game loop
    * @memberOf FvB.Game
    * @param {object} game The game object.
    */
    function startGame() {
        // make this a single class selector...
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('game-over-overlay').style.display = 'none';
        document.getElementById('finish-him').style.display = 'none';
        document.getElementById('finish-him-overlay').style.display = 'none';
        document.getElementById('intro-screen').style.display = 'none';

        // put up black screen
        document.getElementById('fader-overlay').style.display = 'block';

        FvB.Sound.stopAllSounds();

        game = init();

        titleScreen(game);
        //beginRound(); For debugging -- get into the action quickly
    }

    /**
    * @description Display Title Screen
    * @memberOf FvB.Game
    * @param {object} game The game object.
    */
    function titleScreen(game) {

        var updateHandler;
            
        FvB.Sound.startMusic(FvB.SFX_TITLE_THEME);

        function renderTitleScreen(game) {

            var menuY = 210,
                selectionY = game.isSinglePlayer ? menuY + 2 : menuY + 30;

            FvB.Renderer.clearScreen();

            FvB.Renderer.renderSprite(FvB.SPR_TITLE_FARTSAC, 320, 40, FvB.R_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_TITLE_VS, 320, 70, FvB.R_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_TITLE_BOOGERBOY, 320, 100, FvB.R_ALIGN_CENTER);

            FvB.Renderer.renderSprite(FvB.SPR_NUM_PLAYERS, 320, menuY, FvB.R_X_ALIGN_CENTER);

            // Put a Turd and Booger on either side of the selection
            FvB.Renderer.renderSprite(FvB.SPR_TITLE_TURD, 220, selectionY);
            FvB.Renderer.renderSprite(FvB.SPR_TITLE_BOOG, 398, selectionY);

        }

        function updateTitleScreen() {

            if (input.checkKey(FvB.Keys.ENTER) || input.checkKey(FvB.Keys.SPACE)) {
                clearInterval(updateHandler);
                FvB.Sound.playSound(FvB.SFX_HUGE_EXPLOSION);
                $("#fader-overlay").fadeIn(1500, function () {
                    FvB.Sound.stopAllSounds();
                    characterSelect(game);
                })
                return;
            }

            if (game.isSinglePlayer && input.checkKey(FvB.Keys.DOWN)) {
                game.isSinglePlayer = false;
                FvB.Sound.playSound(FvB.SFX_HUGE_FARTBALL);
            } else if (!game.isSinglePlayer && input.checkKey(FvB.Keys.UP)) {
                game.isSinglePlayer = true;
                FvB.Sound.playSound(FvB.SFX_HUGE_BOOGER);
            }
            renderTitleScreen(game);
        }

        // Render intial view and then fade in and set interval to check input
        renderTitleScreen(game);
        $("#fader-overlay").fadeOut(1500, function () { updateHandler = setInterval(updateTitleScreen, 1000 / 30); });

    }

    /**
    * @description Character Select Screen
    * @memberOf FvB.Game
    * @param {object} game The game object.
    */
    function characterSelect(game) {

        var updateHandler;

        FvB.Sound.startMusic(FvB.SFX_CHARACTER_SELECT_THEME);

        function renderCharacterSelect() {

            var characterMatrixYPos = 125,
                characterMatrixX = 244,
                characterMatrixY = characterMatrixYPos - 41,
                characterMatrixCellWidth = 50,

                p1 = game.player1.character,
                p2 = game.player2.character;

            FvB.Renderer.clearScreen();

            // Static elements
            FvB.Renderer.renderSprite(FvB.SPR_CHARACTER_SELECT_TEXT, 0, 10);
            FvB.Renderer.renderSprite(FvB.SPR_CHARACTER_SELECT_MATRIX, 320, characterMatrixYPos, FvB.R_ALIGN_CENTER);

            if (!game.isSinglePlayer) {
                FvB.Renderer.renderSprite(FvB.SPR_VERSUS, 320, 300, FvB.R_ALIGN_CENTER);
            }

            // Player 1            
            FvB.Renderer.renderSprite(FvB.SPR_1P, 101, 155, FvB.R_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p1, 101, 182, FvB.R_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p1, 0, 194);

            FvB.Renderer.renderSprite(FvB.SPR_1P, characterMatrixX + (characterMatrixCellWidth * p1) + 27, characterMatrixY -17, FvB.R_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_1P_SELECT, characterMatrixX + (characterMatrixCellWidth * p1), characterMatrixY);
          
            // Player 2
            if (!game.isSinglePlayer) {
                FvB.Renderer.renderSprite(FvB.SPR_2P, 538, 155, FvB.R_ALIGN_CENTER);
                FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p2, 538, 182, FvB.R_ALIGN_CENTER);
                FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p2, 437, 194);

                FvB.Renderer.renderSprite(FvB.SPR_2P, characterMatrixX + (characterMatrixCellWidth * p2) + 27, characterMatrixY + 100, FvB.R_ALIGN_CENTER);
                FvB.Renderer.renderSprite(FvB.SPR_2P_SELECT, characterMatrixX + (characterMatrixCellWidth * p2), characterMatrixY);

                if (p1 == p2) {
                    FvB.Renderer.renderSprite(FvB.SPR_BOTH_SELECT, characterMatrixX + (characterMatrixCellWidth * p2), characterMatrixY);
                }
                  
            }
        }

        function updateCharacterSelect() {

            PollControls();

            for (p = 0; p < (game.isSinglePlayer ? 1 : 2) ; p++) {

                var player = p == 0 ? game.player1 : game.player2;

                // Secret select Ryu - later make him selectable if game.ryuUnlocked == true
                if (player.buttonState[FvB.BT_DOWN]) {
                        player.character = FvB.en_Ryu;
                }

                if (player.buttonState[FvB.BT_LEFT] && !player.buttonHeld[FvB.BT_LEFT] && player.character > 0) {
                    player.character = player.character - 1;
                    FvB.Sound.playSound(FvB.SFX_SELECT_CHARACTER);
                } else if (player.buttonState[FvB.BT_RIGHT] && !player.buttonHeld[FvB.BT_RIGHT] && player.character < FvB.en_Yohan) {
                    player.character = player.character + 1;
                    FvB.Sound.playSound(FvB.SFX_SELECT_CHARACTER);
                }

                if (player.buttonState[FvB.BT_PRIMARY_ATTACK] && !player.buttonHeld[FvB.BT_PRIMARY_ATTACK]) {
                    FvB.Sound.playSound(FvB.SFX_CHOOSE_CHARACTER);
                    player.characterSelected = true;
                }

            }

            renderCharacterSelect();

            if (game.player1.characterSelected && (game.isSinglePlayer || game.player2.characterSelected)) {
                clearInterval(updateHandler);
                // put up black screen
                $("#fader-overlay").fadeIn(1500, function () {
                    beginStage();
                });
                return;
            }

        }

        // Render intial view and then fade in and set interval to check input
        renderCharacterSelect();
        $("#fader-overlay").fadeOut(1500, function () { updateHandler = setInterval(updateCharacterSelect, 1000 / 30); });

    }

    function beginStage() {

        if (game.stage > 2) {
            gameOver();
            return;
        }

        function versusScreen(callback) {

            var characterMugY = 170,
                characterNameY = 285

                p1 = game.player1.character,
                p2 = game.player2.character;

            FvB.Renderer.clearScreen();

            FvB.Renderer.renderSprite(FvB.SPR_VERSUS, 320, characterMugY, FvB.R_ALIGN_CENTER);

            // Player 1
            FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p1, 0, characterMugY, FvB.R_X_ALIGN_LEFT | FvB.R_Y_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p1, 101, characterNameY, FvB.R_ALIGN_CENTER);

            // Player 2
            FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p2, 639, characterMugY, FvB.R_X_ALIGN_RIGHT | FvB.R_Y_ALIGN_CENTER);
            FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p2, 538, characterNameY, FvB.R_ALIGN_CENTER);

            document.getElementById('fader-overlay').style.display = 'none';
            FvB.Sound.playSound(FvB.SFX_VERSUS_THEME);

            // Set timeout (so SFX finishes) that calls back to beginStage
            setTimeout(function () {
                $("#fader-overlay").fadeIn(1500, function () {
                    callback();
                });
            },3000);
        }

        function setStage() {

            game.isGameOver = false;
            game.round = 0;
            
            game.player1.healthMeter = game.player2.healthMeter = FvB.MAX_PLAYER_HEALTH;
            game.player1.numWins = game.player2.numWins = 0;

            FvB.Sound.startMusic(FvB.SFX_FARTSAC_THEME + game.player2.character);

            beginRound();
        }

        function getOpponent(game) {
            var opponent;

            if (game.player1.character == FvB.en_Fartsac) {
                switch (game.stage) {
                    case 0:
                        opponent = FvB.en_Boogerboy;
                        break;
                    case 1:
                        opponent = FvB.en_Fartsac;
                        break;
                    case 2:
                        opponent = FvB.en_Ryu;
                        break;
                }
            } else if (game.player1.character == FvB.en_Boogerboy) {
                switch (game.stage) {
                    case 0:
                        opponent = FvB.en_Fartsac;
                        break;
                    case 1:
                        opponent = FvB.en_Boogerboy;
                        break;
                    case 2:
                        opponent = FvB.en_Ryu;
                        break;
                }
            }

            return opponent;
        }

        if (game.isSinglePlayer)
            game.player2.character = getOpponent(game);
        // Do Versus Screen and then callback to setStage
        FvB.Sound.stopAllSounds();
        versusScreen(setStage);
    }

   
   
    function beginRound() {
        //game.round++;
        game.roundOver = false;
        game.state = FvB.gs_Playing;
        game.acceptingInput = false;


        //if (game.round > 2) {
        if (game.player1.numWins == 2 || game.player2.numWins == 2) {
            if (game.isSinglePlayer) {

                if (game.player1.numWins == 2) {
                    game.stage++;
                    $("#fader-overlay").fadeIn(1500, function () {
                        beginStage();
                    });
                } else {
                    gameOver();
                }
                return;
            } else {
                $("#fader-overlay").fadeIn(1500, function () {
                    gameOver();
                });
            }
            return;
        }

        // Clear button states
        for (i = 0; i < 2; i++) {
            var player = i == 0 ? game.player1 : game.player2;
            for (j = 0; j < 7; j++) {
                player.buttonState[j] =player.buttonHeld[j] = 0;
            }
        }
        document.getElementById('finish-him').style.display = 'none';
        $("#fader-overlay").fadeIn(1500, function () {
            
            game.entities = [];

            game.player1.entity = FvB.Player.spawnPlayer(game, game.player1);
            game.player2.entity = FvB.Player.spawnPlayer(game, game.player2);
            
            isGameOver = false;
            $("#fader-overlay").fadeOut(1500, function () { FvB.Entities.spawnFight(game, 320, 170); });
            lastTime = Date.now()
            main();
        });
        
    }
// The main game loop
var lastTime;
var animFrame;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    // bound ticcount to a maximum to avoid having objects move across the entire screen in one frame
    if (dt > 1.0) { dt = 0.5; }


    if (game.roundOver && game.entities.length == 2) {
        //if (game.entities[0].state == FvB.ST_DEAD)
        //gameOver();
        game.round++;
        beginRound();
        return;

        //if (animFrame) {
        //    cancelRequestAnimFrame(animFrame);
        //    animFrame = null;
        //    return;
        //}
    }
    //console.log(game.entities.length);
    update(dt);
    render();

    

    lastTime = now;
    animFrame = requestAnimFrame(main);
};



function drawHealth()
{
    var healthDelta = 0,
        ctx = FvB.Renderer.getContext();

    // Player 1
    healthDelta = game.player1.healthMeter - FvB.MAX_PLAYER_HEALTH;
    if (healthDelta < 0) {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(20, 46, Math.abs(healthDelta), 26);
    }

    // Player 2
    healthDelta = game.player2.healthMeter - FvB.MAX_PLAYER_HEALTH;
    if (healthDelta < 0) {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(622 - Math.abs(healthDelta), 46, Math.abs(healthDelta), 26);
    }
}

// Update game objects
function update(dt) {

    if (!game.isGameOver && game.acceptingInput)
        PollControls();

    updateEntities(dt);

    for (i = 0; i < 2; i++) {
        var player = i == 0 ? game.player1 : game.player2;

        var healthDelta = player.entity.health - player.healthMeter;
        if (healthDelta != 0) {
            var movHealth = dt* (healthDelta < 0 ? -100 : 100);

            player.healthMeter += movHealth;

            if (healthDelta < 0 && player.healthMeter < player.entity.health) {
                player.healthMeter = player.entity.health;
            } else if (healthDelta > 0 && player.healthMeter > player.entity.health) {
                player.healthMeter = player.entity.health;
            }
        }

    }

    if (game.player1.entity.state == FvB.st_NearlyDead || game.player2.entity.state == FvB.st_NearlyDead) {
        //document.getElementById('finish-him').style.display = 'block';
    }
    //if (game.player1.state == FvB.st_Dead || game.player2.state == FvB.st_Dead
    //    || game.player1.state == FvB.st_FatalityDead || game.player2.state == FvB.st_FatalityDead) {
    if (game.player1.entity.state == FvB.st_Victorious || game.player2.entity.state == FvB.st_Victorious) {
        document.getElementById('finish-him').style.display = 'none';


        if (game.state != FvB.gs_Victory) {
            if (game.isSinglePlayer) {
                if (game.player1.entity.state == FvB.st_Victorious) {
                    FvB.Entities.spawnYouWinLose(game, 320, 160, FvB.en_YouWin);
                    game.state = FvB.gs_Victory;
                    game.player1.numWins++;
                } else {
                    FvB.Entities.spawnYouWinLose(game, 320, 160, FvB.en_YouLose);
                    game.state = FvB.gs_Victory;
                    game.player2.numWins++;

}
            } else {
                game.state = FvB.gs_Victory;
                game.roundOver = true;
                if (game.player1.entity.state == FvB.st_Victorious) {
                    game.player1.numWins++;
                } else if (game.player2.entity.state == FvB.st_Victorious) {
                    game.player2.numWins++;
                }
            }
        }
    }
}

function PollControls() {
    // Init these in game state and don't do this stupid hack to swith the buttons!
    var playerButtons = [
        [FvB.Keys.LEFT, FvB.Keys.RIGHT, FvB.Keys.UP, FvB.Keys.DOWN, FvB.Keys.L, FvB.Keys.K, FvB.Keys.O],
        [FvB.Keys.F, FvB.Keys.H, FvB.Keys.T, FvB.Keys.G, FvB.Keys.W, FvB.Keys.Q, FvB.Keys.A]
    ];

    if (!game.isSinglePlayer) {
        playerButtons = [
        
        [FvB.Keys.F, FvB.Keys.H, FvB.Keys.T, FvB.Keys.G, FvB.Keys.W, FvB.Keys.Q, FvB.Keys.A],
        [FvB.Keys.LEFT, FvB.Keys.RIGHT, FvB.Keys.UP, FvB.Keys.DOWN, FvB.Keys.L, FvB.Keys.K, FvB.Keys.O]
        ];
    }

    var player;
    // copy previous state to held array
    for (i = 0; i < 2; i++) {
        player = i == 0 ? game.player1 : game.player2;
        for (j = 0; j < 7; j++) {
            player.buttonHeld[j] = player.buttonState[j];
            // Get new button states for players
            player.buttonState[j] = input.checkKey(playerButtons[i][j]);
        }
    }
}

function updateEntities(dt) {
    
    FvB.Entities.process(game, dt);
}

// Draw everything
function render() {

    // Background
    if (game.player1.character != FvB.en_Ryu && game.player2.character != FvB.en_Ryu) {
        FvB.Renderer.clearScreen();
    } else {
        FvB.Renderer.renderSprite(FvB.SPR_RYU_BACKGROUND, 0, 0);
    }

    FvB.Renderer.renderSprite(FvB.SPR_PLAYER_HEALTH_BAR, 0, 44);
    drawHealth();

    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + game.player1.character, 20, 80);
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + game.player2.character, 621, 80, FvB.R_X_ALIGN_RIGHT);

    // Render Players first
    for (i = 0; i < 2; i++) {
        var renderFunction = game.entities[i].renderFunction;
        var sprite = game.entities[i].sprite;
        if (sprite != -1 && renderFunction)
            renderFunction(game.entities[i]);
    }
    //FvB.Renderer.renderEntity(game.entities[0]);
    //FvB.Renderer.renderEntity(game.entities[1]);

    // Render entities backwards so new explosions don't cover old ones
    for (i = game.entities.length - 1; i > 1; i--) {
        var e = game.entities[i];

        if (e.state != FvB.st_Remove) {
            var renderFunction = e.renderFunction;
            if (renderFunction)
                renderFunction(game.entities[i]);
        }
            
    }
    
    // Hack!: clear out removed entities
    for (i = 0; i < game.entities.length; i++) {
        var e = game.entities[i];

        if (e.state == FvB.st_Remove || e.flags & FvB.FL_SINGLE_FRAME) {
            game.entities.splice(i, 1);
            i--;

        }
    }

   
};


// Game over
function gameOver() {
    document.getElementById('finish-him').style.display = 'none';
    document.getElementById('finish-him-overlay').style.display = 'none';

    
    var gameOverText = !game.isSinglePlayer ? game.player1.numWins > game.player2.numWins ? 'Player 1 Wins!' : 'Player 2 Wins!' : game.player1.numWins > game.player2.numWins ? 'You Won!' : 'Da Compuder Beat You!';

 $('#game-over h1').text(gameOverText);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
   
}

return {
    startGame: startGame
};

})();