import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Morninigfood from "./components/Morninigfood";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Account from "./components/Account";
import OrderSubmit from "./components/OrderSubmit";
import Dashboard from "./components/Dashboard/Dashboard";
import Cart from "./components/Cart";
import { getAllFoodItems } from "./utils/ApiCall";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import PrivateRoutes from "./Routes/PrivateRoute";
import PublicRoutes from "./Routes/PublicRoute";
import AdminRoutes from "./Routes/AdminRoute"

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  // const fetchData = async () => {
  //   await getAllFoodItems().then((data) => {
  //     dispatch({
  //       type: actionType.SET_FOOD_ITEMS,
  //       foodItems: data.data,
  //     });
  //   });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <Router>
      <Header onProfileToggle={handleProfileToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morninigfood" element={<Morninigfood />} />

          <Route element={<AdminRoutes></AdminRoutes>}>
          {/* <Route path="/urvi" element={<Dashboard  showProfile={showProfile} onProfileToggle={handleProfileToggle} />}></Route> */}
          </Route>

          <Route element={<PrivateRoutes></PrivateRoutes>}>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/oderSubmit" element={<OrderSubmit />}></Route>
          
          </Route>

          <Route element={<PublicRoutes></PublicRoutes>}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Adminlogin" element={<AdminLogin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Route>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
