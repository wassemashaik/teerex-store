import React from 'react'
import { BsCart3 } from "react-icons/bs";
import './index.css'

export default function Header() {
  return (
    <nav className='header-container'>
      <div className='header-wrapper'>
        <h1>Teerex Store</h1>
        <div className='nav-items'>
            <a href='/' className='product'>Products</a>
            <a href='/cart'><BsCart3 className='icon' /></a>
        </div>
      </div>
    </nav>
  )
}

