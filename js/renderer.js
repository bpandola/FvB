﻿FvB.Renderer = (function () {

    var ctx;

    function init(canvasElement) {
        ctx = canvasElement;
    }

    function renderEntity(e) {
        var sheet = FvB.Sprites.getSheet(FvB.objstate[e.type][e.state].texture + e.frames[e.frame]),
            offset = FvB.objstate[e.type][e.state].rotate ? e.dir : 0;
       
        ctx.save();
        ctx.translate(e.x, e.y);
        var resource = FvB.Sprites.getTexture(FvB.objstate[e.type][e.state].texture + e.frames[e.frame]);
        ctx.drawImage(resource,
                              (sheet.idx + offset) * sheet.size, 0,
                              sheet.size, sheet.size,
                              0, 0,
                              sheet.size, sheet.size);
        ctx.restore();
        
    }

    function renderSprite(e) {
        var sheet = FvB.Sprites.getSheet(e.sprite);

        ctx.save();
        ctx.translate(e.x, e.y);
        var resource = FvB.Sprites.getTexture(e.sprite);
        ctx.drawImage(resource,
                              sheet.idx * sheet.size, 0,
                              sheet.size, sheet.size,
                              0, 0,
                              sheet.size, sheet.size);
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
        renderEntity: renderEntity,
        renderSprite: renderSprite,
        renderPrimitive: renderPrimitive
    };

})();