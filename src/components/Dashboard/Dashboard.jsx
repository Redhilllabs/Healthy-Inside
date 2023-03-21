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
import PurchaseOrderForm from "./PurchaseOrderForm";
import RMIProfileingForm from "./RMIProfileingForm";
import RecordForwardLossesForm from "./RecordForwardLossesForm";
import InventoryForm from "./InventoryForm";
import Dailysalesmatricsform from "./Dailysalesmatricsform";
import ViewSalesPlanform from "./ViewSalesPlanform";
import PackingPlanner from "./PackingPlanner";

const Dashboard = ({ showProfile, onProfileToggle }) => {
  const [{ user, admin }, dispatch] = useStateValue();
  // State variables for the different forms
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
  const [Showdailysalesmatricsform, setShowdailysalesmatricsform] =useState(false);
  const [ShowRecordForwardLossesForm, setShowRecordForwardLossesForm] =useState(false);
  const [showItemDesignForm, setshowItemDesignForm] = useState(false);
  const [ShowItemmanufacturingPlannerForm,setShowItemmanufacturingPlannerForm] = useState(false);
  const [ShowImportandExportLogForm, setShowImportandExportLogForm] = useState(false);
  const [showTaskSheetForm, setShowTaskSheetForm] = useState(false);
  const [OprationsOption3, setOprationsOption3] = useState(false);
  const [OprationsOption1, setOprationsOption1] = useState(false);
  const [OprationsOption2, setOprationsOption2] = useState(false);
  const [ShowOrderstatusForm, setShowOrderstatusForm] = useState(false);
  const [showRMIProfileingForm, setshowRMIProfileingForm] = useState(false);

  const handleFormToggle = (formName) => {
    setshowRMIProfileingForm(
      formName === "RMIProfileingForm" ? !showRMIProfileingForm : false
    );

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
      formName === "itemDesignForm" && !showProfile
        ? !showItemDesignForm
        : false
    );
    setShowViewSalesPlanform(
      formName === "viewSalesPlanForm" && !showProfile
        ? !ShowViewSalesPlanform
        : false
    );

    if (showProfile) {
      onProfileToggle();
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
  
  const handleOperations = () => {
    setShowOperations(!showOperations);
    setOprationsOption1(false);
    setOprationsOption2(false);
    setOprationsOption3(false);
  };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_Admin_USER,
      admin: null,
    });
    navigate("/urvi", { replace: true });
  };

  const forms = [
    { show: showItemDesignForm, component: ItemDesignForm },
    { show: showrecipeform, component: RecipeForm },
    { show: showRMIProfileingForm, component: RMIProfileingForm },
    { show: ShowPurchaseOrderForm, component: PurchaseOrderForm },
    { show: ShowRecordForwardLossesForm, component: RecordForwardLossesForm },
    { show: ShowinventoryForm, component: InventoryForm },
    { show: ShowItemmanufacturingPlannerForm, component: ItemmanufacPlaner },
    { show: ShowImportandExportLogForm, component: ImportandExportLogForm },
    { show: showTaskSheetForm, component: TaskSheetForm },
    { show: ShowOrderstatusForm, component: OrderstatusForm },
    { show: Showdailysalesmatricsform, component: Dailysalesmatricsform },
    { show: showSalesPlanForm, component: SalesPlanForm },
    { show: ShowViewSalesPlanform, component:ViewSalesPlanform }, 
    { show :ShowPackingPlanner,component:PackingPlanner }
  ];
  const imgsrc1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3UOw5AQBRG4ZN4xGotgo51UKBRWYF1EcktJiQe45co5jQ3RuKb24BQ6C/FQG7zkyKgARagBxI1sN28M2C22Sk3cjeo7Kyw50GxkQvUu3elAjoDJNAd4BX0BPCCfIBH0Aa0nsAtSAFcQikwCgAXmoCMXer/USz+XijEsRUb0yyhQVIxNQAAAABJRU5ErkJggg=="
const imgsrc2 = "https://img.icons8.com/ios-glyphs/30/null/expand-arrow--v1.png"

  return (
    <div className="dashboard">
      <div className="dashboard_sidebar">
        <div className="logo-details">
          <span className="logo_name">DashBoard</span>
        </div>
        <ul className="nav-links">

        <li>
  <div className="iocn-link" onClick={() => setShowProducts(!showProducts)}>
    <a>
      <span className="link_name">Product R&D</span>
      {showProducts ? (
        <img src={imgsrc1} />
      ) : (
        <img id="arrow4" src={imgsrc2} />
      )}
    </a>
  </div>
  <ul className="sub-menu">
    {showProducts && (
      <div id="product-dash">
        <a id={showrecipeform ? "active" : ""} onClick={() => handleFormToggle("recipeForm")}>Recipe Designing</a>
        <a id={showItemDesignForm ? "active" : ""} onClick={() => handleFormToggle("itemDesignForm")}>Item Design</a>
        <a>Recipe Profile</a>
        <a>Item Profile</a>
        <a id={showRMIProfileingForm ? "active" : ""} onClick={() => handleFormToggle("RMIProfileingForm")}>Raw Material Profiling</a>
      </div>
    )}
  </ul>
</li>
          <li>
            <div className="iocn-link" onClick={() => handleOperations()}>
              <a>
                <span className="link_name">Operations & Supply Chain</span>
                {showOperations ? (
                  <img src={imgsrc1}></img> ) : ( <img  id="arrow4"  src={imgsrc2}/> )}
              </a>
            </div>
            <ul className="sub-menu">
              {showOperations && (
                <div id="multisubmenu">
                  <li>
                    <div  className="iocn-link" onClick={() => setOprationsOption1(!OprationsOption1)}>
                      <a>Inventory Management</a>
                      {OprationsOption1 ? (<img src={imgsrc1}></img>) : (<img id="arrow4" src={imgsrc2} />)}
                    </div>
                    <ul className="sub-menu">
                      {OprationsOption1 && (
                        <div id="product-dash">
                          <a id={ShowPurchaseOrderForm ? "active" : ""} onClick={() => handleFormToggle("purchaseOrderForm")}>View Purchase Order</a>
                          <a  id={ShowRecordForwardLossesForm ? "active" : ""} onClick={() => handleFormToggle("recordForwardLossesForm")}> Record Forward & Losses</a>
                          <a id={ShowinventoryForm ? "active" : ""} onClick={() => handleFormToggle("inventoryForm")}> Purchase Log Entry</a>
                        </div>
                      )}
                    </ul>
                  </li>
                  <li>
  <div className="iocn-link" onClick={() => setOprationsOption2(!OprationsOption2)}>
    <a>Manufacturing</a>
    {OprationsOption2 ? (
      <img src={imgsrc1} />
    ) : (
      <img id="arrow4" src={imgsrc2} />
    )}
  </div>
  <ul className="sub-menu">
    {OprationsOption2 && (
      <div id="product-dash">
        <a id={ShowItemmanufacturingPlannerForm ? "active" : ""} onClick={() => handleFormToggle("itemManufacturingPlannerForm")}>Item manufacturing Planner</a>
        <a id={ShowImportandExportLogForm ? "active" : ""} onClick={() => handleFormToggle("importAndExportLogForm")}>Import and Export Log</a>
        <a id={showTaskSheetForm ? "active" : ""} onClick={() => handleFormToggle("taskSheetForm")}>Task Sheet </a>
        
      </div>
    )}
  </ul>
</li>
                  <li>
  <div className="iocn-link" onClick={() => setOprationsOption3(!OprationsOption3)}>
    <a>Order Tracking Delivery</a>
    {OprationsOption3 ? (
      <img src={imgsrc1} />
    ) : (
      <img id="arrow4" src={imgsrc2} />
    )}
  </div>
  <ul className="sub-menu">
    {OprationsOption3 && (
      <div id="product-dash">
        <a id={ShowOrderstatusForm ? "active" : ""} onClick={() => handleFormToggle("OrderstatusForm")}>Order Active</a>
        <a>Order Completed</a>
      </div>
    )}
  </ul>
</li>
                </div>
              )}
            </ul>
          </li>
<li>
  <div className="iocn-link" onClick={() => setShowMarketing(!showMarketing)}>
    <a>
      <span className="link_name">Business & Branding</span>
      {showMarketing ? (
        <img src={imgsrc1} />
      ) : (
        <img id="arrow4" src={imgsrc2} />
      )}
    </a>
  </div>
  <ul className="sub-menu">
    {showMarketing && (
      <div id="product-dash">
        <a>Upload File</a>
        <a id={Showdailysalesmatricsform ? "active" : ""} onClick={() => handleFormToggle("dailySalesMatricsForm")}>Daily Sales Matrics</a>
        <a id={showSalesPlanForm ? "active" : ""} onClick={() => handleFormToggle("salesPlanForm")}>Sale Forecast Planner</a>
        <a id={ShowViewSalesPlanform ? "active" : ""} onClick={() => handleFormToggle("viewSalesPlanForm")}>View Sales Plan</a>
        <a id={ShowPackingPlanner ? "active" : ""} onClick={() => handleFormToggle("packingPlannerForm")}>Packaging Planner</a>
      </div>
    )}
  </ul>
</li>

<li>
  <div className="iocn-link" onClick={() => setShowFinance(!showFinance)}>
    <a>
      <span className="link_name">Finance & Metrics</span>
      {showFinance ? (
        <img src={imgsrc1} />
      ) : (
        <img id="arrow4" src={imgsrc2} />
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
  <div className="iocn-link">
    <a><span className="link_name">Training center</span></a>
  </div>
</li>

        </ul>
      </div>

      <div className="main_dashbord">
      {forms.map(({show ,component}) => (show ? React.createElement(component) : null))}
        {/* profile Form */}
        {showProfile && (
  <div className="formcontains">
    <form id="profile_form_dashboard">
      <h2>Profile</h2>
      <label>Name: {admin.email.split("@")[0].replace("hi", "")}</label>
      <label>Email: {admin.email}</label>
      <label>Company's mail id: <input type="email" /></label>
      <label>Mobile no.: {admin.contact}</label>
      <div class="button-container">
        <div onClick={logout} id="recipebutton" type="submit" name="submit">Log out</div>
      </div>
    </form>
  </div>
)}
      </div>
    </div>
  );
};
export default Dashboard;