
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
          // ingredients :ingredients
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
    }else{
      const existingIngredient = dynamoUser.ingredients.find(item => item.name === requestBody.ingredients[0].name);
  if (existingIngredient) {
    existingIngredient.quantity = Number(existingIngredient.quantity) + Number(requestBody.ingredients[0].quantity);
  } else {
    dynamoUser.ingredients.push(requestBody.ingredients[0]);
  }
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
    // const ingredients = await AddToInventoryTable()
    
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
    
    
    
  }
  
  async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.log("Some Error Occured", error);
  }
}

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