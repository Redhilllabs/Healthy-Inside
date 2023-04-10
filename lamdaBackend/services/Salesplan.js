const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const SalesPlanTable = "SalesPlan";
const ItemTable = "ItemList";
const newTable = "IntermidiatePurchaseOrder-1";
const intermediatePurchaseOrder2Table = "intermediatePurchaseOrder-2";
const IngredientProfileTable = "IngredientProfile";
const PUratioTable = "PUratio";


async function AddtoSalesplan(data) {
  const date = data.Date;
  const salesPlanList = data.SalesPlanList;
   const recipes = [];
   const ingredients = [];
   const intermediatePurchaseOrder2Array = [];

  try {
    await Promise.all(salesPlanList.map(item => item.itemName && item.salesforecast ? calculateRecipe(item.itemName, item.salesforecast, recipes) : undefined));

    for (const recipe of recipes) {
      const ingredientProfile = await getIngredientProfile(recipe.itemName);
    

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
    console.log(ingredients)

    const IntermidiatePurchaseOrder1Data = {
      date: date,
      ingredient: ingredients,
      unit: "gram"
    };

    await createIntermidiatePurchaseOrder1(IntermidiatePurchaseOrder1Data);
    
    // multiplying PUratio With IntermediatepurchaseOrder1 and storeing into intermediate purchase order 2
    
    // getting the updated intermediate 1
    const IntermidiatePurchaseOrder1User = await getIntermidiatePurchaseOrder1User(date);
    const intermediatePurchaseOrder1Array = IntermidiatePurchaseOrder1User.ingredients
    console.log("IntermidiatePurchaseOrder1User.ingredients",IntermidiatePurchaseOrder1User.ingredients)

for (const item of intermediatePurchaseOrder1Array) {
  const ingredientName = Object.keys(item)[0];
  const ingredientQuantity = item[ingredientName];
  const user = await getPUratio(ingredientName);
  if (user) {
    const newQuantity = Number(user.quantity) * Number(ingredientQuantity);
    intermediatePurchaseOrder2Array.push({ ingredient: ingredientName, quantity: newQuantity});
  } else {
    intermediatePurchaseOrder2Array.push({ ingredient: ingredientName, quantity: ingredientQuantity});
  }
}

const IntermidiatePurchaseOrder2Data = {
      date: date,
      ingredient: intermediatePurchaseOrder2Array,
      unit: "gram"
    };

console.log("ingredient send into intermedate 2:- ",intermediatePurchaseOrder2Array)
    await createIntermediatePurchaseOrder2(IntermidiatePurchaseOrder2Data)
    
    const dynamoUser = await getSalesPlanUser(date);

    if (!dynamoUser) {
      const params = {
        TableName: SalesPlanTable,
        Item: data
      };

      await dynamodb.put(params).promise();

      const body = {
        operation: "addSalesPlanToDatabase",
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
    TableName: SalesPlanTable,
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

async function createIntermidiatePurchaseOrder1(data) {
 
  const dynamoUser = await getIntermidiatePurchaseOrder1(data.date);
  if (!dynamoUser) {
       const params = {
    TableName: newTable,
    Item: {
      Date: data.date,
      ingredients: data.ingredient,
      unit: data.unit
    }
  };

      await dynamodb.put(params).promise();

      // const body = {
      //   operation: "addPurchase oreder",
      //   message: "SUCCESS",
      //   status: 200,
      //   item: data
      // };
// console.log("addedd",body)
      // return util.buildResponse(200, body);
    } 
    else {
      
        data.ingredient.forEach((ingredient) => {
      const existingItem = dynamoUser.ingredients.find(
        (item) => Object.keys(item)[0] === Object.keys(ingredient)[0]
      );
      if (existingItem) {
        existingItem[Object.keys(ingredient)[0]] += ingredient[Object.keys(ingredient)[0]];
      } else {
        dynamoUser.ingredients.push(ingredient);
      }
    });

    const params = {
      TableName: newTable,
      Key: {
        Date: data.date,
      },
      UpdateExpression: "SET ingredients = :c",
      ExpressionAttributeValues: {
        ":c": dynamoUser.ingredients,
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
  
}


async function createIntermediatePurchaseOrder2(data) {
  const dynamoUser = await getIntermidiatePurchaseOrder2(data.date);

  if (!dynamoUser) {
    const params = {
      TableName: intermediatePurchaseOrder2Table,
      Item: {
        Date: data.date,
        ingredients: data.ingredient,
        unit: data.unit,
      },
    };
    await dynamodb.put(params).promise();
  } else {
    console.log("data.ingredients", data.ingredient);

    const params = {
      TableName: intermediatePurchaseOrder2Table,
      Key: {
        Date: data.date,
      },
      UpdateExpression: "SET ingredients = list_append(ingredients, :c)",
      ExpressionAttributeValues: {
        ":c": data.ingredient,
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
  
async function getIntermidiatePurchaseOrder1User(e) {
  const params = {
    TableName: newTable,
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


// getting PUratio item 
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
 
  // to get item by date from intermediate -1
  
async function getIntermidiatePurchaseOrder1(e) {
    const params = {
      TableName: newTable,
      Key:{
        Date :e
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
 
  // to get item by date from intermediate -2

async function getIntermidiatePurchaseOrder2(e){
  
  const params = {
      TableName: intermediatePurchaseOrder2Table,
      Key:{
        Date :e
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

// they are used to get item from sales plan table

// for front-end 
async function getSalesplan (data){
    const date = data.Date;
     const params = {
      TableName: SalesPlanTable,
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
  
// for backend
async function getSalesPlanUser(e) {
    const params = {
      TableName: SalesPlanTable,
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

module.exports = {AddtoSalesplan, getSalesplan};
