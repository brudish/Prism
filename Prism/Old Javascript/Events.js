//The Events Class is in charge of collecting and exporting the event data.
//It should be nothing but essentially a postal service for events to get passed
//onto Parser after receiving the call to run them.

var Events = function () {
    //var events = [];
    //
    //function cycleEventTimers(time) {
    //    for (var i = 0; i < events.length; i++) {
    //        events[i].Fire -= time;
    //    }
    //};

    //function cycleTimers() {
    //    var time = getNextTime();
    //    //Cycle up to the next event in line
    //    Timers.cycleTimers(time);
    //    cycleEventTimers(time);
    //};

    //If there are events and we're still casting, get the time difference between the current and the next one
    //function getNextTime() {
    //    if (events.length > 1 && Caster.isCasting()) {
    //        return events[1].Fire - events[0].Fire;
    //    }
    //    else {
    //        return 0;
    //    }
    //};

    //Remove the spent event
    //function finishEvent() {
    //    events.splice(0, 1);
    //};

    //Overrider
    //function removeEffectFromTarget(target, effect) {
    //    for (var i = target.Effects.length - 1; i >= 0; i--) {
    //        if (target.Effects[i][0] == effect) {
    //            target.Effects.splice(i, 1);
    //            removeTargetEventsByType(target, effect);
    //        }
    //    }
    //};
    //
    //function removeTargetEventsByType(target, effect) {
    //    for (var i = events.length - 1; i >= 0; i--) {
    //        if (events[i].Target == target.Name) {
    //            if (events[i].Name == effect) {
    //                events.splice(i, 1);
    //            }
    //        }
    //    }
    //};

    return {
        //hasEventByName: function (name) {
        //    for (var i = 0; i < events.length; i++) {
        //        if (events[i].Name === name) {
        //            return true;
        //        }
        //    }
        //    return false;
        //},
        //getEventsByName: function (name) {
        //    var eventsArray = [];
        //    for (var i = 0; i < events.length; i++) {
        //        if (events[i].Name === name) {
        //            eventsArray.push(events[i]);
        //        }
        //    }
        //    return eventsArray;
        //},
        //getEventsByTargetAndEffect: function (target, effect) {
        //    var effectArray = [];
        //    for (var i = 0; i < events.length; i++) {
        //        if (events[i].Name === effect && events[i].Target === target.Name) {
        //            effectArray.push(events[i]);
        //        }
        //    }
        //    return effectArray;
        //},
        //Used when an event is extended, such as a Pandemic effect
        //Updater: function (name, value) {
        //    for (var i = events.length - 1; i >= 0; i--) {
        //        if (events[i].Name === name) {
        //            events[i].Fire += value;
        //            events[i].Timestamp += value;
        //        }
        //    }
        //},
        //Used when a caster proc overwrites another
        //Scrubber: function (name) {
        //    for (var i = events.length - 1; i >= 0; i--) {
        //        if (events[i].Name === name) {
        //            events.splice(i, 1);
        //        }
        //    }
        //},
        //Used when an effect is consumed
        //Accelerator: function (name) {
        //    for (var i = events.length - 1; i >= 0; i--) {
        //        if (events[i].Name === name) {
        //            events[i].Timestamp = events[i].Timestamp - events[i].Fire;
        //            events[i].Fire = 0;
        //        }
        //    }
        //},
        ////Used when a target effect overwrites another
        //Overrider: function (target, spell) {
        //    removeEffectFromTarget(target, spell.Name);
        //    if (spell.Atones) {
        //        removeEffectFromTarget(target, "Atonement");
        //    }
        //},
        //Used whenever new events are added using AddEvent()
        //SortEvents: function () {
        //    events.sort(function (a, b) {
        //        if (a.Timestamp < b.Timestamp) {
        //            return -1;
        //        }
        //        if (a.Timestamp > b.Timestamp) {
        //            return 1;
        //        }
        //        return 0;
        //    });
        //},
        //Insert the new event right after the current one, to be run immediately.
        //addImmediateEvent: function (eventObj) {
        //    events.splice(1, 0, eventObj);
        //},
        //addEvent: function (eventObj) {
        //    events.push(eventObj);
        //},
        //runNextEvent: function () {
        //    Controller.switchboard(events[0]);
        //    Output.row(events[0]);
        //    cycleTimers();
        //    finishEvent();
        //}
    };
}();
