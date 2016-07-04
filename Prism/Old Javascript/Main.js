var PrismSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Prism");
var RowHeight = 1;
var currentRow = 2;

//Organize some of the messier functions to be in order at least

function Main() {
    Caster.InitCaster();
    Targets.initTargets();
    Talents.assignClassTalents();
    Talents.assignArtifactTalents();
    while (Timers.isRunning()) {
        Caster.castSpell();
        while (Caster.isCasting()) {
            Events.runNextEvent();
        }
    }
    var space = Output.output();

    PrismSheet.getRange(2, 5, space.length, 9).setValues(space);

    var row = 9;
    PrismSheet.getRange(row, 1, 40, 3).setValue("");
    var totalDamage = [["Total damage", "%SP", Caster.getDamage()]];
    PrismSheet.getRange(row, 1, 1, 3).setValues(totalDamage);
    row++;

    var totalHealing = [["Total healing", "%SP", Caster.getHealing()]];
    PrismSheet.getRange(row, 1, 1, 3).setValues(totalHealing);
    row++;

    var mana = [["Mana", "%Base", Caster.getMana()]];
    PrismSheet.getRange(row, 1, 1, 3).setValues(mana);
    row++;

    var allies = Targets.getAllies();
    var enemies = Targets.getEnemies();

    for (var ally in allies) {
        var healing = Math.round(allies[ally].Amount * 100) / 100;
        var output = [["Healing on: ", allies[ally].Name, healing]];
        PrismSheet.getRange(row, 1, 1, 3).setValues(output);
        row++;
    }
    for (var enemy in enemies) {
        var damage = Math.round(enemies[enemy].Amount * 100) / 100;
        var output = [["Damage on: ", enemies[enemy].Name, damage]];
        PrismSheet.getRange(row, 1, 1, 3).setValues(output);
        row++;
    }

    //Output the priorities to the last sheet
    var Priorities = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Priorities");
    Priorities.getRange("A:F").setValue("");
    Priorities.getRange("A1:F1").setValues([["T-Single", "T-Selected", "T-AoE", "E-Single", "E-Selected", "E-AoE"]]);
    var priorityArray = Priority.getPriorityArrays();
    for (var i = 0; i < priorityArray.length; i++) {
        for (var j = 0; j < priorityArray[i].length; j++) {
            Priorities.getRange(j + 2, i + 1, 1, 1).setValues([[priorityArray[i][j]]]);
        }
    }
}