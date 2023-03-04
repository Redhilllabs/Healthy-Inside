
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const GoogleButton = () => {
  const history = useNavigate()
 
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    // sessionStorage.clear()
  }

  // function signOut() {
  //   google.accounts.id.disableAutoSelect();
  // }

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
    // document
    // .getElementById("signOutButton")
    // .addEventListener("click", signOut);

    google.accounts.id.prompt();
  
    return () => {
      google.accounts.id.cancel();
      google.accounts.id.disableAutoSelect();
      // button.removeEventListener("click");
    };
  }, []);
  

  return (
    <>
      <div id="signInDiv"> </div>
      {/* <div id="signOutButton" onClick={signOut}> Signout</div> */}
    </>
  );
};

export default GoogleButton;
