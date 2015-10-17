
(function() {
    var keys;

    if (!keys) 
        keys = [];

    document.addEventListener('keydown', function(e) {
        keys[e.keyCode] = true;
    });

    document.addEventListener('keyup', function(e) {
        keys[e.keyCode] = false;
    });

    window.addEventListener('blur', function() {
        reset();
    });

    function reset() {
        keys = [];
    }

    window.input = {
        isDown: function(key) {
           
            if (!!keys[FvB.Keys[key]]) {
                return true;
            }
        
            return false;
        },
        checkKey: function (key) {

            if (!!keys[key]) {
                return true;
            }

            return false;
        }

    };
})();

FvB.Keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    HOME: 36,
    END: 35,
    DEL: 46,
    INS: 45,
    PGUP: 33,
    PGDN: 34,
    SLASH: 111,
    MINUS: 109,
    PLUS: 107,
    COMMA: 188,
    PERIOD: 190,
    QUOTE: 222,
    SEMI_COLON: 186,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    0: 58,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123
};