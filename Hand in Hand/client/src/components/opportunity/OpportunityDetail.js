import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import {useHistory} from "react-router-dom";
import  Button  from 'react-bootstrap/Button';
import  Card  from 'react-bootstrap/Card';
import { CardLink } from "reactstrap";
import { OpportunityContext } from "../../providers/OpportunityProvider"
import { MdPerson } from "react-icons/md";
import { MdDomain } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLaptop } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { MdChildFriendly } from "react-icons/md";
import { MdWarning } from "react-icons/md";
import { MdHome } from "react-icons/md";
import {MdPersonOutline} from "react-icons/md";
import { IconContext } from "react-icons";
import "./Opportunity.css";

export default function MyComponent() {
  return (
    <IconContext.Provider
      value={{
        color: "#d29200",
        size: "5em",
        style: { padding: "2px" },
        className: "primaryBackground"
      }}
    >
      <div>
        <MdPerson />
        <MdDomain />
        <MdPhone />
        <MdEmail />
        <MdLaptop />
        <MdGroup />
        <MdChildFriendly />
        <MdWarning />
        <MdHome />
        <MdPersonOutline />
        
      </div>
    </IconContext.Provider>
  );
}


export const OpportunityDetails = () => {
    const history = useHistory();
    const { getOpportunityById } = useContext(OpportunityContext)
    const { opportunityId } = useParams();
    const [ detailOpportunity, setDetailOpportunity ] = useState([]);

    useEffect(() => {
      getOpportunityById(opportunityId)
      .then(setDetailOpportunity)
    }, [])

    let loggedInOrganization = 0

    if(sessionStorage.getItem("organization") !== null){
      loggedInOrganization = JSON.parse(sessionStorage.getItem("organization")).id;
    }
     
      
    return (
        <>
        <div className="opportunity-detailview">
        <div className="top-margin">
            <Card >
                
                <Card.Header><Card.Title><p className="col-lg-6 col-sm-6"><strong>{detailOpportunity.title}</strong></p></Card.Title></Card.Header>
                <Card.Body>
                  <p>{detailOpportunity.content}</p>
                  
                  <MdDomain />{detailOpportunity.location}<p></p>
                  <p>
                  This opportunity is suitable for the following:&nbsp;&nbsp;
                  {detailOpportunity.suitableForGroups? <MdGroup /> : <></>}&nbsp;&nbsp;
                  {detailOpportunity.suitableForIndividuals ? <MdPersonOutline/> : <></>}&nbsp;&nbsp;
                  {detailOpportunity.suitableForAdultsOnly ? <MdWarning/> : <></>}&nbsp;&nbsp;
                  {detailOpportunity.suitableForAllAges ? <MdChildFriendly/> : <></>}&nbsp;&nbsp;
                  {detailOpportunity.suitableForParticipateFromHome ? <MdHome /> : <></>}&nbsp;&nbsp;
                  </p>

                  This is <strong>{detailOpportunity.type ? "an ongoing opportunity" : "a one time project"}</strong>.<p></p>

                  <p>Additional Information: {detailOpportunity.otherInfo}</p>

                  <p></p>
                  <p></p>
                  {detailOpportunity.organization?.organizationName}<p></p>
                  
                  <p>
                  <MdPerson />{detailOpportunity.organization?.contactPerson}&nbsp;&nbsp;
                  <MdPhone />{detailOpportunity.organization?.phone}&nbsp;&nbsp;
                  <MdEmail />   {detailOpportunity.organization?.email}&nbsp;&nbsp;
                  <MdLaptop /><CardLink href="#">{detailOpportunity.organization?.url}</CardLink></p>
                    {/* ? prevents error, as on first load, this info will not yet be defined */}
                </Card.Body>
              
                <div className="button-container">
                {loggedInOrganization === detailOpportunity.organizationId
                ? <Button variant="dark" className="button" onClick={() => {history.push(`/opportunity/edit/${detailOpportunity.id}`)}}>Edit</Button> 
                : <div></div>
                }
       
                {loggedInOrganization === detailOpportunity.organizationId
                ? <Button variant="dark" className="button" onClick={() => {history.push(`/opportunity/delete/${detailOpportunity.id}`)}}>Delete</Button> 
                : <div></div>
                }

                <Button variant="dark" onClick={() => history.push("/opportunity")}>
                BACK TO OPPORTUNITIES
                </Button>
                </div>

               
              </Card>
              </div>
              </div>
        </>
    )
}

