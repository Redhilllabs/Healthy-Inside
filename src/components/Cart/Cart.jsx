import React, { useEffect, useState } from "react";
import "./cart.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Cart = () => {
  const [{cartItems, user }, dispatch] = useStateValue();
  const [qty, setQty] = useState(0);
  const [cart, setCartItems] = useState({});

  const updateCart = (foodID, qty, foodUrl, foodName, price) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartItems[foodID] = {qty, foodUrl, foodName, price};
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItems(cartItems);
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: cartItems });
  };

 const updateCartItemQuantity = (foodID, action, qty, foodUrl, foodName, foodPrice) => {
  const currentQty = qty;
  let newQty;

  if (action === "add") {
    newQty = currentQty + 1;

    updateCart(foodID, qty + 1, foodUrl, foodName, foodPrice);
  } else if (action === "subtract") {
    newQty = currentQty - 1;

    updateCart(foodID, qty - 1, foodUrl, foodName, foodPrice);
  }

  // Prevent quantity from going below 0
  if (newQty < 0) {
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
  } else {
    // Update the quantity of the cart item with the specified foodID
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    let updatedCartItems = { ...cartItems }; // create a new object that's a copy of the original cartItems object
    updatedCartItems[foodID].quantity = newQty; // update the quantity of the cart item

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // store the new object in localStorage
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedCartItems, // pass the new object to the action
    });
  }
};


  const totalAmount = Object.keys(cartItems).reduce((acc, key) => {
    const item = cartItems[key];
    return acc + parseFloat(item.price) * item.qty;
  }, 0);

  return (
    <div className="Viewcart">
      <div class="sidebar">
        {/* <div class="head"> */}
        <div class="line-container">
  <hr class="line"/>
  <div ><h7>CART</h7></div>
  <hr class="line"/>
</div>
        {/* </div> */}
        
        <div id="cartItem">
        <div className="cart">
        {cartItems ? (
  cartItems.length > 0 ? (
    <div className="cart-items">
    {Object.keys(cartItems).map((key) => {
  const item = cartItems[key];
  return (
    <div className="viewcart" key={key}>
      <img src={item.foodUrl} alt={item.foodName} />
      <div className="viewcart_box">
        <p className="viewcart_box_name">{item.foodName}</p>
        <p className="viewcart_box_price">
          $ {parseFloat(item.price) * item.qty}
        </p>
      </div>

      <div className="viewcart_box_control">
        <a onClick={() => updateCartItemQuantity(key, "subtract", item.qty, item.foodUrl, item.foodName, item.price)} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="minus"><path fill="#000" d="M6 13a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2H6Z"></path></svg>
</a>
<p>{item.qty}</p>
<a onClick={() => updateCartItemQuantity(key, "add", item.qty, item.foodUrl, item.foodName, item.price)}>
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

        <div class="foot">
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
        {/* {cartItems.length > 0 ? ( */}
        <br />
  <a className="orderbtn">
   Continue
  </a>
{/* ) : (
  <></>
)} */}

      </div>  
    </div>
  );
};

export default Cart;
