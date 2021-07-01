import React from "react";
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import  Button  from 'react-bootstrap/Button';
import  Card  from 'react-bootstrap/Card';
import "./Opportunity.css";

export const Opportunity = ({ opportunity }) => {
  
    const firebaseUserId = JSON.parse(sessionStorage.getItem("organization")).firebaseUserId

    const history = useHistory();

    return (
      <>
    <Card border="dark" style={{ width: '18rem' }}>
    <Card.Header>Header</Card.Header>

    <Card.Body>
      {/* Added link to post header. On click go to details view */}
      <Card.Title><Link to={`/opportunity/detail/${opportunity.id}`} style={{ textDecoration: 'none', color: 'black'}}><p><strong>{opportunity.title}</strong></p></Link></Card.Title>

      <Card.Text>
       {opportunity.content}
      </Card.Text>

      <div className="button-container">
      {firebaseUserId
        ? <Button className="button btn btn-sm" onClick={() => {history.push(`/opportunity/edit/${opportunity.id}`)}}>Edit</Button> 
        : <div></div>
      }
       
      {firebaseUserId 
      ? <Button className="button btn btn-sm" onClick={() => {history.push(`/opportunity/delete/${opportunity.id}`)}}>Delete</Button> 
      : <div></div>
      }
      </div>
    </Card.Body>
  </Card>
  </>
  );
};

