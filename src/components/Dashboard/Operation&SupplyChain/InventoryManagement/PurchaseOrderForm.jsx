import React, { useState, useEffect, useRef } from "react";
import {
  searchPurchaseOrder,
  AddtoInventory,
  SearchIntermediatePurchaseOrder2,
} from "../../../../utils/ApiCall";
import load2 from "../../../../images/load2.gif";
import Message from "../../../../utils/Message";
import ReactToPrint from "react-to-print";

const PurchaseOrderForm = () => {
  const [startDate, setStartDate] = useState("");
  const [data, setData] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [CountExistingProfile, setCountExistingProfile] = useState(false);
  const [DropExistingProfile, setDropExistingProfile] = useState(false);
  const tableRef = useRef();
  const [response, setResponse] = useState(null);

  const handleViewPurchaseOrder = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    let bodyContent = JSON.stringify({
      startDate: startDate,
    });

    if (CountExistingProfile && !DropExistingProfile) {
      setDropExistingProfile(false);
      setShowTable2(false);
      const response = await searchPurchaseOrder(bodyContent);

      if (response.status === 401) {
        setResponse({ message: "Date not present", status: "error" });
        setIsLoading(false);
        return;
      }
      setResponse({
        message: "Data loaded successfully",
        status: "success",
      });

      setShowTable(true);
      setData(response);
      setStartDate("");

    } else if (DropExistingProfile && !CountExistingProfile) {
      setCountExistingProfile(false);
      setShowTable(false);
      const response = await SearchIntermediatePurchaseOrder2(bodyContent);
      // console.log("SearchIntermediatePurchaseOrder2", response.data.ingredients);

      if (response.status === 401) {
        setResponse({ message: "Date not present", status: "error" });
        setIsLoading(false);
        return;
      }

      setShowTable2(true);
      setData(response.data.ingredients);
      setStartDate("");
      setResponse({
        message: "Data loaded successfully",
        status: "success",
      });
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
              onChange={(e) => setStartDate(e.target.value)}
              required
            />

            <input
              id="addmoreingredients"
              type="submit"
              name="submit"
              value="View Purchase Order"
            />
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
    <Message response={response} />

      <div className="formcontains">
        <div className="recipeform_buttons_options">
          <button
            id={CountExistingProfile ? "active" : ""}
            onClick={() => {
              setCountExistingProfile(!CountExistingProfile);
              setDropExistingProfile(false);
              setShowTable2(false);
            }}
          >
            Count Existing inventory
          </button>

          <button
            id={DropExistingProfile ? "active" : ""}
            onClick={() => {
              setDropExistingProfile(!DropExistingProfile);
              setCountExistingProfile(false);
              setShowTable(false);
            }}
          >
            Drop Existing inventory
          </button>
        </div>
        {form}
      </div>

      {isLoading ? <><img src={load2} alt="" srcset="" /></> : <></>}
      <br />

      {showTable && (
        <div className="table-container" id="yourpurchaseorder">
          <table className="recipe_table" id="tableee" ref={tableRef}>
            <thead>
              <tr>
                <th>Ingredients</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody id="purchaseorder_table">
              {Array.isArray(data.data) &&
                data.data
                  .sort((a, b) => a.ingredient.localeCompare(b.ingredient))
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.ingredient}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <br />
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => tableRef.current}
          />
        </div>
      )}

      {showTable2 && (
        <div className="table-container" id="yourpurchaseorder">
          <table className="recipe_table">
            <thead>
              <tr>
                <th>Ingredients</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody id="purchaseorder_table">
              {Array.isArray(data) &&
                data
                  .sort((a, b) => a.ingredient.localeCompare(b.ingredient))
                  .map((item, index) => (
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
      
    </>
  );
};

export default PurchaseOrderForm;
