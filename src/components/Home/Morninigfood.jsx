import React, { useState, useEffect } from "react";
import "./MorningFood.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import CartItem from "../Cart/CartItem";
import BhelMakhani2 from "../../images/BhelMakhani2.jpg";

const MorningFood = () => {
  const [{ foodItems }, dispatch] = useStateValue();
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
            <div>
              <div className="container1_img">
                <img
                  src={BhelMakhani2}
                  alt="BhelMakhani2"
                  className="imageelement_container1"
                />
              </div>
            </div>
            <div>
              <div className="tabs">
                <ul className="Container1_options">
                  <div
                    label="Upcoming meals"
                    className="Container1_Item_active"
                  >
                    Upcoming meals
                  </div>
                  <div label="How it works" className="Container1_Item">
                    How it works
                  </div>
                  <div label="Why subscribe" className="Container1_Item">
                    Why subscribe
                  </div>
                </ul>

                <div className="container1_content">
                  <div>
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
                              * Sat &amp; Sun meals will not be delivered if
                              deliver on weekends is off
                            </p>
                          </div>

                          <div>
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
                                      <div className="container1_content_ImageTab">
                                        <img
                                          src={item.foodUrl}
                                          alt="rajma-1-thepla-wild-rice-thali-with-sprouts"
                                          className="container1_content_Image"
                                        />
                                        <p className="container1_content_DayText">
                                          Thu
                                        </p>
                                      </div>
                                    ))}
                              </div>
                              <div className="container1_content_ImageTabContent">
                                <div
                                  alt="rajma-1-thepla-wild-rice-thali-with-sprouts"
                                  // className="container1_content_ImageTabContent"/
                                >
                                  <div className="container1_content_ProductLargeCellContainer">
                                    <div className="container1_content_HeaderContainer">
                                      <p className="container1_content_DayText">
                                        Thu, 20 Apr
                                      </p>
                                    </div>
                                    <div className="container1_content_TitleContainer">
                                      <p className="css-15piyio-TitleText e1tfloc31">
                                        Rajma, 1 Thepla &amp; Wild Rice Thali
                                        with Sprouts
                                      </p>
                                    </div>
                                    <p className="container1_content_SubTitleText">
                                      classNameic Rajma plated with methi
                                      thepla, wild rice mix, and raita as sides.
                                      A full wholesome packed meal. Allergen
                                      Information- Contains Gluten, dairy
                                    </p>
                                    <div className="container1_content_NutritionWidgetWrapper">
                                      <h4 className="container1_content_NutritionTitle">
                                        Nutritional Info.
                                      </h4>
                                      <div className="container1_content_NutritionSubtitle">
                                        550 - Calories
                                      </div>
                                      <div className="container1_content_NutritionBarContainer">
                                        <div className="container1_content_WrapperContainerDiv">
                                          <div
                                            width="13.571428571428571"
                                            className="WrapperDiv1"
                                          ></div>
                                          <div
                                            width="13.571428571428571"
                                            className="WrapperDiv2"
                                          ></div>
                                          <div
                                            width="60"
                                            className="WrapperDiv3"
                                          ></div>
                                          <div
                                            width="12.857142857142856"
                                            className="WrapperDiv4"
                                          ></div>
                                        </div>
                                      </div>
                                      <div className="NutritionInfoWrapper">
                                        <div className="NutritionInfoContainer">
                                          <div className="NutritionIcon1"></div>
                                          <div className="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Protein
                                          </div>
                                          <div className="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            19g
                                          </div>
                                        </div>
                                        <div className="NutritionInfoContainer">
                                          <div className="NutritionIcon2"></div>
                                          <div className="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Fat
                                          </div>
                                          <div className="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            19g
                                          </div>
                                        </div>
                                        <div className="NutritionInfoContainer">
                                          <div className="NutritionIcon3"></div>
                                          <div className="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Carbs
                                          </div>
                                          <div className="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            84g
                                          </div>
                                        </div>
                                        <div className="NutritionInfoContainer">
                                          <div className="NutritionIcon4"></div>
                                          <div className="css-ptjx8p-NutritionType e1jpgr0i9">
                                            Fibre
                                          </div>
                                          <div className="css-1tl9shv-NutritionQuantity e1jpgr0i10">
                                            18g
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
                      </div>
                    </div>
                  </div>
                </div>
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
                              with simple yet good quality, nutritious
                              ingredients that follow a calorie cap of 1500kcal
                              (including Breakfast, Lunch and Dinner). We make
                              sure to please your taste buds during this diet
                              plan.
                            </p>
                          </p>
                          <p class="css-j2duwn-BottomText e4rxp0r2"></p>
                        </div>
                      </div>
                      <div class="container options-container">
                        <div>
                          <div>
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
                            <div>
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
    backgroundImage: "linear-gradient(rgb(5, 36, 101), rgb(5, 36, 101))",
    fontSize: "16px",
    color: "rgb(255, 255, 255)"
  }}
> 

                                  <p>Subscribe Meal Plan</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      type="line"
                      class="css-sbklat-Separator eaz9pu80"
                    ></div>
                </div>
                <div className="colm2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorningFood;
