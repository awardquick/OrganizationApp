using System;
using System.Collections.Generic;
using System.Linq;
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
    public class OrganizationsController : ControllerBase
    {
        private readonly OrgEFContext _context;

        public OrganizationsController(OrgEFContext context)
        {
            _context = context;
        }

        // GET: api/Organizations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organizations>>> GetOrganizations()
        {
            return await _context.Organizations.ToListAsync();
        }

        // GET: api/Organizations/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Organizations>> GetOrganizations(int id)
        {
            var organizations = await _context.Organizations.FindAsync(id);

            if (organizations == null)
            {
                return NotFound();
            }

            return organizations;
        }

        // PUT: api/Organizations/edit/id
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutOrganizations(int id, Organizations organizations)
        {
            if (id != organizations.OrganizationId)
            {
                return BadRequest();
            }

            _context.Entry(organizations).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganizationsExists(id))
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

        // POST: api/Organizations/id
        [HttpPost]
        public async Task<ActionResult<Organizations>> PostOrganizations(Organizations organizations)
        {
            //if(organizations.OrganizationId == 0)
            //{
            //    organizations.OrganizationId = null;
            //}
            _context.Organizations.Add(organizations);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrganizationsExists(organizations.OrganizationId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrganizations", new { id = organizations.OrganizationId }, organizations);
        }

        // DELETE: api/Organizations/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Organizations>> DeleteOrganizations(int id)
        {
            var organizations = await _context.Organizations.FindAsync(id);
            if (organizations == null)
            {
                return NotFound();
            }

            _context.Organizations.Remove(organizations);
            await _context.SaveChangesAsync();

            return organizations;
        }

        private bool OrganizationsExists(int id)
        {
            return _context.Organizations.Any(e => e.OrganizationId == id);
        }
    }
}
