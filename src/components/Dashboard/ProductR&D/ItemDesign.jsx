import React, { useState, useEffect } from "react";
import {
  getallIngredientProfile,
  getallrecipeProfile,
  addItemList,
} from "../../../utils/ApiCall";
import load2 from "../../../images/load2.gif";
import Message from "../../../utils/Message";

const ItemDesignForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [_recipe_ingredient_name, set_recipe_ingredient_name] = useState("");
  const [recipeunit, setrecipeunit] = useState("1");
  const [showTable, setShowTable] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [MaterialListTable, setMaterialListTable] = useState(false);
  const [itemProfile, setitemProfileData] = useState({});
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(null);

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
    setShowTable(true);
  };

  const calculateTotalVal = (nutrient) => {
    let totalNutrient = 0;
    itemProfile.forEach((item) => {
      const ingredient = ingredientsList.find(
        (ingredient) => ingredient.ingredient_name === item.RecipeName
      );
      if (ingredient) {
        for (let key in item.Ingredients) {
          if (key === nutrient) {
            totalNutrient += item.Ingredients[key];
          }
        }
      }
    });
    return totalNutrient;
  };

  const handeladdmore = (event) => {
    event.preventDefault();
    const newIngredient = {
      Constituent_Recipe: _recipe_ingredient_name,
      unit: recipeunit,
    };
    setIngredientsList((prevList) => [...prevList, newIngredient]);
    set_recipe_ingredient_name("");
    setrecipeunit("1");
    setMaterialListTable(true);
  };

  const handlesubmit = async () => {
    let bodyContent = JSON.stringify({
      ItemName: recipeName,
      ItemList: ingredientsList,
    });
    if (recipeName && ingredientsList !== []) {
      const response = await addItemList(bodyContent);
      if (response.status === 404) {
        setResponse({ message: "Date already Exists", status: "error" });
        return;
      } else {
        setResponse({
          message: "Data loaded successfully",
          status: "success",
        });
      }
    }

    setrecipeunit("1");
    set_recipe_ingredient_name("");
    setRecipeName("");
    setIngredientsList([]);
    setMaterialListTable(false);
    setShowTable(false);
  };
  const handlecancel = async () => {
    setMaterialListTable(false);
    set_recipe_ingredient_name("");
    setrecipeunit("1");
    setRecipeName("");
    setShowTable(false);
    setIngredientsList([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getallIngredientProfile();
      const res2 = await getallrecipeProfile();

      setData(response.data);
      setitemProfileData(res2.data);
    };
    fetchData();
  }, []);

  return (
    <>
    <Message response={response} />
      <div className="formcontains">
        <form class="form" id="recipe-designing" onSubmit={handeladdmore}>
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
                <label htmlFor="Ingredient Name">
                  Select Constituent Recipes{" "}
                </label>
                <select
                  name=""
                  id=""
                  value={_recipe_ingredient_name}
                  onChange={(e) => set_recipe_ingredient_name(e.target.value)}
                  required
                >
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
                  required
                  onChange={(e) => setrecipeunit(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <input type="submit" Value={"Add"} id="addmoreingredients" />
        </form>
      </div>

      <div id="Tabels_container">
        {showTable && (
          <div className="table-container" id="yourrecipetale">
            <h2>Your Item Design</h2>
            <br />
            <table className="recipe_table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Constituent Recipe</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {ingredientsList.map((service, index) => (
                  <tr key={index}>
                    {index === 0 && (
                      <td rowSpan={ingredientsList.length}>{recipeName}</td>
                    )}
                    <td>{service.Constituent_Recipe}</td>
                    <td>{service.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {MaterialListTable && (
          <div className="table-container" id="showtablermi">
            <h2>Item Profile</h2>
            <br />
            <table className="recipe_table">
              <thead>
                <tr>
                  <th>Energy (kcal/100g)</th>
                  <td>{calculateTotalVal("Energy")}</td>
                </tr>
                <tr>
                  <th>Proteins (g/100g)</th>

                  <td>{calculateTotalVal("Proteins")}</td>
                </tr>

                <tr>
                  <th>Carbohydrates (g/100g)</th>
                  <td> {calculateTotalVal("Carbohydrates")}</td>
                </tr>

                <tr>
                  <th>Fats (g/100g)</th>
                  <td>{calculateTotalVal("Fats")}</td>
                </tr>

                <tr>
                  <th>Dietary Fibre (g/100g)</th>
                  <td>{calculateTotalVal("DietaryFibre")}</td>
                </tr>

                <tr>
                  <th>Calcium (mg/100g)</th>
                  <td>{calculateTotalVal("Calcium")}</td>
                </tr>

                <tr>
                  <th>Vitamin B9 (mcg/100g)</th>
                  <td>{calculateTotalVal("VitaminB9")}</td>
                </tr>

                <tr>
                  <th>Potassium (mg/100g)</th>
                  <td>{calculateTotalVal("Potassium")}</td>
                </tr>
                <tr>
                  <th>Vitamin B5 (mg/100g)</th>
                  <td>{calculateTotalVal("VitaminB5")}</td>
                </tr>
                <tr>
                  <th>Vitamin B6 (mg/100g)</th>
                  <td>{calculateTotalVal("VitaminB6")}</td>
                </tr>
                <tr>
                  <th>Sodium (mg/100g)</th>
                  <td>{calculateTotalVal("Sodium")}</td>
                </tr>
                <tr>
                  <th>Vitamin B1 (mg/100g)</th>
                  <td>{calculateTotalVal("VitaminB1")}</td>
                </tr>
                <tr>
                  <th>Vitamin B2 (mg/100g)</th>

                  <td>{calculateTotalVal("VitaminB2")}</td>
                </tr>
                <tr>
                  <th>Vitamin B3 (mg/100g)</th>
                  <td>{calculateTotalVal("VitaminB3")}</td>
                </tr>
                <tr></tr>

                <tr>
                  <th>Iron (mg/100g)</th>
                  <td>{calculateTotalVal("Iron")}</td>
                </tr>
                <tr>
                  <th>Vitamin E (mg/100g)</th>
                  <td>{calculateTotalVal("VitaminE")}</td>
                </tr>
                <tr>
                  <th>Phosphorous (mg/100g)</th>
                  <td>{calculateTotalVal("Phosphorous")}</td>
                </tr>
                <tr>
                  <th>Vitamin A (mcg/100g)</th>
                  <td>{calculateTotalVal("VitaminA")}</td>
                </tr>
                <tr>
                  <th>Vitamin C (mg/100g)</th>
                  <td>{calculateTotalVal("VitaminC")}</td>
                </tr>
                <tr>
                  <th>Vitamin K (mcg/100g)</th>
                  <td>{calculateTotalVal("VitaminK")}</td>
                </tr>
                <tr>
                  <th>Copper (mg/100g)</th>
                  <td>{calculateTotalVal("Copper")}</td>
                </tr>
                <tr>
                  <th>Magnesium (mg/100g)</th>
                  <td>{calculateTotalVal("Magnesium")}</td>
                </tr>
                <tr>
                  <th>Zinc (mg/100g)</th>
                  <td>{calculateTotalVal("Zinc")}</td>
                </tr>
                <tr>
                  <th>Manganese (mg/100g)</th>
                  <td>{calculateTotalVal("Manganese")}</td>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {MaterialListTable && (
        <div id="tabel_controllers">
          <div id="recipebutton_close" onClick={handlecancel}>
            cancel
          </div>
          <div id="recipebutton_save" onClick={isLoading ? null : handlesubmit}>
            {isLoading ? (
              <>
                <button disabled>Submit</button>
                <img
                  src={load2}
                  alt=""
                  srcset=""
                  style={{ width: "30px", height: "30px" }}
                />
              </>
            ) : (
              <>Submit</>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default ItemDesignForm;
