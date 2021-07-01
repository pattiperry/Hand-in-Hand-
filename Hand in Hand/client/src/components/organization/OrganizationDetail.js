import React, { useState, useContext, useEffect } from "react";
import { useHistory} from "react-router-dom";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import { OrganizationContext } from "../../providers/OrganizationProvider"
import "./Organization.css";

export const OrganizationDetail = () => {
  const {getOrganization, editOrganization} = useContext(OrganizationContext)
  const [profile, setProfile] = useState({})
  const [organizationInput, setOrganizationInput] = useState()
  const [isEditing, setIsEditing] = useState(false)
  const history = useHistory();
  
  const firebaseUserId = JSON.parse(sessionStorage.getItem("organization")).firebaseUserId

  useEffect(() => {
    
    console.log(firebaseUserId)

    getOrganization(firebaseUserId)
    .then(setProfile)
    
  }, [])

  const handleControlledInputChange = (e) => {
    const newOrganization = { ...profile }
    newOrganization[e.target.id] = e.target.value
    setProfile(newOrganization)
  }

  const handleClickEditOrganization = (e) => {
    e.preventDefault()
    
    editOrganization({
      Id: profile.id,
      FirebaseUserId: profile.firebaseUserId,
      OrganizationName: profile.organizationName,
      Url: profile.url,
      Location: profile.location,
      Phone: profile.phone,
      Email:profile.email,
      ContactPerson: profile.contactPerson
    })
    .then(() => getOrganization(firebaseUserId)
    .then(setProfile)
    .then(()=>setIsEditing(false))
  )}

    return (
      <>
      {!isEditing? 

    <Card className="m-8">
        <CardHeader>
           
        <p><strong>{profile.organizationName}</strong></p>
        </CardHeader>
        <CardBody>
            <p>{profile.url}</p>
            <p>{profile.location}</p>
            <p>{profile.phone}</p>
            <p>{profile.email}</p>
            <p>{profile.contactPerson}</p>
              
           
          <div className="button-container">
           
            <Button className="button btn btn-sm" onClick={() => {setIsEditing(true)}}>Edit</Button> 
          </div>
             
        </CardBody>
    </Card> :
    <>
    <p> Edit Your Organization</p>
    <Card className="m-8">
        <CardHeader>
        <input 
         type="text" 
         id="organizationName" 
         onChange={handleControlledInputChange} 
         required 
         autoFocus 
         className="form-control" 
         placeholder="OrganizationName" 
         defaultValue={profile.organizationName}/>
        </CardHeader>
        <CardBody>
        <input 
          type="text" 
          id="url" 
          onChange={handleControlledInputChange} 
          required 
          autoFocus 
          className="form-control" 
          placeholder="Url" 
          defaultValue={profile.url}/>

        <input 
          type="text" 
          id="location" 
          onChange={handleControlledInputChange} 
          required 
          autoFocus 
          className="form-control" 
          placeholder="Location" 
          defaultValue={profile.location}/>

        <input 
          type="text" 
          id="phone" 
          onChange={handleControlledInputChange} 
          required 
          autoFocus 
          className="form-control" 
          placeholder="Phone" 
          defaultValue={profile.phone}/>

        <input 
          type="text" 
          id="email" 
          onChange={handleControlledInputChange} 
          required 
          autoFocus 
          className="form-control" 
          placeholder="Url" 
          defaultValue={profile.email}/>

        <input 
          type="text" 
          id="contactPerson" 
          onChange={handleControlledInputChange} 
          required 
          autoFocus 
          className="form-control" 
          placeholder="ContactPerson" 
          defaultValue={profile.contactPerson}/>
            
          <div className="button-container">
           <Button className="button btn btn-sm"  onClick={handleClickEditOrganization}>Save</Button> 
          </div>
             
        </CardBody>
    </Card>
    </>
}
    </>
      
  );
};

