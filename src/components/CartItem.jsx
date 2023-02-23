import React,{useState,useEffect} from "react";
import "./cartitem.css";
import { useStateValue } from "../context/StateProvider";
import { Buffer } from 'buffer';

let items = [];
const CartItem = ({ item,addfooditem ,addcartmongo}) => {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`data:${item.foodUrl.contentType};base64,${Buffer.from(item.foodUrl.data).toString('base64')}`);
      const data = await response.blob();
      setImage(URL.createObjectURL(data));
    };
    fetchImage();
  }, [item.foodUrl.contentType, item.foodUrl.data]);

  
  return (
    <div className="cart_container contain" key={item.foodID}>
    {item.foodUrl ? (
      <img src={image} alt={item.foodName} /> ) : (
      <img
        src="https://via.placeholder.com/150x150.png?text=No+Image"
        alt="No Image"
      />
    )}
    <div className="box">
      <h2>{item.foodName}</h2>
      <div className="des">
        <div className="cart-item-controls">
          <button
            id="additemtocart"
            onClick={() => {
              addcartmongo(item._id);
              addfooditem(item);
              
            }}
          >
            <img src="https://img.icons8.com/ios/50/null/plus-key.png" />
          </button>
        </div>
        <h4>${item.foodPrice}</h4>
      </div>
    </div>
  </div>
  );
};

export default CartItem;
