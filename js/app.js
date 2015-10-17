
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

    update(dt);
    render();

    lastTime = now;
    animFrame = requestAnimFrame(main);
};

function init() {
    terrainPattern = ctx.createPattern(resources.get('img/background.png'), 'no-repeat');

    document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });

    reset();
   
}

resources.load([
    'img/background.png',
    'img/FARTSAC0.PNG',
    'img/BOOGBOY0.PNG',
    'img/FARTBOOG.PNG',
    'img/EXPLODEY.PNG',
    'img/HUGE.PNG'
]);
resources.onReady(init);

var game = {

    entities: [],

    // Players button states
    buttonState: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
    buttonHeld: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
};

var terrainPattern;
var isGameOver = false;

function drawHealth()
{
    var health = 0;
    // Player 1
    health = game.entities[0].health - FvB.MAX_PLAYER_HEALTH;
    if (health < 0) {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(20, 46, Math.abs(health), 26);
    }

    // Player 2
    health = game.entities[1].health - FvB.MAX_PLAYER_HEALTH;
    if (health < 0) {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(622 - Math.abs(health), 46, Math.abs(health), 26);
    }
       
}
// Update game objects
function update(dt) {

    PollControls();

    updateEntities(dt);

    if (game.entities[0].health == 0 || game.entities[1].health == 0) {
        gameOver();
    }

}

function PollControls() {
    // Init these in game state
    var playerButtons = [
        [FvB.Keys.F, FvB.Keys.H, FvB.Keys.T, FvB.Keys.G, FvB.Keys.W, FvB.Keys.Q],
        [FvB.Keys.LEFT, FvB.Keys.RIGHT, FvB.Keys.UP, FvB.Keys.DOWN, FvB.Keys.QUOTE, FvB.Keys.SEMI_COLON]];

    // copy previous state to held array
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 6; j++) {
            game.buttonHeld[i][j] = game.buttonState[i][j];
        }
    }

    // Get new button states for players
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 6; j++) {
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

        if (e.state != FvB.st_remove)
            FvB.Renderer.renderEntity(game.entities[i]);
    }
    
    // Hack!: clear out removed entities
    for (i = 0; i < game.entities.length; i++) {
        var e = game.entities[i];

        if (e.state == FvB.st_remove) {
            game.entities.splice(i, 1);
            i--;

        }
    }

    drawHealth();
};


// Game over
function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;

    setTimeout(function () {
        cancelRequestAnimFrame(animFrame);
    }, 1 * 1000);
}

// Reset game to original state
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';

    
    game.entities = [];

    var player1 = FvB.Player.spawnPlayer(game, 1, FvB.BOOGERBOY);
    var player2 = FvB.Player.spawnPlayer(game, 2, FvB.FARTSAC);
      
    isGameOver = false;
    lastTime = Date.now()
    main();
};