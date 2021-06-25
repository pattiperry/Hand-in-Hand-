import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const OrganizationContext = createContext();

export function OrganizationProvider(props) {
  const apiUrl = "/api/organization";

  const organization = sessionStorage.getItem("organization");
  const [isLoggedIn, setIsLoggedIn] = useState(organization != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getOrganization(signInResponse.user.uid))
      .then((organization) => {
        sessionStorage.setItem("organization", JSON.stringify(organization));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (organization, password) => {
    return firebase.auth().createUserWithEmailAndPassword(organization.email, password)
      .then((createResponse) => saveOrganization({ ...organization, firebaseUserId: createResponse.user.uid }))
      .then((savedOrganization) => {
        sessionStorage.setItem("organization", JSON.stringify(savedOrganization))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getOrganization = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const saveOrganization = (organization) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(organization)
      }).then(resp => resp.json()));
  };

  return (
    <OrganizationContext.Provider value={{ isLoggedIn, login, logout, register, getToken }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark"/>}
    </OrganizationContext.Provider>
  );
}