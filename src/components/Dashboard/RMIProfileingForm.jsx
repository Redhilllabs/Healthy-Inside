import { useState, useEffect } from "react";
import {
  getmateriallist,
  addtomateriallist,
} from "../../utils/mongodbFunctions";

const RMIProfileingForm = () => {
  const [kitchenOption, setKitchenOption] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [energy, setEnergy] = useState("0");
  const [proteins, setProteins] = useState("0");
  const [carbohydrates, setCarbohydrates] = useState("0");
  const [fats, setFats] = useState("0");
  const [dietaryFibre, setDietaryFibre] = useState("0");
  const [calcium, setCalcium] = useState("0");
  const [vitaminB9, setVitaminB9] = useState("0");
  const [potassium, setPotassium] = useState("0");
  const [vitaminB5, setVitaminB5] = useState("0");
  const [vitaminB6, setVitaminB6] = useState("0");
  const [sodium, setSodium] = useState("0");
  const [vitaminB1, setVitaminB1] = useState("0");
  const [vitaminB2, setVitaminB2] = useState("0");
  const [vitaminB3, setVitaminB3] = useState("0");
  const [manganese, setManganese] = useState("0");
  const [iron, setIron] = useState("0");
  const [vitaminE, setVitaminE] = useState("0");
  const [phosphorous, setPhosphorous] = useState("0");
  const [vitaminA, setVitaminA] = useState("0");
  const [vitaminC, setVitaminC] = useState("0");
  const [vitaminK, setVitaminK] = useState("0");
  const [copper, setCopper] = useState("0");
  const [magnesium, setMagnesium] = useState("0");
  const [zinc, setZinc] = useState("0");
  const [updatelist, setupdatelist] = useState("");
  const [showtable, setshowtable] = useState(false);

  const handleOptionClick = (option) => {
    setKitchenOption(option);
  };
const handelrmisubmit = async ()=>{
  const bodyContent = {
    Ingredients: ingredient,
    Energy: energy || 0,
    Proteins: proteins || 0,
    Carbohydrates: carbohydrates || 0,
    Fats: fats || 0,
    DietaryFibre: dietaryFibre || 0,
    Calcium: calcium || 0,
    VitaminB9: vitaminB9 || 0,
    Potassium: potassium || 0,
    VitaminB5: vitaminB5 || 0,
    VitaminB6: vitaminB6 || 0,
    Sodium: sodium || 0,
    VitaminB1: vitaminB1 || 0,
    VitaminB2: vitaminB2 || 0,
    VitaminB3: vitaminB3 || 0,
    Manganese: manganese || 0,
    Iron: iron || 0,
    VitaminE: vitaminE || 0,
    Phosphorous: phosphorous || 0,
    VitaminA: vitaminA || 0,
    VitaminC: vitaminC || 0,
    VitaminK: vitaminK || 0,
    Copper: copper || 0,
    Magnesium: magnesium || 0,
    Zinc: zinc || 0,
  };

  if (Object.values(bodyContent).some((value) => value === "")) {
    alert("Please fill all fields or provide a value of 0");
  } else {
    const response = await addtomateriallist(JSON.stringify(bodyContent));
    if (response.status === 401) {
      alert("This Ingredient already exists");
      return;
    }
    setupdatelist(response);

    // Set state variables to empty strings
    setIngredient("");
    setEnergy("");
    setProteins("");
    setCarbohydrates("");
    setFats("");
    setDietaryFibre("");
    setCalcium("");
    setVitaminB9("");
    setPotassium("");
    setVitaminB5("");
    setVitaminB6("");
    setSodium("");
    setVitaminB1("");
    setVitaminB2("");
    setVitaminB3("");
    setManganese("");
    setIron("");
    setVitaminE("");
    setPhosphorous("");
    setVitaminA("");
    setVitaminC("");
    setVitaminK("");
    setCopper("");
    setMagnesium("");
    setZinc("");
  }
}

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getmateriallist();
      setData(response.data);
    };
    fetchData();
  }, [updatelist]);

  const handeladdToList = async () => {
    setshowtable(true);
  };

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
          <div className="table-container" id="materiallisttable">
            <h2>Malterial List</h2>
            <br />
            <table className="recipe_table" id="materiallisttable_main">
              <thead>
                <tr>
                <th>Ingredient</th>
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
          </div>
        )}

        {kitchenOption === "AddToList" && (
          <form class="form" id="RMIform-designing">
          <div id="rmi_ingredient_style">
          <h4>Ingredient:</h4>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
          </div>
            

<div id="rmi_options_input">
            <label>Proteins:</label>
            <input
              type="number"
              value={proteins}
              onChange={(e) => setProteins(e.target.value)}
            />

            <label>Carbohydrates:</label>
            <input
              type="number"
              value={carbohydrates}
              onChange={(e) => setCarbohydrates(e.target.value)}
            />

            <label>Dietary Fibre:</label>
            <input
              type="number"
              value={dietaryFibre}
              onChange={(e) => setDietaryFibre(e.target.value)}
            />

            <label for="calcium-input">Calcium:</label>
            <input
              id="calcium-input"
              type="number"
              value={calcium}
              onChange={(e) => setCalcium(e.target.value)}
            />

            <label for="vitaminB9-input">Vitamin B9:</label>
            <input
              id="vitaminB9-input"
              type="number"
              value={vitaminB9}
              onChange={(e) => setVitaminB9(e.target.value)}
            />

            <label for="potassium-input">Potassium:</label>
            <input
              id="potassium-input"
              type="number"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
            />

            <label for="vitaminB5-input">Vitamin B5:</label>
            <input
              id="vitaminB5-input"
              type="number"
              value={vitaminB5}
              onChange={(e) => setVitaminB5(e.target.value)}
            />

            <label for="vitaminB6-input">Vitamin B6:</label>
            <input
              id="vitaminB6-input"
              type="number"
              value={vitaminB6}
              onChange={(e) => setVitaminB6(e.target.value)}
            />

            <label for="sodium-input">Sodium:</label>
            <input
              id="sodium-input"
              type="number"
              value={sodium}
              onChange={(e) => setSodium(e.target.value)}
            />

            <label>Vitamin B1:</label>
            <input
              type="number"
              value={vitaminB1}
              onChange={(e) => setVitaminB1(e.target.value)}
            />

            <label>Vitamin B2:</label>
            <input
              type="number"
              value={vitaminB2}
              onChange={(e) => setVitaminB2(e.target.value)}
            />

            <label>Vitamin B3:</label>
            <input
              type="number"
              value={vitaminB3}
              onChange={(e) => setVitaminB3(e.target.value)}
            />

            <label>Manganese:</label>
            <input
              type="number"
              value={manganese}
              onChange={(e) => setManganese(e.target.value)}
            />

            <label>vitaminE:</label>
            <input
              type="number"
              value={vitaminE}
              onChange={(e) => setVitaminE(e.target.value)}
            />

            <label>phosphorous:</label>
            <input
              type="number"
              value={phosphorous}
              onChange={(e) => setPhosphorous(e.target.value)}
            />

            <label>vitaminA:</label>
            <input
              type="number"
              value={vitaminA}
              onChange={(e) => setVitaminA(e.target.value)}
            />

            <label>vitaminC:</label>
            <input
              type="number"
              value={vitaminC}
              onChange={(e) => setVitaminC(e.target.value)}
            />

            <label>vitaminK:</label>
            <input
              type="number"
              value={vitaminK}
              onChange={(e) => setVitaminK(e.target.value)}
            />

            <label>magnesium:</label>
            <input
              type="number"
              value={magnesium}
              onChange={(e) => setMagnesium(e.target.value)}
            />

            <label>zinc:</label>
            <input
              type="number"
              value={zinc}
              onChange={(e) => setZinc(e.target.value)}
            />

            <label>copper:</label>
            <input
              type="number"
              value={copper}
              onChange={(e) => setCopper(e.target.value)}
            />

            <label>Iron:</label>
            <input
              type="number"
              value={iron}
              onChange={(e) => setIron(e.target.value)}
            />

            <label>Fats:</label>
            <input
              type="number"
              value={fats}
              onChange={(e) => setFats(e.target.value)}
            />

            <label>Energy:</label>
            <input
              type="number"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            />
            </div>

            <div id="rmiaddtolist" onClick={handeladdToList}>
              Add to List
            </div>
          </form>
        )}
      </div>

      {showtable && (
        <div className="table-container" id="showtablermi" >
          <h2>Malterial List</h2>
          <br />
          <table className="recipe_table" >
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
              <tr>
                <td>{ingredient}</td>
                <td>{energy}</td>
                <td>{proteins}</td>
                <td>{carbohydrates}</td>
                <td>{fats}</td>
                <td>{dietaryFibre}</td>
                <td>{calcium}</td>
                <td>{vitaminB9}</td>
                <td>{potassium}</td>
                <td>{vitaminB5}</td>
                <td>{vitaminB6}</td>
                <td>{sodium}</td>
                <td>{vitaminB1}</td>
                <td>{vitaminB2}</td>
                <td>{vitaminB3}</td>
                <td>{manganese}</td>
                <td>{iron}</td>
                <td>{vitaminE}</td>
                <td>{phosphorous}</td>
                <td>{vitaminA}</td>
                <td>{vitaminC}</td>
                <td>{vitaminK}</td>
                <td>{copper}</td>
                <td>{magnesium}</td>
                <td>{zinc}</td>
              </tr>
            </tbody>
          </table>
          <div id="tabel_controllers">
            <div id="recipebutton_close" onClick={() => setshowtable(false)}>
              cancel
            </div>
            <div id="recipebutton_save" onClick={handelrmisubmit} >Submit</div>
          </div>
        </div>
      )}

    </>
  );
};

export default RMIProfileingForm;
