
// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 400;
document.body.appendChild(canvas);

// The main game loop
var lastTime;
var animFrame;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    if (dt > 1.0) { dt = 1.0; }


    if (isGameOver && game.entities.length == 2) {
        //if (game.entities[0].state == FvB.ST_DEAD)
        gameOver();
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

function init() {
    terrainPattern = ctx.createPattern(resources.get('img/background.PNG'), 'no-repeat');

    document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });
    
    reset();
   
}

resources.load([
    'img/background.PNG',
    'img/FARTSAC0.PNG',
    'img/BOOGBOY0.PNG',
    'img/FARTBOOG.PNG',
    'img/EXPLODEY.PNG',
    'img/HUGE.PNG',
    'img/BOOGBLOW.PNG',
    'img/FARTBLOW.PNG',
    'img/DAMAGED.PNG',
    'img/BOOGHEAD.PNG',
    'img/HEADLESS.PNG',
    'img/BUTTHEAD.PNG'
]);
resources.onReady(init);

var game = {

    player1: {},
    player2: {},

    entities: [],

    health: [FvB.MAX_PLAYER_HEALTH, FvB.MAX_PLAYER_HEALTH],

    // Players button states
    buttonState: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
    buttonHeld: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
};

var terrainPattern;
var isGameOver = false;

function drawHealth()
{
    var health = 0;
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

    if (!isGameOver)
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
        //document.getElementById('finish-him-overlay').style.display = 'block';
    }
    //if (game.player1.state == FvB.st_Dead || game.player2.state == FvB.st_Dead
    //    || game.player1.state == FvB.st_FatalityDead || game.player2.state == FvB.st_FatalityDead) {
    if (game.player1.state == FvB.st_Victorious || game.player2.state == FvB.st_Victorious) {
        isGameOver = true;
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
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    // Render Players first
    FvB.Renderer.renderEntity(game.entities[0]);
    FvB.Renderer.renderEntity(game.entities[1]);

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
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;

   
    
}

// Reset game to original state
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    document.getElementById('finish-him').style.display = 'none';
    document.getElementById('finish-him-overlay').style.display = 'none';
    
    game.entities = [];

    game.player1 = FvB.Player.spawnPlayer(game, 1, FvB.en_Boogerboy);
    game.player2 = FvB.Player.spawnPlayer(game, 2, FvB.en_Fartsac);
      
    isGameOver = false;
    lastTime = Date.now()
    main();
};