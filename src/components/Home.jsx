import React, { useState, useEffect } from "react";
import "./home.css";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import f1 from "../images/f1.png";
import f2 from "../images/f2.png";
import f3 from "../images/f3.png";
import f4 from "../images/f4.png";
import f5 from "../images/f5.png";
import f6 from "../images/f6.png";
import menu1 from "../images/menu1.jpg";
import menu2 from "../images/menu2.jpg";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { GetCart , AddToCart } from "../utils/mongodbFunctions";
import ff2 from "../images/ff2.jpeg";
import heroimg from "../images/heroimg.jpg"
import BhelMakhani2 from "../images/BhelMakhani2.jpg" 
import OilFreeChole1 from "../images/OilFreeChole1.jpg"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const Home = () => {
  // add to cart funtionality
  const [{ foodItems, cartItems, user }, dispatch] = useStateValue();
  const [fooditems, setfooditems] = useState([]);
  // const [cart, setCart] = useState([]);
  // const [mogoadd, setmongoadd] = useState([]);
  const[alert ,setalert] = useState("");

  const addfooditem = (item) => {
    if(user){
      const existingProductIndex = cartItems.findIndex(
        (e) => e.foodID === item.foodID
      );

      setalert("Item Added")
        
       setTimeout(function() {
          setalert("")
        }, 1000);

      if (existingProductIndex === -1) {
        // If the product is not in the cart, add it
        setfooditems([...cartItems, { ...item, quantity: 1 }]);

      } else {
        // If the product is already in the cart, increase its quantity
        const updatedCartItems = cartItems.map((cartItem, index) => {
          if (index === existingProductIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          } else {
            return cartItem;
          }
  
        });
        setfooditems(updatedCartItems);
      }
    }
    else{
      setalert("Login To Continue")
      setTimeout(function() {
        setalert("")
      }, 1000);
    }
    
  
  };
  
  const addcartmongo = async(item_id)=>{
    console.log("cameing into addto mongo")
    // if(user){
    //  await AddToCart(item_id,user._id).then((data)=>{
    //   // console.log(data)
    //     setmongoadd(data)

    //     setalert("Item Added")

    //    setTimeout(function() {
    //       setalert("")
    //     }, 1000);
    //     }).catch((err)=>{
    //       alert("Server Issue")
    //     console.log("Error occured",err)
    //     })
    // }
    }
    const addtocart = () => {
// console.log(cartItems)

      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: fooditems,
      });

      
        
      
      localStorage.setItem("cartItems", JSON.stringify(fooditems));


    };
    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '400px'
    }
    const buttonStyle = {
      display: 'flex',
      padding: '15px',
      backgroundColor: '#009879',
      justifyContent: 'center',
      textAlign: 'center',
      alignItem:'center',
      borderRadius: '5px',
      color: 'white',
      borderRadius:'25px',
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '10px',
      cursor: 'pointer',
      textDecoration:'none',
      transition: 'background-color 0.3s ease-in-out'
    };

    const slideImages = [
      {
        url:"https://amplify-amplifye544c09ddce64-staging-51255-deployment.s3.amazonaws.com/foodsImages/aa7.jpeg",
        caption:'Healthified tasty breakfast meals',
        linkto: "#breakfast"
      },
      {
        url: "https://amplify-amplifye544c09ddce64-staging-51255-deployment.s3.amazonaws.com/foodsImages/aa2.jpeg",
        caption:'Subscribe for Daily Breakfast Packages',
        linkto: "#lunch"
      },
      {
        url: "https://amplify-amplifye544c09ddce64-staging-51255-deployment.s3.amazonaws.com/foodsImages/ff2.jpeg",
        caption:'Exclusive range of fitness equipments',
        linkto: "#fitness"
      },
    ];


  useEffect(() => {
    addtocart();
  }, [fooditems]);

  return (
    <div>
    <div className="hero-section" >

  <div className="hero_container">
    <div className="texthero">
      <h1>
        Make your <br /> taste buds <span className="texthero_design">happy!</span>
      </h1>
      <p>
        Discover outrageously tasty, super satisfying plant-based meals.
      </p>

<a className="herobutton"  href="">
<h4> Let's Do This! </h4>
<img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/null/external-greater-than-math-vol-1-outline-outline-black-m-oki-orlando.png"/>
</a>

    </div>
  </div>
</div>


<section className="menu">
  <div className="menu_container">
    <hr />
    <h2>
      Pick Your Delicious
    </h2>
    <div className="menucontent">
      <p className="menucontent_1">
        Start with either a Meal Kit or Fresh, Prepared Meal plan  <br />  and then customize your weekly delivery.
       </p>
       <p>
        It’s easy peasy. Get exactly what you want—<br />meal kits, prepared meals, or both—every time.<br/>
        And don’t worry, we’ve got lots of
        Less Prep
        ,<br /> high-protein and gluten-free meals.

      </p>
    </div>
  </div>
  <div className="menuitems">
    <div className="menuitem_1">
      <img id="item_img" src={menu1} alt="" />
      <div className="content">
        <h3>Morning</h3>
        <p>We’ll send you everything you need to slice, dice, and sauté your way to</p>
      </div>
      <a className="herobutton"  href="">
<h4>Morning Menu </h4>
<img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/null/external-greater-than-math-vol-1-outline-outline-black-m-oki-orlando.png"/>
</a>

    </div>
    <div className="menuitem_1">
      <img id="item_img" src={menu2} alt="" />
      <div className="content">
      <h3>Supper</h3>
        <p>Heat ‘em up—they’re ready in less than 5 minutes —and dig in!</p>
      </div>
      <a className="herobutton"  href="">
<h4>Supper Menu</h4>
<img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/null/external-greater-than-math-vol-1-outline-outline-black-m-oki-orlando.png"/>
</a>
    </div>
  </div>
</section>

<div className="imggfood">
  {/* <h1>jd</h1> */}
</div>

      {/* <section id="product1" class="section-p1">
        <div id="breakfast"></div>
        <h1>Breakfast</h1>
        <p>Enjoy our range of healthy and fresh breakfast.</p>

        <div class="pro-container card-slider" id="shop-section1">
          {foodItems &&
            foodItems
              .filter((item) => item.foodType === "breakfast")
              .map((item) => (
                <React.Fragment key={item.id}>
                  <CartItem item={item} addfooditem={addfooditem} addcartmongo={addcartmongo}/>
                </React.Fragment>
              ))}


        </div>
        <div id="lunch"></div>
        <h1>Lunch</h1>
        <p>Enjoy our nutritious lunch.</p>
        <div class="pro-container card-slider" id="shop-section2">
          {foodItems &&
            foodItems
              .filter((item) => item.foodType === "lunch")
              .map((item) => (
                <React.Fragment key={item.id}>
                <CartItem item={item} addfooditem={addfooditem} addcartmongo={addcartmongo}/>
                </React.Fragment>
              ))}
        </div>
        <div id="fitness"></div>
        <h1>Fitness Equipment</h1>
        <p>We have variety of fitness equipments.</p>
        <div class="pro-container card-slider" id="shop-section3">
        {foodItems &&
            foodItems
              .filter((item) => item.foodType === "fitness")
              .map((item) => (
                <React.Fragment key={item.id}>
                <CartItem item={item} addfooditem={addfooditem} addcartmongo={addcartmongo}/>
                </React.Fragment>
              ))}
        </div>
      </section> */}


      {/* <section id="feature" class="section-p1">
        <div class="fe-box">
          <img src={f1} alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div class="fe-box">
          <img src={f2} alt="" />
          <h6>Online Order</h6>
        </div>
        <div class="fe-box">
          <img src={f3} alt="" />
          <h6>Save Money</h6>
        </div>
        <div class="fe-box">
          <img src={f4} alt="" />
          <h6>Promotions</h6>
        </div>
        <div class="fe-box">
          <img src={f5} alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div class="fe-box">
          <img src={f6} alt="" />
          <h6>Vegan</h6>
        </div>
      </section> */}


{/* {fooditems&&fooditems.length>0?
<Link to="/cart" id="floatingButton">
      <div id="cartquantity">{fooditems?fooditems?.length:0}</div>
      <img src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v1.png"/>
      </Link>:<></>
} */}
      

      {alert&&(<div id="alert-box"> <p>{alert}</p>  </div>)}
    </div>
  );
};
export default Home;
