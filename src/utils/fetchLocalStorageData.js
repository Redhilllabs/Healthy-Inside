const fetchFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item !== "undefined" ? JSON.parse(item) : localStorage.clear();
};

export const fetchUser = () => fetchFromLocalStorage("user");
export const fetchAdminUser = () => fetchFromLocalStorage("admin");
export const fetchCart = () => fetchFromLocalStorage("cartItems");