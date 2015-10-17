FvB.Renderer = (function () {

    function renderEntity(e) {
        var sheet = FvB.Sprites.getTexture(FvB.objstate[e.type][e.state].texture),
            offset = FvB.objstate[e.type][e.state].rotate ? e.dir : 0;
        offset = offset + e.frames[e.frame];
        ctx.save();
        ctx.translate(e.x, e.y);
        var resource = resources.get('img/' + sheet.sheet);
        ctx.drawImage(resource,
                              (sheet.idx + offset) * sheet.size, 0,
                              sheet.size, sheet.size,
                              0, 0,
                              sheet.size, sheet.size);
        ctx.restore();

    }

    return {
        renderEntity: renderEntity
    };

})();