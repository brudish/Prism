var Talents = function () {
    var classTalents =
        {
            "The Penitent":
            {
                "Name": "The Penitent",
                "Selected": false,
                "Action": "The Penitent"
            },
            "Castigation":
            {
                "Name": "Castigation",
                "Selected": false,
                "Action": "Castigation"
            },
            "Schism":
            {
                "Name": "Schism",
                "Selected": false,
                "Action": ""
            },
            "Angelic Feather":
            {
                "Name": "Angelic Feather",
                "Selected": false,
                "Action": ""
            },
            "Body and Soul":
            {
                "Name": "Body and Soul",
                "Selected": false,
                "Action": ""
            },
            "Masochism":
            {
                "Name": "Masochism",
                "Selected": false,
                "Action": ""
            },
            "Shining Force":
            {
                "Name": "Shining Force",
                "Selected": false,
                "Action": ""
            },
            "Psychic Voice":
            {
                "Name": "Psychic Voice",
                "Selected": false,
                "Action": ""
            },
            "Dominant Mind":
            {
                "Name": "Dominant Mind",
                "Selected": false,
                "Action": ""
            },
            "Power Word: Solace":
            {
                "Name": "Power Word: Solace",
                "Selected": false,
                "Action": "Unlock"
            },
            "Shield Discipline":
            {
                "Name": "Shield Discipline",
                "Selected": false,
                "Action": ""
            },
            "Mindbender":
            {
                "Name": "Mindbender",
                "Selected": false,
                "Action": "Mindbender"
            },
            "Contrition":
            {
                "Name": "Contrition",
                "Selected": false,
                "Action": "Contrition"
            },
            "Power Infusion":
            {
                "Name": "Power Infusion",
                "Selected": false,
                "Action": "Unlock"
            },
            "Twist of Fate":
            {
                "Name": "Twist of Fate",
                "Selected": false,
                "Action": "Twist of Fate"
            },
            "Clarity of Will":
            {
                "Name": "Clarity of Will",
                "Selected": false,
                "Action": "Unlock"
            },
            "Divine Star":
            {
                "Name": "Divine Star",
                "Selected": false,
                "Action": "Unlock"
            },
            "Halo":
            {
                "Name": "Halo",
                "Selected": false,
                "Action": "Unlock"
            },
            "Purge the Wicked":
            {
                "Name": "Purge the Wicked",
                "Selected": false,
                "Action": "Purge the Wicked"
            },
            "Grace":
            {
                "Name": "Grace",
                "Selected": false,
                "Action": ""
            },
            "Shadow Covenant":
            {
                "Name": "Shadow Covenant",
                "Selected": false,
                "Action": "Shadow Covenant"
            },
        };

    var artifactDict =
        {
            "B2": "Taming the Shadows",
            "B4": "Vestments of Discipline",
            "B6": "Confession",
            "B8": "Light's Wrath",
            "D2": "Barrier for the Devoted",
            "D4": "Pain is in Your Mind",
            "D6": "Chosen by the Light",
            "D8": "Speed of the Pious",
            "F2": "Doomsayer",
            "F4": "Borrowed Time",
            "F6": "Burst of Light",
            "F8": "Shield of Faith",
            "H2": "Sins of the Many",
            "H4": "The Edge of Dark and Light",
            "H6": "Power of the Dark Side",
            "H8": "Share in the Light"

        };

    var artifactTalents =
        {
            "Taming the Shadows": //15% chance for Shadow Mend to only heal
            {
                "Name": "Taming the Shadows",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Vestments of Discipline":
            {
                "Name": "Vestments of Discipline",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Confession": //+3% Penance per rank
            {
                "Name": "Confession",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "Boost",
                "Spell": ["Penance"],
                "Mod": ["Damage"]
            },
            "Light's Wrath": //90 second damage burst
            {
                "Name": "Light's Wrath",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Barrier for the Devoted": //+100% Atone healing under Barrier
            {
                "Name": "Barrier for the Devoted",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Pain is in Your Mind":
            {
                "Name": "Pain is in Your Mind",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Chosen by the Light":
            {
                "Name": "Chosen by the Light",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [""],
                "Mod": []
            },
            "Speed of the Pious":
            {
                "Name": "Speed of the Pious",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Doomsayer": //+1 sec Rapture dur per rank
            {
                "Name": "Doomsayer",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Borrowed Time": //Atonement application +15% haste for Smite/MB/Penance
            {
                "Name": "Borrowed Time",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Burst of Light": //+3% Radiance healing per rank
            {
                "Name": "Burst of Light",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "Boost",
                "Spell": ["Power Word: Radiance"],
                "Mod": ["Healing"]
            },
            "Shield of Faith": //+3% Shield per rank
            {
                "Name": "Shield of Faith",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "Boost",
                "Spell": ["Power Word: Shield"],
                "Mod": ["Healing"]
            },
            "Sins of the Many": //+1% damage per Atoned
            {
                "Name": "Sins of the Many",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "The Edge of Dark and Light": //+3% Smite per rank
            {
                "Name": "The Edge of Dark and Light",
                "Ranks": 3,
                "SelectedRanks": 0,
                "Type": "Boost",
                "Spell": ["Smite"],
                "Mod": ["Damage"]
            },
            "Power of the Dark Side": //Chance on Pain tick to +100% Penance
            {
                "Name": "Power of the Dark Side",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            },
            "Share in the Light": //+15% Shield on yourself when cast on other
            {
                "Name": "Share in the Light",
                "Ranks": 1,
                "SelectedRanks": 0,
                "Type": "",
                "Spell": [],
                "Mod": []
            }
        };

    function spellBoost(aTalent) {
        var ranksSelected = aTalent.SelectedRanks;
        var rankValue = (Math.floor(ranksSelected * 3.34) / 100);
        var mod = "";
        if (aTalent.Spell.length > 0) {
            for (var i = 0; i < aTalent.Spell.length; i++) {
                var boostedSpell = aTalent.Spell[i];
                var spell = Magic.getSpellByName(boostedSpell);
                if (aTalent.Mod.length > 0) {
                    for (var j = 0; j < aTalent.Mod.length; j++) {
                        mod = aTalent.Mod[j];
                        spell[mod] *= (1 + rankValue);
                        if (spell.Name === "Penance") {
                            spell["DoT"] *= (1 + rankValue);
                        }
                    }
                }
            }
        }
    };

    function pullChosenArtifactTalents() {
        var talents = [];
        for (var talent in artifactTalents) {
            if (parseInt(artifactTalents[talent].SelectedRanks) > 0) {
                talents.push(artifactTalents[talent]);
            }
        }
        return talents;
    };

    function pullChosenClassTalents() {
        var talents = [];
        for (var talent in classTalents) {
            if (classTalents[talent].Selected) {
                talents.push(classTalents[talent]);
            }
        }
        return talents;
    };

    function unlockTalentedSpell(talent) {
        var spell = Magic.getSpellByName(talent);
        spell.Locked = false;
    };

    function applyClassTalents() {
        for (var talent in classTalents) {
            if (classTalents[talent].Selected) {
                switch (classTalents[talent].Action) {
                    case "Unlock":
                        unlockTalentedSpell(classTalents[talent].Name);
                        break;
                    case "Contrition":
                        var effect = Magic.getEffectByName("Atonement");
                        effect.Duration = 18;
                        break;
                    case "Castigation":
                        var spell = Magic.getSpellByName("Penance");
                        spell.Period = 0.665
                        break;
                    case "The Penitent":
                        var spell = Magic.getSpellByName("Penance");
                        spell.DoT = 0;
                        spell.Damage = 0;
                        spell.Healing = 200;
                        spell.HoT = 200;
                        break;
                    case "Twist of Fate":
                        Caster.addModifier("Healing", "Twist of Fate");
                        Caster.addModifier("Damage", "Twist of Fate");
                        break;
                    case "Power Infusion":
                        Caster.addModifier("Haste", "Power Infusion");
                        break;
                    case "Mindbender":
                        var spell = Magic.getSpellByName("Shadowfiend");
                        spell.Name = "Mindbender";
                        spell.Damage = 122;
                        spell.DoT = 122;
                        spell.Duration = 15;
                        spell.Cooldown = 60;
                        break;
                    case "Purge the Wicked":
                        var spell = Magic.getSpellByName("Shadow Word: Pain");
                        spell.Name = "Purge the Wicked";
                        spell.Damage = 150;
                        spell.DoT = 65;
                        spell.Duration = 20;
                        spell.Period = 2;
                        spell.Cooldown = 10;
                        break;
                    case "Shadow Covenant":
                        var spell = Magic.getSpellByName("Power Word: Radiance");
                        spell.Name = "Shadow Covenant";
                        spell.Healing = 450;
                        spell.Cost = 8;
                        spell.Targets = 6;
                        break;
                    default:
                        break;
                }
            }
        }
    };

    function applyArtifactTalents() {
        var chosenTalents = pullChosenArtifactTalents();
        Caster.addModifier("Damage", "Darkest Shadows");
        for (var i = 0; i < chosenTalents.length; i++) {
            if (chosenTalents[i].Type === "Boost") {
                spellBoost(chosenTalents[i]);
            } else if (chosenTalents[i].Name === "Light's Wrath") {
                unlockTalentedSpell(chosenTalents[i].Name);
            } else if (chosenTalents[i].Name === "Sins of the Many") {
                Caster.addModifier("Damage", "Sins of the Many");
            } else if (chosenTalents[i].Name === "Barrier for the Devoted") {
                Caster.addModifier("Healing", "Barrier for the Devoted");
            } else if (chosenTalents[i].Name === "Pain is in Your Mind") {
                var spell = Magic.getSpellByName("Pain Suppression");
                spell.Cooldown -= parseInt(chosenTalents[i].SelectedRanks) * 10;
            } else if (chosenTalents[i].Name === "Doomsayer") {
                var effect = Magic.getEffectByName("Rapture");
                effect.Duration += parseInt(chosenTalents[i].SelectedRanks) * 1;
            }
        }
    };

    return {
        assignClassTalents: function () {
            var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Class Talents");
            for (var i = 1; i < 8; i++) {
                var row = (i * 2);
                var selection = sheet.getRange(row, 3).getValue();
                classTalents[selection].Selected = true;
            }
            applyClassTalents();
            Magic.setShadowMend();
        },
        assignArtifactTalents: function () {
            var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Artifact Talents");
            for (var i = 1; i < 5; i++) {
                for (var k = 1; k < 5; k++) {
                    var row = i * 2;
                    var column = k * 2;
                    var cell = sheet.getRange(row, column);
                    var cellNotation = cell.getA1Notation();
                    var talentName = artifactDict[cellNotation];
                    var talent = artifactTalents[talentName];
                    var ranks = cell.getValue().substring(0, 1);
                    talent.SelectedRanks = ranks;
                }
            }
            applyArtifactTalents();
        },
        getClassTalent: function (name) {
            return classTalents[name];
        },
        getSelectedClassTalents: function () {
            return pullChosenClassTalents();
        },
        getSelectedArtifactTalents: function () {
            return pullChosenArtifactTalents();
        },

        //Spell and talent proc checks and proc effects
        atonementHealing: function (value) {
            var atoned = Targets.getAtoned();
            if (atoned.length > 0) {
                for (var i = 0; i < atoned.length; i++) {
                    var ally = atoned[i];
                    var amount = value * Caster.getMastery();
                    amount = Talents.barrierForTheDevoted(ally, amount);
                    Parser.parseProcEvents("Atonement", atoned[i], amount);
                }
            }
        },
        barrierForTheDevoted: function (target, amount) {
            if (parseInt(artifactTalents["Barrier for the Devoted"].SelectedRanks) > 0 && Targets.hasTargetEffect(target, "Power Word: Barrier")) {
                return amount * 2;
            }
            return amount;
        },
        borrowedTime: function () {
            if (parseInt(artifactTalents["Borrowed Time"].SelectedRanks) > 0) {
                var modifier = parseInt(artifactTalents["Borrowed Time"].SelectedRanks) * 0.05;
                Parser.parseProcEvents("Borrowed Time", "none", modifier);
            }
        },
        borrowedTimeEffect: function (status, value) {
            var penance = Magic.getSpellByName("Penance");
            var effect = Magic.getEffectByName("Penance");
            var smite = Magic.getSpellByName("Smite");
            if (status) {
                penance.Cast = 2.0 * (1 - value);
                smite.Cast = 2.0 * (1 - value);
                penance.Duration = 2.0 * (1 - value);
                effect.Duration = 2.0 * (1 - value);
                if (classTalents["Castigation"].Selected) {
                    penance.Period = 0.665 * (1 - value);
                }
                else {
                    penance.Period = 1 * (1 - value);
                }
            } else {
                penance.Cast = 2.0;
                smite.Cast = 2.0;
                penance.Duration = 2.0;
                effect.Duration = 2.0;
                if (classTalents["Castigation"].Selected) {
                    penance.Period = 0.665;
                }
                else {
                    penance.Period = 1;
                }
            }
        },
        brightestLights: function () {
            var proc = Math.random();
            if (proc < 0.15001) {
                var allies = Targets.getAtoned();
                for (var i = 0; i < allies.length; i++) {
                    Parser.parseProcEvents("Brightest Lights", allies[i], 100);
                }
            }
        },
        darkestShadows: function () {
            var name = "Darkest Shadows";
            var proc = Math.random();
            if (proc < 0.05001 && !Events.hasEventByName(name)) {
                Parser.parseProcEvents(name, "none", 0.03);
            }
        },
        darkSide: function () {
            if (!classTalents["The Penitent"].Selected) {
                var name = "Power of the Dark Side";
                if (parseInt(!artifactTalents[name].SelectedRanks) > 0) {
                    return false;
                }
                var proc = Math.random();
                if (proc < 0.10001 && !Events.hasEventByName(name)) {
                    Parser.parseProcEvents(name, "none", 0);
                }
            }
        },
        clearDarkSide: function () {
            if (Events.hasEventByName("Power of the Dark Side")) {
                var count = Events.getEventsByName("Power of the Dark Side");
                if (count === 1) {
                    if (!classTalents["The Penitent"].Selected) {
                        var spell = Magic.getSpellByName("Penance");
                        spell.Damage = 200;
                        spell.DoT = 200;
                    }
                    Events.Accelerator("Power of the Dark Side");
                }
            }
        },
        mindbender: function () {
            if (classTalents["Mindbender"].Selected) {
                Caster.refundMana(0.75);
            }
        },
        purgeCleave: function (target) {
            if (classTalents["Purge the Wicked"].Selected) {
                Parser.parseProcEvents("Purge the Wicked", target, 0);
            }
        },
        rapture: function () {
            var spell = Magic.getSpellByName("Rapture");
            Parser.parseCooldownEvents(spell);
        },
        chosenByTheLight: function () {
            if (parseInt(artifactTalents["Chosen by the Light"].SelectedRanks) > 0) {
                Parser.parseProcEvents("Chosen by the Light");
            }
        },
        //revelation: function () {
        //  var proc = Math.random();
        //  if (proc < 0.3001) {
        //    Parser.parseProcEvents("Revelation");       
        //  }
        //},
        schism: function (value) {
            if (classTalents["Schism"].Selected) {
                var enemies = Targets.getEnemies();
                for (var enemy in enemies) {
                    Parser.parseProcEvents("Schism", enemies[enemy], value);
                }
            }
        },
        shadowCovenant: function (ally) {
            if (classTalents["Shadow Covenant"].Selected) {
                Parser.parseProcEvents("Shadow Covenant", ally);
            }
        },
        shareInTheLight: function (target, value) {
            if (parseInt(artifactTalents["Share in the Light"].SelectedRanks) > 0) {
                var allyCount = Targets.getAllyCount();
                var lastAlly = "ally" + (allyCount - 1);
                if (target === "ally0") {
                    return value * 1.15;
                }
            }
            return value;
        },
        shieldDiscipline: function () {
            if (classTalents["Shield Discipline"].Selected) {
                Caster.refundMana(1);
            }
        },
        sinsOfTheMany: function () {
            if (parseInt(artifactTalents["Sins of the Many"].SelectedRanks) > 0) {
                var atoned = Targets.getAtoned().length;
                atoned *= 0.01;
                atoned += 1;
                Caster.setModifier("Damage", "Sins of the Many", atoned);
            }
        },
        solace: function () {
            if (classTalents["Power Word: Solace"].Selected) {
                Caster.refundMana(0.75);
            }
        },
        tamingShadows: function () {
            if (parseInt(artifactTalents["Taming the Shadows"].SelectedRanks) > 0) {
                var proc = Math.random();
                if (proc < 0.15001) {
                    return true;
                }
            }
            return false;
        },
        twistOfFate: function () {
            if (classTalents["Twist of Fate"].Selected) {
                var roll = Math.random();
                if (roll < 0.05) {
                    Events.Scrubber("Twist of Fate");
                    Parser.parseProcEvents("Twist of Fate", "none", 1.2);
                }
            }
        },
    };
}();


//Used by the Class and Artifact Talent sheets to change the current selection. They must be outside of the module like this in order to be used.
function selectTalent() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Class Talents");
    var cell = sheet.getActiveCell();
    var row = cell.getRow();
    var column = cell.getColumn();
    var hvalue = "C" + row;

    if (!(column % 2) && (column > 2) && (column < 9) && !(row % 2) && (row > 1) && (row < 15)) {
        sheet.getRange(hvalue).setValue(0);
        sheet.getRange(row, 4, 1, 5).setBorder(false, false, false, false, false, false);
        sheet.getRange(hvalue).setValue(sheet.getActiveCell().getValue());
        sheet.getActiveCell().setBorder(true, true, true, true, true, true, "yellow", null);
    }
}

function selectArtifactTalent() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Artifact Talents");
    var cell = sheet.getActiveCell();
    var row = cell.getRow();
    var column = cell.getColumn();
    var current = parseInt(cell.getValue().substring(0, 1));
    var limit = parseInt(cell.getValue().substring(2, 3));

    if (!(column % 2) && (column > 1) && (column < 9) && !(row % 2) && (row > 1) && (row < 9)) {
        var valueString = "";
        if (current === limit) {
            valueString = "0/" + limit;
            sheet.getRange(row, column, 1, 1).setBorder(false, false, false, false, false, false);
        }
        else {
            current++;
            valueString = current + "/" + limit;
            sheet.getRange(row, column, 1, 1).setBorder(true, true, true, true, true, true, "yellow", null);
        }
        sheet.getActiveCell().setValue(valueString);
    }
}