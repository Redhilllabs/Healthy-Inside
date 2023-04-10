const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
// const DailySalesMetricsTable = "DailySalesMetrics";
const ItemTable = "ItemList";
// const SalesMetricsOrderTable = "SalesMetricsOrder";
const InventoryTable = "Inventory";
const IngredientProfileTable = "IngredientProfile";
const PUratioTable = "PUratio";
const ActualManufacturingTable = "ActualManufacturing";



async function AddtoActualManufacturing(data) {
  const date = data.Date;
  const salesPlanList = data.SalesPlanList;
  
  const recipes = [];
  const ingredients = [];

  try {
    
    // this will multiply salesforcast  to that the ItemName in Item List's COnstituent Item unit
    await Promise.all(
      salesPlanList.map((item) =>
        item.itemName && item.salesforecast
          ? calculateRecipe(item.itemName, item.salesforecast, recipes)
          : undefined
      )
    );


// here we will multiply the unit to that constitunet item name, present in IngredientProfile 

    for (const recipe of recipes){
      
      const ingredientProfile = await getIngredientProfile(recipe.itemName);
      
      for (const ingredient of ingredientProfile?.Ingredients || []) {
        
        const ingredientName = ingredient.ingredientName;
        
        const ingredientQuantity = recipe.unit * parseFloat(ingredient.quantity);
        
        const existingIngredient = ingredients.find(
          
          (item) => item.hasOwnProperty(ingredientName)
        );
        if (existingIngredient) {
          existingIngredient[ingredientName] += ingredientQuantity;
        } else {
          ingredients.push({ [ingredientName]: ingredientQuantity });
        }
      }
    }

    // const Data = {
    //   date: date,
    //   ingredient: ingredients,
    //   unit: "gram",
    // };
    
const UpdateIgredients = []
// storing the ingredients array into salesmatrics order table .
    // await createSalesMetricsOrderTable(Data);
    
    // multplying the PuRatio unit with Ingredients array unit 
    
    for (const item of ingredients) {
  const ingredientName = Object.keys(item)[0];
  const ingredientQuantity = item[ingredientName];
  const user = await getPUratio(ingredientName);
  if (user) {
    const newQuantity = Number(user.quantity) * Number(ingredientQuantity);
    UpdateIgredients.push({ ingredient: ingredientName, quantity: newQuantity, unit: "gram" });
  } else {
    UpdateIgredients.push({ ingredient: ingredientName, quantity: ingredientQuantity, unit: "gram" });
  }
}
    
    

// updateing inventory
    for (const item of UpdateIgredients){
      await updateInventory(item);
    }

    const ActualManufacturingUser = await getActualManufacturingTableUser(date);

    if (ActualManufacturingUser) {
      ActualManufacturingUser.SalesPlanList.push(...data.SalesPlanList);
      const params = {
        TableName: ActualManufacturingTable,
        Key: {
          Date: data.Date,
        },
        UpdateExpression: "SET SalesPlanList = :SalesPlanList",
        ExpressionAttributeValues: {
          ":SalesPlanList": ActualManufacturingUser.SalesPlanList,
        },
        ReturnValues: "UPDATED_NEW",
      };
      const response = await dynamodb.update(params).promise();
      const body = {
        operation: "Update",
        Message: "SUCCESS",
        Item: response.Attributes,
      };
      return util.buildResponse(200, body);
    }
    else{

    const params = {
      TableName: ActualManufacturingTable,
      Item: data,
    };

    await dynamodb.put(params).promise();

    const body = {
      operation: "added ActualManufacturing To Database",
      message: "SUCCESS",
      status: 200,
      item: data,
    };

    return util.buildResponse(200, body);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
  
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


const calculateRecipe = async (name, unit, recipes) => {
// here wee multiply unit from  sale forcast to that of itemList table's;- ItemName's constituent item->unit.

  try {
    const itemListUser = await getItemListUser(name);

    for(const item of itemListUser.ItemList) {
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

// to update inventory
async function updateInventory(item) {
  const name = item.ingredient
  const quantity = item.quantity

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


// async function createSalesMetricsOrderTable(data) {
//   const params = {
//     TableName: SalesMetricsOrderTable,
//     Item: {
//       Date: data.date,
//       ingredients: data.ingredient,
//       unit: data.unit
//     }
//   };

//   await dynamodb.put(params).promise();
// }


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
  

async function getItemListUser(e) {
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
  

// async function getItemList() {
//     const params = {
//       TableName: ActualManufacturingTable,
//     };
//     const allMaterial = await scanDynamoRecords(params, []);
//     const body = {
//       data: allMaterial,
//     };
//     // return util.buildResponse(200);
//     return util.buildResponse(200, body);
//   }
  
  
async function getSalesplan (data){
    console.log("camehere for getsales plan")
    const date = data.Date;
     const params = {
      TableName: ActualManufacturingTable,
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
  

async function getActualManufacturingTableUser(e) {
    const params = {
      TableName: ActualManufacturingTable,
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

module.exports = {AddtoActualManufacturing, getSalesplan};
