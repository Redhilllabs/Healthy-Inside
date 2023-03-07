import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setoption] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleoption = () => {
    setoption(!option);
  };

  const [showProducts, setShowProducts] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [showrecipeform, setrecipeform] = useState(false);
  const [ShowinventoryForm, setShowinventoryForm] = useState(false);
  const [showblogwriting, setshowblogwriting] = useState(false);
  const [serviceList, setserviceList] = useState([{ unit: "gram",quantity:"1",ingredient_name:"Asafoetida (हींग/Heeng)" }]);
console.log(serviceList)
  const handelblogwriting = () => {
    setshowblogwriting(!showblogwriting);
    setShowinventoryForm(false);
    setrecipeform(false);
  };
  const handelinventoryForm = () => {
    setShowinventoryForm(!ShowinventoryForm);
    setrecipeform(false);
    setshowblogwriting(false);
  };

  const handelrecipeform = () => {
    setrecipeform(!showrecipeform);
    setShowinventoryForm(false);
    setshowblogwriting(false);
  };
  const handleProducts = () => {
    const image = document.getElementById("arrow4");
    image.style.transform = "rotate(0deg)";
    setShowProducts(!showProducts);
  };

  const handleOperations = () => {
    const image = document.getElementById("arrow3");
    image.style.transform = "rotate(0deg)";
    setShowOperations(!showOperations);
  };

  const handleMarketing = () => {
    const image = document.getElementById("arrow2");
    image.style.transform = "rotate(0deg)";

    setShowMarketing(!showMarketing);
  };

  const handleFinance = () => {
    const image = document.getElementById("arrow1");
    image.style.transform = "rotate(0deg)";
    setShowFinance(!showFinance);
  };

  const handleTech = () => {
    setShowTech(!showTech);
  };

  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handeladdmore = (event) => {
    setserviceList([...serviceList, { unit: "gram",quantity:"1",ingredient_name:"Asafoetida (हींग/Heeng)" }]);
  };

  const handleRemoveItem = (index) => {
    const List = [...serviceList];
    List.splice(index, 1);
    setserviceList(List);
  };
  const [recipeName, setRecipeName] = useState("");

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handelServiceChange = (e, index, rname) => {
    const { value } = e.target;
    const List = [...serviceList];
    List[index][rname] = value;
    setserviceList(List);
  };

  const [procedure, setProcedure] = useState("");

  const handleProcedureChange = (event) => {
    setProcedure(event.target.value);
  };
  const [recipes, setRecipes] = useState([]);
  const [showTable, setShowTable] = useState(false); // <-- add this line

  const handelrecipesubmitform = (event) => {
    event.preventDefault();
console.log(recipeName,serviceList,procedure)
// const newRecipe = { recipeName,serviceList,procedure };
//     setRecipes([...recipes, newRecipe]);
// console.log(recipes)
    // setRecipeName("");
    // setServiceList("");
    // setProcedure("");

    setShowTable(true);
  };

  return (
    <div className="dashboard">
      <div className={`dashboard_sidebar ${isOpen ? "close" : ""}`}>
        <div className="logo-details">
          {/* <img  src="https://img.icons8.com/ios/50/null/plus-math--v1.png"/> */}
          <span className="logo_name">DashBoard</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">
              {/* <img src="https://img.icons8.com/material-rounded/24/null/dashboard-layout.png"/> */}
              {/* <span className="link_name">Dashboard</span> */}
            </a>
          </li>

          <li
            onClick={() => handleProducts()}
            onMouseLeave={() => {
              const image = document.getElementById("arrow4");
              image.style.transform = "rotate(180deg)";
              setShowProducts(false);
            }}
          >
            <div className="iocn-link">
              <a href="#">
                {/* <img  src="https://img.icons8.com/material-outlined/24/null/shipping-product.png"/> */}
                <span className="link_name">Products</span>
              </a>
              <img
                id="arrow4"
                src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
              />
            </div>
            <ul className="sub-menu">
              {showProducts && (
                <div id="product-dash">
                  <a href="#">Raw Material Master List</a>
                  <a href="#">Buffer</a>
                  <a href="#">MRP Calculator</a>
                  <a href="#" onClick={handelrecipeform}>
                    Receipe Designing
                  </a>
                </div>
              )}
            </ul>
          </li>

          <li
            onClick={() => handleOperations()}
            onMouseLeave={() => {
              const image = document.getElementById("arrow3");
              image.style.transform = "rotate(180deg)";
              setShowOperations(false);
            }}
          >
            <div className="iocn-link">
              <a href="#">
                {/* <img src="https://img.icons8.com/external-parzival-1997-detailed-outline-parzival-1997/64/null/external-operation-digital-transformation-parzival-1997-detailed-outline-parzival-1997.png"/> */}
                <span className="link_name">Operations</span>
              </a>
              <img
                id="arrow3"
                src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
              />
            </div>
            <ul className="sub-menu">
              {showOperations && (
                <div id="operations-dash">
                  <a href="#">Sale Plan</a>
                  <a href="#">Batch Manager</a>
                  <a href="#">Purchase Order</a>
                  <a href="#">Front Desk</a>
                  <a href="#" onClick={handelinventoryForm}>
                    Inventory Purcase Log
                  </a>
                  <a href="#">Packaging Master</a>
                  <a href="#">Packaging Material Master List</a>
                </div>
              )}
            </ul>
          </li>

          <li
            onClick={() => handleMarketing()}
            onMouseLeave={() => {
              const image = document.getElementById("arrow2");
              image.style.transform = "rotate(180deg)";
              setShowMarketing(false);
            }}
          >
            <div className="iocn-link">
              <a href="#">
                {/* <img  src="https://img.icons8.com/windows/32/null/add-pie-chart-report.png"/> */}
                <span className="link_name">Marketing</span>
              </a>
              <img
                id="arrow2"
                src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
              />
            </div>
            <ul className="sub-menu">
              {showMarketing && (
                <div id="marketing-dash">
                  <a href="#" onClick={handelblogwriting}>
                    Blog Writing
                  </a>
                  <a href="#">Rwl Master</a>
                  <a href="#">IwR Master</a>
                  <a href="#">RMI</a>
                  <a href="#">PI</a>
                </div>
              )}
            </ul>
          </li>

          <li
            onClick={() => handleFinance()}
            onMouseLeave={() => {
              const image = document.getElementById("arrow1");
              image.style.transform = "rotate(180deg)";

              setShowFinance(false);
            }}
          >
            <div className="iocn-link">
              <a href="#">
                {/* <img src="https://img.icons8.com/sf-black/64/null/deposit.png"/> */}
                <span className="link_name">Finance</span>
              </a>
              <img
                id="arrow1"
                src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
              />
            </div>
            <ul className="sub-menu">
              {showFinance && (
                <div id="finance-dash">
                  <a href="#">Expenses</a>
                  <a href="#">DRR</a>
                  <a href="#">Forwards and Losses</a>
                  <a href="#">Budget</a>
                </div>
              )}
            </ul>
          </li>

          {/* <li>
            <a href="#" onClick={handleTech}>
          Tech
        </a>
        {showTech && <div id="tech-dash"></div>}
            </li> */}
        </ul>
      </div>

      <div className="main_dashbord">
        {showrecipeform && (
          <div className="formcontains">
            <h1>Receipe Designing</h1>
            <form
              class="form"
              id="recipe-designing"
              
            >
              <div className="option_container">
                <label for="Receipe Name">Receipe Name</label>
                <input type="text" name="reciepeNameRD" id="reciepeNameRD" value={recipeName}
        onChange={handleRecipeNameChange} required
         />
              </div>
              <div id="addmore">
                {serviceList.map((singleService, index) => (
                  <div className="addmoreitems" key={index}>
                    <div className="option_container">
                      <label htmlFor="Ingredient Name">Ingredient</label>
                      <select
                        id="ingredient_name"
                        name="ingredient_name"
                        required
value={singleService.ingredient_name}
onChange={(e)=>handelServiceChange(e,index,"ingredient_name")}

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
                        <option value="Aluminium Containers">
                          Aluminium Containers
                        </option>
                        <option value="Aluminium Container Lids">
                          Aluminium Container Lids
                        </option>
                        <option value="Biodegradable Big Plates">
                          Biodegradable Big Plates
                        </option>
                        <option value="Biodegradable Medium Plates">
                          Biodegradable Medium Plates
                        </option>
                        <option value="Biodegradable Small Plates">
                          Biodegradable Small Plates
                        </option>
                        <option value="Carry Bag">Carry Bag</option>
                        <option value="Disposable Container Lids (Unknown)">
                          Disposable Container Lids (Unknown)
                        </option>
                        <option value="Disposable Containers (Without Lids)">
                          Disposable Containers (Without Lids)
                        </option>
                        <option value="Disposable Plastic Plates">
                          Disposable Plastic Plates
                        </option>
                        <option value="Disposable Tiffin Box Lids (Unknown)">
                          Disposable Tiffin Box Lids (Unknown)
                        </option>
                        <option value="Disposable Transparent Plastic Lids">
                          Disposable Transparent Plastic Lids
                        </option>
                        <option value="Flat Bowl with Lid(250ml)">
                          Flat Bowl with Lid(250ml)
                        </option>
                        <option value="Flat Bowl with Lid(40ml)">
                          Flat Bowl with Lid(40ml)
                        </option>
                        <option value="Flat Bowl with Lid(750ml)">
                          Flat Bowl with Lid(750ml)
                        </option>
                        <option value="Flat Rectangular Box">
                          Flat Rectangular Box
                        </option>
                        <option value="Ice Cream Spoons">
                          Ice Cream Spoons
                        </option>
                        <option value="Paper Disposable Glass">
                          Paper Disposable Glass
                        </option>
                        <option value="Paper Disposable Lids">
                          Paper Disposable Lids
                        </option>
                        <option value="Plastic Bottle with Caps">
                          Plastic Bottle with Caps
                        </option>
                        <option value="Plastic Bottle with Caps (Not Usable)">
                          Plastic Bottle with Caps (Not Usable)
                        </option>
                        <option value="Plastic Bottles Lids">
                          Plastic Bottles Lids
                        </option>
                        <option value="Plastic Fork">Plastic Fork</option>
                        <option value="Plastic Lids">Plastic Lids</option>
                        <option value="Plastic Spoons (Big)">
                          Plastic Spoons (Big)
                        </option>
                        <option value="Plastic Spoons Small">
                          Plastic Spoons Small
                        </option>
                        <option value="Plastic Tiffin Box">
                          Plastic Tiffin Box
                        </option>
                        <option value="Plastic Water Bottles Caps">
                          Plastic Water Bottles Caps
                        </option>
                        <option value="Plastic Water Bottles with Caps">
                          Plastic Water Bottles with Caps
                        </option>
                        <option value="Rectangular Cardbox(1200ml)">
                          Rectangular Cardbox(1200ml)
                        </option>
                        <option value="Rectangular Cardbox(1400ml)">
                          Rectangular Cardbox(1400ml)
                        </option>
                        <option value="Rectangular Cardbox(800ml)">
                          Rectangular Cardbox(800ml)
                        </option>
                        <option value="Roti Wrap">Roti Wrap</option>
                        <option value="Semi Wooden Small Plates">
                          Semi Wooden Small Plates
                        </option>
                        <option value="Spoon">Spoon</option>
                        <option value="Tissue Paper">Tissue Paper</option>
                        <option value="Wooden Fruit Fork">
                          Wooden Fruit Fork
                        </option>
                        <option value="Brown Rice Idli">Brown Rice Idli</option>
                        <option value="Cashew Mayos">Cashew Mayos</option>
                        <option value="Coconut Dip">Coconut Dip</option>
                        <option value="Jau Pulao">Jau Pulao</option>
                        <option value="Mint Dip">Mint Dip</option>
                        <option value="Minty Appe">Minty Appe</option>
                        <option value="Palak Meethi Cutlets">
                          Palak Meethi Cutlets
                        </option>
                        <option value="Ragi Chila">Ragi Chila</option>
                        <option value="Ragi Dosa">Ragi Dosa</option>
                        <option value="Ramas Dal Moth">Ramas Dal Moth</option>
                        <option value="Rasam Sambhar">Rasam Sambhar</option>
                        <option value="Roti Tacos">Roti Tacos</option>
                        <option value="Tofu Parantha">Tofu Parantha</option>
                        <option value="Tomato Dip">Tomato Dip</option>
                        <option value="Veggie Mix Dip">Veggie Mix Dip</option>
                      </select>
                    </div>
                    <div className="option_container">
                      <label htmlFor="quantity">Quantity</label>
                      <input type="number"  value={singleService.quantity}
onChange={(e)=>handelServiceChange(e,index,"quantity")}  />
                    </div>

                    <div className="option_container">
                      <label htmlFor="Unit">Unit</label>
                      <select name="unitRD" id="unitRD"  value={singleService.unit}
onChange={(e)=>handelServiceChange(e,index,"unit")}   >
                        <option value="gram">g (gram)</option>
                        <option value="millilitre">ml (millilitre)</option>
                        <option value="microgram">mcg (microgram)</option>
                        <option value="tablespoon">tbsp (tablespoon)</option>
                        <option value="teaspoon">teaspoon</option>
                        <option value="cup">cup</option>
                      </select>
                    </div>
{
  serviceList.length >1?<div onClick={() => handleRemoveItem(index)} > <i class="fa-solid fa-xmark"></i> </div>:<></>
}
                    
                  </div>
                ))}
                <div id="addmoreingredients" onClick={handeladdmore}>
                  Add More
                </div>
              </div>

              <div className="option_container">
                <label htmlFor="procedure">Procedure</label>
                <textarea
        id="procedure"
        name="procedure"
        cols="10"
        rows="4"
        value={procedure}
        onChange={handleProcedureChange}
      ></textarea>
              </div>

              <div class="button-container">
                <div onClick={handelrecipesubmitform}  id="recipebutton" name="submit">
                  Submit
                </div>
              </div>
            </form>
          </div>
        )}

        {ShowinventoryForm && (
          <div className="formcontains">
            <h1>Inventory Purchase Log</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
            <div className="option_container">
            <label for="Name">Date</label> <br />
              <input type="date" name="Date" id="dateIPL" required /> <br />
            </div>
              
              <div className="option_container">
              <label for="Item">Item Name</label> <br />
              <select id="itemIPL" name="Item" required>
                <option value="Anise, Fennel (सौंफ़/Saunf)">
                  Anise, Fennel (सौंफ़/Saunf)
                </option>
                <option value="Asafoetida (हींग/Heeng)">
                  Asafoetida (हींग/Heeng)
                </option>
                <option value="Baking Soda (बेकिंग सोडा/Baking Soda/ENO)">
                  Baking Soda (बेकिंग सोडा/Baking Soda/ENO)
                </option>
                <option value="Beans (फलिया/Beans)">Beans (फलिया/Beans)</option>
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
                <option value="Carrot (गाजर/Gazar)">Carrot (गाजर/Gazar)</option>
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
                <option value="Ginger (अदरक/Adrak)">Ginger (अदरक/Adrak)</option>
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
                  Kashmiri Red Chilli Whole (कश्मीरी लाल मिर्च साबुत/Kasmiri Lal
                  Mirch Sabut)
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
                <option value="Onion (प्याज/Pyaaj)">Onion (प्याज/Pyaaj)</option>
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
                <option value="Aluminium Containers">
                  Aluminium Containers
                </option>
                <option value="Aluminium Container Lids">
                  Aluminium Container Lids
                </option>
                <option value="Biodegradable Big Plates">
                  Biodegradable Big Plates
                </option>
                <option value="Biodegradable Medium Plates">
                  Biodegradable Medium Plates
                </option>
                <option value="Biodegradable Small Plates">
                  Biodegradable Small Plates
                </option>
                <option value="Carry Bag">Carry Bag</option>
                <option value="Disposable Container Lids (Unknown)">
                  Disposable Container Lids (Unknown)
                </option>
                <option value="Disposable Containers (Without Lids)">
                  Disposable Containers (Without Lids)
                </option>
                <option value="Disposable Plastic Plates">
                  Disposable Plastic Plates
                </option>
                <option value="Disposable Tiffin Box Lids (Unknown)">
                  Disposable Tiffin Box Lids (Unknown)
                </option>
                <option value="Disposable Transparent Plastic Lids">
                  Disposable Transparent Plastic Lids
                </option>
                <option value="Flat Bowl with Lid(250ml)">
                  Flat Bowl with Lid(250ml)
                </option>
                <option value="Flat Bowl with Lid(40ml)">
                  Flat Bowl with Lid(40ml)
                </option>
                <option value="Flat Bowl with Lid(750ml)">
                  Flat Bowl with Lid(750ml)
                </option>
                <option value="Flat Rectangular Box">
                  Flat Rectangular Box
                </option>
                <option value="Ice Cream Spoons">Ice Cream Spoons</option>
                <option value="Paper Disposable Glass">
                  Paper Disposable Glass
                </option>
                <option value="Paper Disposable Lids">
                  Paper Disposable Lids
                </option>
                <option value="Plastic Bottle with Caps">
                  Plastic Bottle with Caps
                </option>
                <option value="Plastic Bottle with Caps (Not Usable)">
                  Plastic Bottle with Caps (Not Usable)
                </option>
                <option value="Plastic Bottles Lids">
                  Plastic Bottles Lids
                </option>
                <option value="Plastic Fork">Plastic Fork</option>
                <option value="Plastic Lids">Plastic Lids</option>
                <option value="Plastic Spoons (Big)">
                  Plastic Spoons (Big)
                </option>
                <option value="Plastic Spoons Small">
                  Plastic Spoons Small
                </option>
                <option value="Plastic Tiffin Box">Plastic Tiffin Box</option>
                <option value="Plastic Water Bottles Caps">
                  Plastic Water Bottles Caps
                </option>
                <option value="Plastic Water Bottles with Caps">
                  Plastic Water Bottles with Caps
                </option>
                <option value="Rectangular Cardbox(1200ml)">
                  Rectangular Cardbox(1200ml)
                </option>
                <option value="Rectangular Cardbox(1400ml)">
                  Rectangular Cardbox(1400ml)
                </option>
                <option value="Rectangular Cardbox(800ml)">
                  Rectangular Cardbox(800ml)
                </option>
                <option value="Roti Wrap">Roti Wrap</option>
                <option value="Semi Wooden Small Plates">
                  Semi Wooden Small Plates
                </option>
                <option value="Spoon">Spoon</option>
                <option value="Tissue Paper">Tissue Paper</option>
                <option value="Wooden Fruit Fork">Wooden Fruit Fork</option>
                <option value="Brown Rice Idli">Brown Rice Idli</option>
                <option value="Cashew Mayos">Cashew Mayos</option>
                <option value="Coconut Dip">Coconut Dip</option>
                <option value="Jau Pulao">Jau Pulao</option>
                <option value="Mint Dip">Mint Dip</option>
                <option value="Minty Appe">Minty Appe</option>
                <option value="Palak Meethi Cutlets">
                  Palak Meethi Cutlets
                </option>
                <option value="Ragi Chila">Ragi Chila</option>
                <option value="Ragi Dosa">Ragi Dosa</option>
                <option value="Ramas Dal Moth">Ramas Dal Moth</option>
                <option value="Rasam Sambhar">Rasam Sambhar</option>
                <option value="Roti Tacos">Roti Tacos</option>
                <option value="Tofu Parantha">Tofu Parantha</option>
                <option value="Tomato Dip">Tomato Dip</option>
                <option value="Veggie Mix Dip">Veggie Mix Dip</option>
              </select>{" "}
              </div>
              
              <br />
              <div className="option_container">
              <label for="Quantity">Quantity</label> <br />
              <input
                type="number"
                name="Quantity"
                id="quantityIPL"
                required
              />{" "}
              </div>
              
              <br />
              <div className="option_container">
              <label for="Unit">Unit </label> <br />
              <input type="number" name="Unit" id="unitIPL" required /> <br />
              </div>
              
              <div className="option_container">
              <label for="Amount">Amount</label> <br />
              <input type="number" name="Amount" id="amountIPL" required />{" "}
              </div>
              
              <br />
              <div className="option_container">
              <label for="Unit-Price">Unit Price</label> <br />
              <input
                type="number"
                name="Unit-Price"
                id="unitPriceIPL"
                required
              />{" "}
              </div>
              
              <br />
              <div class="button-container">
                <button type="submit" name="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {showblogwriting && (
          <div className="formcontains">
          <h1>Blog Writing</h1>
          <form action="" class="form" id="blog-writing" method="post">
          <div className="option_container">
            <label for="Blog Title">Blog Title</label> 
            <input type="text" name="blogTitleBW" id="blogTitleBW" /> 
            </div>
            <div className="option_container">
            <label for="Mini Blog">Mini Blog</label>
            <input type="text" name="miniBlogBW" id="miniBlogBW" />
            </div>
            <div className="option_container">
            <label for="Blog">Blog</label> 
            <input type="text" name="blogBW" id="blogBW" />
           </div>
           
            <div className="option_container">
            <label for="Item Name">Item Name</label>
            <input type="text" name="itemNameBW" id="itemNameBW" />
            </div>
            <div className="option_container">
              <label for="Profile">Profile </label>
              <select name="profileBW" id="profileBW">
                <option value="Adzuki Beans (लाल फ़लियां/Lal Faliyan)">
                  Adzuki Beans (लाल फ़लियां/Lal Faliyan)
                </option>
                <option value="Almonds (बादाम/Badaam)">
                  Almonds (बादाम/Badaam)
                </option>
                <option value="Amaranth (चौलाई/Chaulai)">
                  Amaranth (चौलाई/Chaulai)
                </option>
                <option value="Anise, Fennel (सौंफ़/Saunf)">
                  Anise, Fennel (सौंफ़/Saunf)
                </option>
                <option value="Apple (सेब/Seb)">Apple (सेब/Seb)</option>
                <option value="Apricot (खुबानी/Khubani)">
                  Apricot (खुबानी/Khubani)
                </option>
                <option value="Arrowroot (अरारोटArarot)">
                  Arrowroot (अरारोटArarot)
                </option>
                <option value="Avocado (एवोकाडो/Avocado)">
                  Avocado (एवोकाडो/Avocado)
                </option>
                <option value="Banana (केला/Kela)">Banana (केला/Kela)</option>
                <option value="Barley (जौ/Jau)">Barley (जौ/Jau)</option>
                <option value="Beetroot (चुकंदर/Chukander)">
                  Beetroot (चुकंदर/Chukander)
                </option>
                <option value="Bengal Gram Split (चना दाल स्प्लिट/Chana Dal Split)">
                  Bengal Gram Split (चना दाल स्प्लिट/Chana Dal Split)
                </option>
                <option value="Bitter Gourd (करेला/Karela)">
                  Bitter Gourd (करेला/Karela)
                </option>
                <option value="Black Eyed Peas (लोबिया/Lobia)">
                  Black Eyed Peas (लोबिया/Lobia)
                </option>
                <option value="v">
                  Black Gram Whole (उड़द की दाल/Urad ki Dal)
                </option>
                <option value="Blackberry (जामुन/Jamun)">
                  Blackberry (जामुन/Jamun)
                </option>
                <option value="Boiled Egg White (अंडे का सफेद उबला हुआ/Ande ka Safed Ubla hua)">
                  Boiled Egg White (अंडे का सफेद उबला हुआ/Ande ka Safed Ubla
                  hua)
                </option>
                <option value="Boiled Egg Yolk (अंडे का सफेद उबला हुआ/Ande ka Safed Ubla hua)">
                  Boiled Egg Yolk (अंडे का सफेद उबला हुआ/Ande ka Safed Ubla hua)
                </option>
                <option value="Boiled Whole Egg (उबला अंडा पूरा/Ubla Anda Poora)">
                  Boiled Whole Egg (उबला अंडा पूरा/Ubla Anda Poora)
                </option>
                <option value="Bottle Gourd (लौकी/Lauki)">
                  Bottle Gourd (लौकी/Lauki)
                </option>
                <option value="Brinjal/Egg Plant (बैंगन/Baingan)">
                  Brinjal/Egg Plant (बैंगन/Baingan)
                </option>
                <option value="Broad Beans (सेम फली/Sem Fali)">
                  Broad Beans (सेम फली/Sem Fali)
                </option>
                <option value="Broccoli (ब्रोकोली/Broccoli)">
                  Broccoli (ब्रोकोली/Broccoli)
                </option>
                <option value="Brown Rice (ब्राउन राइस/Brown Rice)">
                  Brown Rice (ब्राउन राइस/Brown Rice)
                </option>
                <option value="Buck Wheat (कुट्टू/Kuttu)">
                  Buck Wheat (कुट्टू/Kuttu)
                </option>
                <option value="Butter Milk (छाछ/Chaach)">
                  Butter Milk (छाछ/Chaach)
                </option>
                <option value="Cabbage (पत्ता गोभी/Patta Gobhi)">
                  Cabbage (पत्ता गोभी/Patta Gobhi)
                </option>
                <option value="Cantaloupe Seed (ख़रबूज़ के बीज/Kharbooj k beej)">
                  Cantaloupe Seed (ख़रबूज़ के बीज/Kharbooj k beej)
                </option>
                <option value="Capsicum (शिमला मिर्च/Shimla Mirch)">
                  Capsicum (शिमला मिर्च/Shimla Mirch)
                </option>
                <option value="Carrot (गाजर/Gaazar)">
                  Carrot (गाजर/Gaazar)
                </option>
                <option value="Cashew (काजू/Kaju)">Cashew (काजू/Kaju)</option>
                <option value="Cauliflower (फूलगोभी/Foolgobhi)">
                  Cauliflower (फूलगोभी/Foolgobhi)
                </option>
                <option value="Celery Leaves (अजवायन की पत्तियां/Ajwain ki Pattiyan)">
                  Celery Leaves (अजवायन की पत्तियां/Ajwain ki Pattiyan)
                </option>
                <option value="Celery Seeds (अजवाइन के बीज/Ajwain k beej)">
                  Celery Seeds (अजवाइन के बीज/Ajwain k beej)
                </option>
                <option value="Chia Seeds (चिया/Chia)">
                  Chia Seeds (चिया/Chia)
                </option>
                <option value="Chickpeas Black (काला चना/Kala Chana)">
                  Chickpeas Black (काला चना/Kala Chana)
                </option>
                <option value="Chickpeas Black Sprouted (अंकुरित काला चना/Ankurit Kala Chana)">
                  Chickpeas Black Sprouted (अंकुरित काला चना/Ankurit Kala Chana)
                </option>
                <option value="Chickpeas Light Tan  (छोला/Chola/काबुली चना/Kabuli Chana)">
                  Chickpeas Light Tan (छोला/Chola/काबुली चना/Kabuli Chana)
                </option>
                <option value="Coconut (नारियल/Nariyal)">
                  Coconut (नारियल/Nariyal)
                </option>
                <option value="Coconut Water (नारियल पानी/Nariyal Pani)">
                  Coconut Water (नारियल पानी/Nariyal Pani)
                </option>
                <option value="Colocasia (अरबी/Arbi)">
                  Colocasia (अरबी/Arbi)
                </option>
                <option value="Coriander Leaves(धनिया/Dhaniya)">
                  Coriander Leaves(धनिया/Dhaniya)
                </option>
                <option value="Corn (मक्का/Makka)">Corn (मक्का/Makka)</option>
                <option value="Cottage Cheese">Cottage Cheese</option>
                <option value="Cucumber (खीरा/Kheera)">
                  Cucumber (खीरा/Kheera)
                </option>
                <option value="Cudpahnut (चिरोंजी/Chironji)">
                  Cudpahnut (चिरोंजी/Chironji)
                </option>
                <option value="Currant, Raisin (किशमिश/Kismish)">
                  Currant, Raisin (किशमिश/Kismish)
                </option>
                <option value="Custard Apple (सीताफल/Sitafal)">
                  Custard Apple (सीताफल/Sitafal)
                </option>
                <option value="Date Dried (खजूर/Khajoor)">
                  Date Dried (खजूर/Khajoor)
                </option>
                <option value="Date Fresh (खजूर/Khajoor)">
                  Date Fresh (खजूर/Khajoor)
                </option>
                <option value="Dates (खजूर/Khajoor)">
                  Dates (खजूर/Khajoor)
                </option>
                <option value="Dates dried (छुहारा/Chuhara)">
                  Dates dried (छुहारा/Chuhara)
                </option>
                <option value="Dew Gram Beans (मोठ की दाल/Moth ki Dal)">
                  Dew Gram Beans (मोठ की दाल/Moth ki Dal)
                </option>
                <option value="Drumsticks (ढोल का छड़ी/Dhol ki Chadi)">
                  Drumsticks (ढोल का छड़ी/Dhol ki Chadi)
                </option>
                <option value="Dry Roasted Black Chickpeas (सूखा भुना हुआ काला चना/Sookha Bhuna Hua Kala Chana)">
                  Dry Roasted Black Chickpeas (सूखा भुना हुआ काला चना/Sookha
                  Bhuna Hua Kala Chana)
                </option>
                <option value="Fenugreek Leaves (मेथी की पत्तियां/Methi ki Pattiyan)">
                  Fenugreek Leaves (मेथी की पत्तियां/Methi ki Pattiyan)
                </option>
                <option value="Fenugreek Seeds (मेथी के बीज/Methi k beej)">
                  Fenugreek Seeds (मेथी के बीज/Methi k beej)
                </option>
                <option value="Fig (अंजीर/Anjeer)">Fig (अंजीर/Anjeer)</option>
                <option value="Flax Seeds (अलसी का बीज/Alsi k beej)">
                  Flax Seeds (अलसी का बीज/Alsi k beej)
                </option>
                <option value="French Beans (गवार फली)">
                  French Beans (गवार फली)
                </option>
                <option value="Garlic (लहसुन/Lehsun)">
                  Garlic (लहसुन/Lehsun)
                </option>
                <option value="Ginger (अदरक/Adrak)">Ginger (अदरक/Adrak)</option>
                <option value="Gooseberry (आंवला/Amla)">
                  Gooseberry (आंवला/Amla)
                </option>
                <option value="Grapes (अंगूर/Angoor)">
                  Grapes (अंगूर/Angoor)
                </option>
                <option value="Green Beans (हरी सेम/Hari Sem)">
                  Green Beans (हरी सेम/Hari Sem)
                </option>
                <option value="Green Chilli (हरी मिर्च/Hari Mirch)">
                  Green Chilli (हरी मिर्च/Hari Mirch)
                </option>
                <option value="Green Gram Split (मूँग स्प्लिट/Moong Split)">
                  Green Gram Split (मूँग स्प्लिट/Moong Split)
                </option>
                <option value="Green Gram Sprouted (अंकुरित मूंग दाल/Ankurit Moong Dal)">
                  Green Gram Sprouted (अंकुरित मूंग दाल/Ankurit Moong Dal)
                </option>
                <option value="Green Gram Whole (मूंग की दाल/ Moong ki dal">
                  Green Gram Whole (मूंग की दाल/ Moong ki dal
                </option>
                <option value="Green Peas (हरी मटर/Hari Matar)">
                  Green Peas (हरी मटर/Hari Matar)
                </option>
                <option value="Groundnuts/Peanuts (मूंगफली/Moongfali)">
                  Groundnuts/Peanuts (मूंगफली/Moongfali)
                </option>
                <option value="Guava (अमरूद/Amrood)">
                  Guava (अमरूद/Amrood)
                </option>
                <option value="Jackfruit (कटहल/Kathal)">
                  Jackfruit (कटहल/Kathal)
                </option>
                <option value="Jujube (बेर/Ber)">Jujube (बेर/Ber)</option>
                <option value="Kidney Beans (राजमा/Rajma">
                  Kidney Beans (राजमा/Rajma
                </option>
                <option value="Kiwi (कीवी/Kiwi)">Kiwi (कीवी/Kiwi)</option>
                <option value="Ladyfinger (भिन्डी/Bhindi)">
                  Ladyfinger (भिन्डी/Bhindi)
                </option>
                <option value="Lambsquarters Leaves (बथुआ की पत्तियां/Bathua ki Pattiyan)">
                  Lambsquarters Leaves (बथुआ की पत्तियां/Bathua ki Pattiyan)
                </option>
                <option value="Lemon Juice (नींबू का रस/Nimbu ka Ras)">
                  Lemon Juice (नींबू का रस/Nimbu ka Ras)
                </option>
                <option value="Lettuce (काहू/Kahu)">Lettuce (काहू/Kahu)</option>
                <option value="Litchi (लीची/Litchi)">
                  Litchi (लीची/Litchi)
                </option>
                <option value="Lotus Seed Pop (मखाना/Makhana)">
                  Lotus Seed Pop (मखाना/Makhana)
                </option>
                <option value="Mango (आम/Aam)">Mango (आम/Aam)</option>
                <option value="Milk (दूध/Doodh)">Milk (दूध/Doodh)</option>
                <option value="Millets (बाजरा/Bazra)">
                  Millets (बाजरा/Bazra)
                </option>
                <option value="Mint Leaves (पुदीना की पत्तियां/Pudina ki Pattiyan)">
                  Mint Leaves (पुदीना की पत्तियां/Pudina ki Pattiyan)
                </option>
                <option value="Mulberry (शहतूत/Sahtoot)">
                  Mulberry (शहतूत/Sahtoot)
                </option>
                <option value="Mushroom (मशरूम/Mushroom)">
                  Mushroom (मशरूम/Mushroom)
                </option>
                <option value="Muskmelon (खरबूजा/Kharbooja)">
                  Muskmelon (खरबूजा/Kharbooja)
                </option>
                <option value="Onion (प्याज/Pyaaj)">Onion (प्याज/Pyaaj)</option>
                <option value="Orange (संतरा/Santara)">
                  Orange (संतरा/Santara)
                </option>
                <option value="Paneer (पनीर/Paneer) ">
                  Paneer (पनीर/Paneer)
                </option>
                <option value="Papaya (पपीता/Papeeta)">
                  Papaya (पपीता/Papeeta)
                </option>
                <option value="Peach (आड़ू/Aadoo)">Peach (आड़ू/Aadoo)</option>
                <option value="Pear (नाशपाती/Nashpati)">
                  Pear (नाशपाती/Nashpati)
                </option>
                <option value="Peppermint (पुदीना/Pudina)">
                  Peppermint (पुदीना/Pudina)
                </option>
                <option value="Pigeon Peas (अरहर की दाल/Arhar ki Dal)">
                  Pigeon Peas (अरहर की दाल/Arhar ki Dal)
                </option>
                <option value="Pine Nut (चिलगोज़ा/Chilgoja)">
                  Pine Nut (चिलगोज़ा/Chilgoja)
                </option>
                <option value="Pineapple (अनानास/Ananas)">
                  Pineapple (अनानास/Ananas)
                </option>
                <option value="Pistachio (पिस्ता/Pista)">
                  Pistachio (पिस्ता/Pista)
                </option>
                <option value="Plum (आलूबुखारा/Aaloobukhara)">
                  Plum (आलूबुखारा/Aaloobukhara)
                </option>
                <option value="Pointed Gourd (परवल/Parwal)">
                  Pointed Gourd (परवल/Parwal)
                </option>
                <option value="Pomegranate (अनार/Anar)">
                  Pomegranate (अनार/Anar)
                </option>
                <option value="Potato (आलू/Aloo)">Potato (आलू/Aloo)</option>
                <option value="Prunes (मनुक्का/Munakka)">
                  Prunes (मनुक्का/Munakka)
                </option>
                <option value="Puffed Rice (मुरमुरे/Murmure)">
                  Puffed Rice (मुरमुरे/Murmure)
                </option>
                <option value="Pumpkin (कद्दू/Kaddoo)">
                  Pumpkin (कद्दू/Kaddoo)
                </option>
                <option value="Pumpkin Seeds (कद्दू के बीज/Kaddoo k beej)">
                  Pumpkin Seeds (कद्दू के बीज/Kaddoo k beej)
                </option>
                <option value="Raddish Leaves (मूली की पत्तियां/Mooli ki Pattiyan">
                  Raddish Leaves (मूली की पत्तियां/Mooli ki Pattiyan
                </option>
                <option value="Radish White (मूली/Mooli)">
                  Radish White (मूली/Mooli)
                </option>
                <option value="Raspberry (रसभरी/Rasbhari)">
                  Raspberry (रसभरी/Rasbhari)
                </option>
                <option value="Raw Egg White (अंडे का सफेद/Ande ka Safed)">
                  Raw Egg White (अंडे का सफेद/Ande ka Safed)
                </option>
                <option value="Raw Egg Yolk (कच्चे अंडे की जर्दी/Kacche Ande ki Jardi)">
                  Raw Egg Yolk (कच्चे अंडे की जर्दी/Kacche Ande ki Jardi)
                </option>
                <option value="Raw Whole Egg (अंडा पूरा/ Anda Poora)">
                  Raw Whole Egg (अंडा पूरा/ Anda Poora)
                </option>
                <option value="Red Chilli (लाल मिर्च/Lal Mirch)">
                  Red Chilli (लाल मिर्च/Lal Mirch)
                </option>
                <option value="Red Lentil Split (मसूर स्प्लिट/Masur Split)">
                  Red Lentil Split (मसूर स्प्लिट/Masur Split)
                </option>
                <option value="Red Lentil Whole (मसूर की दाल/Masur ki Dal)">
                  Red Lentil Whole (मसूर की दाल/Masur ki Dal)
                </option>
                <option value="Ridge Gourd (तुरई/Turai)">
                  Ridge Gourd (तुरई/Turai)
                </option>
                <option value="Round Gourd (टिंडा/Tinda)">
                  Round Gourd (टिंडा/Tinda)
                </option>
                <option value="Saffron (केसर/Kesar)">
                  Saffron (केसर/Kesar)
                </option>
                <option value="Sapodilla (चीकू/Cheeku)">
                  Sapodilla (चीकू/Cheeku)
                </option>
                <option value="Semolina (सूजी/Sooji)">
                  Semolina (सूजी/Sooji)
                </option>
                <option value="Sesame Seeds (तिल के बीज/Til k beej)">
                  Sesame Seeds (तिल के बीज/Til k beej)
                </option>
                <option value="Snake Gourd (चिचिण्डा/Chichinda)">
                  Snake Gourd (चिचिण्डा/Chichinda)
                </option>
                <option value="Sorghum (ज्वार/Jwar)">
                  Sorghum (ज्वार/Jwar)
                </option>
                <option value="Spinach (पालक की पत्तियां/Paalak ki Pattiyan)">
                  Spinach (पालक की पत्तियां/Paalak ki Pattiyan)
                </option>
                <option value="Strawberry (स्ट्रॉबेरी/Strawberry)">
                  Strawberry (स्ट्रॉबेरी/Strawberry)
                </option>
                <option value="Sugar Candy (मिस्री/Misri)">
                  Sugar Candy (मिस्री/Misri)
                </option>
                <option value="Sweet Potato (शकरकंद/Shakarkand)">
                  Sweet Potato (शकरकंद/Shakarkand)
                </option>
                <option value="Tamarind (इमली/Imli)">
                  Tamarind (इमली/Imli)
                </option>
                <option value="Taro (अरबी/Arbi)">Taro (अरबी/Arbi)</option>
                <option value="Tomato (टमाटर/Tamatar)">
                  Tomato (टमाटर/Tamatar)
                </option>
                <option value="Turmeric (हल्दी/Haldi)">
                  Turmeric (हल्दी/Haldi)
                </option>
                <option value="Turnip (शलजम/Shaljam)">
                  Turnip (शलजम/Shaljam)
                </option>
                <option value="Walnut (अखरोट/Akhrot)">
                  Walnut (अखरोट/Akhrot)
                </option>
                <option value="Water Chestnut (सिंघाड़ा/Singhada)">
                  Water Chestnut (सिंघाड़ा/Singhada)
                </option>
                <option value="Watermelon (तरबूज/Tarbooz)">
                  Watermelon (तरबूज/Tarbooz)
                </option>
                <option value="Watermelon Seeds (तरबूज के बीज/Tarbooj k beej">
                  Watermelon Seeds (तरबूज के बीज/Tarbooj k beej
                </option>
                <option value="Wheat (गेहूँ/Gayhoon)">
                  Wheat (गेहूँ/Gayhoon)
                </option>
                <option value="White Peas(सफेद मटर/Safed Matar)">
                  White Peas(सफेद मटर/Safed Matar)
                </option>
                <option value="White Rice (सफ़ेद चावल/Safed Chawal)">
                  White Rice (सफ़ेद चावल/Safed Chawal)
                </option>
                <option value="Yogurt (दही/Dahi)">Yogurt (दही/Dahi)</option>
              </select>
            </div>
            <div className="option_container">
            <label for="Files">Files</label>
            <input type="file" name="filesBW" id="filesBW" />
            </div>
            <div class="button-container">
              <button type="submit" name="submit">
                Submit
              </button>
            </div>
          </form>
          </div>
          
        )}


        {showTable && (
  <div className="table-container">
    <h2>Your Recipe</h2>
    <div onClick={()=>setShowTable(false)}>
      close
    </div>
    <div id="recipebutton">Save</div>
    <br />
    <table className="recipe_table">
      <thead>
        <tr>
          <th>Recipe Name</th>
          <th>Ingredients</th>
          <th>Procedure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{recipeName}</td>
            <td>
              <table>
                <tbody>
                  {serviceList.map((service, index) => (
                    <tr key={index}>
                      <td>{service.ingredient_name}</td>
                      <td>{service.quantity}</td>
                      <td>{service.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          <td>{procedure}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}


      </div>
    </div>
  );
};

export default Dashboard;
