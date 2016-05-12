var Priority = function () {
    var priority = "E_Sng";

    //Priority:
    //Efficiency -- Single, Selected, AoE
    //Throughput -- Single, Selected, AoE
    //Throughput on any scale overwrites Efficiency. So the scale might be represented as: T-Sng, T-Sel, T-AoE, E-AoE, E-Sel, E-Sng
    //Multiple priorities can exist at once - and this is how we'll model the thought process behind intelligent healing choices -
    //but the highest active one is always used. I wonder if it's worthwhile to create "limited" lists for the priorities so that
    //falling through to the next highest can occur. Food for thought.

    //Still going to need to calculate relative values by looking at the number of atoned targets and the % mastery

    //Efficiency:
    //Plea (Priority) [E..Sel] - 1-3..atonement ( 
    //Smite (Boss) [E..AoE] - SP*A*M / Plea > 1  
    //PW:Shield (Tank/Priority/Raid) [E..T-Sng] - Cooldown on throughput targets
    //SW:Pain (Boss/Add) [(1)T-Sel, (2)T-AoE, (3)E-AoE, (4)E-Sel, (5)E-Sng] - 

    //Purge the Wicked (Boss/Add) [E..T-Sng] - Before Penance
    //PW:Solace (Boss) [E..AoE] - Cooldown during efficiency, lower priority during throughput
    //Halo (Priority/Raid) [E-AoE..T-Sel] - Cooldown

    //Throughput:
    //Shadow Mend (Tank) [T-Sng] - Tank
    //Penance (Boss/Tank) [E..T-Sng] - Cooldown if A > 2
    //PW:Radiance (Priority/Raid) [E-AoE..T-Sel] - To set up Atonement only
    //PW:Nova (Priority/Raid/Adds/Swarm) [T..Sel] - Cooldown if TA+TE > 3
    //Shadowfiend (Boss) [E..T-Sng] - Cooldown if A === TA

    //Pontifex [T..Sng] - Beginning of throughput && A === TA(<6)
    //Rapture [T..Sng] - Beginning of throughput
    //PW:Barrier [T..Sng]
    //Pain Suppression [T-Sng]

    //Clarity of Will (Tank) [E-Sng] - Tank filler
    //Divine Star (Raid) [E..T-AoE] - Cooldown
    //Shadow Covenant (Priority/Raid) [T..Sel] - Once during group throughput

    //Power Infusion [T..Sng] - Beginning of throughput

    function getPainPriority() {
        var currentPriority = priority;
        var max = 0;
        switch (currentPriority) {
            case "E_Sng":
                max = 5;
            case "E_Sel":
                max = 4;
            case "E_Aoe":
                max = 3;
            case "T_Aoe":
                max = 2;
            case "T_Sel":
                max = 1;
            default:
                max = 0;
        }
        return Targets.countTargetsWithEffect("Shadow Word: Pain") <= max;
    };


    //These don't yet take into account the exact number of Atoned targets for the Sel and AoE priorities
    //For Smite, I also need to take into account the number of seconds remaining on Penance's cooldown to derive relative value of the cast
    var T_Sng = ["Power Infusion", "Pain Suppression", "Power Word: Shield", "Power Word: Barrier", "Purge the Wicked", "Shadow Mend", "Penance", "Shadowfiend", "Rapture", "Smite"];
    var T_Sel = ["Power Infusion", "Power Word: Barrier", "Halo", "Power Word: Shield", "Purge the Wicked", "Power Word: Radiance", "Light's Wrath", "Shadow Covenant", "Shadow Word: Pain", "Penance", "Shadowfiend", "Rapture", "Smite"];
    var T_Aoe = ["Power Infusion", "Halo", "Power Word: Radiance", "Power Word: Barrier", "Shadow Covenant", "Purge the Wicked", "Penance", "Light's Wrath", "Divine Star", "Shadowfiend", "Shadow Word: Pain", "Smite"];
    var E_Aoe = ["Purge the Wicked", "Shadowfiend", "Halo", "Power Word: Radiance", "Purge the Wicked", "Penance", "Divine Star", "Power Word: Solace", "Shadow Word: Pain", "Smite"];
    var E_Sel = ["Purge the Wicked", "Shadowfiend", "Penance", "Power Word: Shield", "Halo", "Plea", "Power Word: Solace", "Shadow Word: Pain", "Divine Star", "Smite"];
    var E_Sng = ["Purge the Wicked", "Shadowfiend", "Power Word: Shield", "Penance", "Plea", "Power Word: Solace", "Clarity of Will", "Shadow Word: Pain", "Smite"];

    return {
        getPriorityArrays: function () {
            var priorities = [];
            priorities.push(T_Sng);
            priorities.push(T_Sel);
            priorities.push(T_Aoe);
            priorities.push(E_Sng);
            priorities.push(E_Sel);
            priorities.push(E_Aoe);
            return priorities;
        },
        getPriority: function () {
            return priority;
        },
        isAtonementNeeded: function () {
            var atoned = Targets.getAtoned();
            var currentPriority = priority;
            switch (currentPriority) {
                case "E_Sng":
                    if (atoned.length > 0) {
                        return false;
                    }
                    break;
                case "E_Sel":
                    if (atoned.length > 1) {
                        return false;
                    }
                    break;
                case "E_Aoe":
                    if (atoned.length > Targets.getAllyCount()) {
                        return false;
                    }
                    break;
                case "T_Aoe":
                    if (atoned.length > Targets.getAllyCount()) {
                        return false;
                    }
                    break;
                case "T_Sel":
                    if (atoned.length > 1) {
                        return false;
                    }
                    break;
                case "T_Sng":
                    if (atoned.length > 0) {
                        return false;
                    }
                    break;
                default:
                    return false;
                    break;
            }
            return true;
        },
        isSpellPriority: function (spellName) {
            switch (spellName) {
                case "Shadow Word: Pain":
                    return getPainPriority();
                    break;
                default:
                    return true;
                    break;
            }
        },
        generatePriorityList: function () {
            var timer = Timers.getClock();
            if (timer < 30) {
                priority = "E_Sng";
                return E_Sng;
            } else if (timer < 45) {
                priority = "E_Sel";
                return E_Sel;
            } else if (timer < 55) {
                priority = "T_Aoe";
                return T_Aoe;
            } else if (timer < 65) {
                priority = "T_Sng";
                return T_Sng;
            } else if (timer < 80) {
                priority = "E_Sel";
                return E_Sel;
            } else if (timer < 88) {
                priority = "T_Sng";
                return T_Sng;
            } else if (timer < 100) {
                priority = "E_Aoe";
                return E_Aoe;
            } else {
                priority = "E_Sng";
                return E_Sng;
            }
        }
    };
}();

