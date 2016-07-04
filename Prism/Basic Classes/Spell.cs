using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Spell
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

        private bool _atones;
        public bool Atones
        {
            get
            {
                return _atones;
            }

            set
            {
                _atones = value;
            }
        }
    }
}
