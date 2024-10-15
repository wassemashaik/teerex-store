import React from "react";

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
  increaseQuantityOfCartItem: () => {},
  decreaseQuantityOfCartItem: () => {},
  errorMsg: "",
});

export default CartContext