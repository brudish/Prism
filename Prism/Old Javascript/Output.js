var debug = PrismSheet.getRange("C7").getValue();

var Output = function () {
    function debugEventMessages(type) {
        if (type != "cast" && type != "start" && type != "effect" && type != "effect fade" && type != "proc" && type != "proc fade" && type != "atonement" || debug) {
            return true;
        }
        else {
            return false;
        }
    };

    var output = [];

    return {
        row: function (event) {
            var time = Math.round(Timers.getClock() * 100) / 100;
            var message = event.Message;
            var value = Math.round(event.Value * 100) / 100;
            var target = event.Target;
            var damage = Math.round(Caster.getDamage() * 100) / 100;
            var healing = Math.round(Caster.getHealing() * 100) / 100;
            var mana = Math.round(Caster.getMana() * 100) / 100;
            var HPS = Math.round((Caster.getHealing() * 80) / Timers.getClock());
            var DPS = Math.round((Caster.getDamage() * 80) / Timers.getClock());
            if (!HPS || HPS === Infinity) {
                HPS = 0;
            }
            if (!DPS || DPS === Infinity) {
                DPS = 0;
            }

            if (debugEventMessages(event.Tag)) {
                output.push([time, message, value, target, damage, DPS, healing, HPS, mana]);
                currentRow++;
            }
        },
        output: function () {
            return output;
        }
    };
}();
