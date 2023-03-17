import React, { useState,useEffect }  from 'react';
import {getallIngredientProfile} from '../../utils/mongodbFunctions';

const ItemDesignForm = () => {
    const [ingredientProfile, setIngredientProfile] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [_recipe_ingredient_name, set_recipe_ingredient_name] = useState("");
    const [recipequantity, setrecipequantity] = useState("1");
    const [recipeunit, setrecipeunit] = useState("gram");
    const [showTable, setShowTable] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([]);

    
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
    setrecipequantity("1");
    setrecipeunit("gram");
    };


    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await getallIngredientProfile();
        setData(response.data);
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

    </>
  )
}

export default ItemDesignForm