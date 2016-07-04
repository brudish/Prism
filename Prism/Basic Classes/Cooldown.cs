using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class Cooldown
    {
        public string Name
        {
            get
            {
                return _name;
            }
        }
        private string _name;

        public decimal CooldownTime
        {
            get
            {
                return _cooldown;
            }

            set
            {
                _cooldown = value;
            }
        }
        private decimal _cooldown;

        public Cooldown (string name, decimal cooldown)
        {
            _name = name;
            _cooldown = cooldown;
        }
    }
}
