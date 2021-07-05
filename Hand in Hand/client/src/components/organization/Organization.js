import React from "react";
import  Card  from 'react-bootstrap/Card';
import "./Organization.css"

export const Organization = ({ organization }) => {
  
    return (
      <>
    <Card border="dark" style={{ width: '18rem' }}>
    <Card.Header>{organization.organizationName}</Card.Header>

    <Card.Body>
      
      <Card.Text>
      <p>{organization.url}</p>
            <p>{organization.location}</p>
            <p>{organization.phone}</p>
            <p>{organization.email}</p>
            <p>{organization.contactPerson}</p>
              
      </Card.Text>

      
    </Card.Body>
  </Card>
  </>
  );
};




