import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const GoogleButton = () => {
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    
    // check if user is already registered
    const user = await getUserFromDatabase(userObject.email);
    
    if (!user) {
      // register user
      await registerUser(userObject);
      
      // sign in user
      signInUser(userObject);
    } else {
      // sign in user
      signInUser(userObject);
    }
  }
  
  async function getUserFromDatabase(email) {
    // implement logic for getting a user from your database by email
  }
  
  async function registerUser(userObject) {
    // implement logic for registering a new user in your database
  }
  
  function signInUser(userObject) {
    // implement logic for signing in the user (e.g. update state, navigate to a different page)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "196869436847-t71ug51lqtamei4gbmlgaogetetee79u.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    
    const button = google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    google.accounts.id.prompt();
  
    return () => {
      google.accounts.id.cancel();
      google.accounts.id.disableAutoSelect();
    };
  }, []);
  

  return (
    <>
      <div id="signInDiv"> </div>
    </>
  );
};

export default GoogleButton;