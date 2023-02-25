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
    if (dynamoUser && dynamoUser.city) {
        // User address is already present, return an error response
        return util.buildResponse(401, {
            message: "Address already exists",
        });
    } else {
        console.log("User not found or address not present, creating new item");
    }

    // Update the user's address if they already exist
    const params = {
        TableName: userTable,
        Key: {
            email: email,
        },
        UpdateExpression: "SET addressLine1 = :line1, addressLine2 = :line2, city = :city, #s = :state, zip = :zip",
        ExpressionAttributeNames: {
            "#s": "state", // 'state' is a reserved keyword in DynamoDB, so you need to use an expression attribute name to reference it
        },
        ExpressionAttributeValues: {
            ":line1": requestBody.addressLine1,
            ":line2": requestBody.addressLine2,
            ":city": requestBody.city,
            ":state": requestBody.state,
            ":zip": requestBody.zip,
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


const saveclaimkit = async (requestBody) => {
  const mail = requestBody.email;
  const jerseySize = requestBody.jerseySize;
  const NameOnKit = requestBody.NameOnKit;
  const jerseyNumber = requestBody.jerseyNumber;

  // Get the current cart of the user
  const dynamoUser = await getUser(mail);
  let claimKit = dynamoUser.claimKit || {};

  // Check if the kit item is already in the cart
  if (claimKit.hasOwnProperty(NameOnKit)) {
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
  
  module.exports ={saveUserAddress,saveclaimkit}
