
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const PurchaseLogEntryTable = "PurchaseLogEntry";



const AddToPurchaseLogEntry = async(requestBody) => {
  const date = requestBody.Date;
  const dynamoUser = await getUser(date);
  console.log("PurchaseLogEntry", dynamoUser)
  
  if (!dynamoUser) {
    const params = {
      TableName: PurchaseLogEntryTable,
      Item: requestBody,
    };

    return await dynamodb
      .put(params)
      .promise()
      .then(
        () => {
          const body = {
            operation: "Saved PurchaseLogEntry",
            Message: "SUCCESS",
            status:200,
            Item: requestBody,
          };
          return util.buildResponse(200, body);
        },
        (error) => {
          console.log("Some Error Occured", error);
          const body = {
            operation: "Saved PurchaseLogEntry",
            Message: "Failed",
            status:401,
            Item: requestBody,
          };
          return util.buildResponse(200, body);  
        }
      );
  } else {
    requestBody.ingredients.forEach(ingredient => {
      const existingIngredient = dynamoUser.ingredients.find(item => item.name === ingredient.name);
      if (existingIngredient) {
        existingIngredient.quantity = Number(existingIngredient.quantity) + Number(ingredient.quantity);
      } else {
        dynamoUser.ingredients.push(ingredient);
      }
    });
  }

  const params = {
    TableName: PurchaseLogEntryTable,
    Key: {
      Date: date,
    },
    UpdateExpression: "SET  ingredients = :i",
    ExpressionAttributeValues: {
      ":i": dynamoUser.ingredients,
    },
    ReturnValues: "UPDATED_NEW",
  };
  
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          operation: "Updated Ingedients",
          Message: "SUCCESS",
          status:200,
          Item: response.Attributes,
        };
        return util.buildResponse(200, body);
      },
      (error) => {
        console.log("Some Error Occured", error);
        const body = {
          operation: "Update PurchaseLogEntry",
          Message: "Failed",
          status:401,
          Item: requestBody,
        };
        return util.buildResponse(200, body);
      }
    );
};

async function getUser(e) {
    const params = {
      TableName: PurchaseLogEntryTable,
      Key: {
        Date: e,
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
          console.error("There is an error getting material from table: ", error);
        }
      );
  }
  
module.exports =  {AddToPurchaseLogEntry};