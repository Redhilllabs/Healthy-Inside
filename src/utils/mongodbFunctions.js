import axios from "axios";
const isLocalhost = window.location.hostname.includes('localhost')
console.log(isLocalhost)
const localhosturl = process.env.REACT_APP_LOCALHOST_URL;
const produrl = process.env.REACT_APP_PROD_URL


// getall food items from food collection
export const getAllFoodItems = async () => {
    try {

let headersList = {
 "Accept": "*/*",
}

let reqOptions = {
  url: "https://zo5siwf5th.execute-api.us-east-1.amazonaws.com/prod/getallfood",
  method: "GET",
  headers: headersList,
}

let response = await axios.request(reqOptions);
// console.log(response.data);
return (response.data);
    } catch (error) {
      console.error("Error getting all food items: ", error);
      throw error;
    }
  };
// add food to cart 
export const AddToCart = async(item_id,user_id)=>{

let headersList = {
 "Accept": "*/*",
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
  "productID":item_id,
  "userID":user_id
});
let url = isLocalhost
? `${localhosturl}/api/cart/addtocart`
: `${produrl}/api/cart/addtocart`;

let reqOptions = {
  url: url,
  method: "POST",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
return(response.data);
} 

// decrease cart item 
export const decreaseCartItem = async(item_id,user_id)=>{

  let headersList = {
   "Accept": "*/*",
   "Content-Type": "application/json" 
  }
  
  let bodyContent = JSON.stringify({
    "productID":item_id,
    "userID":user_id
  });
  let url = isLocalhost
? `${localhosturl}/api/cart/decreaseCartItem`
:`${produrl}/api/cart/decreaseCartItem`;
  
  let reqOptions = {
    url: url,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }
  
  let response = await axios.request(reqOptions);
  return(response.data);
  } 

// get cart items
export const GetCart = async(user_id)=>{

  let headersList = {
   "Accept": "*/*",
   "Content-Type": "application/json" 
  }
  
  let bodyContent = JSON.stringify({
    "userID":user_id
  });
  
  let url = isLocalhost
  ? `${localhosturl}/api/cart/getcart`
  : `${produrl}/api/cart/getcart`;

  let reqOptions = {
    url: url,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }
  
  let response = await axios.request(reqOptions);
  return(response.data);
  } 
// login user
export const LoginAPi = async(username,password)=>{

  let headersList = {
   "Accept": "*/*",
   "Content-Type": "application/json" 
  }
  
  let bodyContent = JSON.stringify({
    "userName":username,
    "password":password
  });
  
  let reqOptions = {
    url: "https://zo5siwf5th.execute-api.us-east-1.amazonaws.com/prod/signin",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }
  
  let response = await axios.request(reqOptions);
  console.log(response.data);
  return (response.data);
  
} 

// save user address

export const SaveUserAddress = async (user_id, data) => {
  console.log("data coming from form ", data);
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  let url = isLocalhost
  ? `${localhosturl}/api/users/${user_id}/address`
  : `${produrl}/api/users/${user_id}/address`;
  let reqOptions = {
    url: url,
    method: "POST",
    headers: headersList,
    data: data,
  };

  try {
    let response = await axios.request(reqOptions);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};










