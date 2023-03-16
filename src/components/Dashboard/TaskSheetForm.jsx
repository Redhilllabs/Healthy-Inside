import React, { useState } from 'react'

const TaskSheetForm = () => {

  const [kitchenOption, setKitchenOption] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleOptionClick = (option) => {
    setKitchenOption(option);
    setShowTable(false);
  };
    const [seedkitchendate,setseedkitchendate] = useState('')

    const handleseedkitchendateChange = (e)=>{
        setseedkitchendate(e.target.value)
}
const handleFormSubmit = (e) => {
  e.preventDefault();
  setShowTable(true);
};


  return (
    <>
<div className="formcontains">
            <div className="recipeform_buttons_options">
            <button  id={kitchenOption==="seed" ? "active" : ""}  onClick={() => handleOptionClick("seed")}>Seed Kitchen</button>
        <button  id={kitchenOption==="master" ? "active" : ""} onClick={() => handleOptionClick("master")}>Master Kitchen</button>
        <button  id={kitchenOption==="op" ? "active" : ""} onClick={() => handleOptionClick("op")}>Op Kitchen</button>
            </div>
            {kitchenOption && !showTable && (
              <form className="form" id="recipe-designing">
                <div>
                  <label for="Receipe Name">date</label>
                  <input
                    type="date"
                    name="reciepeNameRD"
                    id="reciepeNameRD"
                    value={seedkitchendate}
                    onChange={handleseedkitchendateChange}
                    required
                  />
                </div>

                <div id="addmoreingredients" onClick={handleFormSubmit}>
                  select
                </div>
              </form>
            
            )}
          </div>

          {kitchenOption && showTable && (
  <div className="table-container">
            <h2>{kitchenOption} Kitchen </h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th rowspan="2">Time</th>
    </tr>
    <tr>
      <th>Task</th>
      <th>Assigned To</th>
      <th>Utensil used </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12-1</th>
      <td>Value 1</td>
      <td>Value 2</td>
      <td>Value 3</td>

    </tr>
    <tr>
      <th>1-2</th>
      <td>Value 7</td>
      <td>Value 8</td>
      <td>Value 9</td>

    </tr>
    <tr>
      <th>2-3</th>
      <td>Value 13</td>
      <td>Value 14</td>
      <td>Value 15</td>

    </tr>
  </tbody>
</table>


            <div id="tabel_controllers">
              <div id="recipebutton_close" onClick={() => setShowTable(false)}>
                cancel
              </div>
              <div id="recipebutton_save">Submit</div>
            </div>
          </div>
)}

    </>
  )
}

export default TaskSheetForm