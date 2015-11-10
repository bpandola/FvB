FvB.Renderer = (function () {

    // Sprite Render Constants
    // 
    FvB.setConsts({
        SCREENWIDTH: 640,
        SCREENHEIGHT: 400,

        R_X_ALIGN_CENTER: 1,
        R_Y_ALIGN_CENTER: 2,
        R_X_ALIGN_LEFT : 4,
        R_Y_ALIGN_TOP: 8,
        R_X_ALIGN_RIGHT: 16,
        R_Y_ALIGN_BOTTOM: 32,
        // Combinations
        R_ALIGN_CENTER: 1 | 2,
        R_ALIGN_TOP_LEFT: 4|8
    });

    var width = FvB.SCREENWIDTH,
        height = FvB.SCREENHEIGHT,
        canvas = null,
        ctx = null,
            RATIO = null,
            scale = 1,
    currentWidth=  null,
    currentHeight= null;

    function resize() {

        currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        currentWidth = currentHeight * RATIO;

        // set the new canvas style width & height plus the fader overlay
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        var faderOverlay = document.getElementById('fader-overlay'),
            titleScreen = document.getElementById('intro-screen');
        canvas.style.width = titleScreen.style.width = faderOverlay.style.width = currentWidth + 'px';
        canvas.style.height = titleScreen.style.height =faderOverlay.style.height = currentHeight + 'px';

        

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        scale = currentWidth / width;
        // position of canvas in relation to
        // the screen
    }

    function init() {
        canvas = document.getElementsByTagName('canvas')[0];
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        RATIO = width / height;
        
        // these will change when the screen is resize
        currentWidth = width;
        currentHeight = height;

        resize();
        window.addEventListener('resize', FvB.Renderer.resize, false);
    }

    function getContext() {
        return ctx;
    }

    function clearScreen(bgColor) {

        if (bgColor == null)
            bgColor = "#000000";

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function renderEntity(entity) {
        var sprite = FvB.Sprites.getSprite(entity.sprite),
           offset = entity.flip ? entity.dir : 0;

        ctx.save();
        ctx.translate(Math.floor(entity.x), Math.floor(entity.y));
        var img = FvB.Sprites.getTexture(entity.sprite);
        ctx.drawImage(img,
                              sprite.xOffset, sprite.yOffset + (offset * sprite.height),
                              sprite.width, sprite.height,
                              -sprite.width / 2, -sprite.height,
                              sprite.width, sprite.height);

        //ctx.beginPath();
        //ctx.strokeStyle = "red";
        //ctx.rect(entity.hitBox.x1, entity.hitBox.y1, entity.hitBox.x2 - entity.hitBox.x1, entity.hitBox.y2 - entity.hitBox.y1);
        //ctx.stroke();

        ctx.restore();
    }

    // Render sprite on the canvas
    // The default flags are R_X_ALIGN_LEFT | R_Y_ALIGN_TOP
    function renderSprite(id, x, y, renderFlags) {

        renderFlags = renderFlags || FvB.R_ALIGN_TOP_LEFT;

        var sprite = FvB.Sprites.getSprite(id),
            renderX, renderY;
        
        if ((renderFlags & FvB.R_X_ALIGN_RIGHT) == FvB.R_X_ALIGN_RIGHT) {
            renderX = x - sprite.width;
        } else if ((renderFlags & FvB.R_X_ALIGN_CENTER) == FvB.R_X_ALIGN_CENTER) {
            renderX = x - sprite.width/2;
        } else {
            renderX = x;
        }

        if ((renderFlags & FvB.R_Y_ALIGN_BOTTOM) == FvB.R_Y_ALIGN_BOTTOM) {
            renderY = y - sprite.height;
        } else if ((renderFlags & FvB.R_Y_ALIGN_CENTER) == FvB.R_Y_ALIGN_CENTER) {
            renderY = y - sprite.height / 2;
        } else {
            renderY = y;
        }

        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.drawImage(FvB.Sprites.getTexture(id),
                              sprite.xOffset, sprite.yOffset,
                              sprite.width, sprite.height,
                              0, 0,
                              sprite.width, sprite.height);
        ctx.restore();
    }

    function renderPrimitive(e) {

        // Only line supported at the moment
        ctx.save();
        if (e.objClass == FvB.ob_Line) {
            ctx.beginPath();
            ctx.moveTo(e.temp2.x1, e.temp2.y1);
            ctx.lineTo(e.temp2.x2, e.temp2.y2);
            ctx.strokeStyle = e.temp2.color; 
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.restore();
    }

    return {
        init: init,
        resize: resize,
        getContext: getContext,
        clearScreen: clearScreen,
        renderEntity: renderEntity,
        renderSprite: renderSprite,
        renderPrimitive: renderPrimitive
    };

})();