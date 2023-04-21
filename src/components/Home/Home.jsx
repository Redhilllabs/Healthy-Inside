import React, { useState, useEffect } from "react";
import "./home.css";
import { useStateValue } from "../../context/StateProvider";
import { Link } from "react-router-dom";
import menu1 from "../../images/menu1.jpg";
import menu2 from "../../images/menu2.jpg";
import { actionType } from "../../context/reducer";
import "react-slideshow-image/dist/styles.css";
const Home = () => {
  const [{ foodItems, cartItems, user }, dispatch] = useStateValue();
  const [fooditems, setfooditems] = useState([]);
  const [alert, setalert] = useState("");

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: fooditems,
    });
    localStorage.setItem("cartItems", JSON.stringify(fooditems));
  };

  useEffect(() => {
    addtocart();
  }, [fooditems]);

  return (
    <div>
      <div className="hero-section">
        <div className="hero_container">
          <div className="texthero">
            <h1>
              Make your <br /> taste buds{" "}
              <span className="texthero_design">happy!</span>
            </h1>
            <p>
              Discover outrageously tasty, super satisfying plant-based meals.
            </p>

            <Link to="/morningfood" className="herobutton" href="">
              <h4> Let's Do This! </h4>
              <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/null/external-greater-than-math-vol-1-outline-outline-black-m-oki-orlando.png" />
            </Link>
          </div>
        </div>
      </div>

      <section className="menu">
        <div className="menu_container">
          <hr />
          <h2>Pick Your Delicious</h2>
          <div className="menucontent">
            <p className="menucontent_1">
              Start with either a Meal Kit or Fresh, Prepared Meal plan <br />{" "}
              and then customize your weekly delivery.
            </p>
            <p>
              It’s easy peasy. Get exactly what you want—
              <br />
              meal kits, prepared meals, or both—every time.
              <br />
              And don’t worry, we’ve got lots of Less Prep ,<br /> high-protein
              and gluten-free meals.
            </p>
          </div>
        </div>
        <div className="menuitems">
          <div className="menuitem_1">
            <img id="item_img" src={menu1} alt="" />
            <div className="content">
              <h3>Morning</h3>
              <p>
                We’ll send you everything you need to slice, dice, and sauté
                your way to
              </p>
            </div>
            <a className="herobutton" href="">
              <h4>Morning Menu </h4>
              <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/null/external-greater-than-math-vol-1-outline-outline-black-m-oki-orlando.png" />
            </a>
          </div>
          <div className="menuitem_1">
            <img id="item_img" src={menu2} alt="" />
            <div className="content">
              <h3>Supper</h3>
              <p>
                Heat ‘em up—they’re ready in less than 5 minutes —and dig in!
              </p>
            </div>
            <a className="herobutton" href="">
              <h4>Supper Menu</h4>
              <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/null/external-greater-than-math-vol-1-outline-outline-black-m-oki-orlando.png" />
            </a>
          </div>
        </div>
      </section>

      <div className="imggfood"></div>
      
      {alert && (
        <div id="alert-box">
          {" "}
          <p>{alert}</p>{" "}
        </div>
      )}
    </div>
  );
};
export default Home;
