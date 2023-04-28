const AuthService = require("./services/auth");
const CartService = require("./services/cart");
const FoodService = require("./services/fooditems");
const UserService = require("./services/user");
const AdminService = require("./services/admin");
const MaterialListService = require("./services/materialList");
const ingredientprofileService = require("./services/ingredientprofile");
const recipeprofileService = require("./services/recipeprofile");
const ItemListService = require("./services/ItemList");
const SalesplanService = require("./services/Salesplan");
const PurchaseorderService = require("./services/Purchaseorder");
const PurchaseLogEntryService = require("./services/PurchaseLogEntry");
const InventoryService = require("./services/Inventory");
const dailysalesmetricsService = require("./services/dailysalesmetrics");
const JobFlowService = require("./services/JobFlow");
const EquipmentFlowService = require("./services/EquipmentFlow");
const smsService = require("./services/SMS");
const ActualManufacturingService = require("./services/ActualManufacturing");
const BranchingImportExportService = require("./services/BranchingImportExport");
const SeedImportExportService = require("./services/SeedimportAndExport");
const MasterImportAndExportService =require("./services/MasterImportAndExport");
const OPKimportandexportService = require("./services/OPKimportandexport");
const orderServices = require("./services/Order")


const orderPath = "/orders"
const SearchOrderPath = "/orders/searchorder";

// searching in OPK IMPORT END EXPORT 
const OPKpath = "/opkimportandexport"

// searching in master import and export 

const MasterPath = "/masterimportandexport";

// searching in seed import  and export 
const seedPath = "/seedimportandexport"

// searching branching import export
const branchingPath = "/branchingimportexport"


// add to ActualManufacturingPath

const addActualManufacturingPath = "/addactualmanufacturing";
const getactualmanufacturingPath = "/getactualmanufacturing";

// send data to intermediatePurchaseOrder2
const intermediatePurchaseOrder2Path = "/searchintermediatepurchaseorder2"

// sms path
const sendsmsPath = "/sendsms";
// equipment Flow path
const addtoEquipmentFlowPath = "/equipmentflow/addtoequipmentflow";

// Admin Path
const adminSignPath = "/adminlogin";

// User Path
const SaveAddressPath ="/saveaddress";
const ClaimKitPath ="/saveclaimkit";
const getUserPath = "/getuser";

// Cart path
const cartPath = "/cart";
const getcartPath ="/getcart";
const decCartItemPath ="/decreasecartitem";

// auth path
const signinPath ="/signin";
const signupPath = "/signup";
const healthPath ="/health";

//sales plan path
const addtosalesplanPath = "/addtosalesplan";
const getsalesplanPath = "/getsalesplan";

// purchaseorder path
const searchpurchaseorderPath = "/searchpurchaseorder";

// food path
const getallfoodPath = "/getallfood";

// material List path
const materialListPath = "/materiallist";
const addtomateriallistPath = "/addtomateriallist";

// ItemList Path
const addItemListPath = "/additemlist";
const getItemListPath = "/getitemlist"

// ingredient Profile path
const getingredientprofilePath = "/getingredientprofile";
const addtoingredientprofilePath = "/addtoingredientprofile";

// recipe profile path
const recipeprofilePath = "/recipeprofile";

// Purchase Log Entry
const AddPurchaseLogEntryPath = "/addpurcaselogentry";

// Inventory 
const AddtoInventoryPath  = "/addtoinventory";

// dailysales metrics 
const dailysalesmetricsPath = "/adddailysalesmetric";

// jobflow path
const addjobflowPath = "/jobflow/AddjobFlow";
const getjobflowPath = "/jobflow/getjobflow";

