import React, {useState} from 'react'

const Dailysalesmatricsform = () => {

    const [dailysalesmatricsdate, setdailysalesmatricsdate] = useState("");
    const [showdailysalesmatricstable, setshowdailysalesmatricstable] =
      useState(false);
      const handledailysalesmatricsDateChange = (event) => {
        setdailysalesmatricsdate(event.target.value);
      };
    
      const handledailysalesmatricssubmit = () => {
        setshowdailysalesmatricstable(true);
      };

  return (
    <>

<div className="formcontains">
            <h1>Daily Sales Metrics</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={dailysalesmatricsdate}
                  onChange={handledailysalesmatricsDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handledailysalesmatricssubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Sales Metrics
                </div>
              </div>
            </form>
          </div>
          {showdailysalesmatricstable && (
          <div className="table-container">
            <h2>Daily Sales</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dailysalesmatricsdate}</td>
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setshowdailysalesmatricstable(false)}
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

export default Dailysalesmatricsform