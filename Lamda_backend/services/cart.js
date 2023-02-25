const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "users";

const addtocart = async (requestBody) => {
  const email = requestBody.email;
  const foodID = requestBody.foodID;
  const quantity = requestBody.quantity;

  // Get the current cart of the user
  const dynamoUser = await getUser(email);
  let cart = dynamoUser.cart || [];

  // Check if the food item is already in the cart
  let itemIndex = cart.findIndex((item) => item.foodID === foodID);
  if (itemIndex !== -1) {
    // Update the quantity if the food item is already in the cart
    cart[itemIndex].quantity = parseInt(quantity);
  } else {
    // Add the new food item to the cart
    cart.push({ foodID: foodID, quantity: quantity });
  }

  // Update the user's cart
  const params = {
    TableName: userTable,
    Key: {
      email: email,
    },
    UpdateExpression: "SET cart = :cart",
    ExpressionAttributeValues: {
      ":cart": cart,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "Update",
          Message: "SUCCESS",
          Item: response.Attributes,
        };
        return util.buildResponse(200, body);
      },
      (error) => {
        console.log("Some Error Occured", error);
      }
    );
};

async function getUser(email) {
  const params = {
    TableName: userTable,
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

  async function getcart(req, res, next) {
    try {
      console.log("came to get cart items")
      const userID = req.body.userID;
      const data = await Users.findOne({_id: userID}).populate('cart.productID');
  
      if (data) {
        res.status(200).send({ message: "Get cart", data: data });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error getting cart: ", error);
      res.status(500).send({ message: "Server error" });
    }
  }
  
  async function decreaseCartItem(req, res, next) {
    try {
      const user = await Users.findOne({ _id: req.body.userID });
      const productID = mongoose.Types.ObjectId(req.body.productID);
      if (!user) {
        res.status(404).send("User not found.");
        return;
      }
  
      const existingCartItem = user.cart.find((item) =>
        item.productID.equals(productID)
      );
  
      if (!existingCartItem) {
        res.status(404).send("Item not found in cart.");
        return;
      }
  
      if (existingCartItem.quantity === 1) {
        // If the item quantity is 1, remove it from the cart
        await Users.updateOne(
          { _id: req.body.userID },
          {
            $pull: {
              cart: { productID: productID },
            },
          }
        );
        res.status(200).send("Item removed from cart.");
      } else {
        // If the item quantity is greater than 1, decrement the quantity by 1
        await Users.updateOne(
          { _id: req.body.userID, "cart.productID": productID },
          { $inc: { "cart.$.quantity": -1 } }
        );
        res.status(200).send("Cart item quantity decreased.");
      }
    } catch (error) {
      console.error("Error decreasing cart item quantity: ", error);
    }
  }


module.exports ={addtocart,getcart,decreaseCartItem}
  