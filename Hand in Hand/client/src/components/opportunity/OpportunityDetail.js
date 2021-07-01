import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { Card, CardImg, CardBody, CardHeader, Button, Badge } from "reactstrap";
import { OpportunityContext } from "../../providers/OpportunityProvider"

export const OpportunityDetails = () => {
  
    const { getOpportunityById } = useContext(OpportunityContext)
    const { opportunityId } = useParams();
    const [ detailOpportunity, setDetailOpportunity ] = useState([]);

    useEffect(() => {
      getOpportunityById(opportunityId)
      .then(setDetailOpportunity)
    }, [])

    const loggedInOrganization = JSON.parse(sessionStorage.getItem("organization")).id;
    
      
    return (
        <>
            <Card className="m-8">
                <CardHeader>
                    <div className="row">
                        <p className="col-lg-6 col-sm-6"><strong>{detailPost.title}</strong></p>
                        {
                          /* if the post being viewed was authored by the current logged in user, render the search bar allowing the user to add tags to their post */
                          (isCurrentUserPost) ? 
                            <div className="col-lg-5 col-sm-5">
                              <div className="row search">
                                <input type="text" className="search-box" value={userInput} onChange={handleControlledInputChange} onKeyDown={onKeyDown}/>
                                <Button type="submit" className="btn btn-primary btn-sm button search-btn" onClick={onClickSave}>+</Button>
                              </div>
                              <div className="row">
                                <TagDropdown />
                              </div>
                            </div>
                          : <></>
                        }
                    </div>
                    <div className="row badge-row">
                      {
                        // display the post's tags as pill badges
                        detailPost.tags?.map(postTag => { 
                          return (
                              <Badge className="badge" color="info" key={postTag.postTagId} id={postTag.postTagId}>
                                <div className="flex-badge">
                                  <div className="badge-title">
                                    {postTag.name}
                                  </div>
                                  {
                                    /* if the post was authored by the current logged in user, present them with the option to delete a tag from their post */
                                    (isCurrentUserPost) ?
                                      <button className="remove-tag-btn" id={postTag.postTagId} onClick={onClickDelete}>X</button> :
                                      <></>
                                  }
                                </div>
                              </Badge>
                          )  
                        })
                      }
                    </div>
                </CardHeader>
                <CardImg top src={detailPost.imageLocation} alt={detailPost.title} />
                <CardBody>
                    <p>{detailPost.content}</p>
                    <p>{detailPost.publishDateTime}</p>
                    <p>{detailPost.userProfile?.displayName}</p>
                    {/* ? prevents error, as on first load, this info will not yet be defined */}
                </CardBody>
            </Card>
        </>
    )
}
