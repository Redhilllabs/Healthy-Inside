import React from 'react'

const PackingPlanner = () => {
const handelpackageplanner = ()=>{
  
}

  return (
    <>
<div className="formcontains">
            <h1>Packing Planner</h1>
            <form class="form" id="recipe-designing" onSubmit={handelpackageplanner}>
              <div>
                <label for="Receipe Name">Select Item Name</label>
                <input
                  type="text"
                  name="reciepeNameRD"
                  id="reciepeNameRD"
                  required
                />
              </div>
              <div>
                <label for="Receipe Name">Select packageing to be used</label>
                <input
                  type="text"
                  name="reciepeNameRD"
                  id="reciepeNameRD"
                  required
                />
              </div>

              <input type="submit" id="addmoreingredients" value="Add Package"  />
            </form>
          </div>
    </>
  )
}

export default PackingPlanner