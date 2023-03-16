import logo from "./logo.svg";
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
import { getAllFoodItems,GetCart} from "./utils/mongodbFunctions";
import React, { useEffect ,useState} from "react";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import PublicRoutes from "./Routes/PublicRoute";
import PrivateRoutes from "./Routes/PrivateRoute";
import AdminRoutes from "./Routes/AdminRoute";


function App() {
  
  // fetching data to store into State foodItems from mongodbfuntion getAllFoodItems
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const [{ foodItems,user }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      // console.log("food items",data.data)
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data.data,
      });
    });


  };

  const fetchcartData= async()=>{

  if(user?.cart){
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: user?.cart,
      });
      localStorage.setItem("cartItems", JSON.stringify( user?.cart));
    }
  }
  

  useEffect(() => {
    fetchData();
    // fetchcartData()
  }, []);

  return (
    <div className="App">
      <Router>
      <Header  onProfileToggle={handleProfileToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morninigfood" element={<Morninigfood />} />

          <Route element={<AdminRoutes></AdminRoutes>}>
          <Route path="/urvi" element={<Dashboard  showProfile={showProfile} />}></Route>
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
