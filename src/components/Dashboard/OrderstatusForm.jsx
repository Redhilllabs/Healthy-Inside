import React, { useState } from 'react'

const OrderstatusForm = () => {

    const [ingredientProfile, setIngredientProfile] = useState(false);
    const [seedkitchendate,setseedkitchendate] = useState('')

    const handleseedkitchendateChange = (e)=>{
        setseedkitchendate(e.target.value)
}
const [table,settable] = useState(false);
const handelseedKitchenselect = ()=>{
settable(true)
}

  return (
    <>
<div className="formcontains">

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

                <div id="addmoreingredients" onClick={handelseedKitchenselect}>
                  select
                </div>
              </form>
          </div>

{table && (
  <div className="table-container">
            <h2>Order Status </h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th >Order No.</th>
      <th >Order Summary</th>
      <th >Order Status</th>
    </tr>
  </thead>
  <tr>
      <td>Value 1</td>
      <td>Value 2</td>
      <td>Value 3</td>
      
    </tr>
  
</table>


            <div id="tabel_controllers">
              <div id="recipebutton_close" onClick={() => settable(false)}>
                cancel
              </div>
              <div id="recipebutton_save" onClick={() => alert("button not working")}>Submit</div>
            </div>
          </div>
)}

    </>
  )
}

export default OrderstatusForm