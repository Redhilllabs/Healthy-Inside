import React, { useState } from "react";
import "./login.css";
import GoogleButton from "./GoogleButton";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {LoginAdminAPi} from '../utils/mongodbFunctions'
const AdminLogin = () => {
const [username,setusername]=useState()
const [password,setpassword]=useState()
const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
const [isMenu, setIsMenu] = useState(false);
const navigate = useNavigate();

const handellogin = async (event)=>{
  event.preventDefault();
  // console.log("user",user)
  
await LoginAdminAPi(username,password).then((response)=>{
  // console.log(response)
  if(!response){
    alert("wrong username or Password")
  }
  if (!user) {
    dispatch({
      type: actionType.SET_Admin_USER,
      admin: response.data,
    });
    localStorage.setItem("admin", JSON.stringify(response.data));
      // console.log(username,password)
      navigate("/");
  
    }else {
      alert("You are Alredy loggedIn")
      setIsMenu(!isMenu);
    }
})
  

}
  return (
    <div>
      <div class="login">
        <h1>Login</h1>
        <form  >
          <label for="userName">Email </label>
          <input
          value={username}
            type="email"
            name="userName"
            id="userName"
            placeholder="someone@xyz.com"
            onChange={(e)=>{setusername(e.target.value)}}
          />
          <label for="password">Password</label>
          <input
          value={password}
            type="password"
            name="password"
            id="password"
            placeholder="*********"
            onChange={(e)=>{setpassword(e.target.value)}}
          />
          <button type="submit" onClick={handellogin} name="submit">
            Log In
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
