
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const InventoryTable = "Inventory";

const AddToInventoryTable = async(requestBody) => {
      let quantity = Number(requestBody.quantity);
let dynamoUserIngredients = null;

    const name = requestBody.Ingredients;
    const dynamoUser = await getUser(name);
    
    console.log(dynamoUser)
    if (!dynamoUser) {
      const params = {
        TableName: InventoryTable,
        Item: requestBody,
    };

    return await dynamodb
    .put(params)
    .promise()
    .then(
      
      () => {
        const body = {
          operation: "Saved Inventory",
          Message: "SUCCESS",
          Item: requestBody,
        };
        return util.buildResponse(200, body);
      },
      (error) => {
        console.log("Some Error Occured", error);
        const body = {
          operation: "Saved Inventory",
          Message: "Failed",
          status:401,
          Item: requestBody,
        };
        return util.buildResponse(200, body);
        
      }
    );
    }
  else {

if (dynamoUser && dynamoUser.Ingredients) {
  dynamoUserIngredients = dynamoUser.Ingredients;
}

if (dynamoUserIngredients === requestBody.Ingredients) {
  quantity += Number(dynamoUser.quantity);
}

const params = {
  TableName: InventoryTable,
  Key: {
    Ingredients: name,
  },
  UpdateExpression: "SET quantity = :q",
  ExpressionAttributeValues: {
    ":q": quantity,
  },
  ReturnValues: "UPDATED_NEW",
};
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          operation: "Updated Ingredients",
          Message: "SUCCESS",
          Item: response.Attributes,
        };
        return util.buildResponse(200, body);
      },
      (error) => {
        console.log("Some Error Occurred", error);
        const body = {
          operation: "Update PurchaseLogEntry",
          Message: "Failed",
          status: 401,
          Item: requestBody,
        };
        return util.buildResponse(200, body);
      }
    );
}

    
    
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
      TableName: InventoryTable,
      Key: {
        Ingredients: e,
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
  
module.exports =  {AddToInventoryTable};