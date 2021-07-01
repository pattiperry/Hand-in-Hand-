using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Models
{
    public class Opportunity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int OrganizationId { get; set; }
        public Organization organization { get; set; }
        public string Location { get; set; }
        public bool SuitableForGroups { get; set; }
        public bool SuitableForIndividuals { get; set; }
        public bool SuitableForAllAges { get; set; }
        public bool SuitableForAdultsOnly { get; set; }
        public bool SuitableForParticipateFromHome { get; set; }
        public bool Type { get; set; }
        public string OtherInfo { get; set; }

    }
}
