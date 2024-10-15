import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartItem = (props) => {
  <CartContext.Consumer>
    {(value) => {
      const {
        removeCartItem,
        increaseQuantityOfCartItem,
        decreaseQuantityOfCartItem,
        errorMessage,
        cartList,
      } = value;
      const { cartItemDetails } = props;
      const { id, name, price, quantity, imageUrl } = cartItemDetails;
      const onClickDecrement = () => {
        decreaseQuantityOfCartItem(id);
      };

      const onClickIncrement = () => {
        increaseQuantityOfCartItem(id);
      };

      const onRemoveCartItem = () => {
        removeCartItem(id);
      };

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{name}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickIncrement}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{price}</p>
            </div>
            <div className="total-price-remove-container">
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </li>
      );
    }}
  </CartContext.Consumer>;
};

export default CartItem;
