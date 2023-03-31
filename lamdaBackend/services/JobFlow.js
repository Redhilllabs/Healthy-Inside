
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const JobFlowTable = "JobFlow";


 async function getJobFlow() {
    const params = {
      TableName: JobFlowTable,
    };
    const allMaterial = await scanDynamoRecords(params, []);
    const body = {
      data: allMaterial
    };
    return util.buildResponse(200, body);
  }
  

const AddToJobFlow = async(requestBody) => {
    const value = requestBody.ItemName;
    const dynamoUser = await getUser(value);
    
    if (!dynamoUser) {
        const params = {
        TableName: JobFlowTable,
        Item: requestBody,
    };

    return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          operation: "Save Into JobFlow",
          message: "SUCCESS",
          status:200,
          Item: requestBody,
        };
        return util.buildResponse(200, body);
      },
      (error) => {
        console.log("Some Error Occured", error);
      }
    );
    }else{
        return util.buildResponse(200, {
            operation: "Not saved Into JobFlow",
          Message: "FAILED",
      status:401,
      message: "This JobFlow ItemName already exists",
    });
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
      TableName: JobFlowTable,
      Key: {
        ItemName: e,
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
  
module.exports =  {AddToJobFlow,getJobFlow};