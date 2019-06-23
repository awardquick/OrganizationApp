using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganizationApp.Models;

namespace OrganizationApp.Repository
{
    public class OrganizationRepository : IOrgRepository
    {
        protected readonly DbContext Context;

        public OrganizationRepository(DbContext context)
        {
            Context = context;
        }
        public void Add(Organizations organization)
        {
            Context.Set<Organizations>().Add(organization);
        }

        public void Delete(Organizations organization)
        {
            Context.Set<Organizations>().Remove(organization);
        }

        public IEnumerable<Organizations> FindByCondition(Expression<Func<Organizations, bool>> expression)
        {
            return Context.Set<Organizations>().Where(expression);
        }

        public IEnumerable<Organizations> GetAll()
        {
            return Context.Set<Organizations>().ToList();
        }

        public Organizations GetById(int id)
        {
            return Context.Set<Organizations>().Find(id);
        }



        public void Update(Organizations organizationChanges)
        {
            Context.Set<Organizations>().Update(organizationChanges);
        }
    }
}