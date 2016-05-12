var Controller = function () {
    function onCast(event) {
        if (event.Name === "Penance") {
            Talents.schism(80);
            Events.Accelerator("Borrowed Time");
            Talents.clearDarkSide();
        }
        var spell = Magic.getSpellByName(event.Name);
        if (spell.Healing > 0 || spell.HoT > 0) {
            Talents.brightestLights();
        }
        Caster.completeCast();
    };

    function onDamage(event) {
        if (event.Name === "Light's Wrath") {
            var atoned = Targets.getAtoned();
            if (atoned > 5) {
                atoned = 5;
            }
            event.Value = event.Value * (atoned.length + 1);
        }
        Abacus.addOutputValues(event);
        Talents.darkestShadows();
        if (event.Name === "Mindbender") {
            Talents.mindbender();
        }
        else if (event.Name === "Smite") {
            Events.Accelerator("Borrowed Time");
        }
        else if (event.Name === "Penance") {
            Talents.purgeCleave(event.Target);
        }
        else if (event.Name === "Power Word: Solace") {
            Talents.solace();
        }
    };

    function onDOT(event) {
        Abacus.addOutputValues(event);
        if (event.Name === "Mindbender") {
            Talents.mindbender();
        } else if (event.Name === "Shadow Word: Pain" || event.Name === "Purge the Wicked") {
            Talents.darkSide();
        }
    };

    function onHealing(event) {
        if (event.Name === "Shadow Mend") {
            if (Talents.tamingShadows()) {
                event.Value = 700;
            }
        }
        if (event.Name === "Power Word: Shield") {
            if (Events.hasEventByName("Chosen by the Light")) {
                event.Value = event.Value * 2;
            }
            Events.Accelerator("Chosen by the Light");
            Talents.shieldDiscipline();
        }
        Abacus.addOutputValues(event);
        if (event.Name === "Shadow Covenant") {
            Talents.shadowCovenant(event.Target);
        }
        Talents.twistOfFate();
    };

    function onAtonement(event) {
        Abacus.unmodifiedOutputValues(event);
    };

    function onHealAbsorb(event) {
        Abacus.unmodifiedOutputValues(event);
    };

    function onProc(event) {
        if (event.Name === "Borrowed Time") {
            Talents.borrowedTimeEffect(true, event.Value);
        }
        if (event.Name === "Darkest Shadows") {
            Caster.setModifier("Damage", "Darkest Shadows", event.Value + 1);
        }
        if (event.Name === "Power of the Dark Side") {
            var spell = Magic.getSpellByName("Penance");
            spell.Damage = 400;
            spell.DoT = 400;
        }
        if (event.Name === "Twist of Fate") {
            Caster.setModifier("Damage", "Twist of Fate", event.Value);
            Caster.setModifier("Healing", "Twist of Fate", event.Value);
        }
    };

    function onProcFade(event) {
        if (event.Name === "Borrowed Time") {
            Talents.borrowedTimeEffect(false, 0);
        }
        if (event.Name === "Power of the Dark Side") {
            var spell = Magic.getSpellByName("Penance");
            spell.Damage = 200;
            spell.DoT = 200;
        } else if (event.Name === "Twist of Fate") {
            Caster.setModifier("Damage", "Twist of Fate", event.Value);
            Caster.setModifier("Healing", "Twist of Fate", event.Value);
        }
    };

    function onEffect(event) {
        if (event.Name === "Atonement") {
            var atonementOverride = Magic.getSpellByName("Plea");
            var target = Targets.getAllyByName(event.Target);
            Events.Overrider(target, atonementOverride);
            Targets.affectTarget(target.Name, [event.Name, event.Value]);

            Events.Scrubber("Borrowed Time");
            Talents.borrowedTime();
            Talents.sinsOfTheMany();
        }
    };

    function onEffectFade(event) {
        if (event.Name === "Atonement") {
            Talents.sinsOfTheMany();
        }
    };

    function onCooldown(event) {
        if (event.Name === "Rapture") {
            var spell = Magic.getSpellByName("Power Word: Shield");
            spell.Cooldown = event.Value;
            Talents.chosenByTheLight();
        } else if (event.Name === "Power Infusion") {
            Caster.setModifier("Haste", "Power Infusion", event.Value);
        }
    };

    function onCooldownFade(event) {
        if (event.Name === "Rapture") {
            var spell = Magic.getSpellByName("Power Word: Shield");
            spell.Cooldown = event.Value;
        } else if (event.Name === "Power Infusion") {
            Caster.setModifier("Haste", "Power Infusion", event.Value);
        }
    };

    return {
        switchboard: function (event) {
            var tag = event.Tag;
            switch (tag) {
                case "damage":
                    onDamage(event);
                    break;
                case "tick":
                    onDOT(event);
                    break;
                case "healing":
                    onHealing(event);
                    break;
                case "htick":
                    onHealing(event);
                    break;
                case "atonement":
                    onAtonement(event);
                    break;
                case "heal absorb":
                    onHealAbsorb(event);
                    break;
                case "proc":
                    onProc(event);
                    break;
                case "proc fade":
                    onProcFade(event);
                    break;
                case "effect":
                    onEffect(event);
                    break;
                case "effect fade":
                    onEffectFade(event);
                    break;
                case "cooldown":
                    onCooldown(event);
                    break;
                case "cooldown fade":
                    onCooldownFade(event);
                    break;
                case "cast":
                    onCast(event);
                    break;
                default:
                    break;
            }
        }
    };
}();