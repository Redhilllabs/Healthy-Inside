import React, { useState } from 'react'

const ItemmanufacPlaner = () => {

const [ItemName ,setItemName] = useState('')
const [table,settable] = useState(false);

const handleItemNameChange = (e)=>{
    setItemName(e.target.value)
}
const handeladdmore = () =>{
    settable(true)
}
  return (
    <>
<div className="formcontains">
            <form class="form" id="recipe-designing">
              <div>
                <label for="Receipe Name">Item Name</label>
                <input
                  type="text"
                  name="reciepeNameRD"
                  id="reciepeNameRD"
                  value={ItemName}
                  onChange={handleItemNameChange}
                  required
                />
              </div>

              <div id="addmoreingredients" onClick={handeladdmore}>
                Plan
              </div>
            </form>
        </div>

        {table&&(
            <div className="table-container">
            <h2>Item Manufacturing</h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Constituent Recipes</th>
      <th>Day 0</th>
      <th>Day 1</th>
      <th>Day 2</th>
      <th>Day 3</th>
      <th>Day 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>recipe 1</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <td>recipe 2</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <td>recipe 3</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
  </tbody>
</table>

            <div id="tabel_controllers">
              <div id="recipebutton_close" onClick={() => settable(false)}>
                cancel
              </div>
              <div id="recipebutton_save">Submit</div>
            </div>
          </div>
        )}

    </>
  )
}

export default ItemmanufacPlaner