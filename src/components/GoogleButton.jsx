
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";


const GoogleButton = () => {
  const history = useNavigate()
 
  function handleCallbackResponse(response) {
    console.log(response.credential)
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
      // button.removeEventListener("click");
    };
  }, []);
  

  return (
    <>
      <div id="signInDiv"> </div>
    </>
  );
};

export default GoogleButton;
