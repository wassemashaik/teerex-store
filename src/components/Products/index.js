import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import Header from "../Header";
import "./index.css";
import CartContext from "../../context/CartContext";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export default function Products() {
  const [tshirtList, setTshirtList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchInput, setSearchInput] = useState("");

  const getTshirts = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const apiUrl =
      " https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
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

  const renderSuccessView = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        return (
          <div className="success-view-container">
            <ul className="unorder-list">
              {tshirtList.length > 0 ? (
                tshirtList.map((eachItem) => (
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
                      <button className="add-button">Add to Cart</button>
                    </div>
                  </li>
                ))
              ) : (
                <div>No list found</div>
              )}
            </ul>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  const renderAll = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return "initial";
      case apiStatusConstants.inProgress:
        return "loading...";
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return "failed.";
      default:
        return null;
    }
  };
  return (
    <div>
      <Header />
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
            <IoIosSearch className="search-icon" />
          </button>
          <button className="filter-button">
            <CiFilter />
          </button>
        </div>
      </div>
      <div className="side-filter-container"></div>
      {renderSuccessView()}
    </div>
  );
}
