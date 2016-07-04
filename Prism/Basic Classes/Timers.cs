using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Timers
    {   
        private List<Cooldown> _activeCooldowns;

        private decimal _clock = 0;
        public decimal Clock
        {
            get
            {
                return _clock;
            }
        }

        private decimal _limit = 180;
        public decimal Limit
        {
            get
            {
                return _limit;
            }
        }

        public void CycleActiveCooldowns(decimal time)
        {
            Cycle(ref _activeCooldowns, time);
        }

        public static void Cycle(ref List<Cooldown> timers, decimal time)
        {
            foreach (Cooldown timer in timers)
            {
                timer.CooldownTime -= time;
                if (timer.CooldownTime <= 0) timers.Remove(timer);
            }
        }

        public bool IsRunning()
        {
            return Clock < Limit;
        }

        public void CycleTimers(decimal time)
        {
            _clock += time;
            CycleActiveCooldowns(time);
        }

        public void InitiateCooldown(string name, decimal cooldown)
        {
            _activeCooldowns.Add(new Cooldown(name, cooldown));
        }

        public bool IsCooldown(string name)
        {
            return _activeCooldowns.Exists(x => x.Name == name);
        }

        public void ResetCooldown(string name)
        {
            _activeCooldowns.Remove(_activeCooldowns.Find(x => x.Name == name));
        }
    }
}
