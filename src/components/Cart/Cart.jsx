import React, { useEffect, useState } from "react";
import "./cart.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import {AddCart,DecreaseCart, SaveUserAddress} from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import f6 from "../../images/BhelMakhani2.jpg"
import unSub from "../../images/unSub.jpg"
const Cart = () => {
  const [{cartItems, user }, dispatch] = useStateValue();
  const [redirect, setRedirect] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!user.Orders) {
    return (
      <div class="center-message">
  <div class="message-container">
    <img src={unSub} alt="Image" class="center-image"/>
    <h1>You Have Not Subscribed Yet</h1>
    <p class="highlight">Please subscribe to our services to enjoy delicious breakfast meals every day!</p>
  </div>
  {redirect && history('/morningfood')}
</div>
    );
  }
  return (
<div className="VIewcart_container">
    <div className="Viewcart">
    
  <div className="sidebar">
    
      <h2>Added Items</h2>
      <div className="sidebar_container">
      <div className="subscriptiondetails">
          <img src={f6} alt="image" />
        <div className="subcription_text">
          <h2>Breakfast Meal</h2>
          <p>Weekly Plan</p>
          <h5>
             Rs. 777
          </h5>
        </div>
    </div>
    <hr />
      </div>
      
    
  </div>

  <div className="Subscriptioncontainer">
    <div className="deliveryaddress">
    <h2>Delivery Address </h2>
    <address>
  <div>{user?.Address?.addressLine1}</div>
  <div>{user?.Address?.addressLine2}</div>
  <div>{user?.Address?.city}, {user?.Address?.state} {user?.Address?.zip}</div>
</address>
      
    </div>
    <hr />

    <div  >

  <h2> My Subscriptions </h2>
 
<div className="mysubscriptions"> 
  {user?.Orders?.map(order => (
    <div key={order.ValidFrom} className="order_card">
      <p>Quantity: {order?.quantity}</p>
      <p>Valid From: {order?.ValidFrom}</p>
      <p>Valid Till: {order?.ValidTill}</p>
      <p>Grand Total: {order?.GrandTotal}</p>
      <p>Subscribed On: {order?.SubcribedOn}</p>
    </div>
  ))}
</div>
</div>
   <div className="orderinfo">
   <h2>Order Info</h2>
<h4>Item Chagres : Rs 777</h4>
        <h4>Delivery Charge: Free</h4>
        <hr />
  {user?.Orders?.map((order, index) => (
    <div key={order.ValidFrom}>
      
      <div>
      <h4>Order {index+1} Total : {order.GrandTotal}</h4>
             </div>
    </div>
  ))}
  <h2>Total Payable: {user?.Orders?.reduce((total, order) => total + order.GrandTotal, 0)} </h2>
 

</div>

  </div>

</div>
</div>
  );
};

export default Cart;
