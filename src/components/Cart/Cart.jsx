import React, { useEffect, useState } from "react";
import "./cart.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import {AddCart,DecreaseCart, SaveUserAddress} from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import f6 from "../../images/BhelMakhani2.jpg"

const Cart = () => {
  const [{cartItems, user }, dispatch] = useStateValue();

  return (
<>
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
            <s>  1570</s> Rs. 777
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
  <div>{user.Address.addressLine1}</div>
  <div>{user.Address.addressLine2}</div>
  <div>{user.Address.city}, {user.Address.state} {user.Address.zip}</div>
</address>
      
    </div>
    <hr />

    <div  >

  <h2> My Subscriptions </h2>
 
<div className="mysubscriptions"> 
  {user.Orders.map(order => (
    <div key={order.ValidFrom} className="order_card">
      <p>Quantity: {order.quantity}</p>
      <p>Valid From: {order.ValidFrom}</p>
      <p>Valid Till: {order.ValidTill}</p>
      <p>Grand Total: {order.GrandTotal}</p>
      <p>Subscribed On: {order.SubcribedOn}</p>
    </div>
  ))}
</div>
</div>
   <div className="orderinfo">
   <h2>Order Info</h2>
<h4>Item Chagres : Rs 777</h4>
        <h4>Delivery Charge: Free</h4>
        <hr />
  {user.Orders.map((order, index) => (
    <div key={order.ValidFrom}>
      
      <div>
      <h4>Order {index} Total : {order.GrandTotal}</h4>
             </div>
    </div>
  ))}
  <h2>Total Payable: {user.Orders.reduce((total, order) => total + order.GrandTotal, 0)} </h2>
 

</div>

  </div>
</div>
</>
  );
};

export default Cart;
