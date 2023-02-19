import React from "react";
import "./cartitem.css";
// import { AddToCart } from "../utils/mongodbFunctions";
import { useStateValue } from "../context/StateProvider";

let items = [];
const CartItem = ({ item,addfooditem ,addcartmongo}) => {
  const [{user}, dispatch] = useStateValue();

// const addcartmongo = async(item_id)=>{
// if(user){
//   AddToCart(item_id, user[0]._id).then((data)=>{
//     console.log("response from server",data)
//     }).catch((err)=>{
//     console.log("Error occured",err)
//     })
// }
// }

  return (
    <div className="cart_container">
      <div class="card" key={item.foodID}>
        <img src={item.foodUrl} alt="${food.foodUrl}" />
        <div class="box">
          <div class="des">
            <h5>{item.foodName}</h5>
            
            <div className="cart-item-controls">
            <button id="additemtocart" onClick={() => {
            addfooditem(item)
            addcartmongo(item._id)
          }
            }>
            <img src="https://img.icons8.com/ios/50/null/plus-key.png"/>
            </button>

          </div>
          <h4>${item.foodPrice} </h4>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartItem;
