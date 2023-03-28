import React, { useState,useEffect }  from 'react'
import {AddToIngredentProfile ,getmateriallist, AddToRecipeProfile} from '../../utils/ApiCall'

const RecipeForm = () => {
    const [ingredientProfile, setIngredientProfile] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [_recipe_ingredient_name, set_recipe_ingredient_name] = useState("");
    const [recipequantity, setrecipequantity] = useState("1");
    const [recipeunit, setrecipeunit] = useState("gram");
    const [showTable, setShowTable] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [MaterialListTable, setMaterialListTable] = useState(false)

    
    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
        setShowTable(true);
        // setIngredientsList([])
      };
       function handleIngredientChange(e) {
    set_recipe_ingredient_name(e.target.value);
  } 

  const handleRecipequantityChange = (e) => {
    setrecipequantity(e.target.value);
  };
 

  const handleRecipeunitChange = (e) => {
    setrecipeunit(e.target.value);
  };

  const calculateTotalVal = (nutrient) => {
    let totalNutrient = 0;
    data.forEach((item, index) => {
      const ingredient = ingredientsList.find(
        (ingredient) => ingredient.ingredientName === item.Ingredients
      );
      if (ingredient) {
        let unitConversion = 1;
        switch (recipeunit) {
          case "millilitre":
            if (ingredient.unit === "cup") {
              unitConversion = 236.588;
            } else if (ingredient.unit === "tablespoon") {
              unitConversion = 14.787;
            } else if (ingredient.unit === "teaspoon") {
              unitConversion = 4.929;
            } else if (ingredient.unit === "millilitre") {
              unitConversion = 1;
            } else {
              unitConversion = 0;
            }
            break;
          case "gram":
            if (ingredient.unit === "cup") {
              unitConversion = 128;
            } else if (ingredient.unit === "tablespoon") {
              unitConversion = 7.9;
            } else if (ingredient.unit === "teaspoon") {
              unitConversion = 2.63;
            } else if (ingredient.unit === "gram") {
              unitConversion = 1;
            } else {
              unitConversion = 0;
            }
            break;
          case "microgram":
            if (ingredient.unit === "microgram") {
              unitConversion = 1;
            } else {
              unitConversion = 0;
            }
            break;
          case "tablespoon":
            if (ingredient.unit === "cup") {
              unitConversion = 16;
            } else if (ingredient.unit === "tablespoon") {
              unitConversion = 1;
            } else if (ingredient.unit === "teaspoon") {
              unitConversion = 1 / 3;
            } else if (ingredient.unit === "millilitre") {
              unitConversion = 1.35;
            } else {
              unitConversion = 0;
            }
            break;
          case "teaspoon":
            if (ingredient.unit === "cup") {
              unitConversion = 48;
            } else if (ingredient.unit === "tablespoon") {
              unitConversion = 3;
            } else if (ingredient.unit === "teaspoon") {
              unitConversion = 1;
            } else if (ingredient.unit === "millilitre") {
              unitConversion = 4.93;
            } else {
              unitConversion = 0;
            }
            break;
          case "cup":
            if (ingredient.unit === "cup") {
              unitConversion = 1;
            } else if (ingredient.unit === "tablespoon") {
              unitConversion = 1 / 16;
            } else if (ingredient.unit === "teaspoon") {
              unitConversion = 1 / 48;
            } else if (ingredient.unit === "millilitre") {
              unitConversion = 1 / 236.588;
            } else {
              unitConversion = 0;
            }
            break;
          default:
            unitConversion = 0;
        }
        totalNutrient += (item[nutrient] * ingredient.quantity * unitConversion * recipequantity) / 100;
      }
    });
    return totalNutrient;
  };
  
    const handeladdmore = (event) => {
      event.preventDefault()
    const newIngredient = {
      ingredientName : _recipe_ingredient_name,
        quantity: recipequantity,
        unit: recipeunit
    };
    setIngredientsList((prevList) => [...prevList, newIngredient]);
    console.log(ingredientsList)
    set_recipe_ingredient_name("");
    setrecipequantity("1");
    setrecipeunit("gram");
    setMaterialListTable(true);
    // calculateTotalVal('Energy')

    };

  const handelIngredientProfileSubmit = async ()=>{
    let bodyContent = JSON.stringify({
      RecipeName : recipeName,
      Ingredients :ingredientsList
    }); 

    let bodyContent2 = JSON.stringify({
      RecipeName : recipeName,
      Ingredients :{
        'Energy': calculateTotalVal('Energy'),
    'Proteins': calculateTotalVal('Proteins'),
    'Carbohydrates': calculateTotalVal('Carbohydrates'),
    'Fats': calculateTotalVal('Fats'),
    'DietaryFibre': calculateTotalVal('DietaryFibre'),
    'Calcium': calculateTotalVal('Calcium'),
    'VitaminB9': calculateTotalVal('VitaminB9'),
    'Potassium': calculateTotalVal('Potassium'),
    'VitaminB5': calculateTotalVal('VitaminB5'),
    'VitaminB6': calculateTotalVal('VitaminB6'),
    'Sodium': calculateTotalVal('Sodium'),
    'VitaminB1': calculateTotalVal('VitaminB1'),
    'VitaminB2': calculateTotalVal('VitaminB2'),
    'VitaminB3': calculateTotalVal('VitaminB3'),
    'Manganese': calculateTotalVal('Manganese'),
    'Iron': calculateTotalVal('Iron'),
    'VitaminE': calculateTotalVal('VitaminE'),
    'Phosphorous': calculateTotalVal('Phosphorous'),
    'VitaminA': calculateTotalVal('VitaminA'),
    'VitaminC': calculateTotalVal('VitaminC'),
    'VitaminK':calculateTotalVal('VitaminK'),
    'Copper':calculateTotalVal('Copper'),
    'Magnesium':calculateTotalVal('Magnesium'),
    'Zinc':calculateTotalVal('Zinc')
      }
      }
    ); 
console.log(ingredientsList)

if (recipeName === "" || ingredientsList.length === 0) {
  alert("Fill All The Fields!");
  return
}
    const response = await AddToIngredentProfile(bodyContent);
    if (response.status === 401) {
      alert("This Ingredient already exists Change Ingredient Name");
      return;
    }else{
      alert("Saved")
      set_recipe_ingredient_name("");
    setrecipequantity("1");
    setrecipeunit("gram");
    setRecipeName("");
    setIngredientsList([]);
    setShowTable(false);
    }
    

    const response2 = await AddToRecipeProfile(bodyContent2)
    if (response2.status === 401) {
      alert("This Recipe Name  already exists in Recipe Profile Table");
      return;
    }
    setMaterialListTable(false)

  }


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
              <button  id={ingredientProfile ? "active" : ""}  onClick={() => setIngredientProfile(!ingredientProfile)}>
                Ingredient Profile
              </button>
              <button>Procedure</button>
              <button>Description</button>
              <button>Mini Blog</button>
              <button>Labels</button>
            </div>
            {ingredientProfile ? (
              <form className="form" id="recipe-designing" onSubmit={handeladdmore} >
                <div>
                  <label for="Receipe Name">Recipe Name</label>
                  <input
                    type="text"
                    name="reciepeNameRD"
                    id="reciepeNameRD"
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                    required
                  />
                </div>
                <div >
                  <div className="addmoreitems">
                    <div>
                      <label htmlFor="Ingredient Name">Ingredient</label>
                      <select
                        id="ingredient_name"
                        name="ingredient_name"
                        required
                        value={_recipe_ingredient_name}
                        onChange={handleIngredientChange}
                      >
                        <option value="">Select Option</option>
                        {data.map((item, index) => (
                        <option value={item.Ingredients}>{item.Ingredients}</option>
                        ))}
                      </select>
                    </div>

                    <div id="recipequantity">
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="number"
                        value={recipequantity}
                        required
                        onChange={handleRecipequantityChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="Unit">Unit</label>
                      <select
                        name="unitRD"
                        id="unitRD"
                        value={recipeunit}
                        required
                        onChange={handleRecipeunitChange}
                      >
                        <option value="gram">g (gram)</option>
                        <option value="millilitre">ml (millilitre)</option>
                        <option value="microgram">mcg (microgram)</option>
                        <option value="tablespoon">tbsp (tablespoon)</option>
                        <option value="teaspoon">teaspoon</option>
                        <option value="cup">cup</option>
                      </select>
                    </div>
                  </div>
                </div>

                <input value={"Add to Recipe"} id="addmoreingredients" type="submit" />

              </form>
            ) : (
              <></>
            )}
          </div>

<div id="Tabels_container" >
{showTable && (
          <div className="table-container"  id='yourrecipetale'>
            <h2>Your Recipe</h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Recipe Name</th>
      <th>Ingredient Name</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody>
    {ingredientsList.map((service, index) => (
      <tr key={index}>
        {index === 0 && (
          <td rowSpan={ingredientsList.length}>{recipeName}</td>
        )}
        <td>{service.ingredientName}</td>
        <td>{service.quantity}</td>
        <td>{service.unit}</td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}

        {MaterialListTable && (

          <div className="table-container" id="showtablermi" >
          <h2>Recipe Profile</h2>
          <br />
          <table className="recipe_table" >
            <thead>
              <tr>
                <th>Energy (kcal)</th>
                <td>{calculateTotalVal('Energy')}</td>
              </tr>
              <tr>
               <th>Proteins (g)</th>
      
              <td>{calculateTotalVal('Proteins')}</td>
              </tr>

<tr>
<th>Carbohydrates (g)</th>
<td> {calculateTotalVal('Carbohydrates')}</td>
</tr>

<tr>

<th>Fats (g)</th>
<td>{calculateTotalVal('Fats')}</td>
</tr>

<tr>
 
<th>Dietary Fibre (g)</th>     
<td>
{calculateTotalVal('DietaryFibre')}</td>
</tr>

<tr>
<th>Calcium (mg)</th>
<td>


        
{calculateTotalVal('Calcium')}</td>
</tr>

<tr>
<th>Vitamin B9 (mcg)</th>
<td>{calculateTotalVal('VitaminB9')}</td>
</tr>

<tr>
<th>Potassium (mg)</th>
<td>

{calculateTotalVal('Potassium')}</td>
</tr>
<tr>
<th>Vitamin B5 (mg)</th>
<td>{calculateTotalVal('VitaminB5')}</td></tr>
<tr>
<th>Vitamin B6 (mg)</th>
<td>{calculateTotalVal('VitaminB6')}</td></tr>
<tr>
<th>Sodium (mg)</th>
<td>{calculateTotalVal('Sodium')}</td></tr>
<tr>
<th>Vitamin B1 (mg)</th>
<td>{calculateTotalVal('VitaminB1')}</td></tr>
<tr>
<th>Vitamin B2 (mg)</th>

<td>{calculateTotalVal('VitaminB2')}</td></tr>
<tr>
<th>Vitamin B3 (mg)</th>
<td>{calculateTotalVal('VitaminB3')}</td></tr>
<tr></tr>

<tr>
<th>Iron (mg)</th>
<td>{calculateTotalVal('Iron')}</td></tr>
<tr>
<th>Vitamin E (mg)</th>
<td>{calculateTotalVal('VitaminE')}</td></tr>
<tr>

<th>Phosphorous (mg)</th>
<td>{calculateTotalVal('Phosphorous')}</td></tr>
<tr>
<th>Vitamin A (mcg)</th>
<td>{calculateTotalVal('VitaminA')}</td></tr>
<tr>

<th>Vitamin C (mg)</th>
<td>{calculateTotalVal('VitaminC')}</td></tr>
<tr>
<th>Vitamin K (mcg)</th>
<td>{calculateTotalVal('VitaminK')}</td></tr>
<tr>
<th>Copper (mg)</th>
<td>{calculateTotalVal('Copper')}</td></tr>
<tr>
<th>Magnesium (mg)</th>
<td>{calculateTotalVal('Magnesium')}</td></tr>
<tr>
<th>Zinc (mg)</th>
<td>{calculateTotalVal('Zinc')}</td></tr>
<tr>
<th>Manganese (mg)</th>
<td>{calculateTotalVal('Manganese')}</td></tr>

            </thead>
            <tbody>
        <tr >
       

        </tr>
</tbody>

          </table>
          
        </div>
        )}
</div>

{MaterialListTable && (
  <div id="tabel_controllers">
            <div id="recipebutton_close" onClick={() => setMaterialListTable(false)}>
              Cancel
            </div>
            <div id="recipebutton_save"  onClick={handelIngredientProfileSubmit} >Submit</div>
          </div>
)}

    </>
  )
}

export default RecipeForm;