
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const IngredientProfileTable = "IngredientProfile";


 async function getIngredientProfile() {
    const params = {
      TableName: IngredientProfileTable,
    };
    const allMaterial = await scanDynamoRecords(params, []);
    const body = {
      data: allMaterial.sort((a, b) => a.RecipeName .localeCompare(b.RecipeName )),
    };
    // return util.buildResponse(200);
    return util.buildResponse(200, body);
  }
  

const AddToIngredientProfile = async(requestBody) => {
    const value = requestBody.RecipeName;
    const dynamoUser = await getUser(value);
    if (dynamoUser && dynamoUser.RecipeName) {

        return util.buildResponse(200, {
      status:401,
      message: "This Ingredient already exists",
    });
    
    } else {
        console.log("ingredient not found , creating new item");
    }

    // Update the user's address if they already exist
    const params = {
        TableName: IngredientProfileTable,
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
      TableName: IngredientProfileTable,
      Key: {
        RecipeName: e,
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
  
module.exports =  {AddToIngredientProfile,getIngredientProfile};