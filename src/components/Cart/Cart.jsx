import React, { useEffect, useState } from "react";
import "./cart.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import {AddCart,DecreaseCart} from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [{cartItems, user }, dispatch] = useStateValue();
  const [qty, setQty] = useState(0);
  const [cart, setCartItems] = useState({});
  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [contact,setcontact] = useState("");
  const [ShowAddressForm, setShowAddressForm] = useState(false);
  const navigate = useNavigate();

  // console.log(Object.keys(cartItems).length);

  const updateCart = (foodID, qty, foodUrl, foodName, price) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartItems[foodID] = {qty,foodID,foodUrl, foodName, price};
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItems(cartItems);
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: cartItems });
    
  };
  

  async function updateQuantity(key, action, foodID, qty, foodUrl, foodName, foodPrice) {
    const currentQty = qty;
    let newQty;
  
    if (action === "add") {
      newQty = currentQty + 1;
  
      updateCart(foodID, currentQty + 1, foodUrl, foodName, foodPrice);
      if(user?.email){
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // get the first 10 characters of the ISO string
  
        let bodyContent2 = JSON.stringify({
        "email": user.email,
        "cartDetails":
        {
          "foodID": foodID,
          "foodName": foodName,
          "foodUrl": foodUrl,
          "price": foodPrice,
          "qty": 1,
          "dateAdded": formattedDate
        }
      });
      await AddCart(bodyContent2)}
  
    } else if (action === "subtract") {
      newQty = currentQty - 1;
      updateCart(foodID, currentQty - 1, foodUrl, foodName, foodPrice);
  
        if(user?.email){
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 10); // get the first 10 characters of the ISO string
  
        let bodyContent1 = JSON.stringify({
          "email": user.email,
          "cartDetails":
            {
              "foodID": foodID,
              "foodName": foodName,
              "foodUrl": foodUrl,
              "price": foodPrice,
              "qty": 1,
              "dateAdded": formattedDate
            }
        });
        await DecreaseCart(bodyContent1)
      }
  
    }
  
    // Prevent quantity from going below 0
    if (newQty === 0) {
      newQty = 0;
    }
  
    setQty(newQty);
  
    // Remove item from cart if its quantity becomes zero
    if (newQty === 0) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
      let updatedCartItems = { ...cartItems }; // create a new object that's a copy of the original cartItems object
      delete updatedCartItems[foodID]; // remove the item from the new object
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // store the new object in localStorage
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: updatedCartItems, // pass the new object to the action
      });
    }
  }
  
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || {};
    // console.log(items)
    setCartItems(items);
  }, []);

function submitOrder() {
  // submit the order to the server (assuming this is handled by a separate function)
  // ...
  navigate("/oderSubmit");
  // console.log("orderSubmited !");
}

if (!cartItems) {
  // handle the case where cartItems is undefined or null
  return 0;
}

const totalAmount = Object.keys(cartItems).reduce((acc, key) => {
  const item = cartItems[key];
  return acc + parseFloat(item?.price) * item?.qty;
}, 0);

  const handleUserAddressForm = async (event) => {
    event.preventDefault();
    console.log("coming to submit form ");

    if (!addressLine1 || !addressLine2 || !city || !state || !zip ||!contact ) {
      alert("Please enter your complete address");
      return;
    }
    const data = {
      email : user.email,
      Address:{addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        zip: zip},
      contact:contact
    };
    // const res = await SaveUserAddress(data);
    // console.log(res);
    const updatedUser = { ...user, address: data };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    dispatch({
      type: actionType.SET_USER,
      user: updatedUser,
    });

    submitOrder();
    alert("Address saved!");
  };
  const handleAddress = () =>{
if(user.Address){
// navigate to checkout
    navigate("/oderSubmit");
}else{
  setShowAddressForm(true)
}
  }

  return (

    <div className="Viewcart">
      <div class="sidebar">
        <div class="line-container">
  <hr class="line"/>
  <div ><h7>ADDED ITEMS</h7></div>
  <hr class="line"/>
</div>
        <div id="cartItem">
        <div className="cart">
        {cartItems ? (
          Object.keys(cartItems).length > 0 ? (
    <div className="cart-items">
    {Object.keys(cartItems).map((key) => {
  const item = cartItems[key];
  return (
    <div className="viewcart" key={key}>
      <img src={item?.foodUrl} alt={item?.foodName} />
      <div className="viewcart_box">
        <p className="viewcart_box_name">{item?.foodName}</p>
        <p className="viewcart_box_price">
          $ {parseFloat(item?.price) * item?.qty}
        </p>
      </div>

      <div className="viewcart_box_control">
        <a onClick={() => updateQuantity(key, "subtract", item?.foodID,item?.qty, item?.foodUrl, item?.foodName, item?.price)} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="minus"><path fill="#000" d="M6 13a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2H6Z"></path></svg>
</a>
<p>{item?.qty}</p>
<a onClick={() => updateQuantity(key, "add", item?.foodID, item?.qty, item?.foodUrl, item?.foodName, item?.price)}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="plus"><path fill="#000" d="M12 5a1 1 0 0 0-1 1v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6a1 1 0 0 0-1-1Z"></path></svg>
</a>
      </div>
    </div>
  );
})}

    </div>
    ) : (
    <p>Your cart is empty !</p>
  )
) : (
  <p>Loading cart...</p>
)}

</div>
        </div>
        <div class="line-container">
  <hr class="line"/>
  <div ><h7>BILL SUMMARY</h7></div>
  <hr class="line"/>
</div>

        <div class="foot" id="cartItem">
        <div className="totalprice">
        <h9>Subtotal </h9>
          <h6 >{totalAmount.toFixed(2)}</h6>
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
          <h6 >{(22 + 49 + totalAmount).toFixed(2)}</h6>
        </div>
        </div>
        <br />
  <a className="orderbtn" onClick={handleAddress}>
   Continue
  </a>

  {ShowAddressForm && (

    <div class="modal">
  <div class="modal-content">
    <form id="address-form" class="address-form">
      <div class="address-form-heading">
        <div class="addressheading">
          <h3>Enter Address</h3>
        </div>
        <div class="address-close" onClick={() => setShowAddressForm(false)}>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div class="input-wrapper">
      <div>
      <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
        
<div>
<label for="address-line1">Address Line 1:</label>
        <input
          type="text"
          id="addressline1"
          name="addressline1"
          value={addressLine1}
          onChange={(event) => setAddressLine1(event.target.value)}
          required
        />
</div>

        
<div>
<label for="address-line2">Address Line 2:</label>
        <input
          type="text"
          id="addressline2"
          name="addressline2"
          value={addressLine2}
          onChange={(event) => setAddressLine2(event.target.value)}
        />
</div>
      
      <div>
<label for="contact">contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={contact}
          onChange={(event) => setcontact(event.target.value)}
          required
        />
</div>
<div>
<label for="city">City:</label>
  <input
    type="text"
    id="city"
    name="city"
    value={city}
    onChange={(event) => setCity(event.target.value)}
    required
  />
</div>

  <div>
  <label for="state">State:</label>
  <input
    type="text"
    id="state"
    name="state"
    value={state}
    onChange={(event) => setState(event.target.value)}
    required
  />
  </div>

  
<div>
<label for="zip">Zip Code:</label>
  <input
    type="text"
    id="zip"
    name="zip"
    value={zip}
    onChange={(event) => setZip(event.target.value)}
    required
  />
</div>
  
  </div>
  <button type="submit" onClick={handleUserAddressForm} name="submit">
    Checkout
  </button>
</form>
</div>
</div>
)}

      </div>  
    </div>
  );
};

export default Cart;
