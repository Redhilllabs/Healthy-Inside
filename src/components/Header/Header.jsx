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
  const [isMenu, setIsMenu] = useState(false);
  const [menu, setmenu] = useState(false);
  const [showClaimKitForm, setShowClaimKitForm] = useState(false);
  const [name, setName] = useState("");
  const [NameOnKit, setNameOnKit] = useState("");
  const [address, setAddress] = useState("");
  const [jerseyNumber, setjerseyNumber] = useState("");
  const [jerseySize, setJerseySize] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [showsearchResults,setshowsearchResults] = useState(false);

  const [{ user, admin ,foodItems, cartItems }, dispatch] = useStateValue();
  const itemCount = cartItems ? Object.keys(cartItems).length : 0;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  
    if (value === '') {
      setshowsearchResults(false);
      setSearchResults([]);
    } else {
      setshowsearchResults(true);
      const filteredItems = foodItems?.data.filter(item =>
        item.foodName.toLowerCase().includes(value)
      );
      setSearchResults(filteredItems);
    }
  };
  


  useEffect(() => {
    if (user) {
      setIsMenu(true);
    }
  }, [user]);

  const logout = () => {
    setIsMenu(false);
    setmenu(false);
    localStorage.clear();
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: null});
    dispatch({type: actionType.SET_USER, user: null, });
    window.location.reload()
    navigate("/");
  };


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
                  <Link id="header_link"  >Meal Plan</Link>

                </li>

                <li>
                  <Link id="header_link" to="/morningfood" > Our Meals</Link>                  
                  </li>

                <li>
                  <Link to="/why-plant" id="header_link">Why Healthy Inside</Link>
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
                        <Link id="kit-claim" to="/account">Profile</Link>
                      </li>
                      <li>
  
                  <Link id="header_link" to="/cart">Subscriptions</Link>                  
                  </li>
                      <li>
                        <a id="kit-claim" onClick={logout}>Log out</a>
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
            <img  id="menuIcon" src="https://img.icons8.com/ios/50/null/menu--v1.png" />
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

                <li><Link  id="header_link" onClick={() => setmenu(false)} to="/morningfood">
                          Meal Plan
                        </Link>
                </li>

                <li>
                  <Link  onClick={() => setmenu(false)} to="/cart">Subscription </Link>
                  </li>

                <li>
                  <Link class="active" id="header_link" to="/">
                    Cook Own
                  </Link>
                </li>

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

    </div>
  );
};

export default Header;
