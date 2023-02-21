import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const [menu,setmenu] = useState(false)
  const [showClaimKitForm, setShowClaimKitForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // console.log(user);
      setIsMenu(true);
    }
  }, [user]);
  const logout = () => {
    setIsMenu(false);
    setmenu(false)
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    window.location.reload(true);
    navigate("/");
  };

  const [name, setName] = useState("");
  const [NameOnKit, setNameOnKit] = useState("");
  const [address, setAddress] = useState("");
  const [jerseyNumber,setjerseyNumber] =  useState("");
  const [jerseySize, setJerseySize] = useState("");

const showmenu = ()=>{
  console.log("show menu")
  console.log(menu)
  setmenu(true)
  console.log(menu)
}

  const handleClaimKitClick = () => {
    setShowClaimKitForm(true);
  };
  const handleClaimKitFormSubmit = (event) => {
    event.preventDefault();

    // Do something with the form data, e.g. send it to a server
    console.log({ name, NameOnKit, jerseyNumber, jerseySize });

    // send data to backend 

    // Reset the form fields
    setName("");
    setNameOnKit("")
    setjerseyNumber("");
    setAddress("");
    setJerseySize("");

    // Close the form
    setShowClaimKitForm(false);
  };
   const options = [];

  for (let i = 31; i <= 58; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <section id="header">
        <a href="/">
          <img src={logo} class="logo" alt="logo" />
        </a>

        <div>
          <ul id="navbar">
            <li>
              <p>
                <Link class="active" to="/account">
                  {isMenu ? user?.name : <></>}
                </Link>
              </p>
            </li>
            <li>
              <p>
                <Link class="active" to="/">
                  Home
                </Link>
              </p>
            </li>
            <li>
              <p>
                <a id="kit-claim" onClick={handleClaimKitClick}>
                  Claim your Kit
                </a>
              </p>
            </li>
            <li>
              <p>
                {isMenu ? (
                  <a onClick={logout}>Logout</a>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </p>
            </li>
            
            <a href="#" id="close">
              <i class="fa-solid fa-xmark"></i>
            </a>
          </ul>
        </div>


        <div id="mobile">
          <span onClick={showmenu}>
          <img  src="https://img.icons8.com/ios/50/null/menu--v1.png"/>
          </span>
          { menu &&(
            <div className="mobilemenu">
            <div  onClick={() => setmenu(false)}>
            <img src="https://img.icons8.com/ios/50/null/close-window--v1.png"/>
            </div>
            
            <ul>
            <li>
              <p>
                <Link  onClick={() => setmenu(false)} class="active" to="/account">
                  {isMenu ? user?.name : <></>}
                </Link>
              </p>
            </li>
            <li>
              <p>
                <Link onClick={() => setmenu(false)}  class="active" to="/">
                  Home
                </Link>
              </p>
            </li>
            <li>
              <p>
                <a  onClick={() => {
                  handleClaimKitClick()
                  setmenu(false)}} id="kit-claim" >
                  Claim your Kit
                </a>
              </p>
            </li>
            <li>
              <p>
                {isMenu ? (
                  <a onClick={logout}>Logout</a>
                ) : (
                  <Link   onClick={() => setmenu(false)} to="/login">Login</Link>
                )}
              </p>
            </li>
            
            {/* <a href="#" id="close">
              <i class="fa-solid fa-xmark"></i>
            </a> */}
          </ul>
            </div>
          )}
        </div>

        
      </section>

      {showClaimKitForm && (
        <div id="claim-kit-form-overlay">
          <form id="claim-kit-form" onSubmit={handleClaimKitFormSubmit}>
            <h2>Claim your kit</h2>
            <div
              className="closeShowClaimKitForm"
              onClick={() => setShowClaimKitForm(false)}
            >
            <img src="https://img.icons8.com/ios/50/null/close-window--v1.png"/>
            </div>
            <label htmlFor="name"> Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Your Name"
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label htmlFor="email"> Name ON Your Kit </label>
            <input
              type="text"
              id="Name kit"
              value={NameOnKit}
              placeholder="Name On Youre Kit"
              onChange={(event) => setNameOnKit(event.target.value)}
              required
            />
             <label htmlFor="address">Jersey Number</label>
            <input
            type="number"
              id="jerseyNumber"
              value={jerseyNumber}
              onChange={(event) => setjerseyNumber(event.target.value)}
              placeholder
              required
            ></input>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            ></textarea>
            <label htmlFor="jersey-size">Jersey size</label>
            <select
              id="jersey-size"
              value={jerseySize}
              onChange={(event) => setJerseySize(event.target.value)}
              required
            >
              <option value="">Select size</option>
            {options}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
