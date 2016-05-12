//The Caster Class, whose function is to track stats associated with the caster.

var Caster = function () {
    var mastery = PrismSheet.getRange("B4").getValue();
    var healingDone = 0;
    var damageDone = 0;
    var manaSpent = 0;
    var casting = false;

    var mods = {
        "Haste": { "Base": 1 },
        "Crit": { "Base": 0.00 },
        "Healing": { "Base": 1 },
        "Damage": { "Base": 1 }
    };

    function spendMana(amount) {
        if (Events.hasEventByName("Power Infusion")) {
            amount *= 0.75;
        }
        manaSpent += amount;
    };

    return {
        //PARSER
        //*Any time Atonement comes into play
        getMastery: function () {
            return mastery;
        },
        InitCaster: function () {
            var charHaste = PrismSheet.getRange("B6").getValue();
            var charCrit = PrismSheet.getRange("B5").getValue();
            mods["Haste"]["Character"] = 1 + charHaste;
            mods["Crit"]["Character"] = charCrit;
        },
        //Applies on damage events
        applyModifier: function (mod, value) {
            switch (mod) {
                case "Damage":
                case "Healing":
                    for (var bonus in mods[mod]) {
                        value *= mods[mod][bonus];
                    }
                    return value;
                    break;
                case "Crit":
                    var critChance = 0;
                    for (var bonus in mods[mod]) {
                        critChance += mods[mod][bonus];
                    }
                    var critRoll = Math.random();
                    if (critRoll < critChance) {
                        value *= 2;
                    }
                    return value;
                    break;
                case "Haste":
                    var haste = mods[mod]["Base"];
                    for (var bonus in mods[mod]) {
                        haste *= mods[mod][bonus];
                    }
                    return Math.round((value / haste) * 10000) / 10000;
                    break;
                default:
                    return value;
                    break;
            }
        },

        setModifier: function (mod, name, amount) {
            mods[mod][name] = amount;
        },

        //*Should already be calculated
        updateOutput: function (output, outputType) {
            switch (outputType) {
                case "healing":
                case "htick":
                    healingDone += output;
                    break;
                case "damage":
                case "tick":
                    damageDone += output;
            }
        },
        refundMana: function (amount) {
            manaSpent -= amount;
            if (manaSpent < 0) {
                manaSpent = 0;
            }
        },
        isCasting: function () {
            return casting;
        },
        completeCast: function () {
            casting = false;
        },
        //--PARSER

        //TALENTS
        //Added once it has been discerned that it's available.
        addModifier: function (mod, name) {
            mods[mod][name] = mods[mod]["Base"];
        },
        //--TALENTS

        //OUTPUT
        getMana: function () {
            return manaSpent;
        },
        getHealing: function () {
            return Math.round(healingDone * 100) / 100;
        },
        getDamage: function () {
            return Math.round(damageDone * 100) / 100;
        },
        //--OUTPUT  

        //MAIN
        castSpell: function (spell) {
            var spellList = Priority.generatePriorityList();

            for (var i = 0; i < spellList.length; i++) {
                var spell = Magic.getSpellByName(spellList[i]);

                if (spell.Locked || Timers.isSpellOnCooldown(spell.Name) || !Priority.isSpellPriority(spell.Name)) { continue; }
                if (spell.Atones && !Priority.isAtonementNeeded()) { continue; }

                //If a spell -is- a cooldown (as in, not a healing/damage spell) then it parses out differently
                if (Magic.isSpellCooldown(spell)) {
                    Parser.parseCooldownEvents(spell);
                    Timers.initiateCooldown(spell.Name, spell.Cooldown);
                } else {
                    var targets = Targets.getValidTargets(spell);
                    if (targets.length > 0) {
                        var eventTiming = Parser.parseSpellCastEvents(targets[0], spell);
                        for (var j = 0; j < targets.length; j++) {
                            Events.Overrider(targets[j], spell);
                            Parser.parseSpellEvents(targets[j], spell, eventTiming);
                            Timers.initiateCooldown(spell.Name, spell.Cooldown);
                        }
                        spendMana(spell.Cost);
                        Events.SortEvents();
                        casting = true;
                        break;
                    }
                }
            }
        }
        //--MAIN
    };
}();
