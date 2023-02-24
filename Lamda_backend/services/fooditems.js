
const AWS = require("aws-sdk");
// import aws from "aws-sdk";
AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const blogTable = "foods";


  async function getAllFoods() {
    const params = {
      TableName: blogTable,
    };
    const allBlogs = await scanDynamoRecords(params, []);
    const body = {
      blogs: allBlogs,
    };
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