const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const OrderTable = "Orders";
const userTable = "users";

const addtoOrder = async (requestBody) => {
  const date = requestBody.date;
  const orderDetails = requestBody.order_details;
  const userId = requestBody.user_email;
  
  const body1 = {
    userId:userId,
    orderDetails:orderDetails
  }
  
  await saveUserOrder(body1)

  // Get the user's orders for the given date
  const dynamoOrder = await getOrder(date);

  if (!dynamoOrder) {
    // Order not present in DynamoDB, add the order details
    try {
      const params = {
        TableName: OrderTable,
        Item: {
          Date: date,
          Orders: {
            [userId]: orderDetails,
          },
        },
      };
      await dynamodb.put(params).promise();
      const body = {
        Operation: "Order_Added",
        Message: "SUCCESS",
        status: 200,
        Item: requestBody,
      };
      return util.buildResponse(200, body);
    } catch (error) {
      const body = {
        Operation: "Order_Added",
        Message: "Failed",
        status: 404,
        Item: requestBody,
      };
      return util.buildResponse(200, body);
      
    }
  }else {
    // Order present in DynamoDB, check if the user's orders are already present
    const orders = dynamoOrder.Orders;
    const userOrders = orders[userId];
    const orderId = Object.keys(userOrders || {}).length + 1; // generate an auto-incrementing order ID

    if (!userOrders) {
  // User's orders not present in DynamoDB, add the new order details
  orders[userId] = {}; // create a new object for the user's orders
  orders[userId] = orderDetails; // add the new order details as an object
} else {
  // User's orders already present in DynamoDB, add the new order details to existing orders
  orders[userId].push(orderDetails[0])
}

    const params = {
      TableName: OrderTable,
      Key: {
        Date: date,
      },
      UpdateExpression: "SET Orders = :o",
      ExpressionAttributeValues: {
        ":o": orders,
      },
      ReturnValues: "UPDATED_NEW",
    };

    return await dynamodb
      .update(params)
      .promise()
      .then(
        (response) => {
          const body = {
            Operation: "Update Orders",
            Message: "SUCCESS",
            status:200,
            Item: response.Attributes,
          };
          return util.buildResponse(200, body);
        },
        (error) => {
          console.log("Some Error Occured", error);
        }
      );
  }

};

async function getOrder(date) {
  const params = {
    TableName: OrderTable,
    Key: {
      Date: date,
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

async function searchOrder(requestBody) {
  const date = requestBody.Date;
  const params = {
    TableName: OrderTable,
    Key: {
      Date: date,
    },
  };
  try {
    const response = await dynamodb.get(params).promise();

    if (!response || !response.Item) {
      const body = {
        Operation: "Order_Added",
        Message: "Failed",
        status: 404,
      };
      return util.buildResponse(200, body);
    }

    const body = {
      Operation: "Order_Added",
      Message: "SUCCESS",
      status: 200,
      Item: response.Item,
    };
    return util.buildResponse(200, body);
  } catch (error) {
    console.error("There is an error getting order: ", error);
    const body = {
      Operation: "Order_Added",
      Message: "Failed",
      status: 404,
    };
    return util.buildResponse(200, body);
  }
}

async function saveUserOrder(data){
    const email = data.userId;
    const dynamoUser = await getUser(email);
    if(!dynamoUser.Orders){
      const params = {
            TableName: userTable,
            Key: {
                email: email,
            },
            UpdateExpression: "SET Orders = :orders",
            ExpressionAttributeValues: {
                ":orders": data.orderDetails,
            },
            ReturnValues: "UPDATED_NEW",
        };

        return await dynamodb
            .update(params)
            .promise()
            .then(
                (response) => {
                    const body = {
                        Operation: "Updated Address and Contact",
                        Message: "SUCCESS",
                        status:200,
                        Item: response.Attributes,
                    };
                    // return util.buildResponse(200, body);
                    console.log("completed",body);
                },
                (error) => {
                    console.log("Some Error Occured", error);
                }
            );
    }else{
    const orders = dynamoUser.Orders;
    orders.push(data.orderDetails[0])


    const params = {
      TableName: userTable,
      Key: {
        email: email,
      },
      UpdateExpression: "SET Orders = :o",
      ExpressionAttributeValues: {
        ":o": orders,
      },
      ReturnValues: "UPDATED_NEW",
    };

    return await dynamodb
      .update(params)
      .promise()
      .then(
        (response) => {
          const body = {
            Operation: "Update Orders",
            Message: "SUCCESS",
            status:200,
            Item: response.Attributes,
          };
          console.log("completed",body);
          // return util.buildResponse(200, body);
        },
        (error) => {
          console.log("Some Error Occured", error);
        }
      );
      
    }
  }
  
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

module.exports ={addtoOrder,searchOrder}