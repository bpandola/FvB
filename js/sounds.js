(function () {
    
    // sfx = sound file without the extension
    var sfxMappings = [
        { constant: "SFX_DAMAGE_SCREAM", sfx: "025" },
        { constant: "SFX_HUGE_BOOGER", sfx: "booger" },
        { constant: "SFX_HUGE_EXPLOSION", sfx: "explodey" },
        { constant: "SFX_HUGE_FARTBALL", sfx: "fartball" },
        { constant: "SFX_NOSE_BLOW", sfx: "hugebooger" },
        { constant: "SFX_FATALITY_FART", sfx: "hugefart" },
        { constant: "SFX_SLURP", sfx: "slurp" },
        { constant: "SFX_BULLET", sfx: "smallexplodey" },
        { constant: "SFX_SPLAT", sfx: "splat" },
        { constant: "SFX_RYU_THEME", sfx: "ryu-theme" },
        { constant: "SFX_SELECT_CHARACTER", sfx: "select_character" },
        { constant: "SFX_CHOOSE_CHARACTER", sfx: "choose_character" },
        { constant: "SFX_ROUND1", sfx: "round1" },
        { constant: "SFX_ROUND2", sfx: "round2" },
        { constant: "SFX_ROUND3", sfx: "round3" },
        { constant: "SFX_FIGHT", sfx: "fight" },
        { constant: "SFX_CHARACTER_SELECT_MUSIC", sfx: "Street Fighter II Arcade Music - Character Select - CPS1" },
         { constant: "SFX_FARTSAC_THEME", sfx: "Street Fighter II Arcade Music - Ken Stage - CPS1" },
    { constant: "SFX_BOOGERBOY_THEME", sfx: "Street Fighter II Arcade Music - Guile Stage - CPS1" },
    { constant: "SFX_TITLE_THEME", sfx: "Street Fighter II Arcade Music - Opening Theme - CPS1" }
    ];

    var soundConsts = {};
    for (var i = 0, n = sfxMappings.length; i < n; i++) {
        soundConsts[sfxMappings[i].constant] = sfxMappings[i].sfx;
    }
    FvB.setConsts(soundConsts);

    var soundResources = [];
    for (var i = 0, n = sfxMappings.length; i < n; i++) {
        soundResources[i] = sfxMappings[i].sfx;
    }    
    FvB.setConsts({ soundResources: soundResources });

})();