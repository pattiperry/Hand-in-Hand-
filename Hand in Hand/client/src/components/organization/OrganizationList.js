import React, { useContext, useEffect } from "react";
import { OrganizationContext } from "../../providers/OrganizationProvider"
import { Organization } from "../organization/Organization"


export const OrganizationList = () => {
  const { organizations, getAllOrganizations } = useContext(OrganizationContext);
  

  useEffect(() => {
    getAllOrganizations();
  }, []);

  return (
    <div className="container">
      <div >
      
        <div className="cards-column">
          {organizations.map((organization) => (
            <Organization key={organization.id} organization={organization} />
          ))}
        </div>
        
      </div>
    </div>
  );
};