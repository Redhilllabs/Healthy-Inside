import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAllFoodItems } from "./utils/ApiCall";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import PrivateRoutes from "./Routes/PrivateRoute";
import PublicRoutes from "./Routes/PublicRoute";
import AdminRoutes from "./Routes/AdminRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Morninigfood from "./components/Morninigfood";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Account from "./components/Account";
import OrderSubmit from "./components/OrderSubmit";
import Dashboard from "./components/Dashboard/Dashboard";
import Cart from "./components/Cart";
import './App.css'

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const handleProfileToggle = useCallback(() => {
    setShowProfile(prev => !prev);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllFoodItems();
      dispatch({ type: actionType.SET_FOOD_ITEMS, payload: data });
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header onProfileToggle={handleProfileToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morninigfood" element={<Morninigfood />} />

          <Route element={<AdminRoutes></AdminRoutes>}>
            <Route path="/urvi" element={<Dashboard showProfile={showProfile} />} />
          </Route>

          <Route element={<PrivateRoutes></PrivateRoutes>}>
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/oderSubmit" element={<OrderSubmit />} />
          </Route>

          <Route element={<PublicRoutes></PublicRoutes>}>
            <Route path="/login" element={<Login />} />
            <Route path="/Adminlogin" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
