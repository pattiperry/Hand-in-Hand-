import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Header } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { OrganizationContext } from "../providers/OrganizationProvider";
import "./Login.css"
import coolhands from "./Images/coolhands.png"

export default function Login() {
  const history = useHistory();
  const { login } = useContext(OrganizationContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <>
    <h1 className= "login-title">Hand In Hand</h1>
    <img className= "login-picture" src={coolhands} alt="loading..." />
    
    <Container>
    <Row>
    <Col className="organization-col">
    <h2>Organization</h2>
    <p>Are you an organization that needs volunteers? Login or register if this is your first time visiting Hand in Hand and post your service opportunities for volunteers in your area. </p>
    <Form className="form--login" onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </Col>
    <Col className="volunteer-col">
    <h2>Volunteer</h2>
    <p>Are you a volunteer looking to make a change in your community? Click 'view opportunities' below to see a list of the available service opportunities in your community. Start making a difference today! </p>
    <Button className="volunteer-button" variant="success" type="submit" onClick={()=> {history.push("/opportunity")}}>
    View Opportunities 
  </Button>
  </Col>
  </Row>
  </Container>
 </>
  );
}