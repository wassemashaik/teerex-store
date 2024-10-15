import CartContext from "../../context/CartContext";
import "./index.css";

const CartSummary = () => {
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value;

      
      return (
        <>
          
        </>
      );
    }}
  </CartContext.Consumer>;
};

export default CartSummary;
