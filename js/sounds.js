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
        { constant: "SFX_SPLAT", sfx: "splat" }
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