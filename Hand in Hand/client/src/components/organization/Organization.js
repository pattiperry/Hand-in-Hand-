import React from "react";
import { CardLink } from "reactstrap";
import  Card  from 'react-bootstrap/Card';
import { MdPerson } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdDomain } from "react-icons/md";
import { MdLaptop } from "react-icons/md";
import "./Organization.css";

export const Organization = ({ organization }) => {
  
    return (
    <>
    <Card className="card" border="dark" style={{ width: '18rem' }}>
    <Card.Header><Card.Title>{organization.organizationName}</Card.Title></Card.Header>

    <Card.Body>
    <MdDomain />{organization.location}<p></p>
    <MdPhone />{organization.phone}<p></p>
    
    <MdLaptop /><CardLink href="#">{organization.url}</CardLink>
        <p></p>
      
    <MdPerson />{organization.contactPerson}<p></p>
    <MdEmail />{organization.email}<p></p>
      
    

    </Card.Body>
  </Card>
  </>
  );
};

