using Hand_in_Hand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Repositories
{
    public interface IOpportunityRepository
    {
        List<Opportunity> GetAll();
        Opportunity GetById(int id);
        void Add(Opportunity opportunity);
        void Delete(int id);
        void Edit(Opportunity opportunity);


    }
}
