const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "users";

async function signin(data) {
  const username = data.userName;
  const password = data.password;
  
  const params = {
    TableName: userTable,
    Key: {
      email: username,
    },
  };
  
  try {
    const dynamouserdata = await dynamodb.get(params).promise();
    
    if (dynamouserdata.Item && dynamouserdata.Item.contact === password) {
      return util.buildResponse(200, { data: dynamouserdata.Item });
    } else {
      return util.buildResponse(401, "Incorrect password");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return util.buildResponse(500, "Error retrieving user data");
  }
}

module.exports.signin = signin;
