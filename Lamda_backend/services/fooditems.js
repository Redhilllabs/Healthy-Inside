
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const foodsTable = "foods";


  async function getAllFoods() {
    const params = {
      TableName: foodsTable,
    };
    const allFood = await scanDynamoRecords(params, []);
    const body = {
      data: allFood,
    };
    // return util.buildResponse(200);
    return util.buildResponse(200, body);
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
  
module.exports.getAllFoods =  getAllFoods;