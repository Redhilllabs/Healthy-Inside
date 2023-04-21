import React,{useEffect,useState} from 'react';
// import RazorpayCheckout from './RazorpayCheckout';
import { useLocation } from 'react-router-dom';
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { AddOrder } from "../../utils/ApiCall";
import { BrowserRouter, useNavigate } from "react-router-dom";
import './OrderSubmit.css';


const OrderSubmit = (props) => {
  const [{cartItems, user }, dispatch] = useStateValue();
  const [display, setDisplay] = useState(false);
  const [message,setmessage] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const qty = location.state
  const contact = location.contact
  // console.log(qty,"in order submit ",)

  const handleCheckOut = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); 

    let bodyContent = JSON.stringify({
      "date": formattedDate,
      "user_email": user.email,
      "order_details": [{"quantity":qty,"ValidFrom":validFrom,"ValidTill":validTillString,"GrandTotal":qty * 777,"contact":contact,"SubcribedOn":formattedDate, "Address":user.Address,"contact":user.NewContact}]
    });

    const response = await AddOrder(bodyContent);
    
    const newOrder = {"quantity":qty,"ValidFrom":validFrom,"ValidTill":validTillString,"GrandTotal":qty * 777,"contact":contact,"SubcribedOn":formattedDate};

    const updatedUser = { 
      ...user, 
      Orders: user?.Orders ? [...user.Orders, newOrder] : [newOrder]
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));


    dispatch({
      type: actionType.SET_USER,
      user: updatedUser,
    });
    if (response.status === 200) {
      setDisplay(true);
      setmessage("Order Done");
      const timer = setTimeout(() => {
        setDisplay(false);
        window.location.reload();
        navigate('/')
      }, 3000);
      return () => clearTimeout(timer);
    }
  }
  useEffect(() => {
    if (!qty) {
      navigate('/'); // Redirect to the homepage if the qty value is not provided in the state
    }
  }, [qty, navigate]);

  const now = new Date();
  let daysToAdd = 6;
  let validFrom = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  
  // If the valid from date is on or after a Sunday, add an extra day
  if (validFrom.getDay() === 0) {
    validFrom.setDate(validFrom.getDate() + 1);
  }
  
  validFrom = validFrom.toISOString().slice(0, 10);
  
  // Calculate the valid till date as 6 days from the valid from date
  let validTill = new Date(validFrom);
  validTill.setDate(validTill.getDate() + daysToAdd);
  
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
<div className={`order-confirmation ${display ? "show" : ""}`}>
      <p> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" id="check-order"><path fill="#c37f50" d="M67,8.47H12.78a3.67,3.67,0,0,0-3.67,3.68V91.32A3.67,3.67,0,0,0,12.78,95H67a3.68,3.68,0,0,0,3.68-3.68V12.15A3.68,3.68,0,0,0,67,8.47ZM65.37,89.69H14.42V13.78h51Z"></path><path fill="#af6650" d="M65.37,60.5V89.69H43.5V95H67a3.68,3.68,0,0,0,3.68-3.68V60.5Z"></path><rect width="5.31" height="22.85" x="65.37" y="48" fill="#af6650"></rect><rect width="5.31" height="22.85" x="65.37" y="48" fill="#af6650"></rect><path fill="#dca764" d="M65.37,33.6h5.31V12.15A3.67,3.67,0,0,0,67,8.47H12.79a3.68,3.68,0,0,0-3.68,3.68V32.83h5.31v-19h51Z"></path><rect width="32.33" height="5.31" x="23.72" y="8.47" fill="#c37f50"></rect><rect width="50.95" height="75.91" x="14.42" y="13.78" fill="#cfd6ff"></rect><rect width="42.95" height="40.55" x="18.42" y="17.78" fill="#e8efff" rx="1.24"></rect><rect width="25.76" height="7.92" x="27.01" y="65.38" fill="#e8efff" rx="1.24"></rect><path fill="#7481a9" d="M53.91,8v4.44a1.3,1.3,0,0,1-1.29,1.3H27.18a1.3,1.3,0,0,1-1.3-1.3V8a1.3,1.3,0,0,1,1.3-1.3h3.95a3.24,3.24,0,0,0,3.25-3.25V2.36A1.36,1.36,0,0,1,35.75,1h8.3a1.36,1.36,0,0,1,1.36,1.36V3.49a3.25,3.25,0,0,0,3.25,3.25h4A1.3,1.3,0,0,1,53.91,8Z"></path><path fill="#889fc2" d="M53.91,8v2.51a1.29,1.29,0,0,1-1.29,1.29H27.18a1.3,1.3,0,0,1-1.3-1.29V8a1.3,1.3,0,0,1,1.3-1.3h3.95a3.24,3.24,0,0,0,3.25-3.25V2.36A1.36,1.36,0,0,1,35.75,1h8.3a1.36,1.36,0,0,1,1.36,1.36V3.49a3.25,3.25,0,0,0,3.25,3.25h4A1.3,1.3,0,0,1,53.91,8Z"></path><rect width="21.25" height="21.25" x="29.27" y="24" fill="#ff9d50" rx="1.47"></rect><path fill="#ffb15f" d="M48.94,25.42V41.78a1.32,1.32,0,0,1-1.13,1.43H32.49a1.31,1.31,0,0,1-1.13-1.43V25.42A1.3,1.3,0,0,1,32.49,24H47.81A1.31,1.31,0,0,1,48.94,25.42Z"></path><path fill="#ffde82" d="M48.94,26v-.59A1.31,1.31,0,0,0,47.81,24H32.49a1.3,1.3,0,0,0-1.13,1.42V26Z"></path><rect width="7.31" height="8.47" x="36.24" y="24" fill="#ff703c"></rect><rect width="7.31" height="2.02" x="36.24" y="24" fill="#ff8941"></rect><path fill="#fff" d="M41.26,36H38.52a.81.81,0,0,1-.81-.81.82.82,0,0,1,.81-.81h2.74a.81.81,0,1,1,0,1.62Z"></path><path fill="#4c5472" d="M42.09,39.56h-4.4a1,1,0,0,1,0-2h4.4a1,1,0,0,1,0,2Z"></path><path fill="#3a3c51" d="M55.52 57.87H24.27a1 1 0 010-2H55.52a1 1 0 010 2zM55.52 63.75H24.27a1 1 0 110-2H55.52a1 1 0 110 2zM55.52 69.62H24.27a1 1 0 110-2H55.52a1 1 0 110 2zM50.52 75.5H24.27a1 1 0 110-2H50.52a1 1 0 110 2zM38.84 81.37H24.27a1 1 0 110-2H38.84a1 1 0 010 2z"></path><circle cx="72.65" cy="80.75" r="14.24" fill="#50b981"></circle><path fill="#fff" d="M69.07,86.44,64.56,83A2,2,0,0,1,67,79.8l3.16,2.43,8-7.54A2,2,0,0,1,80.9,77.6l-9.24,8.71A2,2,0,0,1,69.07,86.44Z"></path></svg>
{message}
</p>
    </div>

