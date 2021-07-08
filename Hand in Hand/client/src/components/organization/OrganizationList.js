import React, { useContext, useEffect } from "react";
import { OrganizationContext } from "../../providers/OrganizationProvider"
import { Organization } from "./Organization"
import  Button  from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";

export const OrganizationList = () => {
  const { organizations, getAllOrganizations } = useContext(OrganizationContext);
  const history = useHistory();

  useEffect(() => {
    getAllOrganizations();
  }, []);

  return (
    <div className=" ">

      <Button variant="dark" onClick={() => history.push("/opportunity")}>
            BACK TO OPPORTUNITIES
        </Button>
  <h1 className="organization-title">Organizations</h1>
       <div className="container">
          {organizations.map((organization) => (
            <Organization key={organization.id} organization={organization} />
          ))}
        </div>
        
      
    </div>
  );
};