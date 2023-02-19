
import axios from "axios";

// getall food items from food collection
export const getAllFoodItems = async () => {
    try {
      let headersList = {
        "Accept": "*/*",
      };
    
      let reqOptions = {
        url: "http://localhost:8000/api/food/getallfood",
        method: "GET",
        headers: headersList,
      };
        
      let response = await axios.request(reqOptions);
      // console.log(response.data);
    
      return response.data;
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

let reqOptions = {
  url: "http://localhost:8000/api/cart/addtocart",
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
  
  let reqOptions = {
    url: "http://localhost:8000/api/cart/decreaseCartItem",
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
  
  let reqOptions = {
    url: "http://localhost:8000/api/cart/getcart",
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
     url: "http://localhost:8000/api/auth/signin",
     method: "POST",
     headers: headersList,
     data: bodyContent,
   }
   
   let response = await axios.request(reqOptions);
  //  console.log(response)
   return await response.data
} 

// save user address

export const SaveUserAddress = async (user_id, data) => {
  console.log("data coming from form ", data);
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: `http://localhost:8000/api/users/${user_id}/address`,
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










