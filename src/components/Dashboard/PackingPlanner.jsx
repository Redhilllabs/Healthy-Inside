import React from 'react'

const PackingPlanner = () => {
  return (
    <>
<div className="formcontains">
            <h1>Packing Planner</h1>
            <form class="form" id="recipe-designing">
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

              <div id="addmoreingredients">Add To Package</div>
            </form>
          </div>
          
    </>
  )
}

export default PackingPlanner