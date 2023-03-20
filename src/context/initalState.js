import { fetchCart, fetchUser ,fetchAdminUser } from "../utils/fetchLocalStorageData";
import { GetCart } from "../utils/ApiCall";
const userInfo = fetchUser();
const cartInfo = fetchCart();
const adminInfo = fetchAdminUser();

export const initialState = {
  user: userInfo,
  admin: adminInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
