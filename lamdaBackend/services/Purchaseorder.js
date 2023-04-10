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

async function searchPurchaseOrder(data) {
  
  // we search in two steps first multipy the intermediate1 with Puratio and store in intermediate2
  // second step we subtact every ingredients quantiy in intermediate2 from that of inventory. 
  
  try {
    
    const startDate = data.startDate;
    const IntermidiatePurchaseOrder1User = await getIntermidiatePurchaseOrder1User(startDate);
    const IntermediatePurchaseOrder2User = await getIntermediatePurchaseOrder2User(startDate);
    
    if (IntermidiatePurchaseOrder1User && IntermidiatePurchaseOrder1User.ingredients) {
      
      const PurchaseOrderArray = [];
      console.log("IntermediatePurchaseOrder2User",IntermediatePurchaseOrder2User)

// here -minu the quanity's present in intermediatePurchaseOrder2Array from that of quantity of inventory 
const intermediatePurchaseOrder2Array = IntermediatePurchaseOrder2User.ingredients

console.log("intermediate2",intermediatePurchaseOrder2Array)

for (const item of intermediatePurchaseOrder2Array) {
     const name = item.ingredient;
  const quantity = item.quantity;
  console.log("namee---",name,"quanity----",quantity)
  const inventoryItem = await getInventoryItemByName(name);
  
  if (inventoryItem) {
    // console.log("for ",name,"quantity",quantity,"in intermediatePurchaseOrder2Array")
    
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

async function getIntermediatePurchaseOrder2User(e) {
  const params = {
    TableName: intermediatePurchaseOrder2Table,
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

// for frontend sending the intermediate 2 by date 
async function getIntermediatePurchase2(data) {
  const date = data.startDate;
  const params = {
    TableName: intermediatePurchaseOrder2Table,
    Key: {
  Date: date,
}
  };
  try {
    const response = await dynamodb.get(params).promise();
    const body = {data: response.Item};
      return util.buildResponse(200, body);
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
}


module.exports = {searchPurchaseOrder,getIntermediatePurchase2};