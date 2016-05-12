var Timers = function () {
    var clock = 0.0;
    var limit = PrismSheet.getRange("B3").getValue();
    var activeCooldowns = [];

    function cyclone() {
        var cycleArray = [];
        cycleArray.push(activeCooldowns);
        var allies = Targets.getAllies();
        var enemies = Targets.getEnemies();
        for (var ally in allies) {
            cycleArray.push(allies[ally].Effects);
        }
        for (var enemy in enemies) {
            cycleArray.push(enemies[enemy].Effects);
        }
        return cycleArray;
    };

    function cycle(time) {
        var cycleArray = cyclone();
        for (var c = 0; c < cycleArray.length; c++) {
            var innerArray = cycleArray[c];
            if (innerArray.length > 0) {
                for (var i = innerArray.length - 1; i >= 0; i--) {
                    if (innerArray[i][1] > 0) {
                        innerArray[i][1] -= time;
                    }
                    if (innerArray[i][1] <= 0) {
                        innerArray.splice(i, 1);
                    }
                }
            }
        }
    };
    return {
        //Used to keep the main loop operating
        isRunning: function () {
            return clock < limit;
        },
        cycleTimers: function (time) {
            clock += time;
            cycle(time);
        },
        getClock: function () {
            return clock;
        },
        //Takes spell string name and number cooldown
        initiateCooldown: function (name, cooldown) {
            if (cooldown > 0) {
                activeCooldowns.push([name, cooldown]);
            }
        },
        //Takes spell string name
        isSpellOnCooldown: function (name) {
            if (activeCooldowns.length > 0) {
                for (var i = 0; i < activeCooldowns.length; i++) {
                    if (activeCooldowns[i][0] == name) {
                        return true;
                    }
                }
            }
            return false;
        },
        resetCooldown: function (name) {
            if (activeCooldowns.length > 0) {
                for (var i = 0; i < activeCooldowns.length; i++) {
                    if (activeCooldowns[i][0] == name) {
                        activeCooldowns.splice(i, 1);
                    }
                }
            }
        }
    };
}();

