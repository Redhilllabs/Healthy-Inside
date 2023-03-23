import React, { useState } from 'react'

const PurchaseOrderForm = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [ShowViewPurchaseOrderTable, setShowViewPurchaseOrderTable] =
    useState(false);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
      };
    
      const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      };
      const handleViewPurchaseOrder = () => {
        setShowViewPurchaseOrderTable(true);

        
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

    </>
  )
}

export default PurchaseOrderForm