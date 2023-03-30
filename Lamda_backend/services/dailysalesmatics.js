const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const DailySalesMetricsTable = "DailySalesMetrics";
const ItemTable = "ItemList";
const newTable = "SalesMetricsOrder";
const InventoryTable = "Inventory";
const IngredientProfileTable = "IngredientProfile";



async function Addtodailysalesmetrics(data) {
  const date = data.Date;
  const salesPlanList = data.SalesPlanList;
   const recipes = []; // declare recipes as a local variable
   const ingredients = [];

  try {
    await Promise.all(salesPlanList.map(item => item.itemName && item.salesforecast ? calculateRecipe(item.itemName, item.salesforecast, recipes) : undefined));

    
    // console.log("Recipes for date:", date, recipes);
    // clculating the purchase oreder here !
    for (const recipe of recipes) {
      const ingredientProfile = await getIngredientProfile(recipe.itemName);
      // console.log(ingredientProfile)
      // const parsedIngredients = JSON.parse(ingredientProfile.Ingredients);

      for (const ingredient of ingredientProfile.Ingredients) {
        const ingredientName = ingredient.ingredientName;
        const ingredientQuantity = recipe.unit * parseFloat(ingredient.quantity);
        const existingIngredient = ingredients.find(item => item.hasOwnProperty(ingredientName));

        if (existingIngredient) {
          existingIngredient[ingredientName] += ingredientQuantity;
        } else {
          ingredients.push({ [ingredientName]: ingredientQuantity });
        }
      }
    }

    const purchaseOrderData = {
      date: date,
      ingredient: ingredients,
      unit: "gram"
    };

    await createPurchaseOrder(purchaseOrderData);
    
    for (let i = 0; i < ingredients.length; i++) {
  const ingredient = ingredients[i];
  await updateInventory(ingredient);
}


    // await updateInventory(ingredients)

    const dynamoUser = await getUser(date);
    console.log("User from DynamoDB:", dynamoUser);

    if (!dynamoUser) {
      const params = {
        TableName: DailySalesMetricsTable,
        Item: data
      };

      await dynamodb.put(params).promise();

      const body = {
        operation: "added Daily sales Metrics To Database",
        message: "SUCCESS",
        status: 200,
        item: data
      };

      return util.buildResponse(200, body);
    } 
    else {
      // update the SalesPlan table using date 
    const existingItem = dynamoUser.SalesPlanList.find(item => item.itemName === data.SalesPlanList[0].itemName);
  if (existingItem) {
    existingItem.salesforecast = Number(existingItem.salesforecast) + Number(data.SalesPlanList[0].salesforecast);
  } else {
    dynamoUser.SalesPlanList.push(data.SalesPlanList[0]);
  }

  const params = {
    TableName: DailySalesMetricsTable,
    Key: {
      Date: data.Date,
    },
    UpdateExpression: "SET SalesPlanList = :c",
    ExpressionAttributeValues: {
      ":c": dynamoUser.SalesPlanList,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          operation: "Update",
          Message: "SUCCESS",
          Item: response.Attributes,
        };
        return util.buildResponse(200, body);
      },
      (error) => {
        console.log("Some Error Occured", error);
      }
    );
      
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

const calculateRecipe = async (name, unit, recipes) => {
  console.log(`Calculating recipe for ${name} with unit ${unit}`);

  try {
    const dynamoUser = await getitemUser(name);
    console.log("User from DynamoDB:", dynamoUser);

    for(const item of dynamoUser.ItemList) {
      const calculatedUnit = Number(unit) * Number(item.unit);
      const index = recipes.findIndex(recipe => recipe.itemName === item.Constituent_Recipe);

      if (index !== -1) {
        recipes[index].unit += calculatedUnit;
      } else {
        recipes.push({ itemName: item.Constituent_Recipe, unit: calculatedUnit });
      }
    }
    
    return recipes;
  } catch (error) {
    console.error(`Error getting item user for ${name}:`, error);
    return [];
  }
}

async function updateInventory(ingredient) {
  const name = Object.keys(ingredient)[0];
  const quantity = Number(ingredient[name]);

  const params = {
    TableName: InventoryTable,
    Key: {
      Ingredients: name,
    },
    UpdateExpression: "SET quantity = quantity - :q",
    ExpressionAttributeValues: {
      ":q": quantity,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const dynamoUser = await getInventoryUser(name);
    if (!dynamoUser) {
      console.log(`Error: Ingredient ${name} not found in InventoryTable`);
      return;
    }

    const response = await dynamodb.update(params).promise();
    console.log(`Updated inventory for ${name}`);
    return response;
  } catch (error) {
    console.log(`Error updating inventory for ${name}`, error);
    throw error;
  }
}



async function createPurchaseOrder(data) {
  const params = {
    TableName: newTable,
    Item: {
      Date: data.date,
      ingredients: data.ingredient,
      unit: data.unit
    }
  };

  await dynamodb.put(params).promise();
}

async function getIngredientProfile(e) {
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
          console.error("There is an error getting user: ", error);
        }
      );
  }

async function getitemUser(e) {
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

async function getItemList() {
    const params = {
      TableName: DailySalesMetricsTable,
    };
    const allMaterial = await scanDynamoRecords(params, []);
    const body = {
      data: allMaterial,
    };
    // return util.buildResponse(200);
    return util.buildResponse(200, body);
  }
  
  async function getSalesplan (data){
    console.log("camehere for getsales plan")
    const date = data.Date;
     const params = {
      TableName: DailySalesMetricsTable,
   Key: { Date: date},
    };
    
    try {
        const response = await dynamodb.get(params).promise();
        const body = {
            Operation: "GetUser",
            Message: response.Item ? "SUCCESS" : "Failed",
            status: response.Item ? 200 : 404,
            Item: response.Item,
        };
        return util.buildResponse(200, body);
    } catch (error) {
        console.error("There is an error getting user:", error);
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
async function getInventoryUser(e) {
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
          console.error("There is an error getting user: ", error);
        }
      );
  }

async function getUser(e) {
    const params = {
      TableName: DailySalesMetricsTable,
      Key: {
        Date: e,
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

module.exports = {Addtodailysalesmetrics, getSalesplan};
