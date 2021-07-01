using Hand_in_Hand.Models;
using Hand_in_Hand.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class OpportunityController : ControllerBase
    {
        private readonly IOpportunityRepository _opportunityRepository;
        public OpportunityController(IOpportunityRepository opportunityRepository)
        {
            _opportunityRepository = opportunityRepository;
        }


        //This method is for the opportunity page
        //it gets the full list of all the opportunities from the database
        // GET: api/<OpportunityController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_opportunityRepository.GetAll()); 
        }


        //This method is for the OPPORTUNITY DETAILS page
        //It gets an Opportunity from the database by the OpportunityId
        // GET api/<OpportunityController>/5
        [HttpGet("{opportunityid}")]
        public IActionResult Get(int opportunityId)
        {
            var opportunity = _opportunityRepository.GetById(opportunityId);
            if (opportunity == null)
            {
                return NotFound();
            }
            return Ok(opportunity);
        }

        //This method is for adding an Opportunity
        // POST api/<OpportunityController>
        [HttpPost]
        public IActionResult Post(Opportunity opportunity)
        {
            _opportunityRepository.Add(opportunity);
            return Ok(opportunity);
        }

        //This method is for Editing an Opportunity 
        //It uses the opportunity Id
        // PUT api/<OpportunityController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Opportunity opportunity)
        {
            _opportunityRepository.Edit(opportunity);
            return NoContent();
        }


        //This method is to Delete an opportunity
        // DELETE api/<OpportunityController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _opportunityRepository.Delete(id);
            return NoContent();
        }
    }
}
