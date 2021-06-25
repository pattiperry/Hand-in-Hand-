import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header"
import ApplicationViews from './components/ApplicationViews';
import './App.css';
import {OrganizationProvider} from "./providers/OrganizationProvider";

// Define an App function which initializes the Header and ApplicationViews components nested within the OrganizationProvider and Router, such that the login authorization can interact with the Organizations in the database and ApplicationViews can define Routes.
function App() {
  return (
    <Router>
      <OrganizationProvider>
        <Header />
        <ApplicationViews />
      </OrganizationProvider>
    </Router>
  );
}

export default App;
