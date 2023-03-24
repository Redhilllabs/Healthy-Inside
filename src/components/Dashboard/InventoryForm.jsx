import React, {useState} from 'react';
import {AddPurcaselogEntry , AddtoInventory} from '../../utils/ApiCall';

const InventoryForm = () => {
    const [date, setDate] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [showInventoryTable, setShowInventoryTable] = useState(false);
    

    const handleDateChange = (event) => {
        setDate(event.target.value);
      };
    
      const handleItemNameChange = (event) => {
        setItemName(event.target.value);
      };
    
      const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
      };
    
      const handleUnitChange = (event) => {
        setUnit(event.target.value);
      };
    
      // const handleUnitPriceChange = (event) => {
      //   setUnitPrice(parseFloat(event.target.value));
      // };
    
      const handleAmountChange = (event) => {
        setAmount(parseFloat(event.target.value));
      };
      const handleInventorySubmitForm = (event) => {
        event.preventDefault()
        if (Number(amount) === 0) {
          // Handle the case where amount is zero
          setUnitPrice(0)
        } else {
          setUnitPrice(Number(quantity) / Number(amount));
        }

        setShowInventoryTable(true);
      };

      const handelsave = async() =>{
        let bodyContent = JSON.stringify({
          "Date": date,
          "ingredients":[
            {
            "name": itemName,
            "quantity": quantity,
            "unit":unit,
            "unitPrice":unitPrice,
            "Amount":amount
            }
            ]
        });
        let bodyContent2 = JSON.stringify({
          "Ingredients":itemName,
          "quantity":quantity,
          "unit":unit,
          "unitPrice":unitPrice,
          "Amount":amount
          
      });
        const response  = await AddPurcaselogEntry(bodyContent)
        const response2  = await AddtoInventory(bodyContent2)
        
        if (response.status === 401) {
          alert(`Some Error Occured`);
          return;
        }else{
          alert(`${response.operation}  saved in Purchase Log Entry`)
          setAmount(0)
          setDate("")
          setItemName("")
          setQuantity(0)
          setUnit("")
          setUnitPrice(0)
          setShowInventoryTable(false)
        }
        if (response2.status === 401) {
          alert(`Error Occured`);
          return;
        }else{
          alert(`${response2.operation}  saved in Inventory`)
          
        }

      }

  return (
    <>

<div className="formcontains">
            <h1>Inventory Purchase Log</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
              onSubmit={handleInventorySubmitForm}
            >
              <div className="option_container">
                <label for="Name">Date</label>
                <input
                  type="date"
                  name="Date"
                  id="dateIPL"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <div className="option_container">
                <label for="Item">Ingredients</label>
                <select
                  id="itemIPL"
                  name="Item"
                  value={itemName}
                  onChange={handleItemNameChange}
                  required
                >
                <option value="">Select Option</option>
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
                    Black Pepper Powder(काली मिर्च पाउडर/Kali Mirch Powder)
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
                  <option value="Curd (दही/Dahi)">Curd (दही/Dahi) </option>
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
                  <option value="Jaggery (गूढ़/Gud)">Jaggery (गूढ़/Gud)</option>
                  <option value="Kashmiri Red Chilli Powder (कश्मीरी लाल मिर्च पाउडर/Kasmiri Lal Mirch Powder)">
                    Kashmiri Red Chilli Powder ,(कश्मीरी लाल मिर्च पाउडर/Kasmiri
                    Lal Mirch Powder)
                  </option>
                  <option value="Kashmiri Red Chilli Whole (कश्मीरी लाल मिर्च साबुत/Kasmiri Lal Mirch Sabut)">
                    Kashmiri Red Chilli Whole (कश्मीरी लाल मिर्च साबुत/Kasmiri
                    Lal Mirch Sabut)
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
                    Petite Yellow Lentils (पीली मूंग दाल/Peelee Moong Daal)
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
                    Sambhar Masala Powder (सांभर मसाला पाउडर/Sambhar Masala
                    Powder)
                  </option>
                  <option value="Semolina (सूजी/Suji)">
                    Semolina (सूजी/Suji)
                  </option>
                  <option value="Sesame Seeds (तिल के बीज/Til Ke Beej)">
                    Sesame Seeds (तिल के बीज/Til Ke Beej)
                  </option>
                  <option value="Small Green Chilli (छोटी हरी मिर्च/Chhotee Haree Mirch)">
                    Small Green Chilli (छोटी हरी मिर्च/Chhotee Haree Mirch)
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
                  <option value="Tofu (टोफू/Tofu)">Tofu (टोफू/Tofu)</option>
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
                    Yellow Bell Pepper (पीली शिमला मिर्च/Peelee Shimala Mirch)
                  </option>
                </select>{" "}
              </div>

              <div className="option_container">
                <label for="Quantity">Quantity</label>
                <input
                  type="number"
                  name="Quantity"
                  id="quantityIPL"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />{" "}
              </div>

              <div className="option_container">
                <label for="Unit">Unit </label>
                <select
                        name="unitRD"
                        id="unitRD"
                        value={unit}
                        required
                        onChange={handleUnitChange}
                      >
                      <option value="">Select Option</option>
                        <option value="gram">g (gram)</option>
                        <option value="millilitre">ml (millilitre)</option>
                        <option value="microgram">mcg (microgram)</option>
                        <option value="tablespoon">tbsp (tablespoon)</option>
                        <option value="teaspoon">teaspoon</option>
                        <option value="cup">cup</option>
                      </select>
              </div>

              <div className="option_container">
                <label for="Amount">Amount</label>
                <input
                  type="number"
                  name="Amount"
                  id="amountIPL"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />{" "}
              </div>


              <div class="button-container">
                <input
                 
                  id="recipebutton"
                  type="submit"
                  name="submit"
                  value={ "Submit"}
                />
                 
                
              </div>
            </form>
          </div>
<br />
          {showInventoryTable && (
          <div className="table-container">
            <h2>Purchase Log</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ingredient </th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{date}</td>
                  <td>{itemName}</td>
                  <td>{quantity}</td>
                  <td>{unit}</td>
                  <td>{unitPrice}</td>
                  <td>{amount}</td>
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setShowInventoryTable(false)}
              >
                cancel
              </div>
              <div id="recipebutton_save" onClick={handelsave}  >Save</div>
            </div>
          </div>
        )}
    </>
  )
}

export default InventoryForm