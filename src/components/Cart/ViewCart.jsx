import React, { useEffect, useState } from "react";
import "./viewcart.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { AddToCart, decreaseCartItem } from "../../utils/ApiCall";
import { Buffer } from "buffer";

let items = [];
const ViewCart = ({ item, setFlag, flag }) => {

  const [{ cartItems, user }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.quantity);

  const cartDispatch = () => {
    cartItems.forEach((item) => {
      AddToCart(user.email, item.foodID, item.quantity);
    });
  };

  const updateQty = (action, id) => {
    let updatedItems;
    if (action === "add") {
      setQty(qty + 1);
      updatedItems = cartItems.map((item) => {
        if (item.foodID === id) {
          item.quantity += 1;
          // item.foodPrice = qty * item.foodPrice;
          setFlag(flag + 1);
        }
        return item;
      });
    } else if (action === "remove") {
      const newQty = qty - 1;
      // const newPrice = parseFloat(item.foodPrice) * newQty;
      setQty(newQty);
      updatedItems = cartItems.map((item) => {
        if (item.foodID === id) {
          item.quantity -= 1;
          // item.foodPrice = newPrice;
          setFlag(flag + 1);
          
        }
        return item;
      });
      if (qty <= 1) {
        updatedItems = updatedItems.filter((item) => item.foodID !== id);
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedItems,
    });
  };
  
  useEffect(() => {
cartDispatch()
  }, [cartItems]);

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="viewcart">
      <img src={item?.foodUrl} alt="" srcset="" />
      <div className="viewcart_box">
        <p className="viewcart_box_name">{item?.foodName}</p>
        <p className="viewcart_box_price">
          $ {parseFloat(item?.foodPrice) * qty}
        </p>
      </div>

      <div className="viewcart_box_control">
        <a onClick={() => updateQty("remove", item?.foodID)}>
          <img src="https://img.icons8.com/ios/50/null/minus-2-math.png" />
        </a>
        <p>{qty}</p>
        <a onClick={() => updateQty("add", item?.foodID)}>
          <img src="https://img.icons8.com/ios/50/null/plus-key.png" />
        </a>
      </div>
    </div>
  );
};

export default ViewCart;
