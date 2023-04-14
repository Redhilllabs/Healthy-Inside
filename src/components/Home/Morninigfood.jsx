import React, { useState, useEffect } from "react";
import "./MorningFood.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import CartItem from "../Cart/CartItem";

const MorningFood = () => {
    // add to cart funtionality
    const [{ foodItems}, dispatch] = useStateValue();
    // console.log("foodItems",foodItems.data)

  return (
    <div className='MorningFood'>

<div class="line-container">
  <hr class="line"/>
  <div class="text"><h1>Morning</h1></div>
  <hr class="line"/>
</div>

<div className="Morning_Food_Container">
<div class="Foodcard" >
{foodItems && foodItems.data && Array.isArray(foodItems.data) &&
  foodItems.data
    .filter((item) => item.foodType === "breakfast")
    .map((item) => (
      <React.Fragment key={item.foodID}>
        <CartItem item={item}/>
      </React.Fragment>
    ))}




        </div>
</div>


  </div>
  );
};

export default MorningFood;
