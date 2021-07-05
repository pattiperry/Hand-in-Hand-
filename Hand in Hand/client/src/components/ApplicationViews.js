import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./HomePage";
import { OrganizationContext } from "../providers/OrganizationProvider";
import { OrganizationDetail } from "../components/organization/OrganizationDetail";
import { OpportunityForm } from "../components/opportunity/OpportunityForm"; 
import { OpportunityList } from "../components/opportunity/OpportunityList";
import { ConfirmDelete } from "../components/opportunity/ConfirmDelete";
import { OpportunityDetails } from "./opportunity/OpportunityDetail";
import { OrganizationList } from "./organization/OrganizationList";
import { OpportunitySearch} from "../components/opportunity/OpportunitySearch";

export default function ApplicationViews() {
    // import the isLoggedIn state variable from the OrganizationContext
    const { isLoggedIn } = useContext(OrganizationContext);
 
 return (
    <main>
      {/* Use a Switch to provide and handle different routing options within the App */}
      <Switch>
        {/* Define the Home path as "/". Use the isLoggedIn state variable to manage what the user sees based on their login status. If they are logged in,display a welcome message. If not, redirect them to the login page*/}
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>
 
 {/*----------------Authentication Routes----------------- */}
        {/* Define the Login path as "/login". */}
        <Route path="/login">
          <Login />
        </Route>

        {/* Define the Register path as "/register". */}
        <Route path="/register">
          <Register />
        </Route>

{/*----------------Organization Routes----------------- */}
        <Route path="/organization/details" exact>
          {isLoggedIn ? <OrganizationDetail /> : <Redirect to="/login"/>}
        </Route>

        <Route path="/organization/edit" exact>
          {isLoggedIn ? <OrganizationDetail /> : <Redirect to="/login"/>}
        </Route>

        <Route path="/organization" exact>
          {!isLoggedIn ? <OrganizationList /> : <Redirect to="/login"/>}
        </Route>

{/*----------------Opportunity Routes----------------- */}
        <Route path="/opportunity/add" exact>
          {isLoggedIn ? <OpportunityForm /> : <Redirect to="/login"/>}
        </Route>

        <Route path="/opportunity" exact>
          <OpportunitySearch />
          <OpportunityList /> 
        </Route>

        <Route path="/opportunity/edit/:opportunityId(\d+)" exact>
          {isLoggedIn ? <OpportunityForm /> : <Redirect to="/login"/>}
        </Route>

        <Route path="/opportunity/delete/:opportunityId(\d+)" exact>
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login"/>}
        </Route>
        
        <Route path="/opportunity/detail/:opportunityId(\d+)" exact>
          {<OpportunityDetails /> }
        </Route>

        

    </Switch>
</main>
);
};