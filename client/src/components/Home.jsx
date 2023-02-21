import React, { useState, useEffect } from "react";
import "./home.css";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import f1 from "../images/f1.png";
import f2 from "../images/f2.png";
import f3 from "../images/f3.png";
import f4 from "../images/f4.png";
import f5 from "../images/f5.png";
import aa1 from "../images/aa1.jpeg";
import aa2 from "../images/aa2.jpeg";
import aa3 from "../images/aa3.jpeg";
import aa4 from "../images/aa4.jpeg";
import aa5 from "../images/aa5.jpeg";
import aa6 from "../images/aa6.jpeg";
import aa7 from "../images/aa7.jpeg";
import aa8 from "../images/aa8.jpeg";
import SimpleImageSlider from "react-simple-image-slider";
import f6 from "../images/f6.png";
import heroimage from "../images/heroimage.jpg"
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { GetCart , AddToCart } from "../utils/mongodbFunctions";
import ff2 from "../images/ff2.jpeg";
import BhelMakhani2 from "../images/BhelMakhani2.jpg" 
import OilFreeChole1 from "../images/OilFreeChole1.jpg"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const Home = () => {
  // add to cart funtionality
  const [{ foodItems, cartItems, user }, dispatch] = useStateValue();
  const [fooditems, setfooditems] = useState([]);
  const [cart, setCart] = useState([]);
  const [mogoadd, setmongoadd] = useState([])
  
  const addfooditem = (item) => {
    if(user){
      const existingProductIndex = cartItems.findIndex(
        (e) => e.foodID === item.foodID
      );
      // console.log("check", existingProductIndex);
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
   
  };

  const addcartmongo = async(item_id)=>{
    if(user){
      console.log(item_id,user._id)
     await AddToCart(item_id,user._id).then((data)=>{
        console.log("response from server",data)
        setmongoadd(data)
        }).catch((err)=>{
        console.log("Error occured",err)
        })
    }
    }

    
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
        url: BhelMakhani2,
        caption: 'Healthified tasty breakfast meals',
        linkto: "#breakfast"
      },
      {
        url: OilFreeChole1 ,
        caption: 'Subscribe for Daily Breakfast Packages',
        linkto: "#lunch"
      },
      {
        url: ff2,
        caption: 'Exclusive range of fitness equipments',
        linkto: "#fitness"
      },
    ];

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

  useEffect(() => {
    // Fetch cart data and set state
    if(user && user._id){
      GetCart(user._id).then((data) => {
        console.log(data)
        setCart(data.data.cart);
      });
    }
  }, [user, fooditems , mogoadd]);

  // for floating button
  useEffect(() => {
    const floatingButton = document.getElementById("floatingButton");
    if(cart){
      // console.log(cartItems.length);
      if (cart.length === 0) {
        floatingButton.classList.remove("button-position");
        floatingButton.style.display = "none";
      } else {
        floatingButton.classList.add("button-position");
        floatingButton.style.display = "block";
      }
    }   
  }, [cart]);
  // for hero slider
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
    <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              <div className="sliderInfo">
              <span className="spanStyle" >{slideImage.caption}</span>
                <a  style={buttonStyle} href={slideImage.linkto}> Comming Soon </a>
              </div>
             
              </div>
            </div>
          ))} 
        </Slide>
      </div>


      <section id="product1" class="section-p1">
        <div id="breakfast"></div>
        <h2>Breakfast</h2>
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
        <h2>Lunch</h2>
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
        <h2>Fitness Equipment</h2>
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
      </section>
      <section id="feature" class="section-p1">
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
      </section>
      <Link to="/cart" id="floatingButton">
      <div id="cartquantity">{cart?cart?.length:0}</div>
        <img src="https://img.icons8.com/ios/50/null/shopping-cart--v1.png" />
      </Link>
    </div>
  );
};
export default Home;
