import { useState,useEffect } from 'react'
import {getmateriallist} from '../../utils/mongodbFunctions';

const RMIProfileingForm = () => {
  const [kitchenOption, setKitchenOption] = useState("");

  const handleOptionClick = (option) => {
    setKitchenOption(option);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getmateriallist();
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <>

<div className="formcontains">

<div className="recipeform_buttons_options">
<button
        id={kitchenOption === "MaterialList" ? "active" : ""}
        onClick={() => handleOptionClick("MaterialList")}
      >
        Raw Material Master List
      </button>
      <button
        id={kitchenOption === "AddToList" ? "active" : ""}
        onClick={() => handleOptionClick("AddToList")}
      >
        Add New Ingredient
      </button>
      </div>
      {kitchenOption === "MaterialList" && (
        <div className="table-container" id='materiallisttable'>
            <h2>Malterial List</h2>
            <br />
            <table className="recipe_table" id='materiallisttable_main'>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Energy</th>
          <th>Proteins</th>
          <th>Carbohydrates</th>
          <th>Fats</th>
          <th>Dietary Fibre</th>
          <th>Calcium</th>
          <th>Vitamin B9</th>
          <th>Potassium</th>
          <th>Vitamin B5</th>
          <th>Vitamin B6</th>
          <th>Sodium</th>
          <th>Vitamin B1</th>
          <th>Vitamin B2</th>
          <th>Vitamin B3</th>
          <th>Manganese</th>
          <th>Iron</th>
          <th>Vitamin E</th>
          <th>Phosphorous</th>
          <th>Vitamin A</th>
          <th>Vitamin C</th>
          <th>Vitamin K</th>
          <th>Copper</th>
          <th>Magnesium</th>
          <th>Zinc</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Ingredients}</td>
            <td>{item.Energy}</td>
            <td>{item.Proteins}</td>
            <td>{item.Carbohydrates}</td>
            <td>{item.Fats}</td>
            <td>{item.DietaryFibre}</td>
            <td>{item.Calcium}</td>
            <td>{item.VitaminB9}</td>
            <td>{item.Potassium}</td>
            <td>{item.VitaminB5}</td>
            <td>{item.VitaminB6}</td>
            <td>{item.Sodium}</td>
            <td>{item.VitaminB1}</td>
            <td>{item.VitaminB2}</td>
            <td>{item.VitaminB3}</td>
            <td>{item.Manganese}</td>
            <td>{item.Iron}</td>
            <td>{item.VitaminE}</td>
            <td>{item.Phosphorous}</td>
            <td>{item.VitaminA}</td>
            <td>{item.VitaminC}</td>
            <td>{item.VitaminK}</td>
            <td>{item.Copper}</td>
            <td>{item.Magnesium}</td>
            <td>{item.Zinc}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div> )} 
      
       {kitchenOption === "AddToList" && (
        <form class="form" id="recipe-designing">
              <div>
                <label for="Receipe Name">Item Name</label>
                <input
                  type="text"
                  name="reciepeNameRD"
                  id="reciepeNameRD"
                  // value={ItemName}
                  // onChange={handleItemNameChange}
                  required
                />
              </div>

              <div id="addmoreingredients"
              //  onClick={handeladdmore}
               >
                Plan
              </div>
            </form>
      )}

            

            
        </div>


    </>
  )
}

export default RMIProfileingForm