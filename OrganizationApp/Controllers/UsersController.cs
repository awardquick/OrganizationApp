﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizationApp;
using OrganizationApp.Models;

namespace OrganizationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly OrgEFContext _context;

        public UsersController(OrgEFContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        // GET: api/UsersByOrg/id
        [HttpGet("usersbyorg/{id}")]
        public async Task<ActionResult<Users>> GetUsersByOrgId(int id)
        {
            var usersByOrg = await _context.Users.Where(e => e.OrganizationId == id).ToListAsync();
            if (!usersByOrg.Any())
                return NotFound();
            return Ok(usersByOrg);

        }

        // PUT: api/Users/edit/id
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.UserId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UsersExists(users.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUsers", new { id = users.UserId }, users);
        }

        // DELETE: api/Users/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Users>> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }

        //private async Task ValidateEmail(string emailToValidate)
        //{
        //    string azureBaseUrl = "https://core-mail-validation.azurewebsites.net/api/CheckEmail";
        //    string urlQueryStringParams = 

        //    using (HttpClient client = new HttpClient())
        //    {
        //        using (HttpResponseMessage res = await client.GetAsync(
        //        $"{ azureBaseUrl}{urlQueryStringParams}"))
        //        {
        //            using(HttpContent content = res.Content)
        //            {
        //                string data = await content.ReadAsStringAsync();
        //                if (data != null)
        //                {
        //                    return data;
        //                }
        //                else
        //                    return "";
        //            }

        //        }
        //    }
        //}



        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        private IQueryable<Users> UserbyOrg(int id)
        {
            return _context.Users.Where(e => e.OrganizationId == id);
        }
    }
}