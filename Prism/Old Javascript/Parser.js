//The Parser Class is a big one. It parses the arguments it receives and constructs proper events
//from them. Also parses through events to call procs and such.

var Parser = function () {
    //Event object: an event has a...
    //  str Name, for its root spell
    //  str Message, for logging and output
    //  int Fire, for when the event fires
    //  str Tag, for type checking
    //  int Timestamp, for sorting
    //  str Target, for tracking targets
    //  int Value, for display and tracking
    //Generating a timestamp (for sorting) like that is a super janky method and I'd like to do it better somehow
    //Basically I'm using bits.
    //The better way to do it would be to simply make a start timestamp and an end timestamp, where they are sorted into groups by their end and then their start

    var TIMESTAMP_MODS = {
        "ONE": 0.01,
        "TWO": 0.001,
        "THREE": 0.0001,
        "FOUR": 0.00001,
        "FIVE": 0.000001,
        "SIX": 0.0000001
    };

    function parseCastingEvents(target, spell) {
        var startEvent = {};
        startEvent.Name = spell.Name;
        startEvent.Message = spell.Name + " cast start";
        startEvent.Fire = 0;
        startEvent.Tag = "start";
        startEvent.Timestamp = timestamp(startEvent.Fire, TIMESTAMP_MODS.SIX);
        startEvent.Target = target.Name;
        startEvent.Value = 0;

        Events.addEvent(startEvent);
        var eventTiming = 0;
        var castTiming = spell.Cast;
        if (Magic.isInstant(spell)) {
            //Penance locks the caster in until it's done casting, which is the "duration" of the DoT
            if (spell.Name == "Penance") {
                castTiming = spell.Duration;
            }
        }
        else {
            castTiming = spell.Cast;
            eventTiming = spell.Cast;
        }
        castTiming = Caster.applyModifier("Haste", castTiming);
        eventTiming = Caster.applyModifier("Haste", eventTiming);
        var castEvent = {};
        castEvent.Name = spell.Name;
        castEvent.Message = spell.Name + " cast complete";
        castEvent.Fire = castTiming;
        castEvent.Tag = "cast";
        castEvent.Timestamp = timestamp(castEvent.Fire, TIMESTAMP_MODS.TWO);
        castEvent.Target = target.Name;
        castEvent.Value = 0;

        Events.addEvent(castEvent);
        return eventTiming;
    };

    //Sub-parses for spells
    function parseDamageEvent(target, spell, eventTiming) {
        if (Magic.isDamage(spell) && Targets.getEnemyByName(target.Name) !== undefined) {
            var damageEvent = {};
            damageEvent.Name = spell.Name;
            damageEvent.Message = spell.Name + " damage";
            damageEvent.Fire = eventTiming;
            damageEvent.Tag = "damage";
            damageEvent.Timestamp = timestamp(damageEvent.Fire, TIMESTAMP_MODS.THREE);
            damageEvent.Target = target.Name;
            damageEvent.Value = spell.Damage;
            Events.addEvent(damageEvent);
        }
    };
    function parseHealingEvent(target, spell, eventTiming) {
        if (Magic.isHealing(spell) && Targets.getAllyByName(target.Name) !== undefined) {
            var healing = spell.Healing;
            if (Targets.hasTargetEffect(target, "Atonement") && Talents.getClassTalent("Grace").Selected) {
                healing *= 1.3;
            }
            var healingEvent = {};
            healingEvent.Name = spell.Name;
            healingEvent.Message = spell.Name + " healing";
            healingEvent.Fire = eventTiming;
            healingEvent.Tag = "healing";
            healingEvent.Timestamp = timestamp(healingEvent.Fire, TIMESTAMP_MODS.THREE);
            healingEvent.Target = target.Name;
            healingEvent.Value = healing;
            Events.addEvent(healingEvent);
        }
    };
    function parseDoTEvents(target, spell) {
        if (Magic.isDoT(spell)) {
            var inc = Caster.applyModifier("Haste", spell.Period);
            var limit = spell.Duration;
            if (spell.Name === "Penance") {
                limit = Caster.applyModifier("Haste", spell.Duration);
            }
            for (var i = inc; i <= limit; i += inc) {
                var dotEvent = {};
                dotEvent.Name = spell.Name;
                dotEvent.Message = spell.Name + " - DoT";
                dotEvent.Fire = i;
                dotEvent.Tag = "tick";
                dotEvent.Timestamp = timestamp(dotEvent.Fire, TIMESTAMP_MODS.FOUR);
                dotEvent.Target = target.Name;
                dotEvent.Value = spell.DoT;
                Events.addEvent(dotEvent);
            }
            //Handles any partial DoT ticks
            if ((spell.Duration % inc > 0) && spell.Name !== "Penance" && spell.Name !== "Shadowfiend" && spell.Name !== "Mindbender") {
                var dotEvent = {};
                dotEvent.Name = spell.Name;
                dotEvent.Message = spell.Name + " - DoT - Partial";
                dotEvent.Fire = spell.Duration;
                dotEvent.Tag = "tick";
                dotEvent.Timestamp = timestamp(dotEvent.Fire, TIMESTAMP_MODS.FOUR);
                dotEvent.Target = target.Name;
                dotEvent.Value = Math.round((spell.DoT * ((spell.Duration % inc) / spell.Period)) * 1000) / 1000;
                Events.addEvent(dotEvent);
            }
        }
    };
    function parseHoTEvents(target, spell) {
        if (Magic.isHoT(spell)) {
            var inc = Caster.applyModifier("Haste", spell.Period);
            var limit = spell.Duration;
            if (spell.Name === "Penance") {
                limit = inc * 2;
            }
            for (var i = inc; i <= limit; i += inc) {
                var hotEvent = {};
                hotEvent.Name = spell.Name;
                hotEvent.Message = spell.Name + " - HoT";
                hotEvent.Fire = i;
                hotEvent.Tag = "htick";
                hotEvent.Timestamp = timestamp(hotEvent.Fire, TIMESTAMP_MODS.FOUR);
                hotEvent.Target = target.Name;
                hotEvent.Value = spell.HoT;
                Events.addEvent(hotEvent);
            }
            //No partial HoT ticks because the only HoT in the arsenal is Penance.
        }
    };

    //Parsing for Effect objects
    function parseEffectEvents(target, effectName, time) {
        //SUPER JANK
        var radiance = false;
        if (effectName === "Radiance") {
            effectName = "Atonement";
            radiance = true;
        }
        //--SUPER JANK
        var effect;
        effect = Magic.getEffectByName(effectName);
        if (effect === undefined) {
            return false;
        }
        switch (effect.Name) {
            case "Power Word: Barrier":
            case "Pain Suppression":
                Targets.affectTarget(target.Name, [effect.Name, effect.Duration]);
                break;
            case "Shadow Word: Pain":
            case "Purge the Wicked":
            case "Shadowfiend":
            case "Mindbender":
                Targets.affectTarget(target.Name, [effect.Name, effect.Duration]);
                break;
            case "Penance":
                var cast = Caster.applyModifier("Haste", effect.Duration);
                Targets.affectTarget(target.Name, [effect.Name, cast]);
                break;
            default:
                break;
        }
        var eventTiming = effect.Duration;
        if (radiance) {
            eventTiming = effect.Duration / 2;
        }
        if (effect.Name === "Penance") {
            eventTiming = Caster.applyModifier("Haste", eventTiming);
        }
        var effectStartEvent = {};
        effectStartEvent.Name = effect.Name;
        effectStartEvent.Message = effect.Name + " applied";
        effectStartEvent.Fire = time;
        effectStartEvent.Tag = "effect";
        effectStartEvent.Timestamp = timestamp(effectStartEvent.Fire, TIMESTAMP_MODS.TWO);
        effectStartEvent.Target = target.Name;
        effectStartEvent.Value = eventTiming;
        Events.addImmediateEvent(effectStartEvent);

        var effectEndEvent = {};
        effectEndEvent.Name = effect.Name;
        effectEndEvent.Message = effect.Name + " lost";
        effectEndEvent.Fire = eventTiming + time;
        effectEndEvent.Tag = "effect fade";
        effectEndEvent.Timestamp = timestamp(effectEndEvent.Fire, TIMESTAMP_MODS.SIX);
        effectEndEvent.Target = target.Name;
        effectEndEvent.Value = 0;
        Events.addEvent(effectEndEvent);
    };

    function parseCooldown(spell) {
        var cooldown = Magic.getEffectByName(spell.Name);
        var cooldownStartEvent = {};
        cooldownStartEvent.Name = cooldown.Name;
        cooldownStartEvent.Tag = "cooldown";
        cooldownStartEvent.Target = "none";
        cooldownStartEvent.Message = cooldown.Name + " cooldown";
        cooldownStartEvent.Fire = 0;
        cooldownStartEvent.Timestamp = timestamp(cooldownStartEvent.Fire, TIMESTAMP_MODS.SIX);
        cooldownStartEvent.Value = cooldown.Effect;
        Events.addImmediateEvent(cooldownStartEvent);

        var cooldownEndEvent = {};
        cooldownEndEvent.Name = cooldown.Name;
        cooldownEndEvent.Tag = "cooldown fade";
        cooldownEndEvent.Target = "none";
        cooldownEndEvent.Message = cooldown.Name + " end";
        cooldownEndEvent.Fire = cooldown.Duration;
        cooldownEndEvent.Timestamp = timestamp(cooldownEndEvent.Fire, TIMESTAMP_MODS.ONE);
        cooldownEndEvent.Value = cooldown.Base;
        Events.addEvent(cooldownEndEvent);
    };

    function parseAtonement(target, value) {
        var healingEvent = {};
        healingEvent.Name = "Atone";
        healingEvent.Message = "Atonement conversion";
        healingEvent.Fire = 0;
        healingEvent.Tag = "atonement";
        healingEvent.Timestamp = timestamp(healingEvent.Fire, TIMESTAMP_MODS.SIX);
        healingEvent.Target = target.Name;
        healingEvent.Value = value;
        Events.addImmediateEvent(healingEvent);
    };

    function parseBorrowedTime(target, value) {
        var existing = Events.getEventsByName("Borrowed Time");
        if (existing > 0) {
            Events.Scrubber("Borrowed Time");
        }
        var procStartEvent = {};
        procStartEvent.Name = "Borrowed Time";
        procStartEvent.Tag = "proc";
        procStartEvent.Target = target;
        procStartEvent.Message = "Borrowed Time proc";
        procStartEvent.Fire = 0;
        procStartEvent.Timestamp = timestamp(procStartEvent.Fire, TIMESTAMP_MODS.ONE);
        procStartEvent.Value = value;
        Events.addImmediateEvent(procStartEvent);

        var procEndEvent = {};
        procEndEvent.Name = "Borrowed Time";
        procEndEvent.Tag = "proc fade";
        procEndEvent.Target = target;
        procEndEvent.Message = "Borrowed Time fade";
        procEndEvent.Fire = 15;
        procEndEvent.Timestamp = timestamp(procEndEvent.Fire, TIMESTAMP_MODS.ONE);
        procEndEvent.Value = 1;
        Events.addEvent(procEndEvent);
        Events.SortEvents();
    };

    function parseBrightestLights(target, value) {
        var healing = value;
        if (Targets.hasTargetEffect(target, "Atonement") && Talents.getClassTalent("Grace").Selected) {
            healing *= 1.3;
        }
        var healingEvent = {};
        healingEvent.Name = "Brightest Lights";
        healingEvent.Message = "Brightest Lights healing";
        healingEvent.Fire = 0;
        healingEvent.Tag = "healing";
        healingEvent.Timestamp = timestamp(healingEvent.Fire, TIMESTAMP_MODS.ONE);
        healingEvent.Target = target.Name;
        healingEvent.Value = healing;
        Events.addImmediateEvent(healingEvent);
    };

    function parseChosenByTheLight() {
        var procStartEvent = {};
        procStartEvent.Name = "Chosen by the Light";
        procStartEvent.Tag = "proc";
        procStartEvent.Target = "none";
        procStartEvent.Message = "Chosen by the Light proc";
        procStartEvent.Fire = 0;
        procStartEvent.Timestamp = timestamp(procStartEvent.Fire, TIMESTAMP_MODS.ONE);
        procStartEvent.Value = 0;
        Events.addEvent(procStartEvent);

        var procEndEvent = {};
        procEndEvent.Name = "Chosen by the Light";
        procEndEvent.Tag = "proc fade";
        procEndEvent.Target = "none";
        procEndEvent.Message = "Chosen by the Light end";
        procEndEvent.Fire = 10;
        procEndEvent.Timestamp = timestamp(procEndEvent.Fire, TIMESTAMP_MODS.ONE);
        procEndEvent.Value = 0;
        Events.addEvent(procEndEvent);
        Events.SortEvents();
    };

    function parseDarkestShadows(target, value) {
        for (var i = 1; i < 12; i++) {
            var mod = value;
            var procEvent = {};
            procEvent.Name = "Darkest Shadows";
            procEvent.Tag = "proc";
            procEvent.Target = target;
            if (i === 1) {
                procEvent.Message = "Darkest Shadows proc";
                procEvent.Fire = 0;
                procEvent.Timestamp = timestamp(procEvent.Fire, TIMESTAMP_MODS.ONE);
                procEvent.Value = i * mod;
                Events.addImmediateEvent(procEvent);
            }
            else if (i === 11) {
                procEvent.Message = "Darkest Shadows final";
                procEvent.Fire = 10;
                procEvent.Timestamp = timestamp(procEvent.Fire, TIMESTAMP_MODS.ONE);
                procEvent.Value = 0;
                Events.addEvent(procEvent);
            }
            else {
                procEvent.Message = "Darkest Shadows update";
                procEvent.Fire = i - 1;
                procEvent.Timestamp = timestamp(procEvent.Fire, TIMESTAMP_MODS.SIX);
                procEvent.Value = i * mod;
                Events.addEvent(procEvent);
            }
        }
        Events.SortEvents();
    };

    function parseDarkSide(target, value) {
        var procFire = 0;
        //If we're already in the middle of casting Penance, push the Dark Side proc to the end of the cast so they don't overlap
        if (Events.hasEventByName("Penance")) {
            var penanceEvents = Events.getEventsByName("Penance");
            for (var i = 0; i < penanceEvents.length; i++) {
                if (penanceEvents[i].Tag === "cast") {
                    procFire = penanceEvents[i].Fire;
                }
            }
        }
        var procStartEvent = {};
        procStartEvent.Name = "Power of the Dark Side";
        procStartEvent.Tag = "proc";
        procStartEvent.Target = target;
        procStartEvent.Message = "Power of the Dark Side proc";
        procStartEvent.Fire = procFire;
        procStartEvent.Timestamp = timestamp(procStartEvent.Fire, TIMESTAMP_MODS.ONE);
        procStartEvent.Value = value;
        Events.addEvent(procStartEvent);

        var procEndEvent = {};
        procEndEvent.Name = "Power of the Dark Side";
        procEndEvent.Tag = "proc fade";
        procEndEvent.Target = target;
        procEndEvent.Message = "Power of the Dark Side end";
        procEndEvent.Fire = 15;
        procEndEvent.Timestamp = timestamp(procEndEvent.Fire, TIMESTAMP_MODS.ONE);
        procEndEvent.Value = 1;
        Events.addEvent(procEndEvent);
        Events.SortEvents();
    };

    function parsePurge(target, value) {
        target = Targets.getEnemyByName(target);
        var spell = Magic.getSpellByName("Purge the Wicked");
        if (Targets.hasTargetEffect(target, spell.Name)) {
            var cleave = Targets.getValidTargets(spell);
            var effectArray = Events.getEventsByTargetAndEffect(target, spell.Name);
            if (cleave.length > 0) {
                for (var i = 0; i < effectArray.length; i++) {
                    if (effectArray[i].Tag === "tick") {
                        var copyEvent = {};
                        copyEvent.Name = effectArray[i].Name;
                        copyEvent.Message = effectArray[i].Message
                        copyEvent.Fire = effectArray[i].Fire
                        copyEvent.Tag = effectArray[i].Tag
                        copyEvent.Timestamp = effectArray[i].Timestamp
                        copyEvent.Target = cleave[0].Name;
                        copyEvent.Value = effectArray[i].Value
                        Events.addEvent(copyEvent);
                    }
                    if (effectArray[i].Tag === "effect fade") {
                        var copyEvent = {};
                        copyEvent.Name = effectArray[i].Name;
                        copyEvent.Message = effectArray[i].Message
                        copyEvent.Fire = effectArray[i].Fire
                        copyEvent.Tag = effectArray[i].Tag
                        copyEvent.Timestamp = effectArray[i].Timestamp
                        copyEvent.Target = cleave[0].Name;
                        copyEvent.Value = effectArray[i].Value
                        Events.addEvent(copyEvent);
                        Targets.affectTarget(cleave[0].Name, ["Purge the Wicked", effectArray[i].Fire]);
                    }
                }
                Events.SortEvents();
            }
        }
    };

    function parseRevelation() {
        var procEvent = {};
        procEvent.Name = "Revelation";
        procEvent.Message = "Revelation proc";
        procEvent.Fire = 0;
        procEvent.Tag = "proc";
        procEvent.Timestamp = timestamp(procEvent.Fire, TIMESTAMP_MODS.SIX);
        procEvent.Target = "none";
        procEvent.Value = 0;
        Events.addImmediateEvent(procEvent);
    };

    function parseSchism(target, value) {
        var damageEvent = {};
        damageEvent.Name = "Schism";
        damageEvent.Message = "Schism damage";
        damageEvent.Fire = 0;
        damageEvent.Tag = "damage";
        damageEvent.Timestamp = timestamp(damageEvent.Fire, TIMESTAMP_MODS.THREE);
        damageEvent.Target = target.Name;
        damageEvent.Value = value;
        Events.addImmediateEvent(damageEvent);
    };

    function parseShadowCovenant(ally) {
        var antiHealEvent = {};
        antiHealEvent.Name = "Shadow Covenant";
        antiHealEvent.Tag = "heal absorb";
        antiHealEvent.Target = ally;
        antiHealEvent.Message = "Shadow Covenant absorb";
        antiHealEvent.Fire = 0;
        antiHealEvent.Timestamp = timestamp(antiHealEvent.Fire, TIMESTAMP_MODS.ONE);
        antiHealEvent.Value = -225;
        Events.addImmediateEvent(antiHealEvent);
    };

    function parseTwist(target, value) {
        var procStartEvent = {};
        procStartEvent.Name = "Twist of Fate";
        procStartEvent.Tag = "proc";
        procStartEvent.Target = target;
        procStartEvent.Message = "Twist of Fate proc";
        procStartEvent.Fire = 0;
        procStartEvent.Timestamp = timestamp(procStartEvent.Fire, TIMESTAMP_MODS.ONE);
        procStartEvent.Value = value;
        Events.addImmediateEvent(procStartEvent);

        var procEndEvent = {};
        procEndEvent.Name = "Twist of Fate";
        procEndEvent.Tag = "proc fade";
        procEndEvent.Target = target;
        procEndEvent.Message = "Twist of Fate fade";
        procEndEvent.Fire = 10;
        procEndEvent.Timestamp = timestamp(procEndEvent.Fire, TIMESTAMP_MODS.ONE);
        procEndEvent.Value = 1;
        Events.addEvent(procEndEvent);
        Events.SortEvents();
    };

    //Used for making the event timestamp for sorting purposes.
    //"Time" is how long it takes before the event occurs.
    //"Mod" refers to the priority modifier given to the event.
    //It's used to make the events sort all pretty-like.
    function timestamp(time, mod) {
        return time + Timers.getClock() + mod;
    };

    return {
        //CASTER
        //On spellcast
        parseSpellCastEvents: function (target, spell) {
            var eventTiming = parseCastingEvents(target, spell);
            return eventTiming;
        },
        parseSpellEvents: function (target, spell, eventTiming) {
            parseEffectEvents(target, spell.Name, eventTiming);
            if (spell.Atones) {
                if (spell.Name === "Power Word: Radiance" || spell.name === "Shadow Covenant") {
                    parseEffectEvents(target, "Radiance", eventTiming);
                }
                else {
                    parseEffectEvents(target, "Atonement", eventTiming);
                }
            }
            parseDamageEvent(target, spell, eventTiming);
            parseHealingEvent(target, spell, eventTiming);
            parseDoTEvents(target, spell);
            parseHoTEvents(target, spell);
        },
        parseCooldownEvents: function (spell) {
            parseCooldown(spell);
        },
        //--CASTER

        //TALENTS
        parseProcEvents: function (funcName, target, value) {
            switch (funcName) {
                case "Atonement":
                    parseAtonement(target, value);
                    break;
                case "Borrowed Time":
                    parseBorrowedTime(target, value);
                    break;
                case "Brightest Lights":
                    parseBrightestLights(target, value);
                    break;
                case "Chosen by the Light":
                    parseChosenByTheLight();
                    break;
                case "Darkest Shadows":
                    parseDarkestShadows(target, value);
                    break;
                case "Power of the Dark Side":
                    parseDarkSide(target, value);
                    break;
                case "Purge the Wicked":
                    parsePurge(target, value);
                    break;
                case "Revelation":
                    parseRevelation();
                    break;
                case "Schism":
                    parseSchism(target, value);
                    break;
                case "Shadow Covenant":
                    parseShadowCovenant(target);
                    break;
                case "Twist of Fate":
                    parseTwist(target, value);
                    break;
                default:
                    break;
            }
        }
    };
}();
