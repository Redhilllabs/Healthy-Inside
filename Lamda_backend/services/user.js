const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "users";


const saveUserAddress = async (requestBody) => {
    const email = requestBody.email;

    for (let prop in requestBody) {
      if (prop === 'email') {
        delete requestBody[prop];
      }
    }

    const dynamoUser = await getUser(email);
    const params = {
      TableName: userTable,
      Item: requestBody,
    };
    return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "Save",
          Message: "SUCCESS",
          Item: requestBody,
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

module.exports.saveUserAddress = saveUserAddress;
