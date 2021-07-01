import React, { useContext, useEffect } from "react";
import { OpportunityContext } from "../../providers/OpportunityProvider"
import { Opportunity } from "../opportunity/Opportunity";

export const OpportunityList = () => {
  const { opportunities, getAllOpportunities } = useContext(OpportunityContext);

  useEffect(() => {
    getAllOpportunities();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {opportunities.map((opportunity) => (
            <Opportunity key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
};