using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prism.Basic_Classes
{
    public class CastingEvent
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

        private decimal _fire;
        public decimal Fire
        {
            get
            {
                return _fire;
            }

            set
            {
                _fire = value;
            }
        }

        private string _message;
        public string Message
        {
            get
            {
                return _message;
            }

            set
            {
                _message = value;
            }
        }

        private string _tag;
        public string Tag
        {
            get
            {
                return _tag;
            }

            set
            {
                _tag = value;
            }
        }

        private decimal _timestamp;
        public decimal Timestamp
        {
            get
            {
                return _timestamp;
            }

            set
            {
                _timestamp = value;
            }
        }

        private string _target;
        public string Target
        {
            get
            {
                return _target;
            }

            set
            {
                _target = value;
            }
        }

        private decimal _value;
        public decimal Value
        {
            get
            {
                return _value;
            }

            set
            {
                _value = value;
            }
        }

    }
}
