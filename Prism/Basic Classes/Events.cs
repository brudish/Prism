using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Events
    {
        private List<CastEvent> events;

        private void CycleTimers()
        {
            int time = GetNextTime();

            //Timers.cycleTimers(time);
            CycleEventTimers(time);
        }

        private int GetNextTime()
        {
            if (events.Length > 1)
            {
                return events[1].Fire - events[0].Fire;
            }
            return 0;
        }

        private void CycleEventTimers(int time)
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
            for (var i = target.Effects.Count - 1; i >= 0; i--)
            {
                if (target.Effects[effect] != null)
                {
                    target.Effects.Remove(effect);
                    RemoveTargetEventsByType(target, effect);
                }
            }
        }

        private void RemoveTargetEventsByType(Target target, string effect)
        {
            for (var i = events.Count - 1; i >= 0; i--)
            {
                if (events[i].Target == target.Name)
                {
                    if (events[i].Name == effect)
                    {
                        events.RemoveAt(i);
                    }
                }
            }
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

        public List<CastEvent> GetEventsByName(string name)
        {
            List<CastEvent> eventList = new List<CastEvent>();

            for (var i = 0; i < events.Count; i++)
            {
                if (events[i].Name == name)
                {
                    eventList.Add(events[i]);
                }
            }

            return eventList;
        }

        public List<CastEvent> GetEventsByTargetAndEffect(Target target, string effect)
        {
            List<CastEvent> eventList = new List<CastEvent>();

            for (var i = 0; i < events.Count; i++)
            {
                if (events[i].Name == effect && events[i].Target == target.Name)
                {
                    eventList.Add(events[i]);
                }
            }

            return eventList;
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
            target.Effects.Remove(spell.Name);
            if (spell.Atones)
            {
                target.Effects.Remove("Atonement");
            }
        }

        public void AddImmediateEvent(CastEvent eventObj)
        {
            events.Insert(0, eventObj);
        }

        public void AddEvent(CastEvent eventObj)
        {
            events.Add(eventObj);
        }

        public void SortEvents()
        {
            events.Sort((CastEvent a, CastEvent b) => {
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
