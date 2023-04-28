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
  const [ShowAddressForm, setShowAddressForm] = useState(false);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [qty, setQty] = useState(0);
  const [name, setName] = useState("");
  const [contact, setcontact] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [showSubcriptionButton, setshowSubcriptionButton] = useState(true);
  const [activeButton, setActiveButton] = useState('about');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    switch (activeButton) {
      case 'about':
        return <div>About content goes here
        <p class="css-j2duwn-BottomText e4rxp0r2">
                    <p class="css-j2duwn-BottomText e4rxp0r2">
                      Breakfast kick-starts your metabolism, helping you burn
                      calories throughout the day. It also gives you the energy
                      you need to get things done and helps you focus at work or
                      at school. Those are just a few reasons why it's the most
                      important meal of the day.
                    </p>
                  </p></div>;
      case 'rich-in':
        return <div>Rich In content goes here
        <p class="css-j2duwn-BottomText e4rxp0r2">
                    <p class="css-j2duwn-BottomText e4rxp0r2">
                      Breakfast kick-starts your metabolism, helping you burn
                      calories throughout the day. It also gives you the energy
                      you need to get things done and helps you focus at work or
                      at school. Those are just a few reasons why it's the most
                      important meal of the day.
                    </p>
                  </p></div>;
      case 'nutrition':
        return <div>Nutrition Profile content goes here <p class="css-j2duwn-BottomText e4rxp0r2">
        <p class="css-j2duwn-BottomText e4rxp0r2">
          Breakfast kick-starts your metabolism, helping you burn
          calories throughout the day. It also gives you the energy
          you need to get things done and helps you focus at work or
          at school. Those are just a few reasons why it's the most
          important meal of the day.
        </p>
      </p></div>;
      case 'health-benefit':
        return <div>Health Benefit content goes here <p class="css-j2duwn-BottomText e4rxp0r2">
        <p class="css-j2duwn-BottomText e4rxp0r2">
          Breakfast kick-starts your metabolism, helping you burn
          calories throughout the day. It also gives you the energy
          you need to get things done and helps you focus at work or
          at school. Those are just a few reasons why it's the most
          important meal of the day.
        </p>
      </p></div>;
      default:
        return null;
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setimageurl(item.foodUrl);
  };
  const handleTabClick = (label) => {
    setActiveTab(label);
  };
  const handleUserAddressForm = async (event) => {
    event.preventDefault();

    if (!addressLine1 || !addressLine2 || !city || !state || !zip || !contact) {
      setResponse({ message: "Fill all fields", status: "error" });
      return;
    }
    const data = {
      email: user.email,
      Address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        zip: zip,
      },
      Contact: contact,
    };
    const res = await SaveUserAddress(data);
    const updatedUser = {
      ...user,
      Address: data.Address,
      NewContact: data.Contact,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    dispatch({
      type: actionType.SET_USER,
      user: updatedUser,
    });

    navigate("/orderSubmit", { state: qty, contact: contact });
    setResponse({
      message: "Address saved!",
      status: "success",
    });
  };

  const today = new Date();
  const currentDay = today.getDay();
  return (
    <div className="MorningFood">
      <Message response={response} />
      <div className="line-container">
        <hr className="line" />
        <div className="text">
          <h2>
          Break Fast Meal </h2>
        </div>
        <hr className="line" />
      </div>

      <div className="morning_container_eatfit">
        <div className="morning_container_eatfit2">
          <div className="container1">
            <div className="container1_img">
              <img
                src={imageurl}
                alt="BhelMakhani2"
                className="imageelement_container1"
              />
            </div>
            <div className="css-1pf7hc2-SubscriptionBottomContainer">
              <div className="tabs">
                <ul className="Container1_options">
                  <div
                    onClick={() => handleTabClick("Upcoming meals")}
                    className={`Container1_Item ${
                      activeTab === "Upcoming meals"
                        ? "Container1_Item_active"
                        : ""
                    }`}
                  >
                    Upcoming meals
                  </div>
                </ul>

                {activeTab === "Upcoming meals" && (
                  <div className="container1_content">
                    <div className="constiner1_ProductListWidgetContainer">
                      <div className="container1_listwidget">
                        <div
                          className="product-list-widget"
                          style={{
                            borderBottom: "1px solid rgb(239, 239, 239)",
                          }}
                        >
                          <div className="container1_content_Header">
                            <p
                              type="LARGE"
                              className="container1_content_HeaderSubtitle"
                            >
                              * Sun meals will not be delivered if deliver on
                              weekends is off
                            </p>
                          </div>

                          <div className="container1_content_ImageTabContainer">
                          <div className="container1_content_ImageTabList">
  {foodItems &&
    foodItems.data &&
    Array.isArray(foodItems.data) &&
    foodItems.data
      .filter((item) => item.foodType === "breakfast")
      .map((item, index) => {
        const today = new Date().getDay();
        const itemDay = (index + 1) % 6;
        const isToday = today === itemDay;
        const isActive = selectedItem && selectedItem.foodName === item.foodName;

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
            <p className="container1_content_DayText">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
            </p>
          </div>
        );
      })}
</div>


                            <div className="container1_content_ImageTabContent">
                              {selectedItem ? (
                                <>
                                  <div className="container1_content_ProductLargeCellContainer">
                                    <div className="container1_content_HeaderContainer">
                                      <p className="container1_content_DayText">
                                        Thu, 20 Apr
                                      </p>
                                    </div>
                                    <div className="container1_content_TitleContainer">
                                      <p className="css-15piyio-TitleText e1tfloc31">
                                        {selectedItem.foodName}
                                      </p>
                                    </div>
                                    <p className="container1_content_SubTitleText">
                                      {selectedItem.foodDescription}
                                    </p>
                                    <div class="container1_content_NutritionWidgetWrapper">
                                      <h4 class="container1_content_NutritionTitle">
                                        Nutritional Info.
                                      </h4>
                                      <div class="container1_content_NutritionSubtitle">
                                        550 - Calories
                                      </div>
                                      <div class="container1_content_WrapperContainerDiv">
                                        <div class="container1_content_WrapperContainerDiv">
                                          <div
                                            width="13.571428571428571"
                                            class="WrapperDiv1"
                                          ></div>
                                          <div
                                            width="13.571428571428571"
                                            class="WrapperDiv2"
                                          ></div>
                                          <div
                                            width="60"
                                            class="WrapperDiv3"
                                          ></div>
                                          <div
                                            width="12.857142857142856"
                                            class="WrapperDiv4"
                                          ></div>
                                        </div>
                                      </div>
                                      <div class="NutritionInfoWrapper">
                                        <div class="NutritionInfoContainer">
                                          <div class="NutritionIcon1"></div>
                                          <div class="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Protein
                                          </div>
                                          <div class="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            19g
                                          </div>
                                        </div>
                                        <div class="NutritionInfoContainer">
                                          <div class="NutritionIcon2"></div>
                                          <div class="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Fat
                                          </div>
                                          <div class="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            19g
                                          </div>
                                        </div>
                                        <div class="NutritionInfoContainer">
                                          <div class="NutritionIcon3"></div>
                                          <div class="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Carbs
                                          </div>
                                          <div class="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            84g
                                          </div>
                                        </div>
                                        <div class="css-krbdsg-NutritionInfoContainer e1jpgr0i7">
                                          <div class="NutritionIcon4"></div>
                                          <div class="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Fibre
                                          </div>
                                          <div class="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            18g
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div>Select an item to view details</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container2">
            <div className="pack-summary-widget no-border">
              <div className="css-140e8aq-ProductHeaderWidgetContainer e4rxp0r0">
                <div className="css-1sbql4a-TopContainerDiv e4rxp0r4">
                <div className="Morning-button-container">
  <button  className="active" onClick={() => handleButtonClick('about')}>About</button>
        <button onClick={() => handleButtonClick('rich-in')}>Rich In</button>
        <button onClick={() => handleButtonClick('nutrition')}>Nutrition Profile</button>
        <button onClick={() => handleButtonClick('health-benefit')}>Health Benefit</button>
</div>
                </div>
                <div class="css-17otamg-BottomContainerDiv e4rxp0r1">

                {
                  <div>{renderContent()}</div>

}
                </div>
                
                
              </div>
            </div>
          </div>

        </div>
      </div>

      {ShowAddressForm && (
        <div class="modal">
          <div class="modal-content">
            <form id="address-form" class="address-form">
              <div class="address-form-heading">
                <div class="addressheading">
                  <h3>Enter Details </h3>
                </div>
                <div
                  class="address-close"
                  onClick={() => setShowAddressForm(false)}
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>

              <div class="input-wrapper">
                <div>
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user?.name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label for="address-line1">Address Line 1:</label>
                  <input
                    type="text"
                    id="addressline1"
                    name="addressline1"
                    value={addressLine1}
                    onChange={(event) => setAddressLine1(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label for="address-line2">Address Line 2:</label>
                  <input
                    type="text"
                    id="addressline2"
                    name="addressline2"
                    value={addressLine2}
                    onChange={(event) => setAddressLine2(event.target.value)}
                  />
                </div>

                <div>
                  <label for="contact">contact:</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(event) => setcontact(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label for="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label for="zip">Zip Code:</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleUserAddressForm}
                name="submit"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MorningFood;
