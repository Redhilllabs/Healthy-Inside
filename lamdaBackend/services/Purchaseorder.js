const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const IntermidiatePurchaseOrder1Table = "IntermidiatePurchaseOrder-1";
const intermediatePurchaseOrder2Table = "intermediatePurchaseOrder-2";
const InventoryTable = "Inventory";
const PUratioTable = "PUratio";
const PurchaseOrderTable = "PurchaseOrder";
// const NewActualpurchaseOrderTable = "NewActualpurchaseOrder"

async function searchPurchaseOrder(data) {
  
  // we search in two steps first multipy the intermediate1 with Puratio and store in intermediate2
  // second step we subtact every ingredients quantiy in intermediate2 from that of inventory. 
  
  try {
    
    const startDate = data.startDate;
    const IntermidiatePurchaseOrder1User = await getIntermidiatePurchaseOrder1User(startDate);

    if (IntermidiatePurchaseOrder1User && IntermidiatePurchaseOrder1User.ingredients) {
      // const ingredients = IntermidiatePurchaseOrder1User.ingredients;
      // const allMaterial = [];
      // const intermediatePurchaseOrder2Array = [];
      const PurchaseOrderArray = [];
      
// multiplying PUratio With IntermediatepurchaseOrder1 and storeing into intermediate purchase order 2

// for (const item of ingredients) {
//   const ingredientName = Object.keys(item)[0];
//   const ingredientQuantity = item[ingredientName];
//   const user = await getPUratio(ingredientName);
//   if (user) {
//     const newQuantity = Number(user.quantity) * Number(ingredientQuantity);
//     intermediatePurchaseOrder2Array.push({ ingredient: ingredientName, quantity: newQuantity, unit: "gram" });
//   } else {
//     intermediatePurchaseOrder2Array.push({ ingredient: ingredientName, quantity: ingredientQuantity, unit: "gram" });
//   }
// }

// console.log("intermediatepurchaseOrder-2 :---",intermediatePurchaseOrder2Array)


// here we will store the intermediatepurchaseOrder-2 into database 
// const res = await updateIntermediatePurchaseOrder2Table(intermediatePurchaseOrder2Array)

// here -minu the quanity's present in intermediatePurchaseOrder2Array from that of quantity of inventory 
const intermediatePurchaseOrder2Array = await getAllintermediatePurchaseOrder2();
console.log(intermediatePurchaseOrder2Array)

for (const item of intermediatePurchaseOrder2Array) {
  
  const name = item.ingredient;
  const quantity = item.quantity;

  const inventoryItem = await getInventoryItemByName(name);
  if (inventoryItem) {
    console.log("for ",name,"quantity",quantity,"in intermediatePurchaseOrder2Array")
    const remainingQuantity = inventoryItem.quantity - quantity;

    if (remainingQuantity < 0) {
      PurchaseOrderArray.push({
        ingredient: name,
        quantity: -remainingQuantity, // change to the absolute value of remainingQuantity
        unit: "gram",
      });
    }
  } else {
    PurchaseOrderArray.push({
      ingredient: name,
      quantity: quantity,
      unit: "gram",
    });
  }
}

console.log("PurchaseOrderArray",PurchaseOrderArray)

// here store the purchseOrderArray into Purchase Order Table

      const body = {data: PurchaseOrderArray};
      return util.buildResponse(200, body);
      
    } else {
      // Build the error response object
      const response = {
        operation: "SearchPurchaseOrder",
        message: "ERROR",
        status: 401,
      };
      return util.buildResponse(200, response);
    }
  } catch (error) {
    console.error("Error searching purchase orders: ", error);
  }
}

// async function updateInventory(item) {
//   const name = item.ingredient
//   const quantity = item.quantity

//   const params = {
//     TableName: InventoryTable,
//     Key: {
//       Ingredients: name,
//     },
//     UpdateExpression: "SET quantity = quantity = :q",
//     ExpressionAttributeValues: {
//       ":q": quantity,
//     },
//     ReturnValues: "UPDATED_NEW",
//   };

//   try {
//     const dynamoUser = await getInventoryItemByName(name);
//     if (!dynamoUser) {
//       console.log(`Ingredient ${name} not found in InventoryTable, adding it...`);
//       const putParams = {
//         TableName: InventoryTable,
//         Item: {
//           Ingredients: name,
//           quantity: quantity,
//         },
//       };
//       const response = await dynamodb.put(putParams).promise();
//       console.log(`Added ${name} to InventoryTable`);
//       return response;
//     }

//     const response = await dynamodb.update(params).promise();
//     console.log(`Updated inventory for ${name}`);
//     return response;
//   } catch (error) {
//     console.log(`Error updating inventory for ${name}`, error);
//     throw error;
//   }
// }

// async function updateIntermediatePurchaseOrder2Table(intermediatePurchaseOrder2Array) {
//   try {
//     for (const item of intermediatePurchaseOrder2Array) {
//       const name = item.ingredient;
//       const quantity = item.quantity;
//       const unitOfMeasurement = item.unit;

//       const params = {
//         TableName: intermediatePurchaseOrder2Table,
//         Key: { 'ingredient': name },
//         UpdateExpression: 'set quantity = if_not_exists(quantity, :init) + :val, unitOfMeasurement = :unit',
//         ExpressionAttributeValues: {
//           ':init': 0,
//           ':val': quantity,
//           ':unit': unitOfMeasurement
//         },
//         ReturnValues: 'UPDATED_NEW'
//       };

//       await dynamodb.update(params).promise();
//     }

//     console.log('Successfully updated intermediatePurchaseOrder2Table!');
//   } catch (err) {
//     console.log('Error updating intermediatePurchaseOrder2Table:', err);
//   }
// }

async function getInventoryItemByName(e){
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

// async function getPUratio(e){
//     const params = {
//       TableName: PUratioTable,
//       Key: {
//         IngredientName: e,
//       },
//     };
//     return await dynamodb
//       .get(params)
//       .promise()
//       .then(
//         (response) => {
//           return response.Item;
//         },
//         (error) => {
//           console.error("There is an error getting material from table: ", error);
//         }
//       );
// }

async function getIntermidiatePurchaseOrder1User(e) {
  const params = {
    TableName: IntermidiatePurchaseOrder1Table,
    Key: {
  Date: e,
}
  };
  try {
    const response = await dynamodb.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
}

async function getAllintermediatePurchaseOrder2(){
  const params = {
      TableName: intermediatePurchaseOrder2Table,
    };
    const allMaterial = await scanDynamoRecords(params, []);
    return allMaterial
    // const body = {
    //   data: allMaterial
    // };
    // return util.buildResponse(200);
    // return util.buildResponse(200, body);
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

module.exports = {searchPurchaseOrder};