import React from 'react';
import RazorpayCheckout from './RazorpayCheckout';
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { AddOrder } from "../../utils/ApiCall";
import { BrowserRouter, useNavigate } from "react-router-dom";
import './OrderSubmit.css';

const OrderSubmit = () => {
  const [{cartItems, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  
  const handleCheckOut = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); 

    let bodyContent = JSON.stringify({
      "date": formattedDate,
      "user_email": user.email,
      "order_details": cartItems
    });

    const response = await AddOrder(bodyContent);
    
    if(response.status === 200) {
      alert("saved data in Orders ");
      window.location.reload();
      navigate("/");
    }
  }

  return (
    <>
<div class="container">
  <div class="checkout-form">
    <h2>Checkout</h2>
    <div class="summary-address">
      <div class="address">
        <h2>Address</h2>
        <p>Address Line 1: {user.Address.addressLine1}</p>
        <p>Address Line 2: {user.Address.addressLine2}</p>
        <p>City: {user.Address.city}</p>
        <p>State: {user.Address.state}</p>
        <p>Zip: {user.Address.zip}</p>
      </div>

      <div class="order-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index}>
            <img src={item.foodUrl} alt={item.foodName} />
            <p>Food Name: {item.foodName}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.qty}</p>
            <p>Date Added: {item.dateAdded}</p>
          </div>
        ))}
      </div>
    </div>

    <div class="payment-options">
      <h2>Payment Options</h2>
      <div class="payment-methods">
        <div class="upi">
          <h3>UPI</h3>
          <p>Enter UPI ID:</p>
          <input type="text" id="upi-id" name="upi-id"/>
        </div>
        <div class="net-banking">
          <h3>Net Banking</h3>
          <p>Select Bank:</p>
          <select id="bank-name" name="bank-name">
            <option value="bank1">Bank 1</option>
            <option value="bank2">Bank 2</option>
            <option value="bank3">Bank 3</option>
          </select>
        </div>
        <div class="cash-on-delivery">
          <h3>Cash On Delivery</h3>
          <button id="checkout-button" onClick={handleCheckOut}>Cash On Delivery</button>
        </div>
        {/* <div id="razorpay-container">Razor Pay</div>
    
    <div id="gpay-button"> Google Pay </div> */}
      </div>

    </div>
  </div>
</div>




    </>
  )
}

export default OrderSubmit