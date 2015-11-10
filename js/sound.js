FvB.Sound = (function () {

    FvB.setConsts({
        // Sound channels
        // Channel 0 never willingly overrides
        // Other channels (1-7) always override a playing sound on that channel
        CHAN_AUTO: 0,
        CHAN_WEAPON: 1,
        CHAN_VOICE: 2,
        CHAN_ITEM: 3,
        CHAN_BODY: 4,
        // Modifier flags
        CHAN_NO_PHS_ADD: 8,	// Send to all clients, not just ones in PHS (ATTN 0 will also do this)
        CHAN_RELIABLE: 16,	// Send by reliable message, not datagram
        // Sound attenuation values
        ATTN_NONE: 0,	// Full volume the entire level
        ATTN_NORM: 1,
        ATTN_IDLE: 2,
        ATTN_STATIC: 3,	    // Diminish very rapidly with distance

        MAX_PLAYSOUNDS: 128,
        MAX_CHANNELS: 64,

        MUSIC_VOLUME: 0.1,
        MASTER_VOLUME: 1.0,

        SFX_PATH: 'sfx'
    });

    var sounds = {},
        audioElements = [],
        currentMusic,
        soundEnabled = true,
        musicEnabled = true,
        music,
        ext,
        exts = ["mp3"/*, "ogg"*/];

    function getFileName(file) {
        if (!ext) {
            // look for a probably
            for (var i = 0; i < exts.length; i++) {
                if (Modernizr.audio[exts[i]] == "probably") {
                    ext = exts[i];
                    break;
                }
            }
            // look for a maybe
            if (!ext) {
                for (var i = 0; i < exts.length; i++) {
                    if (Modernizr.audio[exts[i]] == "maybe") {
                        ext = exts[i];
                        break;
                    }
                }
            }
        }
        return FvB.SFX_PATH + "/" + file.split(".")[0] + "." + ext;
    }

    function createAudioElement() {
        var audio = new Audio();
        audioElements.push(audio);
        return audio;
    }

    function playSound(id) {
        var volume = id == FvB.SFX_FATALITY_FART ? 1 : 0.5;
        startSound(null, null, 1, FvB.CHAN_VOICE, FvB.soundResources[id], volume, FvB.ATTN_NORM, 0);
    }

    function startSound(posPlayer, posSound, entNum, entChannel, file, volume, attenuation, timeOfs) {
        var audio, dx, dy, dist;

        if (!sounds[file]) {
            sounds[file] = [];
        }
        for (var i = 0; i < sounds[file].length; i++) {
            if (sounds[file][i].ended || sounds[file][i].paused) {
                audio = sounds[file][i];
                break;
            }
        }

        if (!audio && sounds[file].length > 15) {
            // too many of the same sound playing
            return;
        }

        if (!audio) {
            audio = createAudioElement();
            audio.src = getFileName(file);
            sounds[file].push(audio);
        } 
           

        audio.volume = volume * FvB.MASTER_VOLUME * (soundEnabled ? 1 : 0);
        audio.play();
    }

    function startMusic(id) {
        if (!music) {
            music = createAudioElement();
            music.loop = true;
        }
        var filename = getFileName(FvB.soundResources[id]);
        if (currentMusic != filename) {
            music.src = currentMusic = filename;
            music.volume = FvB.MUSIC_VOLUME * (musicEnabled ? 1 : 0);
            music.play();
        }
        else {
            music.play();
        }
    }

    function stopAllSounds() {
        for (var i = 0; i < audioElements.length; i++) {
            if (audioElements[i].currentTime > 0) {
                audioElements[i].currentTime = 0;
                audioElements[i].pause();
            }
        }
    }

    function init(soundResources) {
        // Load in all sounds and play them at 0 volume
        
        if (Modernizr.audio) {
            for (i = 0; i < soundResources.length; i++) {
                var file = soundResources[i];

                if (!sounds[file]) {
                    sounds[file] = [];
                }

                audio = createAudioElement();
                audio.src = getFileName(file);
                sounds[file].push(audio);

                audio.volume = 0;
                audio.play();
                audio.pause();
            }
        }       
    }

    function finishedLoading() {
        var finishedLoading = true;

        for (var s in sounds) {
            if (!sounds[s][0].ended && !sounds[s][0].paused) {
                finishedLoading = false;
                break;
            }
        }

        return finishedLoading;
    }

    function isMusicEnabled() {
        return musicEnabled
    }

    function isSoundEnabled() {
        return soundEnabled;
    }

    function toggleMusic(enable) {
        if (typeof enable != "undefined") {
            musicEnabled = enable;
        } else {
            musicEnabled = !musicEnabled;
        }
        if (music) {
            music.volume = FvB.MUSIC_VOLUME * FvB.MASTER_VOLUME * (musicEnabled ? 1 : 0);
        }
    }

    function pauseMusic(enable) {
        if (music) {
            if (enable) {
                music.pause();
            } else if (music.paused) {
                music.play();
            }
        }
    }

    function toggleSound(enable) {
        if (typeof enable != "undefined") {
            soundEnabled = enable;
        } else {
            soundEnabled = !soundEnabled;
        }
    }

    if (Modernizr.audio) {
        return {
            playSound: playSound,
            startSound: startSound,
            startMusic: startMusic,
            stopAllSounds: stopAllSounds,
            isMusicEnabled: isMusicEnabled,
            isSoundEnabled: isSoundEnabled,
            toggleMusic: toggleMusic,
            toggleSound: toggleSound,
            pauseMusic: pauseMusic,
            init: init,
            finishedLoading: finishedLoading
        }
    } else {
        return {
            playSound: FvB.noop,
            startSound: FvB.noop,
            startMusic: FvB.noop,
            stopAllSounds: FvB.noop,
            isMusicEnabled: FvB.noop,
            isSoundEnabled: FvB.noop,
            toggleMusic: FvB.noop,
            toggleSound: FvB.noop,
            pauseMusic: FvB.noop,
            init: FvB.noop,
            finishedLoading: finishedLoading
        }
    }
})();