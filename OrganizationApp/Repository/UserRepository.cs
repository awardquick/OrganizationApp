using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganizationApp.Models;

namespace OrganizationApp.Repository
{
    public class UserRepository : IUserRepository
    {
        protected readonly DbContext Context;

        public UserRepository(DbContext context)
        {
            Context = context;
        }
        public void Add(Users user)
        {
            Context.Set<Users>().Add(user);
        }

        public void Delete(Users user)
        {
            Context.Set<Users>().Remove(user);
        }

        public IEnumerable<Users> FindByCondition(Expression<Func<Users, bool>> expression)
        {
            return Context.Set<Users>().Where(expression);
        }

        public IEnumerable<Users> GetAll()
        {
            return Context.Set<Users>().ToList();
        }

        public Users GetById(int id)
        {
            return Context.Set<Users>().Find(id);
        }



        public void Update(Users userChanges)
        {
            Context.Set<Users>().Update(userChanges);
        }
    }
}