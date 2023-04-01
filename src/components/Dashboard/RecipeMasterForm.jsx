import React, { useState, useEffect } from "react";
import { getallIngredientProfile } from "../../utils/ApiCall";

const RecipeMasterForm = () => {
  const [ItemName, setItemName] = useState("");
  const [table, settable] = useState(false);
  const [ AlltableItem ,setAlltableItem] = useState(false);
  const [data, setData] = useState([]);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handeladdmore = () => {
    if (ItemName) {
        settable(true);
        setAlltableItem(false)
    } else {
      alert("choose Item Name");
    }
  };
  const handelAllItems = ()=>{
    setAlltableItem(true)
    settable(false)
    setItemName("");
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getallIngredientProfile();
      setData(response.data);
      // console.log(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="Recipe_Master">
        <form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Recipe Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>

              {data.map((item, index) => (
                        <option value={item.RecipeName}>{item.RecipeName}</option>
                        ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handeladdmore}>
            View Profile
          </div>
          {"  "}
          <div id="addmoreingredients" onClick={handelAllItems}>
           All Recipes 
          </div>
        </form>
      </div>

      {table && (
        <div className="table-container" id="yourrecipetale">
          {/* <h2>Item Master</h2>
          <br /> */}
          <table className="recipe_table">
      <thead>
        <tr>
          <th>Recipe Name</th>
          <th>Ingredients</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
  <React.Fragment key={index}>
    {item.RecipeName === ItemName && (
      <>
        {item.Ingredients.map((ingredient, subIndex) => (
          <tr key={subIndex}>
            {subIndex === 0 && (
              <td rowSpan={item.Ingredients.length}>{item.RecipeName}</td>
            )}
            <td>{ingredient.ingredientName}</td>
            <td>{ingredient.quantity}</td>
            <td>{ingredient.unit}</td>
            {subIndex === 0 && (
              <td rowSpan={item.Ingredients.length}></td>
            )}
          </tr>
        ))}
      </>
    )}
  </React.Fragment>
))}

      </tbody>
    </table>

          
        </div>
      )}

      {AlltableItem && (
        <div className="table-container" id="yourrecipetale">
          <table className="recipe_table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Constituent Recipes</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            
          {item.Ingredients.map((ingredient, subIndex) => (
          <tr key={subIndex}>
            {subIndex === 0 && (
              <td rowSpan={item.Ingredients.length}>{item.RecipeName}</td>
            )}
            <td>{ingredient.ingredientName}</td>
            <td>{ingredient.quantity}</td>
            <td>{ingredient.unit}</td>
            {subIndex === 0 && (
              <td rowSpan={item.Ingredients.length}></td>
            )}
          </tr>
        ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>

        </div>
      )}

    </>
  );
};

export default RecipeMasterForm;
