import React, { useState, useContext } from "react";
import { OrganizationContext } from "./OrganizationProvider";

export const OpportunityContext = React.createContext();

export const OpportunityProvider = (props) => {
  const apiUrl = "/api/opportunity";
  const { getToken } = useContext(OrganizationContext);
  
  const [ opportunities, setOpportunities] = useState([]);
  
  //searchTerms is the variable declared
  //setSearchTerms is the function to update the variable searchTerms
  //the useState hook will hold and set the string of searchTerms
  const [searchTerms, setSearchTerms] = useState("")

  const getAllOpportunities = () => {
    return fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json" 
            }
        })
      .then(resp => resp.json())
      .then(setOpportunities);
  };
  
  const addOpportunity = (opportunity) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(opportunity)
          }))
          .then(resp => resp.json())
  };

  const getOpportunityById = (opportunityId) => {
    return fetch(`${apiUrl}/${opportunityId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json" 
            }
        })
        .then(resp => resp.json())    
  }

  // Provider method to edit an opportunity by sending a PUT request based on an opportunity Object
  // to the Web API with a firebase Token for authentication.
  const editOpportunity = (opportunity) => {
    return getToken().then((token) => {
        fetch(`${apiUrl}/${opportunity.Id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(opportunity)
    })});
  };

  // Provider method to delete a opportunity by sending a DELETE request based on a opportunity's ID
  // to the Web API with a firebase Token for authentication.
  const deleteOpportunity = (opportunityId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${opportunityId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
    }));
  };

  return (
    <OpportunityContext.Provider value={{ opportunities, getAllOpportunities, getOpportunityById, addOpportunity, editOpportunity, deleteOpportunity, searchTerms, setSearchTerms }}>
      {props.children}
    </OpportunityContext.Provider>
  );
};