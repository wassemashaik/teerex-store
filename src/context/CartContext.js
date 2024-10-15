import React from "react";

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
  increaseQuantityOfCartItem: () => {},
  decreaseQuantityOfCartItem: () => {},
  errorMessage: "",
});

export default CartContext