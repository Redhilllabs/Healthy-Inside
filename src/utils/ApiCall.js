import axios from "axios";
const produrl = process.env.REACT_APP_PROD_URL;

const urls = {
  getAllFoodItems: `${produrl}/getallfood`,
  getMaterialList: `${produrl}/materiallist`,
  addToMaterialList: `${produrl}/addtomateriallist`,
  addToIngredientProfile: `${produrl}/addtoingredientprofile`,
  getIngredientProfile: `${produrl}/getingredientprofile`,
  addToRecipeProfile: `${produrl}/recipeprofile`,
  getRecipeProfile: `${produrl}/recipeprofile`,
  addToCart: `${produrl}/addtocart`,
  decreaseCartItem: `${produrl}/api/cart/decreaseCartItem`,
  getCart: `${produrl}/api/cart/getcart`,
  saveClaimKit: `${produrl}/saveclaimkit`,
  login: `${produrl}/signin`,
  loginAdmin: `${produrl}/adminlogin`,
  saveUserAddress: `${produrl}/saveaddress`,
  getUserapi: `${produrl}/getuser`,
  Signup: `${produrl}/signup`,
  addItemListapi: `${produrl}/additemlist`,
  getitemlistapi:`${produrl}/getitemlist`,
  addSalesPlanapi: `${produrl}/addtosalesplan`,
  getsalesplanapi: `${produrl}/getsalesplan`,
  searchPurchaseOrderapi: `${produrl}/searchpurchaseorder`,
  addpurcaselogentryapi:`${produrl}/addpurcaselogentry`,
  AddtoInventoryapi: `${produrl}/addtoinventory`
};

const makeRequest = async (url, method, data) => {
  try {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url,
      method,
      headers: headersList,
      data,
    };

    let response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error(`Error making ${method} request to ${url}: `, error);
    throw new Error(`Error making ${method} request to ${url}`);
  }
};

// getall food items from food collection
export const getAllFoodItems = async () => {
  return makeRequest(urls.getAllFoodItems, "GET");
};

// get all items from material list table
export const getmateriallist = async () => {
  return makeRequest(urls.getMaterialList, "GET");
};

// upload item to material list
export const addtomateriallist = async (bodyContent) => {
  return makeRequest(urls.addToMaterialList, "POST", bodyContent);
};

export const AddToIngredentProfile = async (bodyContent) => {
  return makeRequest(urls.addToIngredientProfile, "POST", bodyContent);
};

export const getallIngredientProfile = async () => {
  return makeRequest(urls.getIngredientProfile, "GET");
};

// add item to Recipe Profile 
export const AddToRecipeProfile = async (bodyContent) => {
  return makeRequest(urls.addToRecipeProfile, "POST", bodyContent);
};

// get recipeProfile 
export const getallrecipeProfile = async () => {
  return makeRequest(urls.getRecipeProfile, "GET");
};

export const AddToCart = async (email, foodID, quantity) => {
  let bodyContent = JSON.stringify({
    email: email,
    foodID: foodID,
    quantity: quantity,
  });

  return makeRequest(urls.addToCart, "POST", bodyContent);
};

// decrease cart item 
export const decreaseCartItem = async (item_id, user_id) => {
  let bodyContent = JSON.stringify({
    productID: item_id,
    userID: user_id,
  });

  return makeRequest(urls.decreaseCartItem, "POST", bodyContent);
};

export const getCart = async (user_id) => {
  let bodyContent = JSON.stringify({
    userID: user_id,
  });

  return makeRequest(urls.getCart, "POST", bodyContent);
};

export const saveClaimKit = async (email, data) => {
  let bodyContent = JSON.stringify({
    email: email,
    NameOnKit: data.NameOnKit,
    jerseyNumber: data.jerseyNumber,
    jerseySize: data.jerseySize,
  });

  return makeRequest(urls.saveClaimKit, "POST", bodyContent);
};

export const LoginAPi = async (username, password) => {
  let bodyContent = JSON.stringify({
    userName: username,
    password: password,
  });

  return makeRequest(urls.login, "POST", bodyContent);
};

export const LoginAdminAPi = async (username, password) => {
  let bodyContent = JSON.stringify({
    userName: username,
    password: password,
  });

  return makeRequest(urls.loginAdmin, "POST", bodyContent);
};

export const SaveUserAddress = async (data) => {
  return makeRequest(urls.saveUserAddress, "POST", data);
};

export const getUser = async(data) =>{
  return makeRequest(urls.getUserapi, "POST", data);
}

export const signup = async(data) =>{
  return makeRequest(urls.Signup, "POST", data);
}

export const addItemList = async(data) =>{
  return makeRequest(urls.addItemListapi, "POST", data);
}
export const getitemlist  = async() =>{
  return makeRequest(urls.getitemlistapi, "GET")
}
export const addSalesPlan = async(data) =>{
  return makeRequest(urls.addSalesPlanapi, "POST", data);
}

export const getsalesplan = async(data) =>{
  return makeRequest(urls.getsalesplanapi, "POST", data);
}

export const searchPurchaseOrder = async(data)=>{
  return makeRequest(urls.searchPurchaseOrderapi, "POST", data);
}

export const AddPurcaselogEntry = async(data)=>{
  return makeRequest(urls.addpurcaselogentryapi, "POST", data);
}


export const AddtoInventory = async(data)=>{
  return makeRequest(urls.AddtoInventoryapi, "POST", data);
}