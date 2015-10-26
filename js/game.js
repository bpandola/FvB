
FvB.Game = (function () {

    var game = {
        isGameOver: false,
        isSinglePlayer: true,
        doneSelecting: false,
        round: 1,
        roundOver: false,
        playerCharacters: [FvB.en_Fartsac, FvB.en_Boogerboy],
        charactersSelected: [false, false],

        player1: {},
        player2: {},

        entities: [],

        health: [FvB.MAX_PLAYER_HEALTH, FvB.MAX_PLAYER_HEALTH],

        // Players button states
        buttonState: [[FvB.NUM_PLAYER_BUTTONS], [FvB.NUM_PLAYER_BUTTONS]],
        buttonHeld: [[FvB.NUM_PLAYER_BUTTONS], [FvB.NUM_PLAYER_BUTTONS]]
    };

    function nextRound() {
        game.round++;
        game.roundOver = false;
        if (game.round > 3) {
            gameOver();
            return;
        }
        document.getElementById('finish-him').style.display = 'none';
        $("#fader-overlay").fadeIn(1500, function () {
            
            game.entities = [];

            game.player1 = FvB.Player.spawnPlayer(game, 1, game.playerCharacters[0]);
            if (!game.isSinglePlayer)
                game.player2 = FvB.Player.spawnPlayer(game, 2, game.playerCharacters[1]);

            isGameOver = false;

            main();
            // Render initial screen
            //render();

            //$("#fader-overlay").fadeOut(3000, function () {
            //    lastTime = Date.now()
            //    main();
            //});

            $("#fader-overlay").fadeOut(1500);


        });
        
    }
// The main game loop
var lastTime;
var animFrame;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    // bound ticcount to a maximum of 1 second (should maybe be even less...)
    if (dt > 1.0) { dt = 0.5; }


    if (game.roundOver && game.entities.length == 2) {
        //if (game.entities[0].state == FvB.ST_DEAD)
        //gameOver();
        nextRound();
        return;

        //if (animFrame) {
        //    cancelRequestAnimFrame(animFrame);
        //    animFrame = null;
        //    return;
        //}
    }

    update(dt);
    render();

    

    lastTime = now;
    animFrame = requestAnimFrame(main);
};

function startGame() {

    game.isSinglePlayer = true;
    game.doneSelecting = false;

    game.player1 = {};
    game.player2 = {};

    game.entities = [];

    game.health = [FvB.MAX_PLAYER_HEALTH, FvB.MAX_PLAYER_HEALTH];

        // Players button states
    game.buttonState=[[FvB.NUM_PLAYER_BUTTONS], [FvB.NUM_PLAYER_BUTTONS]];
    game.buttonHeld=[[FvB.NUM_PLAYER_BUTTONS], [FvB.NUM_PLAYER_BUTTONS]];
    
    document.getElementById('play-again').addEventListener('click', function () {
        reset();
    });
    
    reset();
}

function drawHealth()
{
    var health = 0,
        ctx = FvB.Renderer.getContext();
    // Player 1
    health = game.health[0] - FvB.MAX_PLAYER_HEALTH;
    if (health < 0) {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(20, 46, Math.abs(health), 26);
    }

    // Player 2
    health = game.health[1] - FvB.MAX_PLAYER_HEALTH;
    if (health < 0) {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(622 - Math.abs(health), 46, Math.abs(health), 26);
    }
       
}

// Update game objects
function update(dt) {

    if (!game.isGameOver)
        PollControls();

    updateEntities(dt);

    for (i = 0; i < 2; i++) {
        var healthDelta = game.entities[i].health - game.health[i];
        if (healthDelta != 0) {
            var movHealth = dt* (healthDelta < 0 ? -100 : 100);

            game.health[i] += movHealth;

            if (healthDelta < 0 && game.health[i] < game.entities[i].health) {
                game.health[i] = game.entities[i].health;
            } else if (healthDelta > 0 && game.health[i] > game.entities[i].health) {
                game.health[i] = game.entities[i].health;
            }
        }

    }

    if (game.player1.state == FvB.st_NearlyDead || game.player2.state == FvB.st_NearlyDead) {
        document.getElementById('finish-him').style.display = 'block';
    }
    //if (game.player1.state == FvB.st_Dead || game.player2.state == FvB.st_Dead
    //    || game.player1.state == FvB.st_FatalityDead || game.player2.state == FvB.st_FatalityDead) {
    if (game.player1.state == FvB.st_Victorious || game.player2.state == FvB.st_Victorious) {
        game.roundOver = true;
    }

}

function PollControls() {
    // Init these in game state
    var playerButtons = [
        [FvB.Keys.F, FvB.Keys.H, FvB.Keys.T, FvB.Keys.G, FvB.Keys.W, FvB.Keys.Q,FvB.Keys.A],
        [FvB.Keys.LEFT, FvB.Keys.RIGHT, FvB.Keys.UP, FvB.Keys.DOWN, FvB.Keys.L, FvB.Keys.K,FvB.Keys.O]];

    // copy previous state to held array
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 7; j++) {
            game.buttonHeld[i][j] = game.buttonState[i][j];
        }
    }

    // Get new button states for players
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 7; j++) {
            game.buttonState[i][j] = input.checkKey(playerButtons[i][j]);
        }
    }

}

