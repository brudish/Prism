using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Target
    {
        private string _name;
        public string Name
        {
            get
            {
                return _name;
            }

            set
            {
                _name = value;
            }
        }
        public string TargetType
        {
            get
            {
                return _targetType;
            }
        }

        private string _targetType;

        public List<Cooldown> Effects;

        private decimal _amount = 0;

        public Target(int num, string targetType)
        {
            _name = String.Format("target{0}", num);
            Effects = new List<Cooldown>();
            _targetType = targetType;
        }

        public void AddSpellAmount(int value)
        {
            _amount += value;
        }

        public decimal GetAmount()
        {
            return _amount;
        }

        public void AffectTarget(string name, Cooldown effect)
        {
            Effects.Add(effect);
        }

        public bool HasEffect(Cooldown effect)
        {
            return Effects.Find(x => x.Name == effect.Name) != null;
        }

        internal void CycleEffects(decimal time)
        {
            Timers.Cycle(ref Effects, time);
        }
    }
}
