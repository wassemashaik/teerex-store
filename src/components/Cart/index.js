import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./index.css";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const Cart = () => (
  <CartContext.Consumer>
    {(value) => {
      const {
        cartList,
        removeAllCartItems,
        removeCartItem,
        increaseQuantityOfCartItem,
        decreaseQuantityOfCartItem,
        errorMsg,
      } = value;
      console.log(cartList);
      const onClickRemoveAllBtn = () => {
        removeAllCartItems();
      };

      const showEmptyView = cartList.length === 0;

      let total = 0;
      cartList.forEach((eachCartItem) => {
        total += eachCartItem.price * eachCartItem.quantity;
      });

      const onClickDecrement = (id) => {
        decreaseQuantityOfCartItem(id);
      };

      const onClickIncrement = (id) => {
        increaseQuantityOfCartItem(id);
      };

      const onRemoveCartItem = (id) => {
        removeCartItem(id);
      };

      return (
        <div>
          {showEmptyView ? (
            <div className="cart-empty-view-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-img"
                alt="cart empty"
              />
              <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
              <Link to="/">
                <button type="button" className="shop-now-btn">
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="cart-not-empty-container">
              <div className="heading-container">
                <h2 className="heading">My Cart</h2>
                <button
                  onClick={onClickRemoveAllBtn}
                  type="button"
                  className="remove-all-btn"
                >
                  Remove All
                </button>
              </div>
              <div className="cart-list-view-container">
                <ul className="cart-list">
                  {cartList.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <img
                        className="cart-product-image"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                      <div className="cart-item-details-container">
                        <div className="cart-product-title-brand-container">
                          <p className="cart-product-title">{item.name}</p>
                        </div>
                        <div className="cart-quantity-container">
                          <button
                            type="button"
                            className="quantity-controller-button"
                            onClick={() => onClickDecrement(item.id)}
                          >
                            <BsDashSquare color="#52606D" size={12} />
                          </button>
                          <p className="cart-quantity">{item.quantityInCart}</p>
                          <button
                            type="button"
                            className="quantity-controller-button"
                            onClick={() => onClickIncrement(item.id)}
                          >
                            <BsPlusSquare color="#52606D" size={12} />
                          </button>
                        </div>

                        <div className="total-price-remove-container">
                          <p className="cart-quantity">{item.price}</p>
                          <button
                            className="remove-button"
                            type="button"
                            onClick={() => onRemoveCartItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => onRemoveCartItem(item.id)}
                        data-testid="remove"
                      >
                        <AiFillCloseCircle color="#616E7C" size={20} />
                      </button>
                      {errorMsg && <p className="error-msg">{errorMsg}</p>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart-summary-container">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total </span>
                  Rs {total} /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
                <button className="checkout-button d-sm-none" type="button">
                  Checkout
                </button>
                <button type="button" className="checkout-button d-lg-none">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }}
  </CartContext.Consumer>
);

export default Cart;
