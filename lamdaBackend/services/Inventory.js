const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const util = require("../utils/util");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const InventoryTable = "Inventory";

const AddToInventoryTable = async (requestBody) => {

  const ingredients = requestBody.Ingredients;

  for (const item of ingredients) {
    const dynamoUser = await getUser(item.name);

    if (!dynamoUser) {
      const store = {
        Ingredients: item.name,
        quantity: item.quantity
      };

      const params = {
        TableName: InventoryTable,
        Item: store,
      };

      await dynamodb.put(params).promise();
    } else {
      const existingQuantity = Number(dynamoUser.quantity);
      const newQuantity = existingQuantity + Number(item.quantity);

      const params = {
        TableName: InventoryTable,
        Key: {
          Ingredients: item.name,
        },
        UpdateExpression: "SET quantity = :q",
        ExpressionAttributeValues: {
          ":q": newQuantity,
        },
        ReturnValues: "UPDATED_NEW",
      };

      await dynamodb.update(params).promise();
    }
  }

const body = {
            operation: "Add To Inventory Table",
            Message: "SUCCESS",
            status:200,
            Item: requestBody,
          };
          return util.buildResponse(200, body);

};

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

module.exports = {
  AddToInventoryTable,
};
