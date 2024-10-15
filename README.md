# Title

    TeeRex Store

## Objective

    simple webapp where customers can browse through catalog of t-shirts, add t-shirts to shopping cart and checkout the items

## Tech Stack

    React js
## Routes
 -tshirt catalog page
 -cart page
 -checkout page
## Completion Instructions:
* Search Input 
-Search box placeholder text should start with Search
-Search icon/button should have className as search-button-container OR trigger search on ENTER
-Search if triggered by button should have button text as Search
* filter 
- Filter labels should be given and match exactly. 
* Cart
-Cart Page navigated as "/cart"
-Cart link should be an anchor tag
-Cart page should also have images being displayed along with item details.
## AVOID ##
-Avoid using libraries like material UI and bootstrap for basic html components like buttons, checkboxes, textbox etc

### Functionality
# Main Page #
- each tshirt card should have name, image, price
- search query can be name, color, type ex: green polo
- filters should contain gender, color, price range, type
# Cart Page #
- Add items to shopping cart
- by clicking the cart item in the header it should be directed to cart page
- can increase quantity of item or delete the item
- display the total amount of items in the cart page

#### Must Have
- every item has a limited quantity, if user tries to order more than the qunatity then error msg should be displayed
- filter can be applied individually or with search result
- all features(search, filter and add to cart etc) should be on client side
- no need of user authorization
- no need of pagination
- no API's provided

#### Nice to Have

    List the bonus features or tasks mentioned in the Assignment, if any

### Guidelines to develop a project

#### Must Have

    List the necessary guidelines to follow while developing the project, mentioned in the Assignment, if any

#### Nice to Have

    List the additional/suggested guidelines to follow while developing the project, mentioned in the Assignment, if any

### Submission Instructions

#### Must Have

    List the Instructions to follow while submitting the project mentioned in the Assignment, if any

#### Nice to Have

    List the suggested instructions to follow while submitting the project mentioned in the Assignment, if any

## Resources

### Design files

    List the references of design files required for the Assignment

### APIs

    List the APIs, providing any relevant endpoints, documentation links, or access keys, required for the Assignment if any

### Third-party packages

    List the Third-party packages required for the Assignment, if any

    <div className="side-filter-container-sm" id="filterContainer">
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
          <div className="price-container" onChange={handlePriceRange}>
            <h4 className="heading">Price Range</h4>
            <label></label>
            <input type="checkbox" />
          </div>
        </div>

<div className="cart-not-empty-container">
                <h2>My Cart</h2>
                <button
                  onClick={onClickRemoveAllBtn}
                  type="button"
                  className="remove-all-btn"
                >
                  Remove All
                </button>
                <div className="cart-list-view">
                  <ul className="cart-list">
                    {cartList.map((eachCartItem) => (
                      <CartItem
                        cartItemDetails={eachCartItem}
                        key={eachCartItem.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>        