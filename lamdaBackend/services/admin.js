const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "adminUser";

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
    
    // console.log(dynamouserdata)
    if (dynamouserdata && dynamouserdata.Item && dynamouserdata.Item.contact === password) {
  return util.buildResponse(200, { data: dynamouserdata.Item });
} else if (!dynamouserdata) {
  return util.buildResponse(500, "Error retrieving user data from database");
} else {
  return util.buildResponse(401, "Incorrect credentials");
}

  } catch (error) {
    console.error("Error retrieving user data:", error);
    return util.buildResponse(500, "Error retrieving user data");
  }
}

module.exports.signin = signin;