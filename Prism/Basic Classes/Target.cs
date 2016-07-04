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

        public Dictionary<string, int?> Effects;

        private int _amount;

        public void AddSpellAmount(int value)
        {
            _amount += value;
        }
    }
}
