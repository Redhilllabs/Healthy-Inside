import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { useNavigate } from "react-router-dom";
import { saveClaimKit } from "../../utils/ApiCall";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const Header = ({ onProfileToggle }) => {
  const [{ user, admin }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const [menu, setmenu] = useState(false);
  const [showClaimKitForm, setShowClaimKitForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsMenu(true);
    }
  }, [user]);

  const logout = () => {
    setIsMenu(false);
    setmenu(false);
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
  const [jerseyNumber, setjerseyNumber] = useState("");
  const [jerseySize, setJerseySize] = useState("");
  const showmenu = () => {
    setmenu(true);
  };

  const handleClaimKitClick = () => {
    setShowClaimKitForm(true);
  };
  const handleClaimKitFormSubmit = async (event) => {
    event.preventDefault();
    console.log({ name, NameOnKit, jerseyNumber, jerseySize });
    const data = {
      NameOnKit: NameOnKit,
      jerseyNumber: jerseyNumber,
      jerseySize: jerseySize,
    };

    // send data to backend
    const res = await saveClaimKit(user.email, data);
    console.log(res);
    if (res.status === 401) {
      alert(res.message);
    } else {
      alert(" Saved Your Kit ");
    }

    // Reset the form fields
    setName("");
    setNameOnKit("");
    setjerseyNumber("");
    setAddress("");
    setJerseySize("");

    // Close the form
    setShowClaimKitForm(false);
  };
  const options = [];

  for (let i = 30; i <= 58; i++) {
    if (i % 2 === 0) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
  }
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };
  const location = useLocation();
  return (
    <div id="header_container">
      <section id="header">
        {admin ? (
          <Link to="/" id="header_logo_admin">
            <h1>Urvi</h1>
          </Link>
        ) : (
          <Link to="/" id="header_logo">
            <h1>HEALTHY</h1>
            <img src={logo} class="logo" alt="logo" />
            <h1>INSIDE</h1>
          </Link>
        )}

        <div id="navbar_container">
          <ul id="navbar">
            {location.pathname === "/urvi" ||
            location.pathname === "/Adminlogin" ? (
              <></>
            ) : (
              <>
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a id="header_link">Bento Box</a>

                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/morninigfood">Morning</Link>
                      </li>

                      <li>
                        <a>Lunch</a>
                      </li>
                      <li>
                        <a>Supper</a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a id="header_link">Happy Inside</a>

                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <a>MindFull Game</a>
                      </li>

                      <li>
                        <a>Challenge Game</a>
                      </li>
                      <li>
                        <a>Order Game</a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a id="header_link">Cook Your Own</a>

                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <a>Make your own food</a>
                      </li>

                      <li>
                        <a>Heat up food</a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a id="header_link">Make SomeOne Happy</a>

                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <a>Gift</a>
                      </li>

                      <li>
                        <a>Free Food</a>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            <li>
              {isMenu ? (
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a> {user?.name} </a>

                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/account">Profile</Link>
                      </li>

                      <li>
                        <p>
                          <a id="kit-claim" onClick={handleClaimKitClick}>
                            ClaimKit
                          </a>
                        </p>
                      </li>
                      <li>
                        <a onClick={logout}>Log out</a>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <>
                  {admin ? (
                    <Link
                      to="/urvi"
                      id="header_login_admin"
                      onClick={onProfileToggle}
                    >
                      {admin.name}
                    </Link>
                  ) : (
                    <>
                      <Link id="header_login" to="/login">
                        Log In
                      </Link>
                      <Link id="header_Signup" to="/signup">
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>

        <div id="mobile">
          <span onClick={showmenu}>
            <img src="https://img.icons8.com/ios/50/null/menu--v1.png" />
          </span>
          {menu && (
            <div className="mobilemenu">
              <img
                onClick={() => setmenu(false)}
                src="https://img.icons8.com/ios/50/null/close-window--v1.png"
              />
              <ul>
                {user ? (
                  <li>
                    <p>
                      <Link
                        onClick={() => setmenu(false)}
                        class="active"
                        to="/account"
                      >
                        {user?.name}
                      </Link>
                    </p>
                  </li>
                ) : (
                  <></>
                )}

                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a id="header_link">Bento Box</a>

                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link onClick={() => setmenu(false)} to="/morninigfood">
                          Morning
                        </Link>
                      </li>

                      <li>
                        <a>Lunch</a>
                      </li>
                      <li>
                        <a>Supper</a>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <Link class="active" id="header_link" to="/">
                    Happy Inside
                  </Link>
                </li>

                <li>
                  <Link class="active" id="header_link" to="/">
                    Cook Own
                  </Link>
                </li>

                {user?.name ? (
                  <li>
                    <p>
                      <a
                        onClick={() => {
                          handleClaimKitClick();
                          setmenu(false);
                        }}
                        id="kit-claim"
                      >
                        ClaimKit
                      </a>
                    </p>
                  </li>
                ) : (
                  <></>
                )}
                <li>
                  <p>
                    {isMenu ? (
                      <a onClick={logout}>Logout</a>
                    ) : (
                      <Link onClick={() => setmenu(false)} to="/login">
                        Login
                      </Link>
                    )}
                  </p>
                </li>

                <li>
                  <p>
                    {isMenu ? (
                      <a> </a>
                    ) : (
                      <Link onClick={() => setmenu(false)} to="/signup">
                        SignUp
                      </Link>
                    )}
                  </p>
                </li>
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
              {/* <img src="https://img.icons8.com/ios/50/null/close-window--v1.png" /> */}
              <i class="fa-solid fa-xmark"></i>
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
              placeholder="Name On Kit"
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
