const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "users";

const saveUserAddress = async (requestBody) => {
    const email = requestBody.email;
    const dynamoUser = await getUser(email);
    if (!dynamoUser.Address) {
        // address not present
        const params = {
            TableName: userTable,
            Key: {
                email: email,
            },
            UpdateExpression: "SET Address = :address, NewContact = :contact",
            ExpressionAttributeValues: {
                ":address": requestBody.Address,
                ":contact": requestBody.Contact,
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
                    return util.buildResponse(200, body);
                },
                (error) => {
                    console.log("Some Error Occured", error);
                }
            );
    } else {
        // User address is already present, return an error response
        return util.buildResponse(401, {
            message: "Address already exists",
        });
    }
};


const saveclaimkit = async (requestBody) => {
  const mail = requestBody.email;
  const jerseySize = requestBody.jerseySize;
  const NameOnKit = requestBody.NameOnKit;
  const jerseyNumber = requestBody.jerseyNumber;

  // Get the current cart of the user
  const dynamoUser = await getUser(mail);
  let claimKit = dynamoUser.claimKit || {};

  // Check if the kit item is already in the cart
  if (claimKit) {
    // If the kit item is already in the cart, return an error response
    return util.buildResponse(200, {
      status:401,
      message: "Kit item already exists",
    });
  } else {
    // Add the new kit item to the cart
    claimKit[NameOnKit] = {
      jerseySize: jerseySize,
      jerseyNumber: jerseyNumber,
    };
  }

  // Update the user's cart
  const params = {
    TableName: userTable,
    Key: {
      email: mail,
    },
    UpdateExpression: "SET claimKit = :claimKit",
    ExpressionAttributeValues: {
      ":claimKit": claimKit,
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


const getUserapi = async (requestBody) => {
    const email = requestBody.email;
    const params = {
        TableName: userTable,
        Key: { email },
    };
    try {
        const response = await dynamodb.get(params).promise();
        const body = {
            Operation: "GetUser",
            Message: response.Item ? "SUCCESS" : "Failed",
            status: response.Item ? 200 : 404,
            Item: response.Item,
        };
        return util.buildResponse(200, body);
    } catch (error) {
        console.error("There is an error getting user:", error);
    }
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
  
module.exports ={saveUserAddress,saveclaimkit,getUserapi}
