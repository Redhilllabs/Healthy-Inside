import React, { useState, useEffect } from "react";
import "./MorningFood.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import BhelMakhani2 from "../../images/BhelMakhani2.jpg";
import { useNavigate } from "react-router-dom";
import { AddCart, DecreaseCart, SaveUserAddress } from "../../utils/ApiCall";
import Message from "../../utils/Message";

const MorningFood = () => {
  const [{ cartItems, foodItems, user }, dispatch] = useStateValue();
  const [activeTab, setActiveTab] = useState("Upcoming meals");
  const [imageurl, setimageurl] = useState(BhelMakhani2);
  const [selectedItem, setSelectedItem] = useState(null);

  const [response, setResponse] = useState(null);
  const [activeButton, setActiveButton] = useState("about");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "about":
        return (
          <div>
            About content goes here
            <p class="css-j2duwn-BottomText e4rxp0r2">
              Breakfast kick-starts your metabolism, helping you burn calories
              
            </p>
          </div>
        );
      case "rich-in":
        return (
          <div>
            Rich In content goes here
            <p class="css-j2duwn-BottomText e4rxp0r2">
              Breakfast kick-starts your metabolism, helping you burn calories
              
            </p>
          </div>
        );
      case "nutrition":
        return (
          <div>
            Nutrition Profile content goes here
            <p>
              Breakfast kick-starts your metabolism, helping you burn calories
            
            </p>
          </div>
        );
      case "health-benefit":
        return (
          <div>
            Health Benefit content goes here
            <p>
              Breakfast kick-starts your metabolism,
            </p>
          </div>
        );
      case "ingredients":
        return (
          <div>
            Ingredients content goes here
            <ul>
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setimageurl(item.foodUrl);
  };

  const items = [
    {
      id: 1,
      image: imageurl,
      title: "Slide 1",
      content: "This is the content for slide 1",
    },
    {
      id: 2,
      image: imageurl,
      title: "Slide 2",
      content: "This is the content for slide 2",
    },
    {
      id: 3,
      image: imageurl,
      title: "Slide 3",
      content: "This is the content for slide 3",
    },
    {
      id: 4,
      image: imageurl,
      title: "Slide 4",
      content: "This is the content for slide 3",
    },
    {
      id: 5,
      image: imageurl,
      title: "Slide 5",
      content: "This is the content for slide 3",
    },
    {
      id: 6,
      image: imageurl,
      title: "Slide 6",
      content: "This is the content for slide 3",
    },
  ];

  const [translateX, setTranslateX] = useState(0);
  const [translateValue,setTranslateValue] = useState(100);

  const handleNextClick = () => {
    if (translateX <= -(translateValue) * (items.length - 1)) {
      setTranslateX(0);
    } else {
      setTranslateX(translateX - translateValue);
    }
    setActiveButton("about");
  };
  
  const handlePrevClick = () => {
    if (translateX === 0) {
      setTranslateX(-(translateValue) * (items.length - 1));
    } else {
      setTranslateX(translateX + translateValue);
    }
    setActiveButton("about");
  };
  
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      if (vw < 768) {
        setTranslateValue(100);
      } else {
        setTranslateValue(100);
      }
    };
    handleResize(); // call handleResize initially
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="MorningFood">
      <Message response={response} />
      <div className="line-container">
        <hr className="line" />
        <div className="text">
          <h2>Our Meal </h2>
        </div>
        <hr className="line" />
      </div>

      <div className="morning_container_eatfit">
      
      <div className="slider-container"  >
      
      <div className="slider-content" style={{ transform: `translateX(${translateX}%)` }}>
      
        {items.map((item,index) => (
          <div key={item.id} className="slider-item">
          
         
          
          <div className="dish">
          
          <div className="slider-navigation1">
      <button onClick={handlePrevClick}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" id="arrow"><path fill-rule="evenodd" d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"></path></svg></button>
      <button onClick={handleNextClick}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" id="arrow"><path fill-rule="evenodd" d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"></path></svg></button>
      </div>
          <h1>Dish {index + 1}</h1>
          
         
<div className="morning_container_eatfit2" >
<div className="container1">
            <div className="container1_img">
              <img src={item.image} alt={`Slide ${item.id}`} className="imageelement_container1" />
            </div>
            <div className="css-1pf7hc2-SubscriptionBottomContainer">
              <div className="tabs">
                {activeTab === "Upcoming meals" && (
                  <div className="container1_content">
                    <div className="container1_content_ImageTabList">
                      {foodItems &&
                        foodItems.data &&
                        Array.isArray(foodItems.data) &&
                        foodItems.data
                          .filter((item) => item.foodType === "breakfast")
                          
                          .map((item, index) => {
                            const isActive =
                              selectedItem && selectedItem.foodName === item.foodName;
                            return (
                              <div onClick={() => handleItemClick(item)}>
                                <img
                                  src={item.foodUrl}
                                  alt={item.foodName}
                                  className={
                                    isActive
                                      ? "container1_content_Image_active"
                                      : "container1_content_Image"
                                  }
                                />
                              </div>
                            );
                          })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container2">
            <div className="Morning-button-container">
              <button
                className={activeButton === "about" ? "active" : ""}
                onClick={() => handleButtonClick("about")}
              >
                About
              </button>
              <button
                className={activeButton === "rich-in" ? "active" : ""}
                onClick={() => handleButtonClick("rich-in")}
              >
                Rich In
              </button>
              <button
                className={activeButton === "nutrition" ? "active" : ""}
                onClick={() => handleButtonClick("nutrition")}
              >
                Nutrition Profile
              </button>
              <button
                className={activeButton === "health-benefit" ? "active" : ""}
                onClick={() => handleButtonClick("health-benefit")}
              >
                Health Benefits
              </button>
              <button
                className={activeButton === "ingredients" ? "active" : ""}
                onClick={() => handleButtonClick("ingredients")}
              >
                Ingredients
              </button>
            </div>

            <div class="css-17otamg-BottomContainerDiv e4rxp0r1">
              {renderContent()}
            </div>

            <div className="orderSubmitBUtton">
              Submit Order
            </div>
            
          </div>
</div>
          </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  

  );
};

export default MorningFood;
