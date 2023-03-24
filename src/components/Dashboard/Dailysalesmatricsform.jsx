import React, {useState} from 'react'

const Dailysalesmatricsform = () => {

    const [dailysalesmatricsdate, setdailysalesmatricsdate] = useState("");
    const [showdailysalesmatricstable, setshowdailysalesmatricstable] =
      useState(false);
      // const handledailysalesmatricsDateChange = (event) => {
      //   setdailysalesmatricsdate(event.target.value);
      // };
    
      // const handledailysalesmatricssubmit = () => {
      //   setshowdailysalesmatricstable(true);
      // };

      const [DaysPlan, setDaysPlan] = useState(false);
      const [saleplanItemname, setsaleplanItemname] = useState("");
      const [salesForecast, setsalesForecast] = useState("1");
      const [salesplandate, setsalesplandate] = useState("");
      const [showSalesPlanTable, setshowSalesPlanTable] = useState(false);
      const [plannerList, setplannerList] = useState([]);
      const [data ,setData]=useState('')
  
      const handelsubmit = async()=>{
        // let bodyContent = JSON.stringify({
        //   "Date": salesplandate,
        //   "SalesPlanList": plannerList
        // });
        // if(salesplandate && plannerList ){
        //   const response = await addSalesPlan(bodyContent)
        //   if (response.status === 500) {
        //     alert("An Error Saving Data");
        //     return;
        //   }else{
        //     alert(`${response.operation} into Sales Plan Db`)
        //     setsaleplanItemname("")
        //     setsalesForecast("1")
        //     setsalesplandate("")
        //     setplannerList([]);
        //     setshowSalesPlanTable(false)
        //   } 
        // } 
      }
      const handeldatechange = (e) =>{
        setsalesplandate(e.target.value)
        // console.log(plannerList)
      }
  
      const handeladdtoplanner = (e) => {
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
        };

  return (
    <>

<div className="formcontains">
            <h1>Daily Sales Metrics</h1>
            <form className="form" id="recipe-designing" onSubmit={handeladdtoplanner} >
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
                        onChange={handeldatechange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <input value="AddToPlanner" type="submit" id="addmoreingredients" />
                  
                
              </form>
            {/* <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={dailysalesmatricsdate}
                  onChange={handledailysalesmatricsDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handledailysalesmatricssubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Sales Metrics
                </div>
              </div>
            </form> */}
          </div>


          
          {showdailysalesmatricstable && (
          <div className="table-container">
            <h2>Daily Sales</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dailysalesmatricsdate}</td>
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setshowdailysalesmatricstable(false)}
              >
                cancel
              </div>
              <div id="recipebutton_save">Save</div>
            </div>
          </div>
        )}

    </>
  )
}

export default Dailysalesmatricsform