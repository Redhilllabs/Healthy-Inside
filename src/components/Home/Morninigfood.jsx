import React, { useState, useEffect } from "react";
import "./MorningFood.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import CartItem from "../Cart/CartItem";
import BhelMakhani2 from "../../images/BhelMakhani2.jpg";

const MorningFood = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [activeTab, setActiveTab] = useState("Upcoming meals");
  const [imageurl, setimageurl] = useState(BhelMakhani2);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    // Function to change details below when an image is clicked
    console.log(item);
    setSelectedItem(item);
    setimageurl(item.foodUrl);
  };
  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="MorningFood">
      <div className="line-container">
        <hr className="line" />
        <div className="text">
          <h1>Morning</h1>
        </div>
        <hr className="line" />
      </div>

      {/* old code  */}
      {/* 
<div className="Morning_Food_Container">
<div className="Foodcard-container" >
{foodItems && foodItems.data && Array.isArray(foodItems.data) &&
  foodItems.data
    .filter((item) => item.foodType === "breakfast")
    .map((item) => (
      <React.Fragment key={item.foodID}>
        <CartItem item={item}/>
      </React.Fragment>
    ))}
        </div>
</div> */}

      {/* taking refernce from eatfit website  */}

      <div className="morning_container_eatfit">
        <div className="morning_container_eatfit2">
          <div className="container1">
            {/* <div> */}
              <div className="container1_img">
                <img
                  src={imageurl}
                  alt="BhelMakhani2"
                  className="imageelement_container1"
                />
              </div>
            {/* </div> */}
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
                  <div
                    onClick={() => handleTabClick("How it works")}
                    className={`Container1_Item ${
                      activeTab === "How it works"
                        ? "Container1_Item_active"
                        : ""
                    }`}
                  >
                    How it works
                  </div>
                  <div
                    onClick={() => handleTabClick("Why subscribe")}
                    className={`Container1_Item ${
                      activeTab === "Why subscribe"
                        ? "Container1_Item_active"
                        : ""
                    }`}
                  >
                    Why subscribe
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
                                *&amp; Sun meals will not be delivered if
                                deliver on weekends is off
                              </p>
                            </div>

                            
                              <div className="container1_content_ImageTabContainer">
                              
                                <div className="container1_content_ImageTabList">
                                  {foodItems &&
                                    foodItems.data &&
                                    Array.isArray(foodItems.data) &&
                                    foodItems.data
                                      .filter(
                                        (item) => item.foodType === "breakfast"
                                      )
                                      .map((item, index) => (

                                        <div
                                          // className={selectedItem === item ? "container1_content_Image_active" : ""}
                                          
                                          onClick={() => handleItemClick(item)}
                                        >
                                          <img
                                            src={item.foodUrl}
                                            alt={item.foodName}
                                            // className={`container1_content_Image`}
                                            className={selectedItem === item ? "container1_content_Image_active" : "container1_content_Image"}
                                          />
                                          <p className="container1_content_DayText">
                                            {
                                              [
                                                
                                                "Mon",
                                                "Tue",
                                                "Wed",
                                                "Thu",
                                                "Fri",
                                                "Sat",
                                              ][index]
                                            }
                                          </p>
                                        </div>
                                      ))}
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
                {activeTab === "How it works" && (
                  <div class="css-w24bu7-TabContent e14t7k01">
                    <div
                      label="How it works"
                      class="css-ac35e1-TabItem en910n41"
                    >
                      <div
                        className="css-117zcp7-ProductListWidgetContainer eeur58a7"
                        style={{ padding: "10px 0px", display: "flex" }}
                      >
                        <div
                          className="product-list-widget"
                          style={{
                            borderBottom: "1px solid rgb(239, 239, 239)",
                          }}
                        >
                          <div class="css-56p0yi-Header eeur58a0"></div>
                          <div>
                            <div class="css-148zztk-actionRowWrapper">
                              <div>
                                <div class="css-9q8i2j-Cell eeur58a3">
                                  <div class="product-small-cell">
                                    <img src="https://curefoods-images.eatfit.in/tr:w-50,ar-5:6,c_fit//image/icons/howItWorks/packDetail_1.png" />
                                    <div producttype="">
                                      <p class="css-tlvw4q-TitleText e1hyp7w0">
                                        Our fresh meals will be delivered daily
                                        at your chosen time and address
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div class="css-9q8i2j-Cell eeur58a3">
                                  <div class="product-small-cell">
                                    <img src="https://curefoods-images.eatfit.in/tr:w-50,ar-5:6,c_fit//image/icons/howItWorks/pauseResume_1.png" />
                                    <div producttype="">
                                      <p class="css-tlvw4q-TitleText e1hyp7w0">
                                        Full flexibility in meal change,
                                        delivery time and address
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div class="css-9q8i2j-Cell eeur58a3">
                                  <div class="product-small-cell">
                                    <img src="https://curefoods-images.eatfit.in/tr:w-50,ar-5:6,c_fit//image/icons/howItWorks/refund_1.png" />
                                    <div producttype="">
                                      <p class="css-tlvw4q-TitleText e1hyp7w0">
                                        Reach out to our Customer Support via
                                        Whatsapp and share your feedback. We are
                                        always here to hear from you!
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Why subscribe" && (
                  <div class="css-w24bu7-TabContent e14t7k01">
                    <div
                      label="Why subscribe"
                      class="css-ac35e1-TabItem en910n41"
                    >
                      <div
                        className="css-117zcp7-ProductListWidgetContainer eeur58a7"
                        style={{ padding: "10px 0px" }}
                      >
                        <div
                          className="product-list-widget"
                          style={{
                            borderBottom: "1px solid rgb(239, 239, 239)",
                          }}
                        >
                          <div class="css-56p0yi-Header eeur58a0"></div>
                          <div>
                            <div class="css-w1btn4-actionTwoItemRowStyles">
                              <div class="css-1nlsc3d-InfoCell eeur58a4">
                                <div style={{ display: "flex", width: "100%" }}>
                                  <div
                                    className="product-info-cell"
                                    style={{
                                      objectFit: "contain",
                                      borderRadius: "9px",
                                      backgroundImage:
                                        "linear-gradient(281deg, rgb(145, 216, 255), rgb(124, 255, 214))",
                                    }}
                                  >
                                    <div class="img-container">
                                      <img
                                        src="https://djgt4pi2uqo7n.cloudfront.net/prod/assets/images/savings.svg"
                                        style={{
                                          height: "42px",
                                          width: "42px",
                                        }}
                                      />
                                    </div>
                                    <div class="text-container">
                                      <p>
                                        Save upto 25% with our Exclusive Meal
                                        Plans
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="css-1nlsc3d-InfoCell eeur58a4">
                                <div style={{ display: "flex", width: "100%" }}>
                                  <div
                                    className="product-info-cell"
                                    style={{
                                      objectFit: "contain",
                                      borderRadius: "9px",
                                      backgroundImage:
                                        "linear-gradient(95deg, rgb(244, 197, 255), rgb(251, 151, 194))",
                                    }}
                                  >
                                    <div class="img-container">
                                      <img
                                        src="https://djgt4pi2uqo7n.cloudfront.net/prod/assets/images/convenience.svg"
                                        style={{
                                          height: "42px",
                                          width: "42px",
                                        }}
                                      />
                                    </div>
                                    <div class="text-container">
                                      <p>
                                        Flexible plan: Change your plan anytime
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="css-1nlsc3d-InfoCell eeur58a4">
                                <div style={{ display: "flex", width: "100%" }}>
                                  <div
                                    class="product-info-cell"
                                    style={{
                                      objectFit: "contain",
                                      borderRadius: "9px",
                                      backgroundImage:
                                        "linear-gradient(281deg, rgb(145, 216, 255), rgb(124, 255, 214))",
                                    }}
                                  >
                                    <div class="img-container">
                                      <img
                                        src="https://djgt4pi2uqo7n.cloudfront.net/prod/assets/images/healthymeals.svg"
                                        style={{
                                          height: "42px",
                                          width: "42px",
                                        }}
                                      />
                                    </div>
                                    <div class="text-container">
                                      <p>Healthy homely meals everyday</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="css-1nlsc3d-InfoCell eeur58a4">
                                <div style={{ display: "flex", width: "100%" }}>
                                  <div
                                    className="product-info-cell"
                                    style={{
                                      objectFit: "contain",
                                      borderRadius: "9px",
                                      backgroundImage:
                                        "linear-gradient(95deg, rgb(244, 197, 255), rgb(251, 151, 194))",
                                    }}
                                  >
                                    <div class="img-container">
                                      <img
                                        src="https://djgt4pi2uqo7n.cloudfront.net/prod/assets/images/whatsapp_icon_empty.png"
                                        style={{
                                          height: "42px",
                                          width: "42px",
                                        }}
                                      />
                                    </div>
                                    <div class="text-container">
                                      <p>
                                        Contact our Customer Care for queries
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
            <div className="containeroverflow_Y">
              <div className="widgetrow">
                <div className="colm1">
                  <div class="pack-summary-widget no-border">
                    <div class="css-140e8aq-ProductHeaderWidgetContainer e4rxp0r0">
                      <div class="css-1sbql4a-TopContainerDiv e4rxp0r4">
                        <h1 class="css-ava5k2-TitleText e4rxp0r3">
                          Weight Loss Thali Veg &amp; Non-Veg
                        </h1>
                      </div>
                      <div class="css-17otamg-BottomContainerDiv e4rxp0r1">
                        <p class="css-j2duwn-BottomText e4rxp0r2">
                          <p class="css-j2duwn-BottomText e4rxp0r2">
                            A low calorie weight management plan constructed
                            with simple yet good quality, nutritious ingredients
                            that follow a calorie cap of 1500kcal (including
                            Breakfast, Lunch and Dinner). We make sure to please
                            your taste buds during this diet plan.
                          </p>
                        </p>
                        <p class="css-j2duwn-BottomText e4rxp0r2"></p>
                      </div>
                    </div>
                    <div class="container options-container">
                      
                          <div class="css-llv7ed-PackDurationWrapper e1xbwmax0">
                            <div class="css-1dvo6ju-PackPrice e1xbwmax1">
                              <h4 class="css-l3v3q5-StrikedOffText e1xbwmax11">
                                ₹1175
                              </h4>
                              <h4 class="css-3v5mc8-PackPriceText e1xbwmax2">
                                <span class="css-1do42gg-CurrencySymbol e1xbwmax8">
                                  ₹
                                </span>
                                750
                              </h4>
                              <span class="css-cxn0v3-MealDurationText e1xbwmax3">
                                for 5 days
                              </span>
                            </div>
                            <div class="css-1a2ksrv-PackInfoContainer e1xbwmax5">
                              {/* <img src="/assets/images/non-veg-new.svg" className="css-1igj5rm-PackTypeImg e1xbwmax4" /> */}
                              <div class="css-1avqi0l-PackPlanContainer e1xbwmax6">
                                <div
                                  size="2"
                                  class="css-d9eevg-PackPlan e1xbwmax7"
                                >
                                  Monthly
                                </div>
                                <div
                                  size="2"
                                  class="css-to5yzn-PackPlan e1xbwmax7"
                                >
                                  Weekly
                                </div>
                              </div>
                              <div class="css-2tb3dt-SwitchButtonContainer e1xbwmax9">
                                <div class="switch  ">
                                  <div class="switch-toggle"></div>
                                </div>
                                <span class="css-16c0h46-SwitchText e1xbwmax10">
                                  Include Weekends
                                </span>
                              </div>
                            </div>
                          </div>
                          
                            <div class="product-action-button">
                              <div
                                className="action-button normal-button"
                                style={{
                                  height: "40px",
                                  display: "flex",
                                  borderRadius: "5px",
                                  marginLeft: "10px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "1rem 1.5rem",
                                  minWidth: "100%",
                                  backgroundImage:
                                    "linear-gradient(rgb(5, 36, 101), rgb(5, 36, 101))",
                                  fontSize: "16px",
                                  color: "rgb(255, 255, 255)",
                                }}
                              >
                                <p>Subscribe Meal Plan</p>
                              </div>
                            </div>

                    </div>
                  </div>

                  <div type="line" class="css-sbklat-Separator eaz9pu80"></div>
                </div>
                {/* <div className="colm2"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorningFood;
