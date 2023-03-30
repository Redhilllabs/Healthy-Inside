const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const PurchaseorderTable = "PurchaseOrder";
const ActualPurchaseOrderTable = "ActualPurchaseOrder";
const InventoryTable = "Inventory";
const PUratioTable = "PUratio";
const NewActualpurchaseOrderTable = "NewActualpurchaseOrder"

async function searchPurchaseOrder(data) {
  try {
    const startDate = data.startDate;
    const purchaseOrders = await getUser(startDate);
    
    if (purchaseOrders && purchaseOrders.ingredients) {
        const ingredients = purchaseOrders.ingredients;

        for (const ingredient of ingredients) {
          // console.log("ingredient",ingredient)
          const name = Object.keys(ingredient)[0];
          const quantity = ingredient[name];
          // console.log(name)

          // Check if the ingredient exists in the inventory table
          const inventoryItem = await getInventoryItemByName(name);
          // console.log(inventoryItem)

          if (inventoryItem && inventoryItem.quantity>0){
            // console.log("quantity",quantity,"inventoryItem.quantity",inventoryItem.quantity)
            
            const remainingQuantity = inventoryItem.quantity-quantity  ;
            // console.log("remainingQuantity",remainingQuantity)
            
            if(remainingQuantity <0){
              // console.log("inside if condition ")
              const data ={
                ingredient:name,
                quantity:Math.abs(remainingQuantity),
                unit:"gram"
              }
              await addIngredientToActualPurchaseOrder(data)
            }
            else{
  
            }
          }else{
            const data = {
    ingredient: name,
    quantity: quantity,
    unit: "gram"
  }
  await addIngredientToActualPurchaseOrder(data);
            
          }
        }
        
         const params = {
      TableName: ActualPurchaseOrderTable,
    };
    const allMaterial = await scanDynamoRecords(params, []);
//     console.log("alllllll",allMaterial)
    
//     const promises = allMaterial.map(item => getPUratio(item.ingredient));
// const users = await Promise.all(promises);
// console.log("userssss",users)
// users.forEach(async (user, index) => {
//   const item = allMaterial[index]; // get the corresponding item for this user
//   console.log("itemssss",item)
//   if (user) {
//     const newQuantity = Number(user.quantity) * Number(item.quantity);
//     console.log("nequnatity",newQuantity)
//     const data = {
//       ingredients: item.ingredient,
//       quantity: newQuantity,
//       unit: "gram"
//     };
//     const res = await addIngredientToNewActualPurchaseOrder(data);
//     console.log(res)
//   }
// });



// for(const item of allMaterial) {
//   console.log(item,"actualview purhchase",item.ingredient)
//   const user = await getPUratio(item.ingredient);
//   if (user) {
//     const newQuantity = Number(user.quantity) * Number(item.quantity);
//     const data = {
//       ingredients: item.ingredient,
//       quantity: newQuantity,
//       unit: "gram"
//     };
//     const res = await addIngredientToNewActualPurchaseOrder(data);
//   }
// }
// const para = {
//   TableName: NewActualpurchaseOrderTable,
// };
// const all = await scanDynamoRecords(para, []);

const body = {
  data: allMaterial,
};
return util.buildResponse(200, body);


    } 
    else {
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

async function addIngredientToActualPurchaseOrder(ingredientData) {
  const name = ingredientData.ingredient;
  let quantity = Number(ingredientData.quantity);
  const dynamoUser = await getActualPurchaseUser(name);
  // console.log("dynamoUser",dynamoUser)

  if (!dynamoUser) {
    
    const params = {
      TableName: ActualPurchaseOrderTable,
      Item: ingredientData,
    };

    return await dynamodb.put(params).promise().then(
      () => {
      },
      (error) => {
        console.error("Error adding ingredient to actual purchase order: ", error);
      }
    );
  } else {
    // console.log("inside if condition")
    // console.log("User already exists in actual purchase order");
if (quantity <= 0) {
  console.log("Deleting ingredient from actual purchase order");
  const deleteParams = {
    TableName: ActualPurchaseOrderTable,
    Key: {
      ingredient: name,
    },
  };
  return await dynamodb.delete(deleteParams).promise().then(
    (response) => {
      console.log("Ingredient deleted from actual purchase order: ", response);
    },
    (error) => {
      console.error("Error deleting ingredient from actual purchase order: ", error);
    }
  );
}
    const params = {
      TableName: ActualPurchaseOrderTable,
      Key: {
        ingredient: name,
      },
      UpdateExpression: "SET quantity = :q",
      ExpressionAttributeValues: {
        ":q": quantity,
      },
      ReturnValues: "UPDATED_NEW",
    };

    return await dynamodb.update(params).promise().then(
      (response) => {
      },
      (error) => {
        console.error("Error updating ingredient in actual purchase order: ", error);
      }
    );
  }
}

async function addIngredientToNewActualPurchaseOrder(ingredientData) {
  const name = ingredientData.ingredients;
  let quantity = Number(ingredientData.quantity);
  const dynamoUser = await getNewActualPurchaseUser(name);
  console.log("dynamoUser in  new actual purchse order",dynamoUser)

  if (!dynamoUser) {
    
    const params = {
      TableName: NewActualpurchaseOrderTable,
      Item: ingredientData,
    };

    return await dynamodb.put(params).promise().then(
      () => {
      },
      (error) => {
        console.error("Error adding ingredient to actual purchase order: ", error);
      }
    );
  } else {
    console.log("inside if condition")
    console.log("User already exists in actual purchase order");

    const params = {
      TableName: NewActualpurchaseOrderTable,
      Key: {
        ingredients: name,
      },
      UpdateExpression: "SET quantity = :q",
      ExpressionAttributeValues: {
        ":q": quantity,
      },
      ReturnValues: "UPDATED_NEW",
    };

    return await dynamodb.update(params).promise().then(
      (response) => {
      },
      (error) => {
        console.error("Error updating ingredient in actual purchase order: ", error);
      }
    );
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

async function getPUratio(e){
    const params = {
      TableName: PUratioTable,
      Key: {
        IngredientName: e,
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
    TableName: PurchaseorderTable,
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

async function getActualPurchaseUser(e) {
  const params = {
    TableName: ActualPurchaseOrderTable,
    Key: {
  ingredient: e,
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

async function getNewActualPurchaseUser(e) {
  const params = {
    TableName: NewActualpurchaseOrderTable,
    Key: {
  ingredients: e,
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




module.exports = {searchPurchaseOrder};
