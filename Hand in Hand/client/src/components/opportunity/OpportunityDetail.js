import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import {useHistory} from "react-router-dom";
import  Button  from 'react-bootstrap/Button';
import  Card  from 'react-bootstrap/Card';
import { OpportunityContext } from "../../providers/OpportunityProvider"
import "./Opportunity.css";

export const OpportunityDetails = () => {
    const history = useHistory();
    const { getOpportunityById } = useContext(OpportunityContext)
    const { opportunityId } = useParams();
    const [ detailOpportunity, setDetailOpportunity ] = useState([]);

    useEffect(() => {
      getOpportunityById(opportunityId)
      .then(setDetailOpportunity)
    }, [])

    const loggedInOrganization = 0

    if(sessionStorage.getItem("organization") !== null){
      const loggedInOrganization = JSON.parse(sessionStorage.getItem("organization")).id;
    } 
      
    
    
    
      
    return (
        <>
            <Card className="m-8">
                
                <Card.Title><p className="col-lg-6 col-sm-6"><strong>{detailOpportunity.title}</strong></p></Card.Title>
                <Card.Body>
                  <p>Description: {detailOpportunity.content}</p>
                  
                  <p>Location: {detailOpportunity.location}</p>
                  <p>This opportunity is suitable for the following:</p>
                  <p>{detailOpportunity.suitableForGroups}</p>
                  <p>{detailOpportunity.suitableForIndividuals}</p>
                  <p>{detailOpportunity.suitableForAdultsOnly}</p>
                  <p>{detailOpportunity.suitableForAllAges}</p>
                  <p>{detailOpportunity.suitableForParticipateFromHome}</p>
                  <p>{detailOpportunity.type}</p>
                  <p>Additional Information: {detailOpportunity.otherInfo}</p>
                  <p>Posted by: {detailOpportunity.organization?.organizationName}</p>
                  <p>Organization Url:{detailOpportunity.organization?.url}</p>
                  <p>Contact Person: {detailOpportunity.organization?.contactPerson}</p>

                  
                    {/* ? prevents error, as on first load, this info will not yet be defined */}
                </Card.Body>

                <div className="button-container">
      {loggedInOrganization === detailOpportunity.organizationId
        ? <Button className="button btn btn-sm" onClick={() => {history.push(`/opportunity/edit/${detailOpportunity.id}`)}}>Edit</Button> 
        : <div></div>
      }
       
      {loggedInOrganization === detailOpportunity.organizationId
      ? <Button className="button btn btn-sm" onClick={() => {history.push(`/opportunity/delete/${detailOpportunity.id}`)}}>Delete</Button> 
      : <div></div>
      }
      </div>
            </Card>
        </>
    )
}
