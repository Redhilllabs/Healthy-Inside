import React, { useState,useEffect } from 'react'
import {searchPurchaseOrder ,AddtoInventory} from '../../utils/ApiCall'
const PurchaseOrderForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
      };
    
      const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      };

      const handleViewPurchaseOrder = async (event) => {

        event.preventDefault()
        setIsLoading(true)
        let bodyContent = JSON.stringify({
          "startDate": startDate,
        });
    
        const response = await searchPurchaseOrder(bodyContent);
        console.log("new purchase Order ",response.newActualPurchaseOrder)
        // const promises = response.data.map((item) => {
        //   let bodyContent2 = JSON.stringify({
        //     "Ingredients":item.ingredient,
        //     "quantity":item.quantity,
        //     "unit":item.unit, 
        //   });
        //   return AddtoInventory(bodyContent2);
        // });
        
        // const results = await Promise.all(promises);
        // console.log(results);

        if(response){
          setIsLoading(false)
        }
    
        if (response.status === 401) {
          alert("Date Not Present ");
          return;
        }
    
        setShowTable(true);
        setData(response);
      };

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
              onSubmit={handleViewPurchaseOrder}
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

              <div class="button-container">
                <input
                  
                  id="addmoreingredients"
                  type="submit"
                  name="submit"
                  value="View Purchase"               / >
                 
               
              </div>
            </form>
          </div>
{isLoading?(<>Loading...</>):(<></>)}
<br />
          {showTable && (
          <div className="table-container"  id='yourpurchaseorder'>
            <h2>Purchase Order</h2>
            <br />
            
            <table className="recipe_table">
  <thead>
    <tr>
      {/* <th>Date</th> */}
      <th>Ingredients</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody id="purchaseorder_table">
  {Array.isArray(data.newActualPurchaseOrder) && data.newActualPurchaseOrder.sort((a, b) => a.ingredient.localeCompare(b.ingredient)).map((item, index) => (
    <tr key={index}>
      <td>{item.ingredient}</td>
      <td>{item.quantity}</td>
      <td>{item.unit}</td>

    </tr>
  ))}
</tbody>


</table>


          </div>
        )}

    </>
  )
}

export default PurchaseOrderForm