import React from "react";
import { Link } from 'react-router-dom';
import  Card  from 'react-bootstrap/Card';
import "./Opportunity.css";

export const Opportunity = ({ opportunity }) => {
  
    return (
      <>
      
    <Card border="dark" style={{ width: '18rem' }}>
    <Card.Header>{/* Added link to post header. On click go to details view */}
      <Card.Title><Link to={`/opportunity/detail/${opportunity.id}`} style={{ textDecoration: 'none', color: 'black'}}><p><strong>{opportunity.title}</strong></p></Link></Card.Title></Card.Header>

    <Card.Body>
      <Card.Text>
       {opportunity.content}
      </Card.Text>

    </Card.Body>
  </Card>
  </>
  );
};

