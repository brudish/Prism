using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Events
    {
        private List<CastingEvent> events;

        private void CycleTimers()
        {
            decimal time = GetNextTime();

            //Timers.CycleActiveCooldowns(time);
            CycleEventTimers(time);
        }

        private decimal GetNextTime()
        {
            if (events.Count > 1)
            {
                return events[1].Fire - events[0].Fire;
            }
            return 0;
        }

        private void CycleEventTimers(decimal time)
        {
            for (var i = 0; i < events.Count; i++)
            {
                events[i].Fire -= time;
            }
        }

        private void FinishEvent()
        {
            events.RemoveAt(0);
        }

        private void RemoveEffectFromTarget(Target target, string effect)
        {
            if (target.Effects.Exists(x => x.Name == effect))
            {
                Cooldown activeEffect = target.Effects.Find(x => x.Name == effect);
                target.Effects.Remove(activeEffect);
                RemoveTargetEventsByType(target, effect);
            }
        }

        private void RemoveTargetEventsByType(Target target, string effect)
        {
            CastingEvent thisEvent = events.Find(x => x.Target.Equals(target) && x.Name == effect);
            events.Remove(thisEvent);
        }

        public bool HasEventByName(string name)
        {
            for (int i = 0; i < events.Count; i++)
            {
                if (events[i].Name == name)
                {
                    return true;
                }
            }
            return false;
        }

        public List<CastingEvent> GetEventsByName(string name)
        {
            return events.FindAll(x => x.Name == name);
        }

        public List<CastingEvent> GetEventsByTargetAndEffect(Target target, string effect)
        {
            return events.FindAll(x => x.Target.Equals(target) && x.Name == effect);
        }

        public void PandemicExtend(string name, int value)
        {
            for (var i = events.Count - 1; i >= 0; i--)
            {
                if (events[i].Name == name)
                {
                    events[i].Fire += value;
                    events[i].Timestamp += value;
                }
            }
        }

        public void OverwriteCasterProc(string name)
        {
            for (var i = events.Count - 1; i >= 0; i--)
            {
                if (events[i].Name == name)
                {
                    events.RemoveAt(i);
                }
            }
        }

        public void AccelerateEffect(string name)
        {
            for (var i = events.Count - 1; i >= 0; i--)
            {
                if (events[i].Name == name)
                {
                    events[i].Timestamp = events[i].Timestamp - events[i].Fire;
                    events[i].Fire = 0;
                }
            }
        }

        public void OverwriteTargetEffect(Target target, Spell spell)
        {
            Cooldown activeEffect = target.Effects.Find(x => x.Name == spell.Name);
            target.Effects.Remove(activeEffect);
            if (spell.Atones)
            {
                Cooldown atonement = target.Effects.Find(x => x.Name == "Atonement");
                target.Effects.Remove(atonement);
            }
        }

        public void AddImmediateEvent(CastingEvent eventObj)
        {
            events.Insert(0, eventObj);
        }

        public void AddEvent(CastingEvent eventObj)
        {
            events.Add(eventObj);
        }

        public void SortEvents()
        {
            events.Sort((CastingEvent a, CastingEvent b) => {
                if (a.Timestamp < b.Timestamp)
                {
                    return -1;
                }
                if (a.Timestamp > b.Timestamp)
                {
                    return 1;
                }
                return 0;
            });
        }

        public void RunNextEvent()
        {
            //Controller.switchboard(events[0]);
            //Output.row(events[0]);
            CycleTimers();
            FinishEvent();
        }
    }
}
