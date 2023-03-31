import React,{useState} from 'react'

const ManufacturingLogEntryForm = () => {



const [ManufacturingHistoryProfile,setManufacturingHistoryProfile] = useState(false)
const [ActualManufacturingProfile,setActualManufacturingProfile] = useState(false)
const [isLoading, setIsLoading] = useState(false);
const [showTable, setShowTable] = useState(false);
const [data, setData] = useState("");

  return (
    <>

<div className="formcontains">
<div className="recipeform_buttons_options">
  <button id={ManufacturingHistoryProfile ? "active" : ""} onClick={() => {
      setManufacturingHistoryProfile(!ManufacturingHistoryProfile)
      setActualManufacturingProfile(false)
      setShowTable(!showTable);
    }}>
    Manufacturing History
  </button>
  <button id={ActualManufacturingProfile ? "active" : ""} onClick={() => {
      setActualManufacturingProfile(!ActualManufacturingProfile)
      setManufacturingHistoryProfile(false)
      setShowTable(false);
    }}>
   Actual Manufacturing 
  </button>
</div>


            {/* {form} */}

          </div>
{isLoading?(<>Loading...</>):(<></>)}
<br />

{showTable && (
          <div className="table-container"  id='yourpurchaseorder'>
            <h2>Manufacturing History</h2>
            <br />
            
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Item Name</th>
      <th>Planned</th>
      <th>Actual</th>
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


    </>
  )
}

export default ManufacturingLogEntryForm