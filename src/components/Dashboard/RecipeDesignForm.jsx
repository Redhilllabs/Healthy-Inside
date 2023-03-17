import React, { useState,useEffect }  from 'react'
import {AddToIngredentProfile ,getmateriallist,AddToRecipeProfile} from '../../utils/mongodbFunctions'

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
    const newIngredient = {
      ingredientName : _recipe_ingredient_name,
        quantity: recipequantity,
        unit: recipeunit
    };
    setIngredientsList((prevList) => [...prevList, newIngredient]);
    console.log(ingredientsList)
    set_recipe_ingredient_name("Anise, Fennel (सौंफ़/Saunf)");
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
      alert("This Ingredient already exists");
      return;
    }
    set_recipe_ingredient_name("Anise, Fennel (सौंफ़/Saunf)");
    setrecipequantity("1");
    setrecipeunit("gram");
    setRecipeName("");
    setIngredientsList([]);
    setShowTable(false);

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
              <form className="form" id="recipe-designing">
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
                <div id="addmore">
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
                        onChange={handleRecipequantityChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="Unit">Unit</label>
                      <select
                        name="unitRD"
                        id="unitRD"
                        value={recipeunit}
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

                <div id="addmoreingredients" onClick={handeladdmore}>

                  Add to Recipe
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>

{showTable && (
          <div className="table-container">
            <h2>Your Recipe</h2>
            <br />
            <table className="recipe_table">
              <thead>
                <tr>
                  <th>Recipe Name</th>
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
                            <td>{service.ingredientName}</td>
                            <td>{service.quantity}</td>
                            <td>{service.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
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
            <div id="recipebutton_save"  onClick={handelIngredientProfileSubmit} >Submit</div>
          </div>
        </div>
        )}
    </>
  )
}

export default RecipeForm;