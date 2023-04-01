import React, { useState ,useEffect }  from 'react';
import {getitemlist ,AddToactualmanufacturing,getsalesplan ,getactualManufacturing} from '../../utils/ApiCall';

const ManufacturingLogEntryForm = () => {



const [ManufacturingHistoryProfile,setManufacturingHistoryProfile] = useState(false)
const [ActualManufacturingProfile,setActualManufacturingProfile] = useState(false)
const [isLoading, setIsLoading] = useState(false);
const [showTable, setShowTable] = useState(false);
const [data, setData] = useState("");
const [saleplanItemname, setsaleplanItemname] = useState("");
const [salesForecast, setsalesForecast] = useState("1");
const [salesplandate, setsalesplandate] = useState("");
const [showSalesPlanTable, setshowSalesPlanTable] = useState(false);
const [plannerList, setplannerList] = useState([]);
const [searchDate,setsearchDate] = useState('');
const [commonItems,setcommonItems] = useState([]);
const [salesplan,setsalesplan] = useState([]);
const [actualmanufacturing,setactualmanufacturing] =  useState([]);

const handeladdtoActualmanufacturing = (e)=>{
  e.preventDefault()
  const newplaner = {
    itemName: saleplanItemname,
    salesforecast: salesForecast,
  };
  setplannerList((prevList) => [...prevList, newplaner]);
  setshowSalesPlanTable(true);
  setsaleplanItemname("");
  setsalesForecast("1");
  setsalesplandate(salesplandate);
}

const handelsubmit = async(e)=>{
  e.preventDefault()
  setIsLoading(true)
          let bodyContent = JSON.stringify({
            "Date": salesplandate,
            "SalesPlanList": plannerList
          });
          if(salesplandate && plannerList ){
  
            const response = await AddToactualmanufacturing(bodyContent)
            if(response){
              setIsLoading(false)
            }
            
            if (response.status === 404) {
              alert("An Error Saving Data");
              return;
            }else{
              alert(`${response.operation} into ActualManufacturingTable in  Db`)
              setsaleplanItemname("")
              setsalesForecast("1")
              setsalesplandate("")
              setplannerList([]);
              setshowSalesPlanTable(false)
            } 
          } 
        }

useEffect(() => {
  const fetchData = async () => {
    const response = await getitemlist();
    setData(response.data);
   
  };
  fetchData();
}, []);

const handleManufacturingHistory = async(e)=>{
  e.preventDefault()
  console.log(searchDate)
  let bodyContent = JSON.stringify({
    "Date": searchDate,
  });
   const sp = await getsalesplan(bodyContent)
   console.log(sp)

   if (sp.status === 404) {
    alert("date is not present");
    return;
  }else {
  //  console.log("salesplan",sp.Item.SalesPlanList)
   setsalesplan(sp.Item.SalesPlanList)
   const am = await getactualManufacturing(bodyContent)
   console.log(am)

   if (am.status === 404) {
    setShowTable(true);
    // alert("am is not present");
    // return;
  }else{
    setactualmanufacturing(am.Item.SalesPlanList)
   setShowTable(!showTable);
   }
   
  }
}

let form = null;

if (ManufacturingHistoryProfile ) {
  form = (
    <div>

      <form
        action=""
        class="form"
        name="inventory-purchase-log"
        id="inventory-purchase-log"
        method="post"
        onSubmit={handleManufacturingHistory}
      >

        <div class="button-container">

        <label htmlFor="start-date-input">Select Date:</label>

          <input               
            type="date"
            id="start-date-input"
            value={searchDate}
            onChange={(e)=>setsearchDate(e.target.value)}
            required
          />

          <input
            id="addmoreingredients"
            type="submit"
            name="submit"
            value="View History"   

                    / >

           </div>
      </form>
    </div>
  );
}


  return (
    <>

<div className="formcontains">
<div className="recipeform_buttons_options">
  <button id={ManufacturingHistoryProfile ? "active" : ""} onClick={() => {
      setManufacturingHistoryProfile(!ManufacturingHistoryProfile)
      setActualManufacturingProfile(false)
      
    }}>
    Manufacturing History
  </button>
  <button id={ActualManufacturingProfile ? "active" : ""} onClick={() => {
      setActualManufacturingProfile(!ActualManufacturingProfile)
      setManufacturingHistoryProfile(false)
      setShowTable(false);
    }}>
   Actual Manufacturing 
  </button>
</div>
{form}
          </div>

<br />

{showTable && (
          <div className="table-container"  id='yourpurchaseorder'>
            <h2>Manufacturing History</h2>
            <br />
            
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Item Name</th>
      <th>Planned</th>
      <th>Actual</th>
    </tr>
  </thead>
  <tbody id="purchaseorder_table">
    {actualmanufacturing.length > 0
      ? [...new Set(salesplan.concat(actualmanufacturing).map(item => item.itemName))].map((itemName, index) => {
          const salesPlanItem = salesplan.find(item => item.itemName === itemName);
          const actualItem = actualmanufacturing.find(item => item.itemName === itemName);
          const planned = salesPlanItem ? salesPlanItem.salesforecast : "0";
          const actual = actualItem ? actualItem.salesforecast : "0";
          return (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={salesplan.length + actualmanufacturing.length}>{searchDate}</td>
              )}
              <td>{itemName}</td>
              <td>{planned}</td>
              <td>{actual}</td>
            </tr>
          );
        })
      : salesplan.map((item, index) => (
          <tr key={index}>
            {index === 0 && <td rowSpan={salesplan.length}>{searchDate}</td>}
            <td>{item.itemName}</td>
            <td>{item.salesforecast}</td>
            <td>0</td>
          </tr>
        ))}
  </tbody>
</table>



          </div>
        )}



