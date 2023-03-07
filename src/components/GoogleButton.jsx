
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const GoogleButton = () => {

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
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
