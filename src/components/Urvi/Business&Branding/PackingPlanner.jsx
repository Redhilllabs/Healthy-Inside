import React, { useState } from 'react'

const PackingPlanner = () => {
  const [showForm, setShowForm] = useState(false)

  const handleDesignLabels = () => {
    setShowForm(!showForm)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // handle form submission logic here
  }

  return (
    <>
     <div className="formcontains">
      <div className="recipeform_buttons_options">
      <button  id={showForm === true ? "active" : ""} onClick={handleDesignLabels}>Design Labels</button>
    
      </div>
        {showForm && (
          <form 
  onSubmit={handleFormSubmit}
  style={{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px'
  }}
>
  <h2>Select label options:</h2>
  <div>
    <label>
      <input type="checkbox" name="healthBenefit" /> Health Benefit
    </label>
  </div>
  <div>
    <label>
      <input type="checkbox" name="nutritionProfile" /> Nutrition Profile
    </label>
  </div>
  <div>
    <label>
      <input type="checkbox" name="richIn" /> Rich In
    </label>
  </div>
  <div>
    <label>
      <input type="checkbox" name="labels" /> Labels
    </label>
  </div>
  <input id="addmoreingredients" type="submit" value="Submit" />
</form>

      )}
      </div>
      
      

      
    </>
  )
}

export default PackingPlanner