function updateEntities(dt) {
    
    FvB.Entities.process(game, dt);
}

// Draw everything
function render() {

    // Background
    if (game.player1.type != FvB.en_Ryu && game.player2.type != FvB.en_Ryu) {
        FvB.Renderer.clearScreen();
    } else {
        FvB.Renderer.renderSprite(FvB.SPR_RYU_BACKGROUND, 0, 0);
    }

    FvB.Renderer.renderSprite(FvB.SPR_PLAYER_HEALTH_BAR, 0, 44);

    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + game.playerCharacters[0], 20, 80);
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + game.playerCharacters[1], 621, 80, FvB.R_X_ALIGN_RIGHT);

    // Render Players first
    for (i = 0; i < 2; i++) {
        var renderFunction = game.entities[i].renderFunction;
        if (renderFunction)
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

    drawHealth();
};


// Game over
function gameOver() {
    document.getElementById('finish-him').style.display = 'none';
    document.getElementById('finish-him-overlay').style.display = 'none';

    
    var gameOver = $('#game-over h1').text('Boogerboy Wins!');
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
    game.charactersSelected[0] = game.charactersSelected[1] = false;
}

function updateCharacterSelect() {

    PollControls();

    for (p = 0; p < (game.isSinglePlayer ? 1 : 2); p++) {

        if (p == 0) {
            // Secret select Ryu
            if (/*game.buttonState[p][FvB.BT_LEFT] && game.buttonState[p][FvB.BT_RIGHT] && game.buttonState[p][FvB.BT_UP] &&*/ game.buttonState[p][FvB.BT_DOWN]) {
                game.playerCharacters[p] = FvB.en_Ryu;
                continue;
            }

        }

        if (game.buttonState[p][FvB.BT_LEFT] && !game.buttonHeld[p][FvB.BT_LEFT] && game.playerCharacters[p] > 0) {
            game.playerCharacters[p] = game.playerCharacters[p] - 1;
            FvB.Sound.playSound(FvB.SFX_SELECT_CHARACTER);
        } else if (game.buttonState[p][FvB.BT_RIGHT] && !game.buttonHeld[p][FvB.BT_RIGHT] && game.playerCharacters[p] < FvB.en_Yohan) {
            game.playerCharacters[p] = game.playerCharacters[p] + 1;
            FvB.Sound.playSound(FvB.SFX_SELECT_CHARACTER);
        }

        if (game.buttonState[p][FvB.BT_PRIMARY_ATTACK] && !game.buttonHeld[p][FvB.BT_PRIMARY_ATTACK]) {
            FvB.Sound.playSound(FvB.SFX_CHOOSE_CHARACTER);
            game.charactersSelected[p] = true;
        }

       
    }
   
}

