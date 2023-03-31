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
    // console.log(dynamouserdata.Item.contact)
    if (dynamouserdata && dynamouserdata.Item && dynamouserdata.Item.contact === password) {
  return util.buildResponse(200, { data: dynamouserdata.Item });
} else if (!dynamouserdata) {
  return util.buildResponse(500, "Error retrieving user data from database");
} else {
  return util.buildResponse(200, {
      status:401,
      message: "Incorrect Credentials",
    });
}

  } catch (error) {
    console.error("Error retrieving user data:", error);
    return util.buildResponse(500, "Error retrieving user data");
  }
}

async function signup(data) {
    const email = data.email;
    const dynamoUser = await getUser(email);
    if (!dynamoUser) {
        const params = {
            TableName: userTable,
            Item: data,
        };
        try {
            await dynamodb.put(params).promise();
            const body = {
                Operation: "Saveuser",
                Message: "SUCCESS",
                status: 200,
                Item: data,
            };
            return util.buildResponse(200, body);
        } catch (error) {
            console.error("Some Error Occurred:", error);
        }
    } else {
        const body = {
            Operation: "Saveuser",
            Message: "Failed",
            status: 404,
            Item: data,
        };
        return util.buildResponse(200, body);
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

module.exports = {signup,signin};
