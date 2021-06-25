using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Models
{
    public class SuitableFor
    {
        public int Id { get; set; }
        public bool Groups { get; set; }
        public bool Individuals { get; set; }
        public bool AdultsOnly { get; set; }
        public bool AllAges { get; set; }
        public bool ParticipateFromHome { get; set; }
    }
}
