import Products from "./components/Products";
import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartContext from "./context/CartContext";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Home from "./components/Home";

const App = () => {
  const [cartList, setCartList] = useState([]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const addCartItem = (product) => {
    const productObj = cartList.find(
      (eachCartItem) => eachCartItem.id === product.id
    );

    if (productObj) {
      setCartList((prevCartList) =>
        prevCartList.map((eachItem) => {
          if (productObj.id === eachItem.id) {
            if (eachItem.quantityInCart < eachItem.quantity) {
              const updatedQuantity = eachItem.quantityInCart + 1;
              return { ...eachItem, quantityInCart: updatedQuantity };
            } else {
              alert("Not enough stock available");
              return eachItem;
            }
          }
          return eachItem;
        })
      );
    } else {
      setCartList((prevCart) => [
        ...prevCart,
        {
          ...product,
          quantityInCart: 1,
          quantity: product.quantity,
        },
      ]);
    }
  };

  const increaseQuantityOfCartItem = (id) => {
    const existingCartItem = cartList.find((item) => item.id === id);

    if (existingCartItem) {
      const stockAvailable = existingCartItem.quantity; // Total stock available
      const currentQuantity = existingCartItem.quantityInCart; // Current quantity in cart

      if (currentQuantity < stockAvailable) {
        // If current quantity in the cart is less than stock available, allow increment
        setCartList((prevCart) =>
          prevCart.map((item) =>
            item.id === id
              ? { ...item, quantityInCart: item.quantityInCart + 1 } // Increase cart quantity
              : item
          )
        );
        // Clear any previous error
      } else {
        // Error if trying to exceed stock limit
        alert("Not enough stock available");
      }
    }
  };

  const decreaseQuantityOfCartItem = (id) => {
    const existingItem = cartList.find((item) => item.id === id);

    if (existingItem && existingItem.quantityInCart > 1) {
      setCartList(
        cartList.map((item) =>
          item.id === id
            ? { ...item, quantityInCart: item.quantityInCart - 1 }
            : item
        )
      );
    } else {
      removeCartItem(id);
    }
  };

  const removeCartItem = (id) => {
    setCartList(cartList.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: addCartItem,
          removeAllCartItems: removeAllCartItems,
          removeCartItem: removeCartItem,
          increaseQuantityOfCartItem: increaseQuantityOfCartItem,
          decreaseQuantityOfCartItem: decreaseQuantityOfCartItem,
        }}
      >
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default App;
