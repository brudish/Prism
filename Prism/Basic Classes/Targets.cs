using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Targets
    {
        private List<Target> _targets;

        public void InitTargets(int count, string targetType)
        {
            for (int i = 0; i < count; i++)
            {
                _targets[i] = new Target(i, targetType);
            }
        }

        public Target GetTargetByName(string name)
        {
            return _targets.Find(x => x.Name == name);
        }
        public List<Target> GetTargets()
        {
            return _targets;
        }
        public int GetCount()
        {
            return _targets.Count;
        }
        public decimal GetAmountByName(string name)
        {
            return _targets.Find(x => x.Name == name).GetAmount();
        }

        public void CycleEffects(decimal time)
        {
            foreach (Target target in _targets)
            {
                target.CycleEffects(time);
            }
        }

    }
}
