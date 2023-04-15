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
 
</div>
  );
};

export default ViewCart;
