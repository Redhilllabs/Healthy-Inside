import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { getUser, signup, LoginAPi } from "../../utils/ApiCall";

const GoogleButton = () => {
  // const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  async function handleCallbackResponse(response) {
    // console.log(response);
    const userObject = jwt_decode(response.credential);

    // check if user is already registered
    const user = await getUserFromDatabase(userObject.email);
    // console.log(user , userObject.email)
    if (user.status === 404) {
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
    let bodyContent = JSON.stringify({ email: email });
    const res = await getUser(bodyContent);
    return res.status;
    // implement logic for getting a user from your database by email
  }

  async function registerUser(userObject) {
    // implement logic for registering a new user in your database
    // console.log(userObject);
    let bodyContent = JSON.stringify({
      email: userObject.email,
      basePrice: "600000",
      contact: "123456789",
      name: userObject.name,
      profileLink: userObject.picture,
      sellingPrice: "2300000",
      team: "22 Yards",
    });
    const res = await signup(bodyContent);
    return res.status;
  }

  async function signInUser(userObject) {
    const password = "123456789";
    // console.log("logged in new user");
    const response = await LoginAPi(userObject.email, password);
    if (response.status === 401) {
      alert(response.message);
      return;
    }
    if (!user) {
      dispatch({
        type: actionType.SET_USER,
        user: response.data,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch({
        type: actionType.SET_Admin_USER,
        admin: null,
      });
      localStorage.setItem("admin", null);
    } else {
      alert("You are already logged in");
      // setIsMenu(!isMenu);
      return;
    }
    // implement logic for signing in the user (e.g. update state, navigate to a different page)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "196869436847-t71ug51lqtamei4gbmlgaogetetee79u.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      scope:
        "https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.birthday.read",
    });

    const button = google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: 'Large',
        width:'250px'
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
