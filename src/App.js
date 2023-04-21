import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAllFoodItems ,GetCart,getUser  } from "./utils/ApiCall";
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
  const [{ foodItems, user }, dispatch] = useStateValue();
  // console.log("foodItems",foodItems)
  const handleProfileToggle = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);
  
  const fetchData = async () => {
    let foodItemsData = [];
    let cartData = null;
    let userData = null;
  
    if (user?.email) {
      [foodItemsData, cartData, userData] = await Promise.all([
        getAllFoodItems(),
        GetCart(JSON.stringify({ email: user.email })),
        getUser(JSON.stringify({ email: user.email })),
      ]);
  
      if (userData?.Item) {
        // dispatch({ type: actionType.SET_USER, user: userData.Item });
        // localStorage.setItem('user', JSON.stringify(userData.Item));
      }
    } else {
      foodItemsData = await getAllFoodItems();
    }
  
    dispatch({ type: actionType.SET_FOOD_ITEMS, foodItems: foodItemsData });
  
    if (cartData?.Item?.cart) {
      dispatch({ type: actionType.SET_CARTITEMS, cartItems: cartData.Item.cart });
      localStorage.setItem('cartItems', JSON.stringify(cartData.Item.cart));
    } else {
      localStorage.removeItem('cartItems');
    }
  };
  
  useEffect(() => {
    fetchData().catch((error) => console.error('Error fetching data:', error));
  }, [dispatch, user]);
  
  
  

  return (
    <>
      <Router>
        <Header onProfileToggle={handleProfileToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          

          <Route element={<AdminRoutes></AdminRoutes>}>
            <Route
              path="/urvi"
              element={<Dashboard showProfile={showProfile} />}
            />
          </Route>

          <Route element={<PrivateRoutes></PrivateRoutes>}>
            <Route path="/morningfood" element={<Morninigfood />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderSubmit" element={<OrderSubmit />} />
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
