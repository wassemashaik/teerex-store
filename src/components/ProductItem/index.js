import { FaRupeeSign } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import "./index.css";

const ProductItem = (props) => {
  <CartContext.Consumer>
    {(value) => {
      const { addCartItem } = value;

      const { filteredTshirts } = props;
      const { id, name, imageUrl, price } = filteredTshirts;

      console.log("product item:",filteredTshirts);

      const onAddToCart = (product) => {
        const productWithQunatity = {
          ...product,
          quantityInCart: 1,
          quantity: product.quantity,
        };
        addCartItem(productWithQunatity);
      };

      return (
        <li className="list-item" key={id}>
          <img className="image" src={imageUrl} alt={name} />
          <h5 className="name">{name}</h5>
          <div className="bottom-container">
            <p className="price">
              <FaRupeeSign /> {price}
            </p>
            <button
              type="button"
              className="add-button"
              onClick={ onAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </li>
      );
    }}
  </CartContext.Consumer>;
};

export default ProductItem;
