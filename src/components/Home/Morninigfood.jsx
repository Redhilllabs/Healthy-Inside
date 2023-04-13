import React, { useState } from 'react';
import "./MorningFood.css";

const MorningFood = () => {
  const [showSingleDropdown, setShowSingleDropdown] = useState(false);
  const [showCoupleDropdown, setShowCoupleDropdown] = useState(false);
  const [showFamilyDropdown, setShowFamilyDropdown] = useState(false);
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  const [singleDays, setSingleDays] = useState(3);
  const [coupleDays, setCoupleDays] = useState(3);
  const [familyDays, setFamilyDays] = useState(3);
  const [childrenDays, setChildrenDays] = useState(3);

  const handleSingleBentoBoxClick = () => {
    setShowSingleDropdown(!showSingleDropdown);
  };

  const handleCoupleBentoBoxClick = () => {
    setShowCoupleDropdown(!showCoupleDropdown);
  };

  const handleFamilyBentoBoxClick = () => {
    setShowFamilyDropdown(!showFamilyDropdown);
  };

  const handleChildrenBentoBoxClick = () => {
    setShowChildrenDropdown(!showChildrenDropdown);
  };

  const handleSingleDropdownChange = (e) => {
    setSingleDays(e.target.value);
  };

  const handleCoupleDropdownChange = (e) => {
    setCoupleDays(e.target.value);
  };

  const handleFamilyDropdownChange = (e) => {
    setFamilyDays(e.target.value);
  };

  const handleChildrenDropdownChange = (e) => {
    setChildrenDays(e.target.value);
  };

  return (
    <div className='MorningFood'>

    <div className="bento-box">
    <div className="bento-box-single" onClick={handleSingleBentoBoxClick}>Single Bento Box</div>
    {showSingleDropdown && (
        <div className="dropdown">
          <label htmlFor="singleDays">Number of Days:</label>
          <select id="singleDays" value={singleDays} onChange={handleSingleDropdownChange}>
            <option value="3">3</option>
            <option value="7">7</option>
            <option value="14">14</option>
            <option value="28">28</option>
          </select>
        </div>
      )}
    </div>
   
   
    <div className="bento-box">
      <div className="bento-box-couple" onClick={handleCoupleBentoBoxClick}>Bento Box for Couple</div>
      {showCoupleDropdown && (
        <div className="dropdown">
          <label htmlFor="coupleDays">Number of Days:</label>
          <select id="coupleDays" value={coupleDays} onChange={handleCoupleDropdownChange}>
            <option value="3">3</option>
            <option value="7">7</option>
            <option value="14">14</option>
            <option value="28">28</option>
          </select>
        </div>
      )}
</div>

<div className="bento-box">
     <div className="bento-box-family" onClick={handleFamilyBentoBoxClick}>Bento Box for Family</div>
      {showFamilyDropdown && (
        <div className="dropdown">
          <label htmlFor="familyDays">Number of Days:</label>
          <select id="familyDays" value={familyDays} onChange={handleFamilyDropdownChange}>
            <option value="3">3</option>
            <option value="7">7</option>
            <option value="14">14</option>
            <option value="28">28</option>
          </select>
        </div>
      )}
</div>

<div className="bento-box">
     <div className="bento-box-children" onClick={handleChildrenBentoBoxClick}>Bento Box for Children</div>
      {showChildrenDropdown && (
        <div className="dropdown">
          <label htmlFor="childrenDays">Number of Days:</label>
          <select id="childrenDays" value={childrenDays} onChange={handleChildrenDropdownChange}>
            <option value="3">3</option>
            <option value="7">7</option>
            <option value="14">14</option>
            <option value="28">28</option>
          </select>
        </div>
      )}
      </div>
  </div>
  );
};

export default MorningFood;
