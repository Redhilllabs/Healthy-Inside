import React, { useState } from 'react';
import SalesPlanForm from './SalesPlanForm';
import ViewSalesPlanform from './ViewSalesPlanform';

const SalesPlan = () => {
    const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);

  const handleClick1 = () => {
    setShowComponent1(!showComponent1);
    setShowComponent2(false)
  };

  const handleClick2 = () => {
    setShowComponent1(false)
    setShowComponent2(!showComponent2);
  };
  return (
    <>
<div className="recipeform_buttons_options">
      <button id={showComponent1 ? "active" : ""} onClick={handleClick1}>
         Plan New Sales
      </button>
      
      <button id={showComponent2 ? "active" : ""} onClick={handleClick2}>
        Sales Plan History 
      </button>
    </div>
    <div>
    {showComponent1 && <SalesPlanForm  />}
    {showComponent2 && <ViewSalesPlanform />}
    </div>

    </>
  )
}

export default SalesPlan