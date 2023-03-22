import React, { useState ,useEffect }  from 'react';
import {getitemlist} from '../../utils/ApiCall';

// sales Forecast Planner Option in Business & Branding

const SalesPlanForm = () => {
    const [DaysPlan, setDaysPlan] = useState(false);
    const [saleplanItemname, setsaleplanItemname] = useState("item1");
    const [salesForecast, setsalesForecast] = useState("1");
    const [salesplandate, setsalesplandate] = useState("2023-03-16");
    const [showSalesPlanTable, setshowSalesPlanTable] = useState(false);
    const [plannerList, setplannerList] = useState([]);
    const [data ,setData]=useState('')


    const handeladdtoplanner = () => {
        const newplaner = {
          iTem_name: saleplanItemname,
          salesforecast: salesForecast,
          saledate: salesplandate,
        };
        setplannerList((prevList) => [...prevList, newplaner]);
        setshowSalesPlanTable(true);
        setsaleplanItemname("item1");
        setsalesForecast("1");
        setsalesplandate("2023-03-16");
      };
      const handlesaleplanItemnameChange = (e) => {
        setsaleplanItemname(e.target.value);
      };
      const handlesalesForecastChange = (e) => {
        setsalesForecast(e.target.value);
      };
      const handlesalesplandateChange = (e) => {
        setsalesplandate(e.target.value);
      };
      
      useEffect(() => {
        const fetchData = async () => {
          const response = await getitemlist();

          setData(response.data);

        };
        fetchData();
      }, []);
  return (
    <>

<div className="formcontains">
            <div className="recipeform_buttons_options">
              <button onClick={() => setDaysPlan(!DaysPlan)}>
                Submit Days Plan
              </button>
              <button >
                Submit Weekly Plan
              </button>
              <button >
                Submit Monthly Plan
              </button>
              <button >Custom Plan</button>
            </div>
            {DaysPlan ? (
              <form className="form" id="recipe-designing">
                <div>
                  <label for="saleplanItemname">Item Name</label>
                  <select
                    name="saleplanItemname"
                    id="saleplanItemname"
                    value={saleplanItemname}
                    onChange={handlesaleplanItemnameChange}
                  >
                    <option value="">Select option</option>
                    {data.map((item, index) => (
                        <option value={item.ItemName}>{item.ItemName}</option>
                        ))}
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
                        onChange={handlesalesForecastChange}
                        required
                      />
                    </div>

                    <div id="recipequantity">
                      <label htmlFor="salesplandate">Seleted date</label>
                      <input
                        type="date"
                        value={salesplandate}
                        onChange={handlesalesplandateChange}
                      />
                    </div>
                  </div>
                </div>
                <div id="addmoreingredients" onClick={handeladdtoplanner}>
                  Add To Planner
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
          {showSalesPlanTable && (
          <div className="table-container">
            <h2>Your Sales Planner </h2>
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
                    <td>{service.saledate}</td>
                    <td>{service.iTem_name}</td>
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
              <div id="recipebutton_save">Submit</div>
            </div>
          </div>
        )}
    </>
  )
}

export default SalesPlanForm