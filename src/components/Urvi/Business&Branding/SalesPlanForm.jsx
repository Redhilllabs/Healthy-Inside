import React, { useState, useEffect } from "react";
import { getitemlist, addSalesPlan, sendSNS } from "../../../utils/ApiCall";
import load2 from "../../../images/load2.gif";
import Message from "../../../utils/Message";
// sales Forecast Planner Option in Business & Branding

const SalesPlanForm = () => {
  const [DaysPlan, setDaysPlan] = useState(false);
  const [saleplanItemname, setsaleplanItemname] = useState("");
  const [salesForecast, setsalesForecast] = useState("1");
  const [salesplandate, setsalesplandate] = useState("");
  const [showSalesPlanTable, setshowSalesPlanTable] = useState(false);
  const [plannerList, setplannerList] = useState([]);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handlesubmit = async () => {
    setIsLoading(true);
    let bodyContent = JSON.stringify({
      Date: salesplandate,
      SalesPlanList: plannerList,
    });

    if (salesplandate && plannerList) {
      const str = plannerList.map((obj) => JSON.stringify(obj)).join(",  ");
      let message = `SalesForcast Data \n\nDate: ${salesplandate}\n\nThe List Items are:\n ${str}`;
      let SNSContent = JSON.stringify({
        number: "+917838247507",
        message: message,
      });

      try {
        const res = await sendSNS(SNSContent);
        if (res.status === 500) {
          setResponse({ message: "Ohh error occurred while sending sms . Please try again later.", status: "error" });
          return;
        }
      } catch (error) {
        console.error(error);
        return;
      }

      try {
        const response = await addSalesPlan(bodyContent);
        if (response.status === 500) {
          setResponse({ message: "Ohh error occurred while saving data. Please try again later.", status: "error" });
          
          return;
        } else {
          setIsLoading(false);

          setResponse({
            message: "Data loaded successfully",
            status: "success",
          });
  
          setsaleplanItemname("");
          setsalesForecast("1");
          setsalesplandate("");
          setplannerList([]);
          setshowSalesPlanTable(false);
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
  };
  const handeladdtoplanner = (e) => {
    e.preventDefault();
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

  const handlecancel = () => {
    setshowSalesPlanTable(false);
    setsaleplanItemname("");
    setsalesForecast("1");
    setsalesplandate("");
    setplannerList([])
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
    
    <Message response={response} />

      <div className="formcontains">
          <form
            className="form"
            id="recipe-designing"
            onSubmit={handeladdtoplanner}
          >
            <div>
              <label for="saleplanItemname">Item Name</label>
              <select
                name="saleplanItemname"
                id="saleplanItemname"
                value={saleplanItemname}
                onChange={(e) => {
                  setsaleplanItemname(e.target.value);
                }}
                required
              >
                <option value="">Select option</option>
                {data ? (
                  data.map((item, index) => (
                    <option value={item.ItemName}>{item.ItemName}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div id="addmore">
              <div className="addmoreitems">
                <div>
                  <label htmlFor="salesForcast">Sales Forecast quantity</label>
                  <input
                    type="number"
                    name="salesForcast"
                    id="salesForcast"
                    value={salesForecast}
                    onChange={(e) => setsalesForecast(e.target.value)}
                    required
                  />
                </div>

                <div id="recipequantity">
                  <label htmlFor="salesplandate">Seleted date</label>
                  <input
                    type="date"
                    value={salesplandate}
                    onChange={(e) => setsalesplandate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <input value="Add" type="submit" id="addmoreingredients" />
          </form>
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
            <div id="recipebutton_close" onClick={handlecancel}>
              cancel
            </div>
            <div
              id="recipebutton_save"
              onClick={isLoading ? null : handlesubmit}
            >
              {isLoading ? (
                <>
                  <button disabled>Submit</button>
                  <img
                    src={load2}
                    alt=""
                    srcset=""
                    style={{ width: "30px", height: "30px" }}
                  />
                </>
              ) : (
                <>Submit</>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesPlanForm;
