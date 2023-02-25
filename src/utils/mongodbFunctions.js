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
export const AddToCart = async(email,foodID,quantity)=>{

  let headersList = {
   "Accept": "*/*",
   "Content-Type": "application/json" 
  }
  
  let bodyContent = JSON.stringify({
    "email":email,
    "foodID":foodID,
    "quantity":quantity
  });
  
  let reqOptions = {
    url: "https://zo5siwf5th.execute-api.us-east-1.amazonaws.com/prod/addtocart",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }
  
  let response = await axios.request(reqOptions);
  console.log(response.data);
  
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


export const saveClaimKit = async(email,data)=>{
  let headersList = {
   "Accept": "*/*",
   "Content-Type": "application/json" 
  }
  
  let bodyContent = JSON.stringify({
    "email": email,
    "NameOnKit": data.NameOnKit,
    "jerseyNumber": data.jerseyNumber,
    "jerseySize": data.jerseySize
  });
  
  let reqOptions = {
    url: "https://zo5siwf5th.execute-api.us-east-1.amazonaws.com/prod/saveclaimkit",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }
  
  let response = await axios.request(reqOptions);
  console.log(response.data);
  return(response.data)
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

export const SaveUserAddress = async (data) => {

  let headersList = {
   "Accept": "*/*",
  //  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
   "Content-Type": "application/json" 
  }
  
  let bodyContent = JSON.stringify(
   {
        "email" : "rathore.jatin1987@gmail.com",
        "addressLine1": "addressLine1",
        "addressLine2": "addressLine2",
        "city": "city",
        "state": "state",
        "zip": "zip"
      });
  
  let reqOptions = {
    url: "https://zo5siwf5th.execute-api.us-east-1.amazonaws.com/prod//saveaddress",
    method: "POST",
    headers: headersList,
    data: data,
  }
  
  let response = await axios.request(reqOptions);
  console.log(response.data);
  

};










