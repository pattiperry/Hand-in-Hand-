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
        <div className="background-picture">
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
          <OpportunityDetails />
        </Route>

        <Route exact path="/" >
        {isLoggedIn ? <OrganizationDetail /> : <Redirect to="/login"/>}
        </Route>
        </div>
        



    </Switch>
</main>
);
};