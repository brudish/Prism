var Targets = function () {
    var allies = {};
    var enemies = {};
    var aCount = 0;
    var eCount = 0;

    function setTargets() {
        var allyCount = PrismSheet.getRange("B1").getValue();
        var enemyCount = PrismSheet.getRange("B2").getValue();
        aCount = allyCount;
        eCount = enemyCount;
        for (var i = 0; i < allyCount; i++) {
            var allyName = "ally" + i;
            allies[allyName] = {
                "Name": allyName,
                "Effects": [],
                "Amount": 0
            };
        }
        for (var j = 0; j < enemyCount; j++) {
            var enemyName = "enemy" + j;
            enemies[enemyName] = {
                "Name": enemyName,
                "Effects": [],
                "Amount": 0
            };
        }
    };

    return {
        initTargets: function () {
            setTargets();
        },
        getAllyByName: function (name) {
            return allies[name];
        },
        getAllies: function () {
            return allies;
        },
        getAllyCount: function () {
            return aCount;
        },
        getHealingByName: function (name) {
            var ally = allies[name];
            var amount = Math.round(ally.Amount * 100) / 100;
            return amount;
        },
        getEnemyByName: function (name) {
            return enemies[name]
        },
        getEnemies: function () {
            return enemies;
        },
        getEnemyCount: function () {
            return eCount;
        },
        getDamageByName: function (name) {
            var enemy = enemies[name];
            var amount = Math.round(enemy.Amount * 100) / 100;
            return amount;
        },
        //Returns an array of ally objects
        getAtoned: function () {
            var atoned = [];
            for (var ally in allies) {
                if (Targets.hasTargetEffect(allies[ally], "Atonement")) {
                    atoned.push(allies[ally]);
                }
            }
            return atoned;
        },
        getValidTargets: function (spell) {
            var targetArray = [];
            var count = Magic.getTargetCount(spell);
            if (Magic.isDamage(spell)) {
                var dCounter = 0;
                if (count > eCount) {
                    count = eCount;
                }
                for (var enemy in enemies) {
                    if (!Targets.hasTargetEffect(enemies[enemy], spell.Name) && dCounter != count) {
                        targetArray.push(enemies[enemy]);
                        dCounter++;
                    }
                }
            }
            if (Magic.isHealing(spell)) {
                var hCounter = 0;
                if (count > aCount) {
                    count = aCount;
                }
                for (var ally in allies) {
                    if (spell.Atones) {
                        //If the target doesn't have Atonement and we haven't maxed our target counter, push them.
                        if ((!Targets.hasTargetEffect(allies[ally], "Atonement")) && hCounter != count) {
                            targetArray.push(allies[ally]);
                            hCounter++;
                        }
                    }
                    else {
                        if (hCounter != count) {
                            targetArray.push(allies[ally]);
                            hCounter++;
                        }
                    }
                }
                if (hCounter != count && spell.Atones) {
                    //If we have more targets to hit than we have available Atonement targets, pick additional targets
                    if (spell.Targets > aCount - Targets.getAtoned().length) {
                        Logger.log(Timers.getClock())
                        Logger.log("Would have picked an additional")
                    }
                }
            }
            if (!Magic.isHealing(spell) && !Magic.isDamage(spell)) {
                var cCounter = 0;
                if (count > aCount) {
                    count = aCount;
                }
                for (var ally in allies) {
                    if (cCounter != count) {
                        targetArray.push(allies[ally]);
                        cCounter++;
                    }
                }
            }
            return targetArray;
        },
        affectTarget: function (targetName, effect) {
            if (targetName.indexOf("enemy") === 0) {
                enemies[targetName].Effects.push(effect);
            }
            else if (targetName.indexOf("ally") === 0) {
                allies[targetName].Effects.push(effect);
            }
        },
        addValue: function (targetName, value) {
            if (targetName.indexOf("enemy") === 0) {
                enemies[targetName].Amount += value;
            }
            else if (targetName.indexOf("ally") === 0) {
                allies[targetName].Amount += value;
            }
        },
        hasTargetEffect: function (target, effect) {
            for (var i = target.Effects.length - 1; i >= 0; i--) {
                if (target.Effects[i][0] === effect) {
                    return true;
                }
            }
            return false;
        },
        countTargetsWithEffect: function (effect) {
            var count = 0;
            for (var enemy in enemies) {
                var current = enemies[enemy];
                for (var i = current.Effects.length - 1; i >= 0; i--) {
                    if (current.Effects[i][0] === effect) {
                        count++;
                    }
                }
            }
            for (var ally in allies) {
                var current = allies[ally];
                for (var i = current.Effects.length - 1; i >= 0; i--) {
                    if (current.Effects[i][0] === effect) {
                        count++;
                    }
                }
            }
            return count;
        }
    };
}();