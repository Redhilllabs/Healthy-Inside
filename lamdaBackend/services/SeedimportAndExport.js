// searchBranchingImportExport

const AWS = require("aws-sdk");
const util = require("../utils/util");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ItemTable = "ItemList";
const SalesPlanTable = "SalesPlan";
const seedTable = "SeedImportAndExport"
// const ExtraBatchingTable = "ExtraBatching"

AWS.config.update({
  region: "us-east-1",
});

async function searchSeedImportExport(data) {
  const date = data.Date;
  const branching = [];
//   const ExtraBatching = [];

  // searching for date in salesplan
  const salesPlanUser = await getSalesPlanUser(date);
  if(!salesPlanUser){
      const body ={
    message:"date is not present",
    status:500
  };
  
  return util.buildResponse(200, body);
  }
  const SalesPlanList = salesPlanUser.SalesPlanList;

  // iterate over each item in SalesPlanList
  for (const item of SalesPlanList) {
    const itemName = item.itemName;
    const quantity = item.salesforecast / 30;
    const user = await getItemListUser(itemName);
    
    for (const name in user.ItemList) {
      const seedUser = await getSeedImportExportUser(user.ItemList[name].Constituent_Recipe);
    //   const ExtrabatchingUser = await getExtraBatching(user.ItemList[name].Constituent_Recipe);
      
      if (seedUser) {
        for (const branch of seedUser) {
          const importSupply = [];
          const exportSupply = [];
          
          if (Array.isArray(branch.exportSupply)) {
            branch.exportSupply.forEach(x => { 
              
              const newQuantity = Number(x.quantity) * quantity;
              // check if the particular is already present in exportSupply
                exportSupply.push({ particulars: x.particulars, quantity: newQuantity,unit:x.unit });
              
              });
          }
          
          if (Array.isArray(branch.importSupply)) {
            branch.importSupply.forEach(x => {
               const newQuantity = Number(x.quantity) * quantity;
                importSupply.push({ particulars: x.particulars, quantity: newQuantity , unit: x.unit });
              
            });
          }
          
           let foundMatchingRootItem = false;

          for (let i = 0; i < branching.length; i++) {
            if (branching[i].rootItem === branch.rootItem) {
              foundMatchingRootItem = true;

              // merge export supplies
              for (const exportSupplyItem of exportSupply) {
                const existingExportSupplyItemIndex = branching[i].exportSupply.findIndex(x => x.particulars === exportSupplyItem.particulars);

                if (existingExportSupplyItemIndex > -1) {
                  branching[i].exportSupply[existingExportSupplyItemIndex].quantity += exportSupplyItem.quantity;
                } else {
                  branching[i].exportSupply.push(exportSupplyItem);
                }
              }

              // merge import supplies
              for (const importSupplyItem of importSupply) {
                const existingImportSupplyItemIndex = branching[i].importSupply.findIndex(x => x.particulars === importSupplyItem.particulars);

                if (existingImportSupplyItemIndex > -1) {
                  branching[i].importSupply[existingImportSupplyItemIndex].quantity += importSupplyItem.quantity;
                } else {
                  branching[i].importSupply.push(importSupplyItem);
                }
              }

              break;
            }
          }

          if (!foundMatchingRootItem) {
            branching.push({
              rootItem: branch.rootItem,
              id: branch.id,
              headedFor: branch.headedFor,
              exportSupply: exportSupply,
              importSupply: importSupply
            });
          }
        }
      }
      
    //   if(ExtrabatchingUser){
        
    //       for (const branch of ExtrabatchingUser) {
    //       const importSupply = [];
    //       const exportSupply = [];
          
    //       if (Array.isArray(branch.exportSupply)) {
    //         branch.exportSupply.forEach(x => {
    //          const newQuantity = Number(x.quantity) * quantity;

    //             exportSupply.push({ particulars: x.particulars, quantity: newQuantity });
    //           // }
              
    //         });
    //       }
          
    //       if (Array.isArray(branch.importSupply)) {
    //         branch.importSupply.forEach(x => {
    //           const newQuantity = Number(x.quantity) * quantity;
    //           importSupply.push({particulars:x.particulars , quantity:newQuantity});
    //           // }
    //         });
    //       }
          
    //       ExtraBatching.push({
    //         rootItem: branch.rootItem,
    //         id: branch.id,
    //         headedFor: branch.headedFor,
    //         exportSupply: exportSupply,
    //         importSupply: importSupply
    //       });
    //     }
        
    //   }
    }
    
    
  }

  const body ={
    data: branching,
    // ExtrabatchingUser:ExtraBatching
  };
  
  return util.buildResponse(200, body);
}



async function getSalesPlanUser(date) {
  const params = {
    TableName: SalesPlanTable,
    Key: {
      Date: date,
    },
  };

  try {
    const response = await dynamodb.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error("There is an error getting user: ", error);
    throw error;
  }
}

async function getItemListUser(e) {
  const params = {
    TableName: ItemTable,
    Key: {
      ItemName: e,
    },
  };

  try {
    const response = await dynamodb.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error("There is an error getting user: ", error);
    throw error;
  }
}

async function getSeedImportExportUser(e) {
  const params = {
    TableName: seedTable,
    KeyConditionExpression: "#rootItem = :rootItem",
    ExpressionAttributeNames: {
      "#rootItem": "rootItem"
    },
    ExpressionAttributeValues: {
      ":rootItem": e
    }
  };

  try {
    const response = await dynamodb.query(params).promise();
    return response.Items;
  } catch (error) {
    console.error("There is an error getting user: ", error);
    throw error;
  }
}

// async function getExtraBatching(e) {
//   const params = {
//     TableName: ExtraBatchingTable ,
//     KeyConditionExpression: "#rootItem = :rootItem",
//     ExpressionAttributeNames: {
//       "#rootItem": "rootItem"
//     },
//     ExpressionAttributeValues: {
//       ":rootItem": e
//     }
//   };

//   try {
//     const response = await dynamodb.query(params).promise();
//     return response.Items;
//   } catch (error) {
//     console.error("There is an error getting user: ", error);
//     throw error;
//   }
// }

module.exports = {searchSeedImportExport};