{ActualManufacturingProfile?<div className="formcontains">
            <form className="form" id="recipe-designing" onSubmit={handeladdtoActualmanufacturing} >
                <div>
                  <label for="saleplanItemname">Item Name</label>
                  <select
                    name="saleplanItemname"
                    id="saleplanItemname"
                    value={saleplanItemname}
                    onChange={(e)=>{setsaleplanItemname(e.target.value)}}
                    required
                  >
                    <option value="">Select option</option>
                    {
                      data?data.map((item, index) => (
                        <option value={item.ItemName}>{item.ItemName}</option>
                        )):<></>}
                  </select>
                </div>
                <div id="addmore">
                  <div className="addmoreitems">
                    <div>
                      <label htmlFor="salesForcast">
                        Sales Forecast quantity
                      </label>
                      <input
                        type="number"
                        name="salesForcast"
                        id="salesForcast"
                        value={salesForecast}
                        onChange={(e)=>setsalesForecast(e.target.value)}
                        required
                      />
                    </div>

                    <div id="recipequantity">
                      <label htmlFor="salesplandate">Seleted date</label>
                      <input
                        type="date"
                        value={salesplandate}
                        onChange={(e)=>setsalesplandate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <input value="Add" type="submit" id="addmoreingredients" />
                  
                
              </form>
          </div>:<></>}


          {showSalesPlanTable && (
          <div className="table-container">
            <h2>Actual manufacturing  </h2>
            <br />
            <table className="recipe_table">
              <thead>
                <tr>
                  <th>Date</th>

                  <th>Item Name</th>
                  <th>Sales Forecast</th>
                </tr>
              </thead>
              <tbody>
                {plannerList.map((service, index) => (
                  <tr key={index}>
                  {index === 0 && (
                    <td rowSpan={plannerList.length}>{salesplandate}</td>
        )}
                  
                    <td>{service.itemName}</td>
                    <td>{service.salesforecast}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setshowSalesPlanTable(false)}
              >
                cancel
              </div>
              <div id="recipebutton_save" onClick={handelsubmit} >{isLoading?(<>Loading...</>):(<>Submit</>)}</div>
            </div>
          </div>
        )}


    </>
  )
}

export default ManufacturingLogEntryForm