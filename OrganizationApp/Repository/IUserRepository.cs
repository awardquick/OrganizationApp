using OrganizationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OrganizationApp.Repository
{
    public interface IUserRepository
    {
        IEnumerable<Users> GetAll();
        Users GetById(int id);

        IEnumerable<Users> FindByCondition(Expression<Func<Users, bool>> expression);
        void Add(Users organization);

        void Update(Users organizationChanges);

        void Delete(Users entity);
    }
}
