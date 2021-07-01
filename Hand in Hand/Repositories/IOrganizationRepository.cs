using Hand_in_Hand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Repositories
{
    public interface IOrganizationRepository
    {
        Organization GetByFirebaseUserId(string firebaseUserId);

        void Add(Organization organization);
        void Edit(Organization organization);
    }
}
