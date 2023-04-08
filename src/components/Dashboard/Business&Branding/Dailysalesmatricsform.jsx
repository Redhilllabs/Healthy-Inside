import React, { useState, useEffect } from "react";
import { getitemlist, AdddailySalesMetric } from "../../../utils/ApiCall";
import load2 from "../../../images/load2.gif";
import Message from "../../../utils/Message";

const Dailysalesmatricsform = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saleplanItemname, setsaleplanItemname] = useState("");
  const [salesForecast, setsalesForecast] = useState("1");
  const [salesplandate, setsalesplandate] = useState("");
  const [showSalesPlanTable, setshowSalesPlanTable] = useState(false);
  const [plannerList, setplannerList] = useState([]);
  const [data, setData] = useState("");
  const [response, setResponse] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let bodyContent = JSON.stringify({
      Date: salesplandate,
      SalesPlanList: plannerList,
    });
    if (salesplandate && plannerList) {
      const response = await AdddailySalesMetric(bodyContent);
      if (response) {
        setIsLoading(false);
      }

      if (response.status === 404) {
        setResponse({ message: "Error Saving data", status: "error" });
        return;
      } else {
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
    }
  };
  const handeldatechange = (e) => {
    setsalesplandate(e.target.value);
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
        <h1>Daily Sales Metrics</h1>
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
                  onChange={handeldatechange}
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
          <h2>Your Sales Metrics </h2>
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

export default Dailysalesmatricsform;
