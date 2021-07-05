import React, { useContext, useEffect } from "react";
import { OpportunityContext } from "../../providers/OpportunityProvider"
import { Opportunity } from "../opportunity/Opportunity";
import  Button  from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import "./Opportunity.css";

export const OpportunityList = () => {
  const { opportunities, getAllOpportunities } = useContext(OpportunityContext);
  const history = useHistory();

  useEffect(() => {
    getAllOpportunities();
  }, []);

  return (
    <div className="container">
      <div >
      <Button variant="dark" onClick={() => history.push("/opportunity/add")}>
            ADD NEW OPPORTUNITY
        </Button>
        <div className="cards-column">
          {opportunities.map((opportunity) => (
            <Opportunity key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
};