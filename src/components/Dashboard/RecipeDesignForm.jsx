import React, { useState,useEffect }  from 'react'
import {AddToIngredentProfile ,getmateriallist,} from '../../utils/mongodbFunctions'

const RecipeForm = () => {
    const [ingredientProfile, setIngredientProfile] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [_recipe_ingredient_name, set_recipe_ingredient_name] = useState("Anise, Fennel (सौंफ़/Saunf)");
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

    };

  const handelIngredientProfileSubmit = async ()=>{
    let bodyContent = JSON.stringify({
      RecipeName : recipeName,
      Ingredients :ingredientsList
    }); 
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
                        <option value="Anise, Fennel (सौंफ़/Saunf)">
                          Anise, Fennel (सौंफ़/Saunf)
                        </option>
                        <option value="Asafoetida (हींग/Heeng)">
                          Asafoetida (हींग/Heeng)
                        </option>
                        <option value="Baking Soda (बेकिंग सोडा/Baking Soda/ENO)">
                          Baking Soda (बेकिंग सोडा/Baking Soda/ENO)
                        </option>
                        <option value="Beans (फलिया/Beans)">
                          Beans (फलिया/Beans)
                        </option>
                        <option value="Beetroot (चुकंदर/Chukander)">
                          Beetroot (चुकंदर/Chukander)
                        </option>
                        <option value="Black Pepper Powder (काली मिर्च पाउडर/Kali Mirch Powder)">
                          Black Pepper Powder(काली मिर्च पाउडर/Kali Mirch
                          Powder)
                        </option>
                        <option value="Black Salt (काला नमक/Kala Namak)">
                          Black Salt (काला नमक/Kala Namak)
                        </option>
                        <option value="Bottle Gourd (लौकी/Lauki)">
                          Bottle Gourd (लौकी/Lauki)
                        </option>
                        <option value="Broken Wheat (दलिया/Dalia)">
                          Broken Wheat (दलिया/Dalia)
                        </option>
                        <option value="Brown Rice (ब्राउन राइस/Brown Rice)">
                          Brown Rice (ब्राउन राइस/Brown Rice)
                        </option>
                        <option value="Capsicum (शिमला मिर्च/Shimla Mirch)">
                          Capsicum (शिमला मिर्च/Shimla Mirch)
                        </option>
                        <option value="Carrot (गाजर/Gazar)">
                          Carrot (गाजर/Gazar)
                        </option>
                        <option value="Cashew Nuts (काजू/Kajju)">
                          Cashew Nuts (काजू/Kajju)
                        </option>
                        <option value="Cauliflower (फूल गोभी/Phool Gobhee)">
                          Cauliflower (फूल गोभी/Phool Gobhee)
                        </option>
                        <option value="Celery Seeds (अजवाइन के बीज/Ajwain k beej)">
                          Celery Seeds (अजवाइन के बीज/Ajwain k beej)
                        </option>
                        <option value="Chaat Masala (चाट मसाला/Chaat Masala)">
                          Chaat Masala (चाट मसाला/Chaat Masala)
                        </option>
                        <option value="Coconut (नारियल/Nariyal)">
                          Coconut (नारियल/Nariyal)
                        </option>
                        <option value="Common Salt (सादा नमक/Saada Namak)">
                          Common Salt (सादा नमक/Saada Namak)
                        </option>
                        <option value="Coriander Leaves (धनिया/Dhaniya)">
                          Coriander Leaves (धनिया/Dhaniya)
                        </option>
                        <option value="Coriander Powder (धनिया पाउडर/Dhaniya Powder)">
                          Coriander Powder (धनिया पाउडर/Dhaniya Powder)
                        </option>
                        <option value="Cucumber (खीरा/Kheera)">
                          Cucumber (खीरा/Kheera)
                        </option>
                        <option value="Cumin Seed Powder (जीरा पाउडर/Jeera Powder)">
                          Cumin Seed Powder (जीरा पाउडर/Jeera Powder)
                        </option>
                        <option value="Cumin Seeds (जीरा/Jeera)">
                          Cumin Seeds (जीरा/Jeera)
                        </option>
                        <option value="Curd (दही/Dahi)">
                          Curd (दही/Dahi){" "}
                        </option>
                        <option value="Curry Leaves (कड़ी पत्ता/Kadi Patta)">
                          Curry Leaves (कड़ी पत्ता/Kadi Patta)
                        </option>
                        <option value="Egg Plant (बैंगन/Baigan)">
                          Egg Plant (बैंगन/Baigan)
                        </option>
                        <option value="Ekgaon Moth Beans (रामास/Ramaas)">
                          Ekgaon Moth Beans (रामास/Ramaas)
                        </option>
                        <option value="Fenugreek (मेंथी/Meethi)">
                          Fenugreek (मेंथी/Meethi)
                        </option>
                        <option value="Fenugreek seeds (मेथी के बीज/Meethi ke Beej)">
                          Fenugreek seeds (मेथी के बीज/Meethi ke Beej)
                        </option>
                        <option value="Flattened Rice (पोहा/Poha)">
                          Flattened Rice (पोहा/Poha)
                        </option>
                        <option value="Garlic (लहसुन/Lehsun)">
                          Garlic (लहसुन/Lehsun)
                        </option>
                        <option value="Ginger (अदरक/Adrak)">
                          Ginger (अदरक/Adrak)
                        </option>
                        <option value="Gram Flour (बेसन/Besan)">
                          Gram Flour (बेसन/Besan)
                        </option>
                        <option value="Green Peas (हरी मटर/Hari Matar)">
                          Green Peas (हरी मटर/Hari Matar)
                        </option>
                        <option value="Idli Batter (इडली बैटर/Idli Batter)">
                          Idli Batter (इडली बैटर/Idli Batter)
                        </option>
                        <option value="Jaggery (गूढ़/Gud)">
                          Jaggery (गूढ़/Gud)
                        </option>
                        <option value="Kashmiri Red Chilli Powder (कश्मीरी लाल मिर्च पाउडर/Kasmiri Lal Mirch Powder)">
                          Kashmiri Red Chilli Powder ,(कश्मीरी लाल मिर्च
                          पाउडर/Kasmiri Lal Mirch Powder)
                        </option>
                        <option value="Kashmiri Red Chilli Whole (कश्मीरी लाल मिर्च साबुत/Kasmiri Lal Mirch Sabut)">
                          Kashmiri Red Chilli Whole (कश्मीरी लाल मिर्च
                          साबुत/Kasmiri Lal Mirch Sabut)
                        </option>
                        <option value="Large Green Chilli (बड़ी हरी मिर्च/Badee Haree Mirch)">
                          Large Green Chilli (बड़ी हरी मिर्च/Badee Haree Mirch)
                        </option>
                        <option value="Lemon Juice (नींबू का रस/Nimbu ka Ras)">
                          Lemon Juice (नींबू का रस/Nimbu ka Ras)
                        </option>
                        <option value="Lettuce (सलाद पत्ता/Salaad Patta)">
                          Lettuce (सलाद पत्ता/Salaad Patta)
                        </option>
                        <option value="Millet Flour (बाजरे का आटा/Baajaree Ka Atta)">
                          Millet Flour (बाजरे का आटा/Baajaree Ka Atta)
                        </option>
                        <option value="Moringa (मोरिंगा/Drumstick)">
                          Moringa (मोरिंगा/Drumstick)
                        </option>
                        <option value="Mustard (सरसों/Sarsoo)">
                          Mustard (सरसों/Sarsoo)
                        </option>
                        <option value="Mustard Seeds (राई/Rai)">
                          Mustard Seeds (राई/Rai)
                        </option>
                        <option value="Olive Oil (जैतून का तेल/Jaitun ka Tel)">
                          Olive Oil (जैतून का तेल/Jaitun ka Tel)
                        </option>
                        <option value="Onion (प्याज/Pyaaj)">
                          Onion (प्याज/Pyaaj)
                        </option>
                        <option value="Oregano (ओरिगैनो/Oregano)">
                          Oregano (ओरिगैनो/Oregano)
                        </option>
                        <option value="Peppermint (पुदीना/Pudeena)">
                          Peppermint (पुदीना/Pudeena)
                        </option>
                        <option value="Petite Yellow Lentils (पीली मूंग दाल/Peelee Moong Daal)">
                          Petite Yellow Lentils (पीली मूंग दाल/Peelee Moong
                          Daal)
                        </option>
                        <option value="Pigeon Peas (अरहर दाल/Arhar daal)">
                          Pigeon Peas (अरहर दाल/Arhar daal)
                        </option>
                        <option value="Pumpkin (कद्दू/Kaddu)">
                          Pumpkin (कद्दू/Kaddu)
                        </option>
                        <option value="Ragi Flour (रागी का आटा?Ragee Ka Atta)">
                          Ragi Flour (रागी का आटा?Ragee Ka Atta)
                        </option>
                        <option value="Red Bell Pepper (लाल शिमला मिर्च/Lal Shimla Mirch)">
                          Red Bell Pepper (लाल शिमला मिर्च/Lal Shimla Mirch)
                        </option>
                        <option value="Red Chilli Powder (लाल मिर्च पाउडर/Lal Mirch Powder)">
                          Red Chilli Powder (लाल मिर्च पाउडर/Lal Mirch Powder)
                        </option>
                        <option value="Rock Salt (सेंधा नमक/Sendha Namak)">
                          Rock Salt (सेंधा नमक/Sendha Namak)
                        </option>
                        <option value="Sambhar Masala Powder (सांभर मसाला पाउडर/Sambhar Masala Powder)">
                          Sambhar Masala Powder (सांभर मसाला पाउडर/Sambhar
                          Masala Powder)
                        </option>
                        <option value="Semolina (सूजी/Suji)">
                          Semolina (सूजी/Suji)
                        </option>
                        <option value="Sesame Seeds (तिल के बीज/Til Ke Beej)">
                          Sesame Seeds (तिल के बीज/Til Ke Beej)
                        </option>
                        <option value="Small Green Chilli (छोटी हरी मिर्च/Chhotee Haree Mirch)">
                          Small Green Chilli (छोटी हरी मिर्च/Chhotee Haree
                          Mirch)
                        </option>
                        <option value="Soybean Seeds (सोयाबीन के बीज/soyaabeen ke beej)">
                          Soybean Seeds (सोयाबीन के बीज/soyaabeen ke beej)
                        </option>
                        <option value="Spinach (पालक/Paalak)">
                          Spinach (पालक/Paalak)
                        </option>
                        <option value="Split Chickpeas (चना दाल/Channa Daal)">
                          Split Chickpeas (चना दाल/Channa Daal)
                        </option>
                        <option value="Split Washed Vigna Mungo (उड़द दाल/Urad Daal)">
                          Split Washed Vigna Mungo (उड़द दाल/Urad Daal)
                        </option>
                        <option value="Spring Onion (प्याज पत्ता/Pyaz Patta)">
                          Spring Onion (प्याज पत्ता/Pyaz Patta)
                        </option>
                        <option value="Sprouts (अंकुरित/Ankurit)">
                          Sprouts (अंकुरित/Ankurit)
                        </option>
                        <option value="Sweet Corn (स्वीट कॉर्न/Sveet Korn)">
                          Sweet Corn (स्वीट कॉर्न/Sveet Korn)
                        </option>
                        <option value="Sweet Potato (शकरकंद/Shakarakand)">
                          Sweet Potato (शकरकंद/Shakarakand)
                        </option>
                        <option value="Tamarind (इमली/Imalee)">
                          Tamarind (इमली/Imalee)
                        </option>
                        <option value="Tofu (टोफू/Tofu)">
                          Tofu (टोफू/Tofu)
                        </option>
                        <option value="Tomato (टमाटर/Tamatar)">
                          Tomato (टमाटर/Tamatar)
                        </option>
                        <option value="Turmeric Powder (हल्दी पाउडर/Haldi Powder)">
                          Turmeric Powder (हल्दी पाउडर/Haldi Powder)
                        </option>
                        <option value="Vinegar (सिरका/Siraka)">
                          Vinegar (सिरका/Siraka)
                        </option>
                        <option value="Wheat Flour (गेहूं का आटा/Gehun Ka Atta)">
                          Wheat Flour (गेहूं का आटा/Gehun Ka Atta)
                        </option>
                        <option value="Yellow Bell Pepper (पीली शिमला मिर्च/Peelee Shimala Mirch)">
                          Yellow Bell Pepper (पीली शिमला मिर्च/Peelee Shimala
                          Mirch)
                        </option>
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
          <h2>Malterial List</h2>
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

  {data.map((item, index) => {
    const ingredient = ingredientsList.find(
    (ingredient) => ingredient.ingredientName === item.Ingredients
  );
  if (ingredient) {
      return (
        <tr key={index}>
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
      );
    } else {
      return null;
    }
  })}
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