import React from 'react'
import {Link} from 'react-router-dom'
import { BsCart3 } from "react-icons/bs";
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      
      return (
        <nav className='header-container'>
          <div className='header-wrapper'>
            <Link className='product' to="/"><h1>Teerex Store</h1></Link>
            <div className='nav-items'>
                <Link to='/' className='product'>Products</Link>
                <Link to='/cart'><BsCart3 className='icon' /></Link>
                <span className="cart-count-badge">{cartList.length}</span>
            </div>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)  
export default Header
