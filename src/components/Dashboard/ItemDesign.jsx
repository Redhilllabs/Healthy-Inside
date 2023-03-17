import React, { useState,useEffect }  from 'react';
import {getallIngredientProfile , getallrecipeProfile} from '../../utils/mongodbFunctions';

const ItemDesignForm = () => {
    const [ingredientProfile, setIngredientProfile] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [_recipe_ingredient_name, set_recipe_ingredient_name] = useState("");
    const [recipequantity, setrecipequantity] = useState("1");
    const [recipeunit, setrecipeunit] = useState("1");
    const [showTable, setShowTable] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [MaterialListTable, setMaterialListTable] = useState(false)

    
    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
        setShowTable(true);
      };
       function handleIngredientChange(e) {
    set_recipe_ingredient_name(e.target.value);
  } 

  const handleRecipequantityChange = (e) => {
    setrecipequantity(e.target.value);
  };
 
  const calculateTotalVal = (nutrient) => {
    let totalNutrient = 0;
    itemProfile.forEach((item) => {
      const ingredient = ingredientsList.find((ingredient) => ingredient.ingredient_name === item.RecipeName);
      if (ingredient) {
        for (let key in item.Ingredients) {
          if (key === nutrient) {
            totalNutrient += (item.Ingredients[key] )
          }
        }
      }
    });
    return totalNutrient;
  };
  
  
  const handleRecipeunitChange = (e) => {
    setrecipeunit(e.target.value);
  };

    const handeladdmore = (event) => {
    const newIngredient = {
      ingredient_name: _recipe_ingredient_name,
      quantity: recipequantity,
      unit: recipeunit,
    };
    setIngredientsList((prevList) => [...prevList, newIngredient]);
    set_recipe_ingredient_name("");
    // setrecipequantity("1");
    setrecipeunit("1");
    setMaterialListTable(true)
    };

    const [itemProfile ,setitemProfileData] = useState({});
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await getallIngredientProfile();
        const res2 = await getallrecipeProfile();

        setData(response.data);
        setitemProfileData(res2.data)

      };
      fetchData();
    }, []);


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
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                    required
                  />
                </div>
                <div id="addmore">
                  <div className="addmoreitems">
                    <div>
                      <label htmlFor="Ingredient Name">Select Constituent Recipes </label>
                      <select name="" id="" value={_recipe_ingredient_name} onChange={handleIngredientChange}>
                      <option value="">Select Option</option>
                      {data.map((item, index) => (
                        <option value={item.RecipeName}>{item.RecipeName}</option>
                        ))}
                      </select>
                    </div>
                    <div id="recipequantity">
                      <label htmlFor="Unit">Unit </label>
                      <input
                        name="unitRD"
                        type="number"
                        id="unitRD"
                        value={recipeunit}
                        onChange={handleRecipeunitChange}
                      >
                        
                      </input>
                    </div>

                  </div>
                </div>

                <div id="addmoreingredients" onClick={handeladdmore}>
                  Add
                </div>
              </form>
          </div>

{showTable && (
          <div className="table-container">
            <h2>Your Item Design</h2>
            <br />
            <table className="recipe_table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Ingredients</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{recipeName}</td>
                  <td>
                    <table>
                      <tbody>
                        {ingredientsList.map((service, index) => (
                          <tr key={index}>
                            <td>{service.ingredient_name}</td>
                            {/* <td>{service.quantity}</td> */}
                            <td>{service.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  {/* <td>{procedure}</td> */}
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div id="recipebutton_close" onClick={() => setShowTable(false)}>
                cancel
              </div>
              <div id="recipebutton_save">Submit</div>
            </div>
          </div>
        )}


        {MaterialListTable && (

<div className="table-container" id="showtablermi" >
<h2>Item Profile</h2>
<br />
<table className="recipe_table" >
  <thead>
    <tr>
      {/* <th>Ingredient</th> */}
      <th>Energy (kcal/100g)</th>
<th>Proteins (g/100g)</th>
<th>Carbohydrates (g/100g)</th>
<th>Fats (g/100g)</th>
<th>Dietary Fibre (g/100g)</th>
<th>Calcium (mg/100g)</th>
<th>Vitamin B9 (mcg/100g)</th>
<th>Potassium (mg/100g)</th>
<th>Vitamin B5 (mg/100g)</th>
<th>Vitamin B6 (mg/100g)</th>
<th>Sodium (mg/100g)</th>
<th>Vitamin B1 (mg/100g)</th>
<th>Vitamin B2 (mg/100g)</th>
<th>Vitamin B3 (mg/100g)</th>
<th>Manganese (mg/100g)</th>
<th>Iron (mg/100g)</th>
<th>Vitamin E (mg/100g)</th>
<th>Phosphorous (mg/100g)</th>
<th>Vitamin A (mcg/100g)</th>
<th>Vitamin C (mg/100g)</th>
<th>Vitamin K (mcg/100g)</th>
<th>Copper (mg/100g)</th>
<th>Magnesium (mg/100g)</th>
<th>Zinc (mg/100g)</th>
    </tr>
  </thead>
  <tbody>
<tr >
<td>{calculateTotalVal('Energy')}</td>
<td>{calculateTotalVal('Proteins')}</td>
<td>{calculateTotalVal('Carbohydrates')}</td>
<td>{calculateTotalVal('Fats')}</td>
<td>{calculateTotalVal('DietaryFibre')}</td>
<td>{calculateTotalVal('Calcium')}</td>
<td>{calculateTotalVal('VitaminB9')}</td>
<td>{calculateTotalVal('Potassium')}</td>
<td>{calculateTotalVal('VitaminB5')}</td>
<td>{calculateTotalVal('VitaminB6')}</td>
<td>{calculateTotalVal('Sodium')}</td>
<td>{calculateTotalVal('VitaminB1')}</td>
<td>{calculateTotalVal('VitaminB2')}</td>
<td>{calculateTotalVal('VitaminB3')}</td>
<td>{calculateTotalVal('Manganese')}</td>
<td>{calculateTotalVal('Iron')}</td>
<td>{calculateTotalVal('VitaminE')}</td>
<td>{calculateTotalVal('Phosphorous')}</td>
<td>{calculateTotalVal('VitaminA')}</td>
<td>{calculateTotalVal('VitaminC')}</td>
<td>{calculateTotalVal('VitaminK')}</td>
<td>{calculateTotalVal('Copper')}</td>
<td>{calculateTotalVal('Magnesium')}</td>
<td>{calculateTotalVal('Zinc')}</td>

</tr>
</tbody>

</table>
<div id="tabel_controllers">
  <div id="recipebutton_close" onClick={() => setMaterialListTable(false)}>
    cancel
  </div>
  {/* <div id="recipebutton_save"  onClick={handelIngredientProfileSubmit} >Submit</div> */}
</div>
</div>
)}

    </>
  )
}

export default ItemDesignForm