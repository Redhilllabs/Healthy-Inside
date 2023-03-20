import React, { useState } from "react";

const ViewSalesPlanform = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div className="formcontains">
      <h1>View Sales Plan</h1>
      <form
        action=""
        className="form"
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

        <div className="button-container">
          <div onClick={handleSubmit} id="recipebutton" type="submit" name="submit">
            View Sales plan
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewSalesPlanform;