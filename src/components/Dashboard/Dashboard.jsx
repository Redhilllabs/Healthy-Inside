import React, { useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import RecipeForm from "./RecipeDesignForm";
import ItemDesignForm from "./ItemDesign";
import SalesPlanForm from "./SalesPlanForm";
import ItemmanufacPlaner from "./ItemmanufacPlaner";
import ImportandExportLogForm from "./ImportandExportLogForm";
import TaskSheetForm from "./TaskSheetForm";
import OrderstatusForm from "./OrderstatusForm";
import PurchaseOrderForm from './PurchaseOrderForm';
import RMIProfileingForm from './RMIProfileingForm';
import RecordForwardLossesForm from './RecordForwardLossesForm';
import InventoryForm from './InventoryForm';
import Dailysalesmatricsform from './Dailysalesmatricsform';
import ViewSalesPlanform from './ViewSalesPlanform';
import PackingPlanner from './PackingPlanner';



const Dashboard = ( { showProfile , onProfileToggle }) => {

  const [{ user, admin }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [showrecipeform, setrecipeform] = useState(false);
  const [ShowinventoryForm, setShowinventoryForm] = useState(false);
  const [ShowPurchaseOrderForm, setShowPurchaseOrderForm] = useState(false);
  const [showSalesPlanForm, setShowSalesPlanForm] = useState(false);
  const [ShowPackingPlanner, setShowPackingPlanner] = useState(false);
  const [ShowViewSalesPlanform, setShowViewSalesPlanform] = useState(false);
  const [Showdailysalesmatricsform, setShowdailysalesmatricsform] = useState(false);
  const [ShowRecordForwardLossesForm, setShowRecordForwardLossesForm] = useState(false); 
  const [showItemDesignForm, setshowItemDesignForm] = useState(false);
  const [ShowItemmanufacturingPlannerForm,setShowItemmanufacturingPlannerForm] = useState(false);
  const [ShowImportandExportLogForm, setShowImportandExportLogForm] = useState(false);
  const [showTaskSheetForm, setShowTaskSheetForm] = useState(false);
  const [OprationsOption3, setOprationsOption3] = useState(false);
  const [OprationsOption1, setOprationsOption1] = useState(false);
  const [OprationsOption2, setOprationsOption2] = useState(false);
  const [ShowOrderstatusForm, setShowOrderstatusForm] = useState(false);
  const [showRMIProfileingForm,setshowRMIProfileingForm] = useState(false)



  const handleOprationsOption1 = () => {setOprationsOption1(!OprationsOption1);};
  const handleOprationsOption2 = () => {setOprationsOption2(!OprationsOption2);};
  const handleOprationsOption3 = () => {setOprationsOption3(!OprationsOption3);};
  
  const handleFormToggle = (formName) => {
    setshowRMIProfileingForm( formName === "RMIProfileingForm" ? !showRMIProfileingForm :false)

    setShowSalesPlanForm(
      formName === "salesPlanForm" ? !showSalesPlanForm : false
    );
    setShowPurchaseOrderForm(
      formName === "purchaseOrderForm" ? !ShowPurchaseOrderForm : false
    );
    setShowdailysalesmatricsform(
      formName === "dailySalesMatricsForm" ? !Showdailysalesmatricsform : false
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
      formName === "itemDesignForm"&& !showProfile ? !showItemDesignForm : false
    );
    setShowViewSalesPlanform(
      formName === "viewSalesPlanForm"&& !showProfile ? !ShowViewSalesPlanform : false
    );

    if(showProfile){
      onProfileToggle()
    }

  
    setShowPackingPlanner(
      formName === "packingPlannerForm" ? !ShowPackingPlanner : false
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
    setOprationsOption1(false)
    setOprationsOption2(false)
    setOprationsOption3(false)
  };

  const handleMarketing = () => {
    setShowMarketing(!showMarketing);
  };

  const handleFinance = () => {
    setShowFinance(!showFinance);
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
          <span className="logo_name">DashBoard</span>
        </div>
        <ul className="nav-links">
          <li>
            <div className="iocn-link" onClick={() => handleProducts()}>
              <a>
                <span className="link_name">Product & Research</span>
                {showProducts ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img id="arrow4" src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"/>
              )}
              </a>
            </div>
            <ul className="sub-menu">
              {showProducts && (
                <div id="product-dash">
                <a id={showrecipeform ? "active" : ""} onClick={() => handleFormToggle("recipeForm")} > Receipe Designing
                  </a>
                  <a  id={showItemDesignForm ? "active" : ""} onClick={() => handleFormToggle("itemDesignForm")}>
                    Item Design
                  </a>
                  <a>Receipe Profile</a>
                  <a>Item Profile</a>
                  <a id={showRMIProfileingForm ? "active" : ""} onClick={() => handleFormToggle("RMIProfileingForm")}>Raw Material Profileing</a> 
                </div>
              )}
            </ul>
          </li>

          <li>
            <div className="iocn-link" onClick={() => handleOperations()}>
              <a>
                <span className="link_name">Operations & Supply Chain</span>
                {showOperations ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
              </a>
              
            </div>
            <ul className="sub-menu">
              {showOperations && (
                <div id="multisubmenu">
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
                      <a>Order Tracking Delivery</a>
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
                <span className="link_name"> Business & Branding</span>
                {showMarketing ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
              </a>
              
            </div>
            <ul className="sub-menu">
              {showMarketing && (
                <div id="product-dash">
                <a>Upload File</a>
                  <a
                    id={Showdailysalesmatricsform ? "active" : ""}
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
                    id={ShowViewSalesPlanform ? "active" : ""}
                    // onClick={handelViewSalesPlanform}
                    onClick={() => handleFormToggle("viewSalesPlanForm")}
                  >
                    View Sales Plan
                  </a>
                  <a
                    id={ShowPackingPlanner ? "active" : ""}
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
                {showFinance ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="></img>
              ) : (
                <img
                  id="arrow4"
                  src="https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"
                />
              )}
              </a>
              
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
            <div className="iocn-link" >
              <a>
                <span className="link_name">Training</span>
              </a>
              
            </div>
            
          </li>
        </ul>
      </div>

      <div className="main_dashbord">
{/* product and Research option Form */}
        {showItemDesignForm && <ItemDesignForm />}
        {showrecipeform && <RecipeForm />}
        {showRMIProfileingForm && <RMIProfileingForm></RMIProfileingForm>}

{/* Oprations and Supply Chain Option form */}

        {/* option 1 */}
        {ShowPurchaseOrderForm && (<PurchaseOrderForm/>)}
        {ShowRecordForwardLossesForm && ( <RecordForwardLossesForm/>)}
        {ShowinventoryForm && ( <InventoryForm/> )}

        {/* option 2 */}
        {ShowItemmanufacturingPlannerForm && <ItemmanufacPlaner />}
        {ShowImportandExportLogForm && <ImportandExportLogForm />}
        {showTaskSheetForm && <TaskSheetForm />}

        {/* option 3 */}
        {ShowOrderstatusForm && <OrderstatusForm />}

{/* Business and Branding option form */}
        {Showdailysalesmatricsform && (<Dailysalesmatricsform/> )}
        {showSalesPlanForm && <SalesPlanForm />}
        {ShowViewSalesPlanform && (<ViewSalesPlanform/>)}
        {ShowPackingPlanner && (<PackingPlanner/>)}
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

      </div>
    </div>
  );
};

export default Dashboard;
