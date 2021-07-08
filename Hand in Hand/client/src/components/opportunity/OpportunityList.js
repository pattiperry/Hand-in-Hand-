import React, { useContext, useEffect, useState } from "react";
import { OpportunityContext } from "../../providers/OpportunityProvider"
import { Opportunity } from "../opportunity/Opportunity";
import  Button  from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import "./Opportunity.css";
import { OrganizationContext } from "../../providers/OrganizationProvider"

export const OpportunityList = () => {
  const { opportunities, getAllOpportunities, searchTerms, setSearchTerms } = useContext(OpportunityContext);
  const history = useHistory();
  const { isLoggedIn } = useContext(OrganizationContext);
  const [filteredOpportunities, setFilteredOpportunities] = useState([])

  useEffect(() => {
    getAllOpportunities();
  }, []);

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching opportunites
      const subset = opportunities.filter(currentOpportunity => currentOpportunity.title.toLowerCase().includes(searchTerms) || 
      currentOpportunity.content.toLowerCase().includes(searchTerms))

      setFilteredOpportunities(subset)
    } else {
      // If the search field is blank, display all opportunities
      setFilteredOpportunities(opportunities)
    }
  }, [searchTerms, opportunities])

  return (
    <div className="card-container">
      <div >
      {!isLoggedIn ? <Button variant="dark" onClick={() => history.push("/organization")}>
            VIEW ALL ORGANIZATIONS
        </Button> : <> </> }
      {isLoggedIn ? <Button variant="dark" onClick={() => history.push("/opportunity/add")}>
            ADD NEW OPPORTUNITY
        </Button> : <> </> }
        <div className="cards">
          {filteredOpportunities.map((opportunity) => (
            <Opportunity key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
        
      </div>
    </div>
  );
};