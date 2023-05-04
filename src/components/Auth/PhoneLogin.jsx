import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button ,ButtonGroup } from 'react-bootstrap';
import "./PhoneLoginModal.css"
import jwt_decode from "jwt-decode";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { getUser, signup, LoginAPi } from "../../utils/ApiCall";
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

const NOTSIGNIN = 'Enter All Details';
const SIGNEDIN = 'You have logged in successfully';
const SIGNEDOUT = 'You have logged out successfully';
const WAITINGFOROTP = 'Enter OTP number';
const VERIFYNUMBER = 'Verifying number (Country code +XX needed)';

function PhoneLogin() {
  const [message, setMessage] = useState('Welcome to Demo');
  const [Phoneuser, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState('');
  const [number, setNumber] = useState('');
  const password = Math.random().toString(10) + 'Abc#';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch((err) => {
        // console.error(err);
        setMessage(NOTSIGNIN);
      });
  };

  const signOut = () => {
    if (Phoneuser) {
      Auth.signOut();
      setUser(null);
      setOtp('');
      setMessage(SIGNEDOUT);
    } else {
      setMessage(NOTSIGNIN);
    }
  };

  const signIn = (e) => {
    e.preventDefault()
    setMessage(VERIFYNUMBER);
    Auth.signIn(number)
      .then((result) => {
        console.log(result,"result")
        setSession(result);
        setMessage(WAITINGFOROTP);
      })
      .catch((e) => {
        if (e.code === 'UserNotFoundException') {
          signUp();
        } else if (e.code === 'UsernameExistsException') {
          setMessage(WAITINGFOROTP);
          signIn();
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };

  const signUp = async () => {
    const result = await Auth.signUp({
      username: number,
      password,
      attributes: {
        phone_number: number,
      },
    }).then(() => signIn());
    return result;
  };

  const verifyOtp = async () => {
    try {
      console.log("run on load");
      const user = await Auth.sendCustomChallengeAnswer(session, otp);
      setUser(user);
      console.log("Otp Verify user", user);
 
      const userObject = { name, email, number };
      const existingUser = await getUserFromDatabase(email);

//       if(existingUser.Item.contact != number){
// // updaet the contact of User
//       }
  
      if (existingUser.status === 404) {
        // register user
        await registerUser(userObject);
  
        // sign in user
        await signInUser(userObject);
      } else {
        // sign in user
        await signInUser(userObject);
      }
  
      setMessage(SIGNEDIN);
      setSession(null);
    } catch (err) {
      setMessage(err.message);
      setOtp('');
      console.log(err);
    }
  };
  

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
    contact: userObject.number,
    name: userObject.name,
    profileLink: userObject.picture,
    sellingPrice: "2300000",
    team: "22 Yards",
  });
  const res = await signup(bodyContent);
  return res.status;
}

async function signInUser(userObject) {
  const password = userObject.number;
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

  return (
    <div className='PhoneLogin'>
    <header className='Phone-header'>
      <p>{message}</p>
      {!Phoneuser && !session && (
        <form onSubmit={signIn}>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Phone Number (+91)'
              onChange={(event) => setNumber(event.target.value)}
              required
            />
          </div>
          <div className='input-group mb-3'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-outline-secondary'>
            Get OTP
          </button>
        </form>
      )}
      {!Phoneuser && session && (
        <div>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Your OTP'
              onChange={(event) => setOtp(event.target.value)}
              value={otp}
            />
          </div>
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={verifyOtp}
          >
            Confirm
          </button>
        </div>
      )}
      <div>
        {Phoneuser && (
          <button className='btn btn-outline-danger' onClick={signOut}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  </div>
  );
}
export default PhoneLogin;