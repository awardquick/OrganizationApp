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
        IEnumerable<Organizations> GetAll();
        Organizations GetById(int id);

        IEnumerable<Organizations> FindByCondition(Expression<Func<Organizations, bool>> expression);
        void Add(Organizations organization);

        void Update(Organizations organizationChanges);

        void Delete(Organizations entity);
    }
}
