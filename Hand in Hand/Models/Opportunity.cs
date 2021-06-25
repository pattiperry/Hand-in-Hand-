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
        public int OrganiztionId { get; set; }
        public Organization organization { get; set; }
        public string Location { get; set; }
        public int OpportunityTypeId { get; set; }
        public int SuitableForId { get; set; }
        public string OtherInfo { get; set; }

    }
}
