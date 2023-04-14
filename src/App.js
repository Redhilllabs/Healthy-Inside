import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAllFoodItems } from "./utils/ApiCall";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import PrivateRoutes from "./Routes/PrivateRoute";
import PublicRoutes from "./Routes/PublicRoute";
import AdminRoutes from "./Routes/AdminRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Morninigfood from "./components/Home/Morninigfood";
import Login from "./components/Auth/Login";
import AdminLogin from "./components/Auth/AdminLogin";
import Account from "./components/Home/Account";
import OrderSubmit from "./components/Cart/OrderSubmit";
import Dashboard from "./components/Urvi/Dashboard";
import Cart from "./components/Cart/Cart";
import "./App.css";

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const handleProfileToggle = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllFoodItems();
      // console.log("getting food Items",data)
      dispatch({ type: actionType.SET_FOOD_ITEMS, foodItems: data });
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
            <Route
              path="/urvi"
              element={<Dashboard showProfile={showProfile} />}
            />
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
