import React, { useState, useEffect } from "react";
import "./cartitem.css";
import { useStateValue } from "../../context/StateProvider";
import { Buffer } from "buffer";

let items = [];
const CartItem = ({ item}) => {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState("");
  const [qty, setQty] = useState(0);
  function updateQuantity(action) {
    const currentQty = qty;
    let newQty;
  
    if (action === "add") {
      newQty = currentQty + 1;
    } else if (action === "subtract") {
      newQty = currentQty - 1;
    }
  
    // Prevent quantity from going below 0
    if (newQty < 0) {
      newQty = 0;
    }
  
    setQty(newQty);
  }
  

  return (
    <div className="cart_container contain" key={item.foodID}>
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
        <h4>Rs 99 </h4>
          <div className="viewcart_box_control">
          <a onClick={() => updateQuantity("subtract")}>
  <img src="https://img.icons8.com/ios/50/null/minus-2-math.png" />
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
