import React, { useState, useEffect } from "react";
import "./cartitem.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const CartItem = ({ item}) => {
  const [{ user }, dispatch] = useStateValue();
const [qty, setQty] = useState(0);
const [cartItems, setCartItems] = useState({});

  const updateCart = (foodID, qty, foodUrl, foodName, price) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartItems[foodID] = {qty, foodUrl, foodName, price};
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItems(cartItems);
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: cartItems });
  };
  

  async function updateQuantity(action) {
    const currentQty = qty;
    let newQty;
  
    if (action === "add") {
      newQty = currentQty + 1;
     
      updateCart(item.foodID, qty + 1, item.foodUrl, item.foodName, item.foodPrice
        );

  
    } else if (action === "subtract") {
      newQty = currentQty - 1;
      updateCart(item.foodID, qty - 1, item.foodUrl, item.foodName, item.foodPrice
        );

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
      delete updatedCartItems[item.foodID]; // remove the item from the new object
    
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // store the new object in localStorage
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: updatedCartItems, // pass the new object to the action
      });
    }
  }
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(items);
  }, []);
  

  return (
    <div className="cart_container" key={item.foodID}>
      {item.foodUrl ? (
        <img src={item.foodUrl} alt={item.foodName} />
      ) : (
        <img
          src="https://via.placeholder.com/150x150.png?text=No+Image"
          alt="No Image"
        />
      )}
      <div className="box">
        <h2>{item.foodName}</h2>
        <div className="des">
        <h4>Rs {item.foodPrice}</h4>
          <div className="viewcart_box_control">
          <a onClick={() => updateQuantity("subtract")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="minus"><path fill="#000" d="M6 13a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2H6Z"></path></svg>
</a>
<p>{qty}</p>
<a onClick={() => updateQuantity("add")}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="plus"><path fill="#000" d="M12 5a1 1 0 0 0-1 1v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6a1 1 0 0 0-1-1Z"></path></svg>
</a>

      </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartItem;
