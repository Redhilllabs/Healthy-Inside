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
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { GetCart , AddToCart } from "../utils/mongodbFunctions";
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
     await AddToCart(item_id, user._id).then((data)=>{
        // console.log("response from server",data)
        setmongoadd(data)
        }).catch((err)=>{
        console.log("Error occured",err)
        })
    }
    }

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
        setCart(data.data.cart);
      });
    }
    
  }, [user,fooditems ,mogoadd]);

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
    
  }, [cart,mogoadd]);

  // for hero slider
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  return (
    <div>
      <section className="hero">
        <div className="slider">
          <div className="slides">
            {slides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={`Slide ${slide.id}`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              />
            ))}
          </div>
          <div className="slide-navigation">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={currentSlide === index ? "active" : ""}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>
      <section id="product1" class="section-p1">
        <div id="breakfast"></div>
        <h2>Breakfast</h2>
        <p>Enjoy our healthy and light breakfast.</p>

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
                  <CartItem item={item} addfooditem={addfooditem} />
                </React.Fragment>
              ))}
        </div>
        <div id="dinner"></div>
        <h2>Fitness Equipment</h2>
        <p>We have variety of fitness equipments.</p>
        <div class="pro-container card-slider" id="shop-section3"></div>
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
