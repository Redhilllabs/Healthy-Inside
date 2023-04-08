import React, { useState } from "react";
import BatchingForm from "./BatchingForm";
import SeedKitchenForm from "./SeedKitchenForm";
import MasterForm from "./MasterForm";

const ImportandExportLogForm = () => {
  const [kitchenOption, setKitchenOption] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handelDateChange = (e)=>{
    setSelectedDate(e.target.value)
    setShowTable(false);
  }
  const handleOptionClick = (option) => {
    if (selectedDate) {
      setSelectedDate("");
    }
    setKitchenOption(option);
    setShowTable(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
      setShowTable(true);
  };

  return (
    <>
      <div className="formcontains">
        <div className="recipeform_buttons_options">
          <button
            id={kitchenOption === "batching" ? "active" : ""}
            onClick={() => handleOptionClick("batching")}
          >
            Batching
          </button>
          <button
            id={kitchenOption === "seed" ? "active" : ""}
            onClick={() => handleOptionClick("seed")}
          >
            Seed Kitchen
          </button>
          <button 
          id={kitchenOption === "master" ? "active" : ""}
          onClick={() => handleOptionClick("master")}>
            Master Kitchen
          </button>

          <button onClick={() => handleOptionClick("op")}>Op Kitchen</button>
        </div>
        <br />
        {kitchenOption && (
          <form
            className="form"
            id="recipe-designing"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label htmlFor="Receipe Name">Date:</label>
              <input
                type="date"
                name="reciepeNameRD"
                id="reciepeNameRD"
                value={selectedDate}
                onChange={handelDateChange}
                required
              />
            </div>

            <input id="addmoreingredients" type="submit" value={"Select"} />
          </form>
        )}

        {kitchenOption === "seed" && showTable && (
          <SeedKitchenForm
            date={selectedDate}
            setShowTable={setShowTable}
            setSelectedDate={setSelectedDate}
          />
        )}
        {kitchenOption === "batching" && showTable && (
          <BatchingForm
            date={selectedDate}
            setShowTable={setShowTable}
            setSelectedDate={setSelectedDate}
          />
        )}
        {kitchenOption === "master" && showTable && (
          <MasterForm
            date={selectedDate}
            setShowTable={setShowTable}
            setSelectedDate={setSelectedDate}
          />
        )}

      </div>
    </>
  );
};

export default ImportandExportLogForm;
