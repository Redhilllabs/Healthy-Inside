import React,{useState} from 'react'

const ViewSalesPlanform = () => {
    const [ViewSalesPlanstartDate, setViewSalesPlanStartDate] = useState("");
    const [ViewSalesPlanendDate, setViewSalesPlanEndDate] = useState("");
    const handleViewSalesPlanStartDateChange = (event) => {
        setViewSalesPlanStartDate(event.target.value);
      };
    
      const handleViewSalesPlanEndDateChange = (event) => {
        setViewSalesPlanEndDate(event.target.value);
      };
    
      const handleViewSalesPlansubmit = () => {};    
  return (
    <>

<div className="formcontains">
            <h1>View Sales Plan</h1>
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
                  value={ViewSalesPlanstartDate}
                  onChange={handleViewSalesPlanStartDateChange}
                />
              </div>

              <div className="option_container">
                <label htmlFor="end-date-input">End Date:</label>
                <input
                  type="date"
                  id="end-date-input"
                  value={ViewSalesPlanendDate}
                  onChange={handleViewSalesPlanEndDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handleViewSalesPlansubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Sales plan
                </div>
              </div>
            </form>
          </div>

    </>
  )
}

export default ViewSalesPlanform