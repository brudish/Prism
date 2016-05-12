//Spell objects provide cost in % base mana, cast/duration/period/cooldown in seconds, healing/damage/DoT in %spellpower

var Magic = function () {
    var spells =
      {
          // --- ST Heals ---
          "Plea":
          {
              "Name": "Plea",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 1.5,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 0,
              "Healing": 225,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": true,
              "Targets": 1,
              "Locked": false
          },
          "Shadow Mend":
          {
              "Name": "Shadow Mend",
              "Cast": 1.5,
              "Instant": false,
              "Cost": 2.8,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 0,
              "Healing": 700,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": true,
              "Targets": 1,
              "Locked": false
          },
          "Power Word: Shield":
          {
              "Name": "Power Word: Shield",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 2.5,
              "Duration": 15,
              "Period": 0,
              "Cooldown": 6,
              "Healing": 600,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": true,
              "Targets": 1,
              "Locked": false
          },
          "Clarity of Will":
          {
              "Name": "Clarity of Will",
              "Cast": 2.5,
              "Instant": false,
              "Cost": 3.15,
              "Duration": 20,
              "Period": 0,
              "Cooldown": 0,
              "Healing": 800,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 1,
              "Locked": true
          },
          // --- AOE Heals ---
          "Power Word: Radiance":
          {
              "Name": "Power Word: Radiance",
              "Cast": 2.5,
              "Instant": false,
              "Cost": 5.5,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 0,
              "Healing": 300,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": true,
              "Targets": 2,
              "Locked": false
          },
          "Divine Star":
          {
              "Name": "Divine Star",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 2,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 15,
              "Healing": 180,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 20,
              "Locked": true
          },
          "Halo":
          {
              "Name": "Halo",
              "Cast": 1.5,
              "Instant": false,
              "Cost": 3.6,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 40,
              "Healing": 287.4,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 20,
              "Locked": true
          },
          "Shadow Covenant":
          {
              "Name": "Shadow Covenant",
              "Cast": 2.5,
              "Instant": false,
              "Cost": 8,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 0,
              "Healing": 450,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 5,
              "Locked": true
          },
          // --- DPS ---
          "Light's Wrath":
          {
              "Name": "Light's Wrath",
              "Cast": 2.5,
              "Instant": false,
              "Cost": 0,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 90,
              "Healing": 0,
              "HoT": 0,
              "Damage": 200,
              "DoT": 0,
              "Atones": false,
              "Targets": 1,
              "Locked": true
          },
          "Smite":
          {
              "Name": "Smite",
              "Cast": 1.5,
              "Instant": false,
              "Cost": 1.5,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 0,
              "Healing": 250,
              "HoT": 0,
              "Damage": 250,
              "DoT": 0,
              "Atones": false,
              "Targets": 1,
              "Locked": false
          },
          "Shadow Word: Pain":
          {
              "Name": "Shadow Word: Pain",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 2,
              "Duration": 18,
              "Period": 3,
              "Cooldown": 0,
              "Healing": 0,
              "HoT": 0,
              "Damage": 62.5,
              "DoT": 62.5,
              "Atones": false,
              "Targets": 1,
              "Locked": false
          },
          "Penance":
          {
              "Name": "Penance",
              "Cast": 2.0,
              "Instant": true,
              "Cost": 2.5,
              "Duration": 2,
              "Period": 1,
              "Cooldown": 9,
              "Healing": 0,
              "HoT": 0,
              "Damage": 200,
              "DoT": 200,
              "Atones": false,
              "Targets": 1,
              "Locked": false
          },
          // --- Talents and Cooldowns ---
          "Power Word: Solace":
          {
              "Name": "Power Word: Solace",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 0,
              "Duration": 0,
              "Period": 0,
              "Cooldown": 10,
              "Healing": 0,
              "HoT": 0,
              "Damage": 300,
              "DoT": 0,
              "Atones": false,
              "Targets": 1,
              "Locked": true
          },
          "Purge the Wicked":
          {
              "Name": "Purge the Wicked",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 2,
              "Duration": 20,
              "Period": 2,
              "Cooldown": 10,
              "Healing": 0,
              "HoT": 0,
              "Damage": 150,
              "DoT": 65,
              "Atones": false,
              "Targets": 1,
              "Locked": true
          },
          "Shadowfiend":
          {
              "Name": "Shadowfiend",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 0,
              "Duration": 12,
              "Period": 1.5,
              "Cooldown": 180,
              "Healing": 0,
              "HoT": 0,
              "Damage": 65,
              "DoT": 65,
              "Atones": false,
              "Targets": 1,
              "Locked": false
          },
          "Mindbender":
          {
              "Name": "Shadowfiend",
              "Cast": 1.5,
              "Instant": true,
              "Cost": 0,
              "Duration": 15,
              "Period": 1.5,
              "Cooldown": 60,
              "Healing": 0,
              "HoT": 0,
              "Damage": 65 * 1.88,
              "DoT": 65 * 1.88,
              "Atones": false,
              "Targets": 1,
              "Locked": false
          },
          "Rapture":
          {
              "Name": "Rapture",
              "Cast": 0,
              "Instant": false,
              "Cost": 0,
              "Duration": 8,
              "Period": 0,
              "Cooldown": 90,
              "Healing": 0,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 0,
              "Locked": false
          },
          "Power Infusion":
          {
              "Name": "Power Infusion",
              "Cast": 0,
              "Instant": false,
              "Cost": 0,
              "Duration": 20,
              "Period": 0,
              "Cooldown": 120,
              "Healing": 0,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 0,
              "Locked": true
          },
          "Pain Suppression":
          {
              "Name": "Pain Suppression",
              "Cast": 0,
              "Instant": false,
              "Cost": 0,
              "Duration": 8,
              "Period": 0,
              "Cooldown": 300,
              "Healing": 0,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 1,
              "Locked": false
          },
          "Power Word: Barrier":
          {
              "Name": "Power Word: Barrier",
              "Cast": 0,
              "Instant": false,
              "Cost": 0,
              "Duration": 10,
              "Period": 0,
              "Cooldown": 180,
              "Healing": 0,
              "HoT": 0,
              "Damage": 0,
              "DoT": 0,
              "Atones": false,
              "Targets": 30,
              "Locked": false
          }
      };

    var effects =
        {
            "Atonement":
            {
                "Name": "Atonement",
                "Duration": 15,
                "Cooldown": 0,
                "Effect": 0,
                "Base": 0
            },
            "Shadow Word: Pain":
            {
                "Name": "Shadow Word: Pain",
                "Duration": 18,
                "Cooldown": 0,
                "Effect": 0,
                "Base": 0
            },
            "Purge the Wicked":
            {
                "Name": "Purge the Wicked",
                "Duration": 20,
                "Cooldown": 10,
                "Effect": 0,
                "Base": 0
            },
            "Penance":
            {
                "Name": "Penance",
                "Duration": 2,
                "Cooldown": 0,
                "Effect": 0,
                "Base": 0
            },
            "Shadowfiend":
            {
                "Name": "Shadowfiend",
                "Duration": 12,
                "Cooldown": 180,
                "Effect": 0,
                "Base": 0
            },
            "Mindbender":
            {
                "Name": "Mindbender",
                "Duration": 15,
                "Cooldown": 60,
                "Effect": 0,
                "Base": 0
            },
            "Power Infusion":
            {
                "Name": "Power Infusion",
                "Duration": 25,
                "Cooldown": 120,
                "Effect": 1.25,
                "Base": 1
            },
            "Rapture":
            {
                "Name": "Rapture",
                "Duration": 8,
                "Cooldown": 90,
                "Effect": 0,
                "Base": 6
            },
            "Pain Suppression":
            {
                "Name": "Pain Suppression",
                "Duration": 8,
                "Cooldown": 180,
                "Effect": 0,
                "Base": 0
            },
            "Power Word: Barrier":
            {
                "Name": "Power Word: Barrier",
                "Duration": 10,
                "Cooldown": 180,
                "Effect": 0,
                "Base": 0
            },
            "Power of the Dark Side":
            {
                "Name": "Power of the Dark Side",
                "Duration": 15,
                "Cooldown": 0,
                "Effect": 0,
                "Base": 0
            },
            "Chosen by the Light":
            {
                "Name": "Chosen by the Light",
                "Duration": 10,
                "Cooldown": 0,
                "Effect": 10,
                "Base": 1
            }
        };

    return {
        //The "isX" methods all take in the spell object from the list
        isDoT: function (spell) {
            return spell.DoT !== 0;
        },
        isHoT: function (spell) {
            return spell.HoT !== 0;
        },
        isDamage: function (spell) {
            return spell.Damage > 0;
        },
        isHealing: function (spell) {
            return spell.Healing > 0;
        },
        isInstant: function (spell) {
            return spell.Instant;
        },
        isAtone: function (spell) {
            return spell.Atones;
        },
        isSpellCooldown: function (spell) {
            return spell.Targets === 0;
        },
        getTargetCount: function (spell) {
            return spell.Targets;
        },
        getSpellByName: function (name) {
            return spells[name];
        },
        getEffectByName: function (name) {
            return effects[name];
        },
        getManaCost: function (spell) {
            return spell.Cost;
        },
        //Returns the unadulterated list
        getFullSpellList: function () {
            return spells;
        },
        //Sets Shadow Mend's value based on the number of enemies. More enemies = heals for more
        setShadowMend: function () {
            var count = Targets.getEnemyCount();
            if (count > 5) {
                count = 5;
            }
            spells["Shadow Mend"].Healing = 700 - ((5 - count) * 70);
        }
    };
}();



