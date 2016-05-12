var Abacus = function () {
    function addValues(event) {
        var tag = event.Tag;
        var modifier = "";
        if (event.Target.indexOf("enemy") === 0) {
            modifier = "Damage";
        } else if (event.Target.indexOf("ally") === 0) {
            modifier = "Healing";
        }
        event.Value = Caster.applyModifier(modifier, event.Value);
        event.Value = Caster.applyModifier("Crit", event.Value);
        if (event.Name === "Power Word: Shield") {
            event.Value = Talents.shareInTheLight(event.Target, event.Value);
        }
        Targets.addValue(event.Target, event.Value);
        Caster.updateOutput(event.Value, event.Tag);
        if (modifier === "Damage") {
            Talents.atonementHealing(event.Value);
        }
    };

    function strangeValues(event) {
        var tag = event.Tag;
        Targets.addValue(event.Target, event.Value);
        Caster.updateOutput(event.Value, "healing");
    };

    return {
        addOutputValues: function (event) {
            addValues(event);
        },
        unmodifiedOutputValues: function (event) {
            strangeValues(event);
        }
    };
}();