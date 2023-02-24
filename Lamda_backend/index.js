

// const AuthService = require("./service/auth");
// const CartService = require("./service/cart");
const FoodService = require("./service/fooditems");
// const UserService = require("./service/users");

// const utils = require("./utils/util");



// User Path
const SaveAddressPath = "/saveaddress";
// Cart path
const addtocartPath = "/addtocart";

const getcartPath ="/getcart";

const decCartItemPath ="/decreasecartitem";

// auth path
const signinPath ="/signin";

const healthPath ="/health";

// food path
const getallfoodPath = "/getallfood";


exports.handler = async (event) => {
  console.log(event)
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200, "worked heath");
      break;
    case event.httpMethod === "POST" && event.path === SaveAddressPath:
      response = buildResponse(200 , "worked save address");
      break;

    case event.httpMethod === "POST" && event.path === signinPath:
      response = buildResponse(200 , "worked sign in");
      break;

    case event.httpMethod === "POST" && event.path === addtocartPath:
      response = buildResponse(200, "worked add to cart");
      break;


    case event.httpMethod === "GET" && event.path === getallfoodPath:
      
      response = await FoodService.getAllFoods() ;
      break;

    case event.httpMethod === "POST" && event.path === decCartItemPath:
      response = buildResponse(200 ,"worked decrease cart");
      break;

    case event.httpMethod === "POST" && event.path === getcartPath:
      response = buildResponse(200,"worked getcart");
      break;

    default:
      response = buildResponse(404, "404 Not Found ");
  }
  return response;
};


function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}
