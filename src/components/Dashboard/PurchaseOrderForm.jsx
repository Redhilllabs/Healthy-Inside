import React, { useState,useEffect } from 'react'
import {searchPurchaseOrder ,AddtoInventory,SearchIntermediatePurchaseOrder2} from '../../utils/ApiCall'
import * as XLSX from 'xlsx';

const PurchaseOrderForm = () => {
  const [startDate, setStartDate] = useState("");
  const [data, setData] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [CountExistingProfile,setCountExistingProfile] = useState(false);
  const [DropExistingProfile,setDropExistingProfile] = useState(false);

      const handleViewPurchaseOrder = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let bodyContent = JSON.stringify({
          "startDate": startDate,
        });
      
        if (CountExistingProfile && !DropExistingProfile) {
          setDropExistingProfile(false);
          setShowTable2(false)
          const response = await searchPurchaseOrder(bodyContent);
      
          if (response.status === 401) {
            alert("Date not present.");
            setIsLoading(false);
            return;
          }
      
          setShowTable(true);
          setData(response);
          setStartDate('');
          console.log("Count Existing inventory submitted!");
        } else if (DropExistingProfile && !CountExistingProfile) {
          setCountExistingProfile(false);
          setShowTable(false);
          const response = await SearchIntermediatePurchaseOrder2(bodyContent);
          // console.log("SearchIntermediatePurchaseOrder2", response.data.ingredients);
      
          if (response.status === 401) {
            alert("Date not present.");
            setIsLoading(false);
            return;
          }
      
          setShowTable2(true);
          setData(response.data.ingredients);
          setStartDate('');
          console.log("Drop Existing inventory submitted!");
        }
      
        setIsLoading(false);
      };
    
      let form = null;

      // Conditionally render the form based on which button was clicked
      if (CountExistingProfile || DropExistingProfile) {
        form = (
          <div>

            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
              onSubmit={handleViewPurchaseOrder}
            >

              <div class="button-container">

              <label htmlFor="start-date-input">Select Date:</label>

                <input               
                  type="date"
                  id="start-date-input"
                  value={startDate}
                  onChange={(e)=>setStartDate(e.target.value)}
                  required
                />

                <input
                  id="addmoreingredients"
                  type="submit"
                  name="submit"
                  value="View Purchase Order"   

                          / >

                 </div>
            </form>
          </div>
        );
      }

      function printAndExportTable() {
  // Get the table element
  const table = document.getElementById('yourpurchaseorder');

  // Convert the table to a worksheet
  const worksheet = XLSX.utils.table_to_sheet(table);

  // Create a new workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchase Order');

  // Export the workbook to a file
  XLSX.writeFile(workbook, 'purchase_order.xlsx');

  // Print the table
  const newWin = window.open('');
  newWin.document.write(table.outerHTML);
  newWin.print();
  newWin.close();
}

  return (
    <>

<div className="formcontains">

<div className="recipeform_buttons_options">

  <button id={CountExistingProfile ? "active" : ""} onClick={() => {
      setCountExistingProfile(!CountExistingProfile)
      setDropExistingProfile(false)
      setShowTable2(false);
    }}>
    Count Existing inventory
  </button>

  <button id={DropExistingProfile ? "active" : ""} onClick={() => {
      setDropExistingProfile(!DropExistingProfile)
      setCountExistingProfile(false)
      setShowTable(false);
    }}>
    Drop Existing inventory
  </button>
</div>
            {form}
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
      <th>Ingredients</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody id="purchaseorder_table">
  {Array.isArray(data.data) && data.data.sort((a, b) => a.ingredient.localeCompare(b.ingredient)).map((item, index) => (
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

        {showTable2 && (
          <div className="table-container"  id='yourpurchaseorder'>
            <h2>Purchase Order</h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Ingredients</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody id="purchaseorder_table">
    {Array.isArray(data) && data.sort((a, b) => a.ingredient.localeCompare(b.ingredient)).map((item, index) => (
      <tr key={index}>
        <td>{item.ingredient}</td>
        <td>{item.quantity}</td>
        <td>gram</td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}

        {showTable||showTable2?<button onClick={printAndExportTable}>Print and Export to Excel</button>
: <></> }
        

    </>
  )
}

export default PurchaseOrderForm