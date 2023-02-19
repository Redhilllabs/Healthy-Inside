const cartModule = (() => {
    let cart = [];
  
    const getCart = () => cart;
  
    const addToCart = (product) => {
      const existingProductIndex = cart.findIndex((item) => item.id === product.id);
      if (existingProductIndex === -1) {
        cart.push({ ...product, quantity: 1 });
      } else {
        cart[existingProductIndex].quantity++;
      }
    };
  
    const removeFromCart = (productId) => {
      const productIndex = cart.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
          cart[productIndex].quantity--;
        } else {
          cart.splice(productIndex, 1);
        }
      }
    };
  
    const clearCart = () => {
      cart = [];
    };
  
    return {
      getCart,
      addToCart,
      removeFromCart,
      clearCart,
    };
  })();
  
  export default cartModule;
  