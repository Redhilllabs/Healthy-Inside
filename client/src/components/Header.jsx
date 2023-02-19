import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.PNG";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
const[showClaimKitForm,setShowClaimKitForm] = useState(false);

  useEffect(() => {
    if (user) {
      // console.log(user);
      setIsMenu(true);
    }
  }, [user]);
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [jerseySize, setJerseySize] = useState("");

  const handleClaimKitClick = () => {
    setShowClaimKitForm(true);
  };
  const handleClaimKitFormSubmit = (event) => {
    event.preventDefault();

    // Do something with the form data, e.g. send it to a server
    console.log({ name, email, address, jerseySize });

    // Reset the form fields
    setName("");
    setEmail("");
    setAddress("");
    setJerseySize("");

    // Close the form
    setShowClaimKitForm(false);
  };

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
                <a class="active" href="/account">
                  {
                    
                    isMenu ? (user?.name) : <></>}
                </a>
              </p>
            </li>
            <li>
              <p>
                <a class="active" href="/">
                  Home
                </a>
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
          <span>
            <i id="bar" class="fas fa-outdent"></i>Menu
          </span>
        </div>
      </section>
      
      {showClaimKitForm && (
        <div id="claim-kit-form-overlay">
          <form id="claim-kit-form" onSubmit={handleClaimKitFormSubmit}>
            
            
            <h2>Claim your kit</h2>
            <div className="closeShowClaimKitForm" onClick={()=>setShowClaimKitForm(false)}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnUlEQVR4nO2aSU8UURDHf0aEMRiRQUBvcjQY9UuooKjIze2m0YtL0KvLGT2ZmPA5NEggUYMrAu6JAsrJ5aLx5ghRM6biv5MKztLd07NI+CedDLyq6nqv6tWrqtewjKWLNNALXAGGgGngG7Cgx36/1ZjR7AeaqRGkgKPAKPAbyEZ8fgEjwBGgoRoTWA2cAz47peaBO8AFWWazVnyVnmb9z8YuAnfFE/B/Avq1OBXBHmDOKTAJHAOaYshaBxwHppy890A3ZYSt1KB74VNgZ4Lyu4DnTv71clhngxS3F3wHTgErk34Jf2WeATLO2u1JCe+QubOKOlsoP7YCM3rnO+lQElqdwAlgPZVDM/BA756TV8RCyrnTI6CRyqMRGHduFmvPDDp3ssOuWmhxXmEBIHKIDTZ2JfZEmD2TkU4W3UIfdsE5YdGpVnDWbf5QLnbenRPlCLFxUQe8kG42qYJoUKpgxDuoPeyWbp+LWeWIixBhcU8pRlsMxdpk+fsh6Ve4SHqoEOGoiCx3CosJ8byOOJk28Rjvkwh8J8QznI8grbR6PmIC6BUKO5k4PP6gtPrmZz49D0jwbeJlAK/cubMxAm2cE3tM/HtzDV7VoNUTcRBmlUuxhMdlyRggB4Y0uI/4KGSZJCyx2HtukAOzGrQqrhTkWvWkLBGgU7KsL/APvmrQcptSsVjxJCeBsnCT94UcWNBgPcnAu1IS7rT44A76BFWZSKFoFgUFJ7JkXGt2qWz2IQ1aBzAuCoXYKIdmMfQVCr/BgWjNs//6QOzVoHULoyLKYZeEZcbE35MvGQuSRusA1mrSmHZJ49p8RCMSbm3MsJhMII23UiAsTornViGiwyKyQiksHpdYWE1JRhhYYfVMOh4sdtB8FOEuag890u1DmGuIfhE/q8Hmw0vpdjoMQ8r1eq2hXCvol04zUS6FusWUUXOs2tgO/JBOka8yrrsVSCL/iotWNeVMl2txBKRcaB2vUhN7jTosQaeloZTVmHax3v6uFNLAQ3cdV/KFT4czrbnZNiqzJ97pnZaVb0pKcLtzs4x6rxYOk0adotMP505J1C//7JkgAGTVUE7q9nWFrjJeOvnXyn333uXMHnTtT8T8iiGt3ClIO7JypSRvi4ta56xLZ7LKSC29vqS+U6fCdr2eFl0a9YlmzPUJgrTjdLW+gGhQV3xYJUA24vNTlenBak0gF5rUi7Wq7aaKpq/uoxr7/Ubl6YBo89YTy+A/xx+3026HVKnF7QAAAABJRU5ErkJggg=="/>
            </div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
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
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
