import React, { useContext, useEffect, useState } from "react"
import { OpportunityContext } from "../../providers/OpportunityProvider"
import { useHistory, useParams } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import  Form  from 'react-bootstrap/Form';
import "./Opportunity.css";


export const OpportunityForm = () => {
    const { addOpportunity, getOpportunityById, editOpportunity } = useContext(OpportunityContext);

    const loggedInOrganization = JSON.parse(sessionStorage.getItem("organization")).id;

    const [opportunityFormInput, setOpportunityFormInput] = useState({
        title: "",
        content: "",
        organizationId: loggedInOrganization,
        location: "",
        suitableForGroups: false,
        suitableForIndividuals: false,
        suitableForAdultsOnly: false,
        suitableForAllAges: false,
        suitableForParticipateFromHome: false,
        type: false,
        otherInfo: ""
    });
    
    const { opportunityId } = useParams();
    const history = useHistory();

    // wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (opportunityId) {
            getOpportunityById(opportunityId)
                .then(opportunity => {
                    setOpportunityFormInput(opportunity)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }

    }, []);

    //when a field changes, update state. The return will re-render and display based on the values in state //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newOpportunity = { ...opportunityFormInput }
        //opportunityFormInput is an object with properties , set the property to the new value using obejct bracket notation
        newOpportunity[event.target.id] = event.target.value
        //update state
        setOpportunityFormInput(newOpportunity)
    }

    const handleCheckboxClick = (event) => {
        let newOpportunity = { ...opportunityFormInput }
        newOpportunity[event.target.id] = event.target.checked
        setOpportunityFormInput(newOpportunity)
    }

    const handleClickSaveOpportunity = (event) => {
        event.preventDefault();
        setIsLoading(true);
        // debugger
        if (opportunityId) {
            // debugger
            // PUT update
            editOpportunity({
                Id: parseInt(opportunityId),
                Title: opportunityFormInput.title,
                Content: opportunityFormInput.content,
                OrganizationId: parseInt(opportunityFormInput.organizationId),
                Location: opportunityFormInput.location,
                SuitableForGroups: opportunityFormInput.suitableForGroups,
                SuitableForIndividuals: opportunityFormInput.suitableForIndividuals,
                SuitableForAdultsOnly: opportunityFormInput.suitableForAdultsOnly,
                SuitableForAllAges: opportunityFormInput.suitableForAllAges,
                SuitableForParticipateFromHome: opportunityFormInput.suitableForParticipateFromHome,
                Type: opportunityFormInput.type,
                OtherInfo: opportunityFormInput.otherInfo
            })
                .then(() => history.push(`/opportunity`))
        } else {
            // debugger
            addOpportunity({
                Title: opportunityFormInput.title,
                Content: opportunityFormInput.content,
                OrganizationId: parseInt(opportunityFormInput.organizationId),
                Location: opportunityFormInput.location,
                SuitableForGroups: opportunityFormInput.suitableForGroups,
                SuitableForIndividuals: opportunityFormInput.suitableForIndividuals,
                SuitableForAdultsOnly: opportunityFormInput.suitableForAdultsOnly,
                SuitableForAllAges: opportunityFormInput.suitableForAllAges,
                SuitableForParticipateFromHome: opportunityFormInput.suitableForParticipateFromHome,
                Type: opportunityFormInput.type,
                OtherInfo: opportunityFormInput.otherInfo
            })
                .then(() => history.push(`/opportunity`))
        }
    }

    return (
        <>
    <Form className="opportunity-form">
        <h2 className="opportunityForm__title">New Opportunity</h2>
        <p></p>
        <Form.Group >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="" id="title" onChange={handleControlledInputChange} value={opportunityFormInput.title}/>   
        </Form.Group>
        <p></p>
        <Form.Group >
            <Form.Label>Provide a full description of your opportunity.</Form.Label>
            <Form.Control as="textarea" rows={3} id="content" onChange={handleControlledInputChange} value={opportunityFormInput.content}/>
        </Form.Group>
        <p></p>
        <Form.Group >
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" id="location" onChange={handleControlledInputChange} value={opportunityFormInput.location}/>
        </Form.Group>
        <p></p>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Label>Who is your opportunity best suited for? Check all that apply.</Form.Label>
            <Form.Check type="checkbox" label="Groups" id="suitableForGroups" onChange={handleCheckboxClick} value={opportunityFormInput.suitableForGroups}/>

            <Form.Check type="checkbox" label="Individuals" id="suitableForIndividuals" onChange={handleCheckboxClick} value={opportunityFormInput.suitableForIndividuals}/>

            <Form.Check type="checkbox" label="All Ages" id="suitableForAllAges" onChange={handleCheckboxClick} value={opportunityFormInput.suitableForAllAges}/>

            <Form.Check type="checkbox" label="Adults Only" id="suitableForAdultsOnly" onChange={handleCheckboxClick} value={opportunityFormInput.suitableForAdultsOnly}/>

            <Form.Check type="checkbox" label="Participate From Home" id="suitableForParticipateFromHome" onChange={handleCheckboxClick} value={opportunityFormInput.suitableForParticipateFromHome}/>
        </Form.Group>
        <p></p>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Label>Is this an ongoing opportunity? If so please check yes.</Form.Label>
            <Form.Check type="checkbox" label="Yes, ongoing opportunity." id="type" onChange={handleCheckboxClick} value={opportunityFormInput.type}/>
        </Form.Group>
        <p></p>
        <Form.Group >
            <Form.Label>Please provide any additional information that will help volunteers. </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Additional Information"id="otherInfo" onChange={handleControlledInputChange} value={opportunityFormInput.otherInfo}/>
        </Form.Group>
        <p></p>

        <div className="button-container">
        <Button variant="dark" type="submit" onClick={handleClickSaveOpportunity} disable={isLoading.toString()}>
            {opportunityId ? <> Save Opportunity </>:<> Submit Opportunity</>}
        </Button>
        <p></p>
        <Button variant="dark" type="submit" onClick={()=> {history.push("/opportunity")}}>
           Cancel
        </Button>
        </div>
    </Form>

        
        </>
    )
}
