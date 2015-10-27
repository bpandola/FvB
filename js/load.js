(function ($) {

    $(document).ready(function () {

        FvB.Renderer.init();

        var progress = $("<div>");

        progress.addClass("load-progress").appendTo("#title-screen");
        $("#title-screen").show();
       
        // Entering callback hell...
        loadGraphics();

        function loadGraphics() {
            progress.text("Loading graphics");
            FvB.Sprites.init();

            var checkGfx = setInterval(function () {
                progress.text(progress.text() + ".");
                if (!FvB.Sprites.isReady())
                    return;

                clearInterval(checkGfx);
                loadSounds();

            }, 1000);
        }

        function loadSounds() {
            progress.text("Loading sounds");
            FvB.Sound.init(FvB.soundResources);

            var checkSounds = setInterval(function () {
                progress.text(progress.text() + ".");
                if (!FvB.Sound.finishedLoading())
                    return;

                clearInterval(checkSounds);
                finishedLoading();

            }, 1000);
        }
        
        function finishedLoading() {
            progress.text("Ready.  Click anywhere to run.");
            document.getElementById('title-screen').addEventListener('click', function () {

                document.getElementById('title-screen').style.cursor = "none";

                $("#title-screen").fadeOut(1500, function () {
                    //Wolf.Input.init();
                    //Wolf.Game.init();
                    //Wolf.Menu.show();
                    //FvB.Renderer.init();
                    
                    FvB.Game.startGame();
                });
            });
        }
       
    });

})(jQuery);