exports.handler = async (event) => {
  // console.log(event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200, "worked heath");
      break;
    case event.httpMethod === "GET" && event.path === recipeprofilePath:
      response = await recipeprofileService.getrecipeprofile();
      break;
    case event.httpMethod === "GET" && event.path === getItemListPath:
      response = await ItemListService.getItemList();
      break;  
      
    case event.httpMethod === "POST" && event.path === SaveAddressPath:
      const SaveAddressPathBody = JSON.parse(event.body);
      response = await UserService.saveUserAddress(SaveAddressPathBody);
      break;
      
    case event.httpMethod === "POST" && event.path === branchingPath:
      const branchingPathBody = JSON.parse(event.body);
      response = await BranchingImportExportService.searchBranchingImportExport( branchingPathBody);
      break; 
    
    case event.httpMethod === "POST" && event.path === seedPath:
      const seedPathBody = JSON.parse(event.body);
      response = await SeedImportExportService.searchSeedImportExport( seedPathBody);
      break;
    case event.httpMethod === "POST" && event.path === orderPath:
      const orderPathBody = JSON.parse(event.body);
      response = await orderServices.addtoOrder( orderPathBody);
      break;  
      
    case event.httpMethod === "POST" && event.path === OPKpath:
      const OPKpathBody = JSON.parse(event.body);
      response = await OPKimportandexportService.searchOPKImportExport(OPKpathBody);
      break;   
    
    case event.httpMethod === "POST" && event.path === MasterPath:
      const MasterPathBody = JSON.parse(event.body);
      response = await MasterImportAndExportService.searchMasterImportExport( MasterPathBody);
      break;     
      
    case event.httpMethod === "POST" && event.path === intermediatePurchaseOrder2Path:
      const Body = JSON.parse(event.body);
      response = await PurchaseorderService.getIntermediatePurchase2(Body);
      break;  
    
    case event.httpMethod === "POST" && event.path === sendsmsPath:
      const sendsmsPathBody = JSON.parse(event.body);
      response = await smsService.sendSms( sendsmsPathBody);
      // response = buildResponse(200, "workedsearch");
      break;  
      
    case event.httpMethod === "POST" && event.path === addtoEquipmentFlowPath:
      const addtoEquipmentFlowPathBody = JSON.parse(event.body);
      response = await EquipmentFlowService.AddToEquipmentFlow( addtoEquipmentFlowPathBody);
      break;  
    
    case event.httpMethod === "GET" && event.path === getjobflowPath:
      response = await JobFlowService.getJobFlow();
      break;   
    
    case event.httpMethod === "POST" && event.path === addjobflowPath:
      const addjobflowPathBody = JSON.parse(event.body);
      response = await JobFlowService.AddToJobFlow( addjobflowPathBody);
      break;  
      
    case event.httpMethod === "POST" && event.path === searchpurchaseorderPath:
      const searchpurchaseorderBody = JSON.parse(event.body);
      response = await PurchaseorderService.searchPurchaseOrder( searchpurchaseorderBody);
      // response = buildResponse(200, "workedsearch");
      break;
      
    case event.httpMethod === "POST" && event.path === SearchOrderPath:
      const SearchOrderPathBody = JSON.parse(event.body);
      response = await orderServices.searchOrder( SearchOrderPathBody);
      // response = buildResponse(200, "workedsearch");
      break;  
    
    case event.httpMethod === "POST" && event.path === AddPurchaseLogEntryPath:
      const AddPurchaseLogEntryBody = JSON.parse(event.body);
      response = await PurchaseLogEntryService.AddToPurchaseLogEntry( AddPurchaseLogEntryBody);
      // response = buildResponse(200, "workedsearch");
      break;
    
    case event.httpMethod === "POST" && event.path === dailysalesmetricsPath:
      const dailysalesmetricsBody = JSON.parse(event.body);
      response = await dailysalesmetricsService.Addtodailysalesmetrics( dailysalesmetricsBody);
      break; 
    
    case event.httpMethod === "POST" && event.path === addActualManufacturingPath:
      const addActualManufacturingPathBody = JSON.parse(event.body);
      response = await ActualManufacturingService.AddtoActualManufacturing(addActualManufacturingPathBody);
      break;   
      
    case event.httpMethod === "POST" && event.path === AddtoInventoryPath :
      const AddtoInventoryBody = JSON.parse(event.body);
      response = await InventoryService.AddToInventoryTable( AddtoInventoryBody);
      // response = buildResponse(200, "workedsearch");
      break;   
      
      
    case event.httpMethod === "POST" && event.path === getsalesplanPath:
      const getsalesplanPathBody = JSON.parse(event.body);
      response = await SalesplanService.getSalesplan(getsalesplanPathBody);
      break;
      
    case event.httpMethod === "POST" && event.path === getactualmanufacturingPath:
      const getactualmanufacturingPathBody = JSON.parse(event.body);
      response = await ActualManufacturingService.getSalesplan(getactualmanufacturingPathBody);
      break;  
      // 
      
    case event.httpMethod === "POST" && event.path === addItemListPath:
      const addItemListPathBody = JSON.parse(event.body);
      response = await ItemListService.saveItemList( addItemListPathBody);
      break;  
      

    case event.httpMethod === "POST" && event.path === addtosalesplanPath:
      const addtosalesplanBody = JSON.parse(event.body);
      response = await SalesplanService.AddtoSalesplan( addtosalesplanBody);
      break;  
    
    case event.httpMethod === "POST" && event.path === getUserPath:
      const getUserPathBody = JSON.parse(event.body);
      response = await UserService.getUserapi( getUserPathBody);
      break;  
      
    case event.httpMethod === "POST" && event.path === addtomateriallistPath:
      const addtomateriallistPathBody = JSON.parse(event.body);
      response = await MaterialListService.addtomateriallist( addtomateriallistPathBody);
     
      break; 
      
    case event.httpMethod === "POST" && event.path === recipeprofilePath:
      const recipeprofilePathBody = JSON.parse(event.body);
      response = await recipeprofileService.AddTorecipeprofile( recipeprofilePathBody);
     
      break;   
    
    case event.httpMethod === "POST" && event.path === addtoingredientprofilePath:
      const addtoingredientprofilePathBody = JSON.parse(event.body);
      response = await ingredientprofileService.AddToIngredientProfile( addtoingredientprofilePathBody);
      
      break;    

    case event.httpMethod === "POST" && event.path === signinPath:
      const loginBody = JSON.parse(event.body);
      response = await AuthService.signin(loginBody);
      // response = buildResponse(200 , "worked sign in");
      break;
    case event.httpMethod === "POST" && event.path === signupPath:
      const signupPathbody = JSON.parse(event.body);
      response = await AuthService.signup(signupPathbody);
      // response = buildResponse(200 , "worked sign in");
      break;  
      
    case event.httpMethod === "POST" && event.path === adminSignPath:
      const adminBody = JSON.parse(event.body);
      response = await AdminService.signin(adminBody);
      // response = buildResponse(200 , "worked sign in");
      break;  

    case event.httpMethod === "POST" && event.path === cartPath:
      const addtocartBody = JSON.parse(event.body);
      response = await CartService.addtocart(addtocartBody);
      // response = buildResponse(200, "worked add to cart");
      break; 
    case event.httpMethod === "DELETE" && event.path === cartPath:
      const decreaseBody = JSON.parse(event.body);
      response = await CartService.decreaseCartItem(decreaseBody);
      // response = buildResponse(200, "worked add to cart");
      break; 
    
    case event.httpMethod === "POST" && event.path === getcartPath:
      const GetCartBody = JSON.parse(event.body);
      response = await CartService.getcart(GetCartBody);
      break;   
    
    
    case event.httpMethod === "POST" && event.path === ClaimKitPath:
      const ClaimKitBody = JSON.parse(event.body);
      response = await UserService.saveclaimkit(ClaimKitBody);
      break;


    case event.httpMethod === "GET" && event.path === getallfoodPath:
      
      response = await FoodService.getAllFoods();
      break;
    case event.httpMethod === "GET" && event.path === materialListPath:
      
      response = await MaterialListService.getAllMaterial();
      break; 
    
    case event.httpMethod === "GET" && event.path === getingredientprofilePath:
      response = await ingredientprofileService.getIngredientProfile();
      break;   

    case event.httpMethod === "POST" && event.path === decCartItemPath:
      response = buildResponse(200 ,"worked decrease cart");
      break;

    // case event.httpMethod === "POST" && event.path === getcartPath:
    //   response = buildResponse(200,"worked getcart");
    //   break;

    default:
      response = buildResponse(404, "404 Not Found ");
  }
  return response;
};


function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}
