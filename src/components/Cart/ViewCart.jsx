import React, { useEffect, useState } from "react";
import "./viewcart.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const ViewCart = () => {
  const [{ cartItems, user }, dispatch] = useStateValue();
  const updateQty = (action, id) => {
  };
  return (
    <div className="cart">
  {/* // <h1>Cart</h1> */}
  {/* // {cartItems.length === 0 ? ( */}
  {/* //   <p>Your cart is empty.</p>
  // ) : (
  //   <div className="cart-items">
  //     {cartItems.slice(0, 3).map((item) => ( */}
  {/* //       <div className="viewcart" key={item.foodID}>
  //         <img src={item.foodUrl} alt={item.foodName} />
  //         <div className="viewcart_box">
  //           <p className="viewcart_box_name">{item.foodName}</p>
  //           <p className="viewcart_box_price">
  //             $ {parseFloat(item.foodPrice) * item.qty}
  //           </p>
  //         </div>

  //         <div className="viewcart_box_control">
  //           <a onClick={() => updateQty("remove", item.foodID)}>
  //             <img src="https://img.icons8.com/ios/50/null/minus-2-math.png" />
  //           </a>
  //           <p>{item.qty}</p>
  //           <a onClick={() => updateQty("add", item.foodID)}>
  //             <img src="https://img.icons8.com/ios/50/null/plus-key.png" />
  //           </a>
  //         </div>
  //       </div>
  //     ))}
  //   </div> */}
  {/* // )} */}
</div>
  );
};

export default ViewCart;
