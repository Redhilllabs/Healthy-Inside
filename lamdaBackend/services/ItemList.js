const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ItemTable = "ItemList";

async function saveItemList(data) {
    const ItemName= data.ItemName;
    const dynamoUser = await getUser(ItemName);
    if (!dynamoUser) {
        const params = {
            TableName: ItemTable,
            Item: data,
        };
        try {
            await dynamodb.put(params).promise();
            const body = {
                Operation: "SaveItemList",
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
            Operation: "SaveItemList",
            Message: "Failed",
            status: 404,
            Item: data,
        };
        return util.buildResponse(200, body);
    }
}

 async function getItemList() {
    const params = {
      TableName: ItemTable,
    };
    const allMaterial = await scanDynamoRecords(params, []);
    const body = {
      data: allMaterial,
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

async function getUser(e) {
    const params = {
      TableName: ItemTable,
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
          console.error("There is an error getting user: ", error);
        }
      );
  }

module.exports = {saveItemList, getItemList};
