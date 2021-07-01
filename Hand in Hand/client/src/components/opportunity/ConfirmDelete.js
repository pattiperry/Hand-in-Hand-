import React, { useContext} from "react";
import {useParams, useHistory } from "react-router-dom";
import {OpportunityContext} from "../../providers/OpportunityProvider"



export const ConfirmDelete = () => {
    const { deleteOpportunity, getAllOpportunities } = useContext(OpportunityContext);
    const {opportunityId} = useParams();
    const history = useHistory();

    const onClickDelete = () => {
      deleteOpportunity(opportunityId)
      .then(getAllOpportunities)
      .then(history.push("/opportunity"))
    }
    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>Are you sure you want to delete this opportunity?</h3>
          </div>
          <div className="row justify-content-center button-container">
            <button className="button btn btn-sm btn-primary" onClick={onClickDelete}>
              Confirm
            </button>
            <button className="button btn btn-sm btn-secondary" onClick={() => {history.push("/opportunity")}}>Cancel</button>
          </div>
      </div>
    );
  }
  
  