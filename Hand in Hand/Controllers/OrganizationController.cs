using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hand_in_Hand.Repositories;
using Hand_in_Hand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hand_in_Hand.Controllers
{
   //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationRepository _organizationRepository;
        public OrganizationController(IOrganizationRepository organizationRepository)
        {
            _organizationRepository = organizationRepository;
        }

        // GET: api/<OrganizationController>
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetOrganization(string firebaseUserId)
        {
            return Ok(_organizationRepository.GetByFirebaseUserId(firebaseUserId));
        }

        //This method is for the volunteer page
        //it gets the full list of all the organizations from the database
        // GET: api/<OrganizationController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_organizationRepository.GetAll());
        }

        // POST api/<OrganizationController>
        [HttpPost]
        public IActionResult Post(Organization organization)
        {
            _organizationRepository.Add(organization);
            return CreatedAtAction(
                nameof(GetOrganization),
                new { firebaseUserId = organization.FirebaseUserId },
                organization);
        }

        // PUT api/<OrganizationController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Organization organization)
        {
            _organizationRepository.Edit(organization);
            return NoContent();
        }

        // DELETE api/<OrganizationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
