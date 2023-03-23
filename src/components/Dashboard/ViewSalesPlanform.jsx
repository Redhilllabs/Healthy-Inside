import React, { useState } from "react";
import {getsalesplan} from '../../utils/ApiCall'
const ViewSalesPlanform = () => {
  const [startDate, setStartDate] = useState("");
  const [data, setdata] = useState("");
  const [Table ,setShowTable] = useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };



  const handleSubmit = async(e) => {
    e.preventDefault()
console.log(startDate)
    let bodyContent = JSON.stringify({
      "Date":startDate
    });

    const response = await getsalesplan(bodyContent);
    // console.log(response)
    if (response.status === 404) {
      alert("Date is Not in Sales Plan");
      return;
    }
    else{
      setdata(response);
      // console.log(data)
      setShowTable(true);
    }
  };

  return (
    <>
    <div className="formcontains">
      <h1>View Sales Plan</h1>
      <form
        action=""
        className="form"
        name="inventory-purchase-log"
        id="inventory-purchase-log"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="option_container">
          <label htmlFor="start-date-input">Select Date:</label>
          <input
            type="date"
            id="start-date-input"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>

        <div className="button-container">
          <input  id="addmoreingredients" value={"View Sale plan"} type="submit" name="submit">
            
          </input>
        </div>
      </form>
    </div>

    {Table && (
          <div className="table-container"  id='yourrecipetale'>
            <h2>Your Sales Plan</h2>
            <br />
            {/* {data && ( */}
  <table className="recipe_table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Item Name</th>
        <th>Sales Forecast</th>
      </tr>
    </thead>
    <tbody>
      {data&& data.Item && data.Item.SalesPlanList.map((item, index) => (
        <tr key={index}>
          {index === 0 && (
            <td rowSpan={data.Item.SalesPlanList.length}>
              {data.Item.Date}
            </td>
          )}
          <td>{item.itemName}</td>
          <td>{item.salesforecast}</td>
        </tr>
      ))}
    </tbody>
  </table>
{/* )} */}

          </div>
        )}
        </>
  );
};

export default ViewSalesPlanform;