<div class="Ordercontainer">
  <div class="checkout-form">
  <div class="line-container">
  <hr class="line"/>
  <div ><h4>CHECKOUT</h4></div>
  <hr class="line"/>
</div>
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
  <h4>
    Valid From: <span><i>{validFrom}</i></span><br />
    Valid Till: <span><i>{validTillString}</i></span>
  </h4>
  <p>* Delivery on Sundays is not available</p>
  <h4>Quantity: {qty}</h4>
</div>
      
    </div>
   
    <div className="bill_summery">
    <div class="line-container">
  <hr class="line"/>
  <h4>BILL SUMMARY</h4>
  <hr class="line"/>
</div>
    <div class="foot" id="billsummary">
        <div className="totalprice">
        <h4>Subtotal </h4>
          <h4>Rs. {qty * 777}</h4>
        </div>

        <div className="totalprice">
        <h4>Delivery partner fee <br /> (up to 4 Km) </h4>
          <h4> Free </h4>
        </div>
<hr />
<div className="totalprice">
        <h4>Grand Total </h4>
          <h4 >Rs. {qty * 777}</h4>
        </div>
        <div class="cash-on-delivery">
          <p>*Delivery Will Be COD </p>
          <button id="checkout-button" onClick={handleCheckOut}>CheckOut</button>
        </div>
        </div>
    </div>

  </div>
</div>




    </>
  )
}

export default OrderSubmit