import React, { useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import RecipeForm from "./RecipeForm";
import ItemDesignForm from "./ItemDesign";
import SalesPlanForm from "./SalesPlanForm";
import ItemmanufacPlaner from "./ItemmanufacPlaner";
import ImportandExportLogForm from "./ImportandExportLogForm";
import TaskSheetForm from "./TaskSheetForm";
import OrderstatusForm from "./OrderstatusForm";
const Dashboard = () => {
  const [{ user, admin }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [option, setoption] = useState(false);
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };
  // const toggleoption = () => {
  //   setoption(!option);
  // };
  const [showProducts, setShowProducts] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  // const [showTech, setShowTech] = useState(false);
  const [showrecipeform, setrecipeform] = useState(false);
  const [ShowinventoryForm, setShowinventoryForm] = useState(false);
  const [showblogwriting, setshowblogwriting] = useState(false);
  // const [serviceList, setserviceList] = useState([
  //   { unit: "gram", quantity: "1", ingredient_name: "Asafoetida (हींग/Heeng)" },
  // ]);

  const [showProfile, setShowProfile] = useState(false);
  // const [ingredient_name, setingredient_name] = useState("");
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [showInventoryTable, setShowInventoryTable] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [miniBlog, setMiniBlog] = useState("");
  const [blog, setBlog] = useState("");
  // const [blogItemName, setBlogItemName] = useState("");
  // const [showProfileBlog, setShowProfileBlog] = useState(false);
  // const [profile, setProfile] = useState("");
  // const [showBlogTable, setShowBlogTable] = useState(false);
  const [files, setFiles] = useState(null);
  const [ShowPurchaseOrderForm, setShowPurchaseOrderForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [recipeformprocedure, setrecipeformprocedure] = useState(false);
  // const [recipeformMiniBlog, setrecipeformMiniBlog] = useState(false);
  const [labels, setLabels] = useState(false);
  const [showSalesPlanForm, setShowSalesPlanForm] = useState(false);

  const [PackingPlanner, setPackingPlanner] = useState(false);
  const [ViewSalesPlanform, setViewSalesPlanform] = useState(false);
  const [ViewSalesPlanstartDate, setViewSalesPlanStartDate] = useState("");
  const [ViewSalesPlanendDate, setViewSalesPlanEndDate] = useState("");
  // const [ViewSalesPlanstable, setViewSalesPlanstable] = useState(false);
  const [dailysalesmatricsform, setdailysalesmatricsform] = useState(false);
  const [dailysalesmatricsdate, setdailysalesmatricsdate] = useState("");
  const [showdailysalesmatricstable, setshowdailysalesmatricstable] =
    useState(false);
  const [ShowRecordForwardLossesForm, setShowRecordForwardLossesForm] =
    useState(false);
  const [RecordForwardLossesdate, setRecordForwardLossesDate] = useState("");
  const [RecordForwardLossesitemName, setRecordForwardLossesItemName] =
    useState("");
  const [
    RecordForwardLossesspecification,
    setRecordForwardLossesSpecification,
  ] = useState("");
  const [RecordForwardLossesquantity, setRecordForwardLossesQuantity] =
    useState("");
  const [RecordForwardLossesunits, setRecordForwardLossesUnits] = useState("");
  const [
    RecordForwardLossesestimatedValue,
    setRecordForwardLossesEstimatedValue,
  ] = useState("");
  const [showRecordForwardLossestable, setshowRecordForwardLossestable] =
    useState(false);

  const [ShowViewPurchaseOrderTable, setShowViewPurchaseOrderTable] =
    useState(false);
  const [showItemDesignForm, setshowItemDesignForm] = useState(false);

  const [OprationsOption1, setOprationsOption1] = useState(false);

  const handleOprationsOption1 = () => {
    setOprationsOption1(!OprationsOption1);
  };
  const [OprationsOption2, setOprationsOption2] = useState(false);

  const handleOprationsOption2 = () => {
    setOprationsOption2(!OprationsOption2);
  };
  const [
    ShowItemmanufacturingPlannerForm,
    setShowItemmanufacturingPlannerForm,
  ] = useState(false);

  // const handleItemmanufacturingPlannerForm = () => {
  //   setShowItemmanufacturingPlannerForm(!ShowItemmanufacturingPlannerForm);
  // };

  const [ShowImportandExportLogForm, setShowImportandExportLogForm] =
    useState(false);

  // const handleImportandExportLogForm = () => {
  //   setShowImportandExportLogForm(!ShowImportandExportLogForm);
  //   // add any other logic you need to handle the state change
  // };

  const [showTaskSheetForm, setShowTaskSheetForm] = useState(false);

  // const handleTaskSheetForm = () => {
  //   setShowTaskSheetForm(!showTaskSheetForm);
  //   // add any other logic you want to execute when the link is clicked
  // };

  const [OprationsOption3, setOprationsOption3] = useState(false);

  const handleOprationsOption3 = () => {
    setOprationsOption3(!OprationsOption3);
  };

  const [ShowOrderstatusForm, setShowOrderstatusForm] = useState(false);

  // const handleOrderstatusForm = () => {
  //   setShowOrderstatusForm(true);
  // };

  // const handleFileChange = (event) => {
  //   setFiles(event.target.files);
  // };

  // function handleItemNameBlogChange(e) {
  //   setBlogItemName((prev) => (prev ? "" : "Blog"));
  //   setShowProfileBlog((prev) => !prev);
  // }

  // const handleBlogSubmit = (event) => {
  //   event.preventDefault();
  //   if (!blog || !miniBlog || !blogTitle || !files) {
  //     alert("field required");
  //     return;
  //   }
  //   setShowBlogTable(true);
  //   // submit logic goes here
  // };

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

  const handleUnitPriceChange = (event) => {
    setUnitPrice(parseFloat(event.target.value));
  };

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  // const handelblogwriting = () => {
  //   setshowblogwriting(!showblogwriting);
  //   setShowinventoryForm(false);
  //   setrecipeform(false);
  //   // setShowTable(false);
  //   setShowProfile(false);
  //   setShowInventoryTable(false);
  // };

  const handleViewSalesPlanStartDateChange = (event) => {
    setViewSalesPlanStartDate(event.target.value);
  };

  const handleViewSalesPlanEndDateChange = (event) => {
    setViewSalesPlanEndDate(event.target.value);
  };

  const handleViewSalesPlansubmit = () => {};

  const handledailysalesmatricsDateChange = (event) => {
    setdailysalesmatricsdate(event.target.value);
  };

  const handledailysalesmatricssubmit = () => {
    setshowdailysalesmatricstable(true);
  };

  const handleRecordForwardLossesDateChange = (event) => {
    setRecordForwardLossesDate(event.target.value);
  };

  const handleRecordForwardLossesItemNameChange = (event) => {
    setRecordForwardLossesItemName(event.target.value);
  };

  const handleRecordForwardLossesSpecificationChange = (event) => {
    setRecordForwardLossesSpecification(event.target.value);
  };

  const handleRecordForwardLossesQuantityChange = (event) => {
    setRecordForwardLossesQuantity(event.target.value);
  };

  const handleRecordForwardLossesUnitsChange = (event) => {
    setRecordForwardLossesUnits(event.target.value);
  };

  const handleRecordForwardLossesEstimatedValueChange = (event) => {
    setRecordForwardLossesEstimatedValue(event.target.value);
  };

  const handleRecordForwardLossesSubmit = (event) => {
    event.preventDefault();
    setshowRecordForwardLossestable(true);
    // do something with the form data
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleViewPurchaseOrder = () => {
    setShowViewPurchaseOrderTable(true);
  };

  const handleFormToggle = (formName) => {
    setShowSalesPlanForm(
      formName === "salesPlanForm" ? !showSalesPlanForm : false
    );
    setShowPurchaseOrderForm(
      formName === "purchaseOrderForm" ? !ShowPurchaseOrderForm : false
    );
    setdailysalesmatricsform(
      formName === "dailySalesMatricsForm" ? !dailysalesmatricsform : false
    );
    setShowinventoryForm(
      formName === "inventoryForm" ? !ShowinventoryForm : false
    );
    setrecipeform(formName === "recipeForm" ? !showrecipeform : false);
    setShowRecordForwardLossesForm(
      formName === "recordForwardLossesForm"
        ? !ShowRecordForwardLossesForm
        : false
    );
    setshowItemDesignForm(
      formName === "itemDesignForm" ? !showItemDesignForm : false
    );
    setViewSalesPlanform(
      formName === "viewSalesPlanForm" ? !ViewSalesPlanform : false
    );
    setShowProfile(formName === "profileForm" ? !showProfile : false);
    setshowdailysalesmatricstable(
      formName === "dailySalesMatricsTable"
        ? !showdailysalesmatricstable
        : false
    );
    setshowRecordForwardLossestable(
      formName === "recordForwardLossesTable"
        ? !showRecordForwardLossestable
        : false
    );
    setShowInventoryTable(
      formName === "inventoryTable" ? !showInventoryTable : false
    );
    setPackingPlanner(
      formName === "packingPlannerForm" ? !PackingPlanner : false
    );
    setShowItemmanufacturingPlannerForm(
      formName === "itemManufacturingPlannerForm"
        ? !ShowItemmanufacturingPlannerForm
        : false
    );
    setShowImportandExportLogForm(
      formName === "importAndExportLogForm"
        ? !ShowImportandExportLogForm
        : false
    );
    setShowTaskSheetForm(
      formName === "taskSheetForm" ? !showTaskSheetForm : false
    );
    setShowOrderstatusForm(
      formName === "OrderstatusForm" ? !ShowOrderstatusForm : false
    );
  };

  

  const handleProducts = () => {
    setShowProducts(!showProducts);
  };

  const handleOperations = () => {
    setShowOperations(!showOperations);
  };

  const handleMarketing = () => {
    setShowMarketing(!showMarketing);
  };

  const handleFinance = () => {
    setShowFinance(!showFinance);
  };

  const handleInventorySubmitForm = () => {
    setShowInventoryTable(true);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_Admin_USER,
      admin: null,
    });
    window.location.reload(true);
    navigate("/urvi");
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
            <div className="iocn-link" onClick={() => handleProducts()}>
              <a>
                {/* <img  src="https://img.icons8.com/material-outlined/24/null/shipping-product.png"/> */}
                <span className="link_name">Product & Research</span>
              </a>
              {showProducts ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
            </div>
            <ul className="sub-menu">
              {showProducts && (
                <div id="product-dash">
                  <a>Upload File</a>
                  <a
                    id={showItemDesignForm ? "active" : ""}
                    onClick={() => handleFormToggle("itemDesignForm")}
                    // onClick={handelItemDesignForm}
                  >
                    Item designing
                  </a>
                  <a>Item Profile</a>
                  <a>Receipe Profile</a>
                  <a
                    id={showrecipeform ? "active" : ""}
                    onClick={() => handleFormToggle("recipeForm")}
                    // onClick={handelrecipeform}
                  >
                    Receipe Designing
                  </a>
                </div>
              )}
            </ul>
          </li>

          <li>
            <div className="iocn-link" onClick={() => handleOperations()}>
              <a>
                {/* <img src="https://img.icons8.com/external-parzival-1997-detailed-outline-parzival-1997/64/null/external-operation-digital-transformation-parzival-1997-detailed-outline-parzival-1997.png"/> */}
                <span className="link_name">Operations & Supply Chain</span>
              </a>
              {showOperations ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
            </div>
            <ul className="sub-menu">
              {showOperations && (
                <div id="product-dash">
                  <li>
                    <div
                      className="iocn-link"
                      onClick={() => handleOprationsOption1()}
                    >
                      <a>Invetory Management</a>
                      {OprationsOption1 ? (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
                      ) : (
                        <img
                          id="arrow4"
                          src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                        />
                      )}
                    </div>
                    <ul className="sub-menu">
                      {OprationsOption1 && (
                        <div id="product-dash">
                          <a
                            id={ShowPurchaseOrderForm ? "active" : ""}
                            onClick={() =>
                              handleFormToggle("purchaseOrderForm")
                            }
                            //  onClick={handelPurchseOrderForm}
                          >
                            {" "}
                            View Purchase Order
                          </a>
                          <a
                            id={ShowRecordForwardLossesForm ? "active" : ""}
                            onClick={() =>
                              handleFormToggle("recordForwardLossesForm")
                            }
                            //  onClick={handelRecordForwardLossesForm}
                          >
                            {" "}
                            Record Forward & Losses
                          </a>
                          <a
                            id={ShowinventoryForm ? "active" : ""}
                            onClick={() => handleFormToggle("inventoryForm")}
                            // onClick={handelinventoryForm}
                          >
                            Purchase Log Entry
                          </a>
                        </div>
                      )}
                    </ul>
                  </li>
                  <li>
                    <div
                      className="iocn-link"
                      onClick={() => handleOprationsOption2()}
                    >
                      <a>Manufacturing</a>
                      {OprationsOption2 ? (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
                      ) : (
                        <img
                          id="arrow4"
                          src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                        />
                      )}
                    </div>
                    <ul className="sub-menu">
                      {OprationsOption2 && (
                        <div id="product-dash">
                          <a
                            id={
                              ShowItemmanufacturingPlannerForm ? "active" : ""
                            }
                            onClick={() =>
                              handleFormToggle("itemManufacturingPlannerForm")
                            }

                            // onClick={handleItemmanufacturingPlannerForm}
                          >
                            Item manufacturing Planner
                          </a>
                          <a
                            id={ShowImportandExportLogForm ? "active" : ""}
                            onClick={() =>
                              handleFormToggle("importAndExportLogForm")
                            }
                            // onClick={handleImportandExportLogForm}
                          >
                            Import and Export Log{" "}
                          </a>
                          <a
                            id={showTaskSheetForm ? "active" : ""}
                            onClick={() => handleFormToggle("taskSheetForm")}
                            //  onClick={handleTaskSheetForm}
                          >
                            Task Sheet{" "}
                          </a>
                        </div>
                      )}
                    </ul>
                  </li>
                  <li>
                    <div
                      className="iocn-link"
                      onClick={() => handleOprationsOption3()}
                    >
                      <a>Tracking Delivery</a>
                      {OprationsOption3 ? (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
                      ) : (
                        <img
                          id="arrow4"
                          src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                        />
                      )}
                    </div>
                    <ul className="sub-menu">
                      {OprationsOption3 && (
                        <div id="product-dash">
                          <a
                            id={ShowOrderstatusForm ? "active" : ""}
                            onClick={() => handleFormToggle("OrderstatusForm")}
                            // onClick={handleOrderstatusForm}
                          >
                            Order status
                          </a>
                          <a>Order Deilvered</a>
                        </div>
                      )}
                    </ul>
                  </li>
                </div>
              )}
            </ul>
          </li>

          <li>
            <div className="iocn-link" onClick={() => handleMarketing()}>
              <a>
                {/* <img  src="https://img.icons8.com/windows/32/null/add-pie-chart-report.png"/> */}
                <span className="link_name"> Business & Branding</span>
              </a>
              {showMarketing ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
            </div>
            <ul className="sub-menu">
              {showMarketing && (
                <div id="product-dash">
                  {/* <a href="#" onClick={handelblogwriting}>
                    Blog Writing
                  </a> */}
                  <a
                    id={dailysalesmatricsform ? "active" : ""}
                    onClick={() => handleFormToggle("dailySalesMatricsForm")}
                    // onClick={handeldailysalesmatricsform}
                  >
                    Daily Sales Matrics
                  </a>
                  <a
                    id={showSalesPlanForm ? "active" : ""}
                    onClick={() => handleFormToggle("salesPlanForm")}
                    // onClick={handleSalesPlanForm}
                  >
                    Sale Forecast Planner
                  </a>
                  <a
                    id={ViewSalesPlanform ? "active" : ""}
                    // onClick={handelViewSalesPlanform}
                    onClick={() => handleFormToggle("viewSalesPlanForm")}
                  >
                    View Sales Plan
                  </a>
                  <a
                    id={PackingPlanner ? "active" : ""}
                    onClick={() => handleFormToggle("packingPlannerForm")}
                    // onClick={handelPackingPlanner}
                  >
                    Packaging planner
                  </a>
                </div>
              )}
            </ul>
          </li>

          <li>
            <div className="iocn-link" onClick={() => handleFinance()}>
              <a>
                <span className="link_name">Finance & Metrics </span>
              </a>
              {showFinance ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
            </div>
            <ul className="sub-menu">
              {showFinance && (
                <div id="product-dash">
                  <a>MRP Calculator</a>
                  <a>Glance</a>
                  <a>Budget</a>
                </div>
              )}
            </ul>
          </li>
          <li>
            <div className="iocn-link" id={showProfile ? "active" : ""}>
              <a>
                {/* <img src="https://img.icons8.com/sf-black/64/null/deposit.png"/> */}
                <span
                  onClick={() => handleFormToggle("profileForm")}
                  // onClick={handleProfileForm}
                  className="link_name"
                >
                  Profile
                </span>
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div className="main_dashbord">
        {/* product and Research option Form */}
        {showItemDesignForm && <ItemDesignForm />}
        {showrecipeform && <RecipeForm />}

        {/* Oprations and Supply Chain Option form */}

        {/* option 1 */}
        {ShowPurchaseOrderForm && (
          <div className="formcontains">
            <h1>View Purchase Order</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label htmlFor="start-date-input">Start Date:</label>
                <input
                  type="date"
                  id="start-date-input"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className="option_container">
                <label htmlFor="end-date-input">End Date:</label>
                <input
                  type="date"
                  id="end-date-input"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handleViewPurchaseOrder}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Purchase Order
                </div>
              </div>
            </form>
          </div>
        )}
        {ShowRecordForwardLossesForm && (
          <div className="formcontains">
            <h1>Record Forward and Losses </h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label>Date:</label>
                <input
                  type="date"
                  value={RecordForwardLossesdate}
                  onChange={handleRecordForwardLossesDateChange}
                />
              </div>
              <div className="option_container">
                <label>Item Name:</label>
                <select
                  value={RecordForwardLossesitemName}
                  onChange={handleRecordForwardLossesItemNameChange}
                >
                  <option value="">Select an item</option>
                  <option value="Brown Rice Idli">Brown Rice Idli</option>
                  <option value="Jau Pulao">Jau Pulao</option>
                  <option value="Minty Appe">Minty Appe</option>
                  <option value="Palak Meethi Cutlets">
                    Palak Meethi Cutlets
                  </option>
                  <option value="Ragi Chila">Ragi Chila</option>
                  <option value="Ragi Dosa">Ragi Dosa</option>
                  <option value="Ramas Dal Moth">Ramas Dal Moth</option>
                  <option value="Roti Tacos">Roti Tacos</option>
                  <option value="Tofu Parantha">Tofu Parantha</option>
                </select>
              </div>

              <div className="option_container">
                <label>Units:</label>
                <input
                  type="text"
                  value={RecordForwardLossesunits}
                  onChange={handleRecordForwardLossesUnitsChange}
                />
              </div>
              <div className="option_container">
                <label>Estimated Value:</label>
                <input
                  type="number"
                  value={RecordForwardLossesestimatedValue}
                  onChange={handleRecordForwardLossesEstimatedValueChange}
                />
              </div>
              <div className="option_container">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={RecordForwardLossesquantity}
                  onChange={handleRecordForwardLossesQuantityChange}
                />
              </div>
              <div className="option_container">
                <label>Specification:</label>
                <input
                  type="text"
                  value={RecordForwardLossesspecification}
                  onChange={handleRecordForwardLossesSpecificationChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handleRecordForwardLossesSubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
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
                <label for="Item">Item Name</label>
                <select
                  id="itemIPL"
                  name="Item"
                  value={itemName}
                  onChange={handleItemNameChange}
                  required
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
                <input
                  type="number"
                  name="Unit"
                  id="unitIPL"
                  value={unit}
                  onChange={handleUnitChange}
                  required
                />
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

              <div className="option_container">
                <label for="Unit-Price">Unit Price</label>
                <input
                  type="number"
                  name="Unit-Price"
                  id="unitPriceIPL"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  required
                />{" "}
              </div>

              <div class="button-container">
                <div
                  onClick={handleInventorySubmitForm}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  Submit
                </div>
              </div>
            </form>
          </div>
        )}

        {/* option 2 */}
        {ShowItemmanufacturingPlannerForm && <ItemmanufacPlaner />}
        {ShowImportandExportLogForm && <ImportandExportLogForm />}
        {showTaskSheetForm && <TaskSheetForm />}
        {/* option 3 */}
        {ShowOrderstatusForm && <OrderstatusForm />}

        {/* Business and Branding option form */}
        {dailysalesmatricsform && (
          <div className="formcontains">
            <h1>Daily Sales Metrics</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={dailysalesmatricsdate}
                  onChange={handledailysalesmatricsDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handledailysalesmatricssubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Sales Metrics
                </div>
              </div>
            </form>
          </div>
        )}
        {showSalesPlanForm && <SalesPlanForm />}

        {ViewSalesPlanform && (
          <div className="formcontains">
            <h1>View Sales Plan</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
            >
              <div className="option_container">
                <label htmlFor="start-date-input">Start Date:</label>
                <input
                  type="date"
                  id="start-date-input"
                  value={ViewSalesPlanstartDate}
                  onChange={handleViewSalesPlanStartDateChange}
                />
              </div>

              <div className="option_container">
                <label htmlFor="end-date-input">End Date:</label>
                <input
                  type="date"
                  id="end-date-input"
                  value={ViewSalesPlanendDate}
                  onChange={handleViewSalesPlanEndDateChange}
                />
              </div>

              <div class="button-container">
                <div
                  onClick={handleViewSalesPlansubmit}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  View Sales plan
                </div>
              </div>
            </form>
          </div>
        )}
        {PackingPlanner && (
          <div className="formcontains">
            <h1>Packing Planner</h1>
            <form class="form" id="recipe-designing">
              <div>
                <label for="Receipe Name">Select Item Name</label>
                <input
                  type="text"
                  name="reciepeNameRD"
                  id="reciepeNameRD"
                  required
                />
              </div>
              <div>
                <label for="Receipe Name">Select packageing to be used</label>
                <input
                  type="text"
                  name="reciepeNameRD"
                  id="reciepeNameRD"
                  required
                />
              </div>

              <div id="addmoreingredients">Add To Package</div>
            </form>
          </div>
        )}

        {/* profile Form */}
        {showProfile && (
          <div className="formcontains">
            <form id="profile_form_dashboard">
              <h2>Profile</h2>
              <label>
                Name: {admin.email.split("@")[0].replace("hi", "")}
                {/* <input type="text" value={admin.email.split("@")[0].replace("hi", "")}  /> */}
              </label>
              <br />
              <label>
                Email: {admin.email}
                {/* <input type="text"  value={admin.email}  /> */}
              </label>
              <br />
              <label>
                Company's mail id:
                <input type="email" />
              </label>
              <br />
              <label>
                Mobile no.: {admin.contact}
                {/* <input type="tel" value={admin.contact} /> */}
              </label>
              <br />
              <div class="button-container">
                <div
                  onClick={logout}
                  id="recipebutton"
                  type="submit"
                  name="submit"
                >
                  Log out
                </div>
              </div>
            </form>
          </div>
        )}

        {showdailysalesmatricstable && (
          <div className="table-container">
            <h2>Daily Sales</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dailysalesmatricsdate}</td>
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setshowdailysalesmatricstable(false)}
              >
                cancel
              </div>
              <div id="recipebutton_save">Save</div>
            </div>
          </div>
        )}

        {showRecordForwardLossestable && (
          <div className="table-container">
            <h2>Record Forward Losses</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item Name</th>
                  <th>Specifications</th>
                  <th>Quantity</th>
                  <th>Unit </th>
                  <th>Estimated Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{RecordForwardLossesdate}</td>
                  <td>{RecordForwardLossesitemName}</td>
                  <td>{RecordForwardLossesspecification}</td>
                  <td>{RecordForwardLossesquantity}</td>
                  <td>{RecordForwardLossesunits}</td>
                  <td>{RecordForwardLossesestimatedValue}</td>
                </tr>
              </tbody>
            </table>
            <div id="tabel_controllers">
              <div
                id="recipebutton_close"
                onClick={() => setshowRecordForwardLossestable(false)}
              >
                cancel
              </div>
              <div id="recipebutton_save">Save</div>
            </div>
          </div>
        )}

        {showInventoryTable && (
          <div className="table-container">
            <h2>Purchase Log</h2>
            <br />
            <table className="showInventoryTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item Name</th>
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
              <div id="recipebutton_save">Save</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
