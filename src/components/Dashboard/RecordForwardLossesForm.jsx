import React , {useState} from 'react'

const RecordForwardLossesForm = () => {
    
  const [RecordForwardLossesdate, setRecordForwardLossesDate] = useState("");
  const [RecordForwardLossesitemName, setRecordForwardLossesItemName] =
    useState("");
  const [
    RecordForwardLossesspecification,
    setRecordForwardLossesSpecification,
  ] = useState("");
  const [RecordForwardLossesquantity, setRecordForwardLossesQuantity] =
    useState("");
  const [RecordForwardLossesunits, setRecordForwardLossesUnits] = useState("");
  const [
    RecordForwardLossesestimatedValue,
    setRecordForwardLossesEstimatedValue,
  ] = useState("");
  const [showRecordForwardLossestable, setshowRecordForwardLossestable] =
    useState(false);



    const handleRecordForwardLossesDateChange = (event) => {
        setRecordForwardLossesDate(event.target.value);
      };
      const handleRecordForwardLossesItemNameChange = (event) => {
        setRecordForwardLossesItemName(event.target.value);
      };
    
      const handleRecordForwardLossesSpecificationChange = (event) => {
        setRecordForwardLossesSpecification(event.target.value);
      };
    
      const handleRecordForwardLossesQuantityChange = (event) => {
        setRecordForwardLossesQuantity(event.target.value);
      };
    
      const handleRecordForwardLossesUnitsChange = (event) => {
        setRecordForwardLossesUnits(event.target.value);
      };
    
      const handleRecordForwardLossesEstimatedValueChange = (event) => {
        setRecordForwardLossesEstimatedValue(event.target.value);
      };
    
      const handleRecordForwardLossesSubmit = (event) => {
        event.preventDefault();
        setshowRecordForwardLossestable(true);
        // do something with the form data
      };

  return (
    <>
<div className="formcontains">
            <h1>Record Forward and Losses </h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label>Date:</label>
                <input
                  type="date"
                  value={RecordForwardLossesdate}
                  onChange={handleRecordForwardLossesDateChange}
                />
              </div>
              <div className="option_container">
                <label>Item Name:</label>
                <select
                  value={RecordForwardLossesitemName}
                  onChange={handleRecordForwardLossesItemNameChange}
                >
                  <option value="">Select an item</option>
                  <option value="Brown Rice Idli">Brown Rice Idli</option>
                  <option value="Jau Pulao">Jau Pulao</option>
                  <option value="Minty Appe">Minty Appe</option>
                  <option value="Palak Meethi Cutlets">
                    Palak Meethi Cutlets
                  </option>
                  <option value="Ragi Chila">Ragi Chila</option>
                  <option value="Ragi Dosa">Ragi Dosa</option>
                  <option value="Ramas Dal Moth">Ramas Dal Moth</option>
                  <option value="Roti Tacos">Roti Tacos</option>
                  <option value="Tofu Parantha">Tofu Parantha</option>
                </select>
              </div>

              <div className="option_container">
                <label>Units:</label>
                <input
                  type="text"
                  value={RecordForwardLossesunits}
                  onChange={handleRecordForwardLossesUnitsChange}
                />
              </div>
              <div className="option_container">
                <label>Estimated Value:</label>
                <input
                  type="number"
                  value={RecordForwardLossesestimatedValue}
                  onChange={handleRecordForwardLossesEstimatedValueChange}
                />
              </div>
              <div className="option_container">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={RecordForwardLossesquantity}
                  onChange={handleRecordForwardLossesQuantityChange}
                />
              </div>
              <div className="option_container">
                <label>Specification:</label>
                <input
                  type="text"
                  value={RecordForwardLossesspecification}
                  onChange={handleRecordForwardLossesSpecificationChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handleRecordForwardLossesSubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  Submit
                </div>
              </div>
            </form>
          </div>


          {showRecordForwardLossestable && (
          <div className="table-container">
            <h2>Record Forward Losses</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item Name</th>
                  <th>Specifications</th>
                  <th>Quantity</th>
                  <th>Unit </th>
                  <th>Estimated Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{RecordForwardLossesdate}</td>
                  <td>{RecordForwardLossesitemName}</td>
                  <td>{RecordForwardLossesspecification}</td>
                  <td>{RecordForwardLossesquantity}</td>
                  <td>{RecordForwardLossesunits}</td>
                  <td>{RecordForwardLossesestimatedValue}</td>
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setshowRecordForwardLossestable(false)}
              >
                cancel
              </div>
              <div id="recipebutton_save">Save</div>
            </div>
          </div>
        )}
    </>
  )
}

export default RecordForwardLossesForm