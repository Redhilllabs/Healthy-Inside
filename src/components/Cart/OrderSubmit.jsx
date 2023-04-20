import React,{useEffect} from 'react';
// import RazorpayCheckout from './RazorpayCheckout';
import { useLocation } from 'react-router-dom';
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { AddOrder } from "../../utils/ApiCall";
import { BrowserRouter, useNavigate } from "react-router-dom";
import './OrderSubmit.css';

const OrderSubmit = (props) => {
  const [{cartItems, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const location = useLocation();

  const qty = location.state
  // console.log(qty,"in order submit ",)

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
      navigate("/");
      alert("saved data in Orders ");
      window.location.reload();
      
    }
  }
  useEffect(() => {
    if (!qty) {
      navigate('/'); // Redirect to the homepage if the qty value is not provided in the state
    }
  }, [qty, navigate]);

  const now = new Date();
  let daysToAdd = 6;
  let validFrom = now.toISOString().slice(0, 10);
  
  // Calculate the valid till date as 6 days from now
  let validTill = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  
  // If the valid till date is on or after a Sunday, add an extra day
  if (validTill.getDay() === 0) {
    validTill.setDate(validTill.getDate() + 1);
    daysToAdd++;
  }
  
  // Check if there is a Sunday between the valid from and valid till dates
  let hasSunday = false;
  let currentDate = new Date(validFrom);
  while (currentDate <= validTill) {
    if (currentDate.getDay() === 0) {
      hasSunday = true;
      break;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // If there is a Sunday, add one more day to the valid till date
  if (hasSunday) {
    validTill.setDate(validTill.getDate() + 1);
    daysToAdd++;
  }
  
  const validTillString = validTill.toISOString().slice(0, 10);
  return (
    <>
<div class="Ordercontainer">
  <div class="checkout-form">
    <h2>Checkout</h2>
    <div class="summary-address">
      <div class="address">
        <h2>Delivery At</h2>
        <p>Address Line 1: {user.Address?.addressLine1}</p>
        <p>Address Line 2: {user.Address?.addressLine2}</p>
        <p>City: {user.Address?.city}</p>
        <p>State: {user.Address?.state}</p>
        <p>Zip: {user.Address?.zip}</p>
      </div>

      <div className="order-summary">
  <h2>Order Summary</h2>
  <h4>Subscription for 6 Days Of Meal </h4>
  <h6>
    Valid From: <span><i>{now.toISOString().slice(0, 10)}</i></span><br />
    Valid Till: <span><i>{validTillString}</i></span>
  </h6>
  <p>* Delivery on Sundays is not available</p>
  <h5>Quantity: {qty}</h5>
</div>
      
    </div>
   
    <div className="bill_summery">
    <div class="line-container">
  <hr class="line"/>
  <div ><h7>BILL SUMMARY</h7></div>
  <hr class="line"/>
</div>
    <div class="foot" id="billsummary">
        <div className="totalprice">
        <h9>Subtotal </h9>
          <h6 >${qty * 7}</h6>
        </div>

        <div className="totalprice">
        <h9>GST charges</h9>
          <h6 >Rs 49</h6>
        </div>
        <div className="totalprice">
        <h9>Delivery partner fee <br /> (up to 4 Km) </h9>
          <h6 >Rs 22 </h6>
        </div>
<hr />
<div className="totalprice">
        <h6>Grand Total </h6>
          <h6 >${(qty * 7)+22+49}</h6>
        </div>
        </div>
    </div>
    
    <div class="payment-options">
      <h2>Payment Options</h2>
      <div class="payment-methods">
        {/* <div class="upi">
          <h3>UPI</h3>
          <p>Enter UPI ID:</p>
          <input type="text" id="upi-id" name="upi-id"/>
        </div> */}
        {/* <div class="net-banking">
          <h3>Net Banking</h3>
          <p>Select Bank:</p>
          <select id="bank-name" name="bank-name">
            <option value="bank1">Bank 1</option>
            <option value="bank2">Bank 2</option>
            <option value="bank3">Bank 3</option>
          </select>
        </div> */}
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