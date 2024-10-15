import Products from "./components/Products";
import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartContext from "./context/CartContext";
import Cart from "./components/Cart";

function App() {
  const [cartList, setCartList] = useState([]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const increaseQuantityOfCartItem = (id) => {
    setCartList((prevState) => ({
      cartList: prevState.cartList.map((eachItem) => {
        if (id === eachItem.id) {
          if (prevState.quantity <= eachItem.quantity) {
            const updatedQuantity = eachItem.quantity + 1;
            return { ...eachItem, quantity: updatedQuantity };
          } else {
            alert("Not Sufficent quantity");
          }
        }
        return eachItem;
      }),
    }));
  };

  const decreaseQuantityOfCartItem = (id) => {
    const productObject = cartList.find((eachItem) => eachItem.id === id);
    if (productObject.quantity > 1) {
      setCartList((prevState) => ({
        cartList: prevState.cartList.map((eachItem) => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1;
            return { ...eachItem, quantity: updatedQuantity };
          }
          return eachItem;
        }),
      }));
    }
  };

  const removeCartItem = (id) => {
    const updatedCartList = cartList.filter(
      (eachCartItem) => eachCartItem.id !== id
    );
    setCartList(updatedCartList);
  };

  const addCartItem = (product) => {
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === product.id
    );
    if (productObject) {
      setCartList((prevState) => ({
        cartList: prevState.cartList.map((eachCart) => {
          if (productObject.id === eachCart.id) {
            const updatedCartQuantity = eachCart.quantity + product.quantity;

            return { ...eachCart, quantity: updatedCartQuantity };
          }
          return eachCart;
        }),
      }));
    } else {
      const updatedCartList = [...cartList, product];
      setCartList(updatedCartList);
    }
  };
  return (
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
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
