import React, { useState } from 'react'

const ImportandExportLogForm = () => {
  const [kitchenOption, setKitchenOption] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleOptionClick = (option) => {
    setKitchenOption(option);
    setShowTable(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);
  };
    const [seedkitchendate,setseedkitchendate] = useState('')

    const handleseedkitchendateChange = (e)=>{
        setseedkitchendate(e.target.value)
}




  return (
    <>

<div className="formcontains">
            <div className="recipeform_buttons_options">
            <button onClick={() => handleOptionClick("seed")}>Seed Kitchen</button>
        <button onClick={() => handleOptionClick("master")}>Master Kitchen</button>
        <button onClick={() => handleOptionClick("op")}>Op Kitchen</button>
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
            <h2>{kitchenOption}Kitchen </h2>
            <br />
            <table className="recipe_table">
  <thead>
   
    <tr>
      <th>Import</th>
      <th>Export</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Value 1</td>
      <td>Value 2</td>
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

export default ImportandExportLogForm