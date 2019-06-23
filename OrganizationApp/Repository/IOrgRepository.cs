using OrganizationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OrganizationApp.Repository
{
    public interface IOrgRepository
    {
        IEnumerable<Organization> GetAll();
        Organization GetById(int id);

        IEnumerable<Organization> FindByCondition(Expression<Func<Organization, bool>> expression);
        void Add(Organization organization);

        void Update(Organization organizationChanges);

        void Delete(Organization entity);
    }
}
