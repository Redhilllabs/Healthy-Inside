import React, { useEffect, useState } from "react";
import './viewcart.css'
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { AddToCart ,decreaseCartItem  } from "../utils/mongodbFunctions";

let items = [];
const ViewCart = ({ item, setFlag, flag }) => {
// console.log("viewcart",item)
    const [{ cartItems ,user}, dispatch] = useStateValue();
    const [qty, setQty] = useState(item.quantity);
  
    const cartDispatch = () => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: cartItems,
      });
    };
  
    const updateQty = (action, id) => {
      let updateItems ;
      if (action == "add") {
        setQty(qty + 1);
        updateItems= cartItems.map((item) => {
          if (item._id
            === id) {
            item.quantity += 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
        // console.log("user",user[0]._id)
        // console.log("id",id)
        AddToCart(id,user[0]._id)
      } else {
        // initial state value is one so you need to check if 1 then remove it
        if (qty == 1) {
          items = cartItems.filter((item) => item._id !== id);
          setFlag(flag + 1);
          cartDispatch();
        } else {
          setQty(qty - 1);
          cartItems.map((item) => {
            if (item._id
                === id) {
              item.quantity
              -= 1;
              setFlag(flag + 1);
              decreaseCartItem(id,user[0]._id)
            }
          });
          cartDispatch();
        }
      }
    };
  
    useEffect(() => {
      items = cartItems;
    }, [qty, items]);

  return (
    <div className="viewcart">
        <img src={item?.productID.foodUrl} alt="" srcset="" />
        <div className="viewcart_box">
            <p className="viewcart_box_name">{item?.productID.foodName}</p>
            <p className="viewcart_box_price">
            $ {parseFloat(item?.productID.foodPrice
) * qty}
            </p>
        </div>

        <div className="viewcart_box_control">
            <a onClick={() => updateQty("remove", item?.productID._id)} ><img src="https://img.icons8.com/ios/50/null/minus-2-math.png"/></a>
        <p>{qty}</p>
        <a onClick={() => updateQty("add", item?.productID._id)} ><img src="https://img.icons8.com/ios/50/null/plus-key.png"/></a>
        
        </div>
    </div>
  )
}

export default ViewCart