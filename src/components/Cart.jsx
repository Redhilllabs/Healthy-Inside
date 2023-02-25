import React, { useEffect, useState } from "react";
import "./cart.css";
import { GetCart, SaveUserAddress } from "../utils/mongodbFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import ViewCart from "./ViewCart";
import { useNavigate } from "react-router-dom";
import { LoginAPi } from "../utils/mongodbFunctions";
import loadingGif from '../images/loading.gif';

const Cart = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0.0);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [ShowAddressForm, setShowAddressForm] = useState(false);
  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   // Fetch cart data and set state
  //   if (user) {
  //     console.log("load ho raha haii data")
  //     GetCart(user._id).then((data) => {
  //       console.log(data)
  //       setCart(data.data.cart);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    let totalPrice = 0;
  if(cartItems){
    for (let i = 0; i < cartItems?.length; i++) {
      totalPrice += cartItems[i].quantity * cartItems[i].foodPrice;
    }
    setTot(totalPrice);
  }
  
 
  }, [cartItems,flag ]);
  
  function submitOrder() {
    // submit the order to the server (assuming this is handled by a separate function)
    // ...
    navigate("/oderSubmit");
    // console.log("orderSubmited !");
  }
  function checkout() {
    // check if the user's address is available
    const userAddress = user?.address;
    if (!userAddress) {
      console.log("userAddress is not availabe");
      setShowAddressForm(true);
    } else {
      console.log("address is availabe");
      submitOrder();
    }
  }

  const handleUserAddressForm = async (event) => {
    event.preventDefault();
    console.log("coming to submit form ");

    if (!addressLine1 || !addressLine2 || !city || !state || !zip ) {
      alert("Please enter your complete address");
      return;
    }
    const data = {
      email : user.email,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      zip: zip,
    };
    const res = await SaveUserAddress(data);
    console.log(res);
    const updatedUser = { ...user, address: data };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    dispatch({
      type: actionType.SET_USER,
      user: updatedUser,
    });
    
    submitOrder();
    alert("Address saved!");
  };

  // if (isLoading) {
  //   return <img src={loadingGif} alt="Loading..." />;
  // }

  return (
    <div className="Viewcart">
      <div class="sidebar">
        <div class="head">
          <p> Cart </p>
        </div>
        <div id="cartItem">
          {cartItems?.length>0 ?
            cartItems.map((item) => (
              <React.Fragment key={item.foodID}>
                <ViewCart item={item} setFlag={setFlag} flag={flag} />
              </React.Fragment>
            )):(<> 
            <div>
           Empty Cart ! 
            </div>
             </>) }
        </div>

        <div class="foot">
        <div className="totalprice">
        <h2>Total</h2>
          <h2 id="total">${tot}</h2>
        </div>
          
          <div className="creditsuser">
          <h2>
            Credit
            </h2>
            <h2>{user ? user?.sellingPrice : <></>}{" "}</h2> 
          </div>
          
        </div>
        

            {
          cartItems?.length>0 ?(<a onClick={checkout} class="orderbtn">
          Place Order
        </a>):<></>
            }
        
      </div>

      {ShowAddressForm && (

        <div class="modal">
        <div class="modal-content">
        <form id="address-form" class="address-form">
          <div class="address-form-heading">
            <div class="addressheading">
              <h3>Enter Address</h3>
            </div>
            <div class="address-close" onClick={() => setShowAddressForm(false)}>
            <i class="fa-solid fa-xmark"></i>
              {/* <img id="address-close"  src="https://img.icons8.com/ios/50/null/close-window--v1.png"/>               */}
            </div>
          </div>
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label for="address-line1">Address Line 1:</label>
          <input
            type="text"
            id="addressline1"
            name="addressline1"
            value={addressLine1}
            onChange={(event) => setAddressLine1(event.target.value)}
            required
          />

          <label for="address-line2">Address Line 2:</label>
          <input
            type="text"
            id="addressline2"
            name="addressline2"
            value={addressLine2}
            onChange={(event) => setAddressLine2(event.target.value)}
          />

          <label for="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />

          <label for="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          />

          <label for="zip">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            required
          />
          <button type="submit" onClick={handleUserAddressForm} name="submit">
            Checkout
          </button>
          {/* <button onClick={()=>handleUserAddressForm}>Checkout</button> */}
        </form>
        </div>
</div>
      )}
    </div>
  );
};

export default Cart;