function renderCharacterSelect() {
    
    var characterMatrixYPos = 125,
        characterMatrixX = 244,
        characterMatrixY = characterMatrixYPos - 41,
        characterMatrixCellWidth = 50;

    var p1 = game.playerCharacters[0],
        p2 = game.playerCharacters[1];

    FvB.Renderer.clearScreen();

    // Static elements
    FvB.Renderer.renderSprite(FvB.SPR_CHARACTER_SELECT_TEXT, 0, 10);
    FvB.Renderer.renderSprite(FvB.SPR_CHARACTER_SELECT_MATRIX, 320, characterMatrixYPos,FvB.R_ALIGN_CENTER);

    if (!game.isSinglePlayer) {
        FvB.Renderer.renderSprite(FvB.SPR_VERSUS, 320, 300, FvB.R_ALIGN_CENTER);
    }

    // Player 1
    FvB.Renderer.renderSprite(FvB.SPR_1P, 101, 155, FvB.R_ALIGN_CENTER);
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p1, 101, 182, FvB.R_ALIGN_CENTER);
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p1, 0, 194);

    if (p1 != FvB.en_Ryu) {
        FvB.Renderer.renderSprite(FvB.SPR_1P, characterMatrixX + (characterMatrixCellWidth * p1) + 27, characterMatrixY - 17, FvB.R_ALIGN_CENTER);
        FvB.Renderer.renderSprite(FvB.SPR_1P_SELECT, characterMatrixX + (characterMatrixCellWidth * p1), characterMatrixY);
    }

    // Player 2
    if (!game.isSinglePlayer) {
        FvB.Renderer.renderSprite(FvB.SPR_2P, 538, 155, FvB.R_ALIGN_CENTER);
        FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p2, 538, 182, FvB.R_ALIGN_CENTER);
        FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p2, 437, 194);

        FvB.Renderer.renderSprite(FvB.SPR_2P, characterMatrixX + (characterMatrixCellWidth * p2) + 27, characterMatrixY + 100, FvB.R_ALIGN_CENTER);

        if (p1 != p2)
            FvB.Renderer.renderSprite(FvB.SPR_2P_SELECT, characterMatrixX + (characterMatrixCellWidth * p2), characterMatrixY);
        else
            FvB.Renderer.renderSprite(FvB.SPR_BOTH_SELECT, characterMatrixX + (characterMatrixCellWidth * p2), characterMatrixY);

    }

}

function renderVersusScreen() {

    var characterMatrixYPos = 125,
        characterMatrixX = 244,
        characterMatrixY = characterMatrixYPos - 41,
        characterMatrixCellWidth = 50;

    var p1 = game.playerCharacters[0],
        p2 = game.playerCharacters[1];

    FvB.Renderer.clearScreen();
    
    FvB.Renderer.renderSprite(FvB.SPR_VERSUS, 320, 300, FvB.R_ALIGN_CENTER);
    
    // Player 1
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p1, 101, 182, FvB.R_ALIGN_CENTER);
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p1, 0, 194);

    // Player 2
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_TEXT + p2, 538, 182, FvB.R_ALIGN_CENTER);
    FvB.Renderer.renderSprite(FvB.SPR_FARTSAC_MUG + p2, 437, 194);

}

function newStartGame() {
    

    game.entities = [];

    game.player1 = FvB.Player.spawnPlayer(game, 1, game.playerCharacters[0]);
    //if (!game.isSinglePlayer)
     game.player2 = FvB.Player.spawnPlayer(game, 2, game.playerCharacters[1]);

    game.isGameOver = false;
    game.round=1;
    game.roundOver = false;
    game.health[0] = game.health[1] = FvB.MAX_PLAYER_HEALTH;
    // Render initial screen
    
    render();

    //$("#fader-overlay").fadeOut(3000, function () {
    //    lastTime = Date.now()
    //    main();
    //});

    $("#fader-overlay").fadeOut(3000);

    if (game.player1.type == FvB.en_Ryu || game.player2.type == FvB.en_Ryu) {
        FvB.Sound.startMusic(FvB.SFX_RYU_THEME);
    }
    
    lastTime = Date.now()
    main();
}
function characterSelect(game) {

    

    function characterSelectAnim() {
        updateCharacterSelect();
        renderCharacterSelect();
        
        if (game.charactersSelected[0]  && (game.isSinglePlayer || game.charactersSelected[1])) {
            // put up black screen
            $("#fader-overlay").fadeIn(3000, function () {
                newStartGame();
            }
                );
            return;
        }

        animFrame = requestAnimFrame(characterSelectAnim);
    }
    
    // Render intial view and then fade in and start anim loop
    renderCharacterSelect();
    $("#fader-overlay").fadeOut(1500, characterSelectAnim);

}
// Reset game to original state
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    document.getElementById('finish-him').style.display = 'none';
    document.getElementById('finish-him-overlay').style.display = 'none';
    document.getElementById('title-screen').style.display = 'none';

    // put up black screen
    document.getElementById('fader-overlay').style.display = 'block';
    
    game.entities = [];
    FvB.Sound.stopAllSounds();
    game.isSinglePlayer = false;
    game.playerCharacters = [FvB.en_Fartsac, FvB.en_Boogerboy];
    characterSelect(game);
    
}

return {
    startGame: startGame
};

})();