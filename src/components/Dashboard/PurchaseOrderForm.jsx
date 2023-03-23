import React, { useState,useEffect } from 'react'
import {searchPurchaseOrder} from '../../utils/ApiCall'
const PurchaseOrderForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [sortedData, setSortedData] = useState([]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
      };
    
      const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      };

      const handleViewPurchaseOrder = async () => {
        let bodyContent = JSON.stringify({
          "startDate": startDate,
          "endDate": endDate
        });
    
        const response = await searchPurchaseOrder(bodyContent);
    
        if (response.status === 401) {
          alert("Not in Sales Plan");
          return;
        }
    
        setData(response);
      };

      useEffect(() => {
        if (data) {
          const sortedOrders = data.data.map(order => ({
            ...order,
            Date: new Date(order.Date)
          })).sort((a, b) => a.Date - b.Date);
          setSortedData(sortedOrders);
          setShowTable(true);
        }
      }, [data]);
      


  return (
    <>
<div className="formcontains">
            <h1>View Purchase Order</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label htmlFor="start-date-input">Start Date:</label>
                <input
                  type="date"
                  id="start-date-input"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className="option_container">
                <label htmlFor="end-date-input">End Date:</label>
                <input
                  type="date"
                  id="end-date-input"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handleViewPurchaseOrder}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Purchase Order
                </div>
              </div>
            </form>
          </div>

          {showTable && (
          <div className="table-container"  id='yourrecipetale'>
            <h2>Your Sales Plan</h2>
            <br />
            {/* {data && ( */}
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Ingredient</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody>
    {sortedData.map((order, index) => (
      <tr key={index}>
        <td>{order.Date.toString()}</td>
        <td>
          <table>
            <tbody>
              {order.ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{Object.keys(ingredient)[0]}</td>
                  <td>{Object.values(ingredient)[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td>{order.unit}</td>
      </tr>
    ))}
  </tbody>
</table>


{/* )} */}

          </div>
        )}

    </>
  )
}

export default PurchaseOrderForm