const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const CartTable = "shopping_Cart_session";

const addtocart = async (requestBody) => {
  const email = requestBody.email;
  const Cart_Details = requestBody.cartDetails;
  console.log(requestBody.cartDetails.foodID)

  // Get the current cart of the user
  const dynamoUser = await getUser(email);

  if (!dynamoUser) {
    // User not present in DynamoDB, add the cart details
    try {
      const params = {
        TableName: CartTable,
        Item: {
          email: email,
          cart: [Cart_Details],
        },
      };
      await dynamodb.put(params).promise();
      const body = {
        Operation: "Cart_Added",
        Message: "SUCCESS",
        status: 200,
        Item: requestBody,
      };
      return util.buildResponse(200, body);
    } catch (error) {
      console.error("Some Error Occurred:", error);
    }
  } else {
    // User present in DynamoDB, check if the food item already exists in cart details
    const currentCart = dynamoUser.cart;
    
    if(currentCart){
      const existingCartItem = currentCart.find(
      (item) => item.foodID === requestBody.cartDetails.foodID
    );

    if (existingCartItem) {
      // If the food item already exists in cart details, update the quantity
      existingCartItem.qty += requestBody.cartDetails.qty;
    } else {
      // If the food item doesn't exist in cart details, add it to the cart
      currentCart.push(Cart_Details);
    }

    const params = {
      TableName: CartTable,
      Key: {
        email: email,
      },
      UpdateExpression: "SET cart = :cart",
      ExpressionAttributeValues: {
        ":cart": currentCart,
      },
      ReturnValues: "UPDATED_NEW",
    };
     return await dynamodb
      .update(params)
      .promise()
      .then(
        (response) => {
          const body = {
            Operation: "Update Cart",
            Message: "SUCCESS",
            Item: response.Attributes,
          };
          return util.buildResponse(200, body);
        },
        (error) => {
          console.log("Some Error Occured", error);
        }
      );
      
    }else{
      
    const params = {
  TableName: CartTable,
  Key: {
    email: email,
  },
  UpdateExpression: "SET cart = list_append(cart, :cart)",
  ExpressionAttributeValues: {
    ":cart": [Cart_Details],
  },
  ReturnValues: "UPDATED_NEW",
};

return await dynamodb
  .update(params)
  .promise()
  .then(
    (response) => {
      const body = {
        Operation: "Update Cart",
        Message: "SUCCESS",
        Item: response.Attributes,
      };
      return util.buildResponse(200, body);
    },
    (error) => {
      console.log("Some Error Occured", error);
    }
  );

    }
      
    }
  }


async function getUser(email) {
  const params = {
    TableName: CartTable,
    Key: {
      email: email,
    },
  };
  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.Item;
      },
      (error) => {
        console.error("There is an error getting user: ", error);
      }
    );
}

async function getcart(requestBody) {
  const email = requestBody.email; 
  
      const dynamoUser = await getUser(email);
      const body = {
        Operation: "Get_Cart",
        Message: "SUCCESS",
        status: 200,
        Item: dynamoUser,
      };
      return util.buildResponse(200, body);
  }
  
async function decreaseCartItem(requestBody) {
  try {
    const email = requestBody.email;
    // const Cart_Details = requestBody.cartDetails;
    const dynamoUser = await getUser(email);

    if (!dynamoUser) {
      console.log("can remove cart item because User Not Present ")
      const body = {
        Operation: "User not Present",
        Message: "Failed",
      };
      return util.buildResponse(401, body);
    } else {
      // User present in DynamoDB, check if the food item already exists in cart details
      const currentCart = dynamoUser.cart;
      const existingCartItem = currentCart.find(
        (item) => item.foodID === requestBody.cartDetails.foodID
      );

      if (existingCartItem) {
        // If the food item already exists in cart details, update the quantity
        existingCartItem.qty -= requestBody.cartDetails.qty;
        if (existingCartItem.qty <= 0) {
          currentCart.splice(currentCart.indexOf(existingCartItem), 1);
        }
      } else {
        // If the food item doesn't exist in cart details, add it to the cart
        // currentCart.push(Cart_Details);
      }

      const params = {
        TableName: CartTable,
        Key: {
          email: email,
        },
        UpdateExpression: "SET cart = :cart",
        ExpressionAttributeValues: {
          ":cart": currentCart,
        },
        ReturnValues: "UPDATED_NEW",
      };

      const response = await dynamodb.update(params).promise();
      const body = {
        Operation: "Deleted Cart Item",
        Message: "SUCCESS",
        Item: response.Attributes,
      };
      return util.buildResponse(200, body);
    }
  } catch (error) {
    console.log("Error occurred while decreasing cart item: ", error);
    const body = {
      Operation: "Decrease Cart Item",
      Message: "FAILED",
    };
    return util.buildResponse(500, body);
  }
}

  


module.exports ={addtocart,decreaseCartItem,getcart}
  