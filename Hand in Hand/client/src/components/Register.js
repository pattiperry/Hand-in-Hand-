import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { OrganizationContext } from "../providers/OrganizationProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(OrganizationContext);

  const [organizationName, setOrganizationName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [url, setUrl] = useState();
  const [contactPerson, setContactPerson] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const organization = { organizationName, email, phone, location, url, contactPerson };
      register(organization, password)
        .then(() => history.push("/"));
    }
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input id="organizationName" type="text" onChange={e => setOrganizationName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input id="phone" type="tel" onChange={e => setPhone(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input id="location" type="text" onChange={e => setLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="url">Url</Label>
          <Input id="url" type="text" onChange={e => setUrl(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="contactPerson">Contact Person</Label>
          <Input id="contactPerson" type="text" onChange={e => setContactPerson(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}