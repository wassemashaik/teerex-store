import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import "rc-slider/assets/index.css";
import "./index.css";
import CartContext from "../../context/CartContext";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Products = () => {
  const [tshirtList, setTshirtList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const getTshirts = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`;
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = data.map((item) => ({
        id: item.id,
        imageUrl: item.imageURL,
        name: item.name,
        type: item.type,
        price: item.price,
        currency: item.currency,
        color: item.color,
        gender: item.gender,
        quantity: item.quantity,
      }));
      setTshirtList(updatedData);
      const colors = [...new Set(updatedData.map((item) => item.color))];
      setUniqueColors(colors);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getTshirts();
  }, []);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handlePriceRange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPriceRange((prevRange) => [...prevRange, value]);
    } else {
      setPriceRange((prevRange) =>
        prevRange.filter((range) => range !== value)
      );
    }
  };

  const handleFiltersVisibility = () => {
    setShowFilters((prevState) => !prevState);
  };

  const filteredTshirts = tshirtList.filter((item) => {
    const matchedSearch =
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.color.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.type.toLowerCase().includes(searchInput.toLowerCase());
    const matchedGender =
      selectedGender === "" || item.gender === selectedGender;
    const matchedColor = selectedColor === "" || item.color === selectedColor;
    const matchedPrice =
      priceRange.length === 0 ||
      priceRange.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return item.price >= min && item.price <= max;
      });
    const matchedType = selectedType === "" || item.type === selectedType;

    return (
      matchedSearch &&
      matchedColor &&
      matchedGender &&
      matchedPrice &&
      matchedType
    );
  });

  const renderSuccessView = () => (
    <CartContext.Consumer>
      {(value) => {
        const { addCartItem } = value;

        const onAddToCart = (product) => {
          const productWithQunatity = {
            ...product,
            quantityInCart: 1,
            quantity: product.quantity,
          };
          addCartItem(productWithQunatity);
        };

        return (
          <div className="main-container">
            <div
              className={`side-filter-container ${showFilters ? "show" : ""}`}
            >
              <div className="type-container">
                <h4 className="heading">Type</h4>
                <select value={selectedType} onChange={handleTypeChange}>
                  <option value="">All</option>
                  <option value="Polo">Polo</option>
                  <option value="Basic">Basic</option>
                  <option value="Hoodie">Hoodie</option>
                </select>
              </div>
              <div className="gender-container">
                <h4 className="heading">Gender</h4>
                <select value={selectedGender} onChange={handleGenderChange}>
                  <option value="">All</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="color-container">
                <h4 className="heading">Color</h4>
                {uniqueColors.map((color) => (
                  <label key={color}>
                    <input
                      className="input-color"
                      value={color}
                      type="checkbox"
                      onChange={handleColorChange}
                      checked={selectedColor.includes(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
              <div className="price-container">
                <h4 className="heading">Price</h4>
                <label>
                  <input
                    onChange={handlePriceRange}
                    type="checkbox"
                    checked={priceRange.includes("0-200")}
                    value="0-200"
                  />
                  0-200
                </label>
                <label>
                  <input
                    onChange={handlePriceRange}
                    type="checkbox"
                    checked={priceRange.includes("201-400")}
                    value="201-400"
                  />
                  201-400
                </label>
                <label>
                  <input
                    onChange={handlePriceRange}
                    checked={priceRange.includes("401-500")}
                    type="checkbox"
                    value="401-500"
                  />
                  401-500
                </label>
              </div>
            </div>
            <div className="success-view-container">
              <ul className="unorder-list">
                {filteredTshirts.length > 0 ? (
                  filteredTshirts.map((eachItem) => (
                    <li className="list-item" key={eachItem.id}>
                      <img
                        className="image"
                        src={eachItem.imageUrl}
                        alt={eachItem.name}
                      />
                      <h5 className="name">{eachItem.name}</h5>
                      <div className="bottom-container">
                        <p className="price">
                          <FaRupeeSign /> {eachItem.price}
                        </p>
                        <button
                          type="button"
                          className="add-button"
                          onClick={() => onAddToCart(eachItem)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <div>No list found</div>
                )}
              </ul>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  const renderLoadingView = () => {
    <div className="loader-container">
      <FiLoader />
    </div>;
  };

  const renderFailureView = () => (
    <div className="failure-container">
      Oops!! Something went terribly wrong
    </div>
  );
  const renderAll = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={onChangeSearchInput}
        />
        <div className="buttons-container">
          <button className="search-button-container">
            <p className="search-icon">Search</p>
          </button>
          <button
            type="button"
            className="filter-button"
            onClick={handleFiltersVisibility}
          >
            <CiFilter />
          </button>
        </div>
      </div>
      {renderAll()}
    </div>
  );
};

export default Products;
