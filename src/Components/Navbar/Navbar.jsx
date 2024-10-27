import React, { useRef, useState, useContext } from 'react'
import './Navbar.css'
import { ShopContext } from '../../Context/ShopContext'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import menuIcon from '../Assets/menu_icon.png'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();
  const {getTotalCartItems} = useContext(ShopContext);

  const menuToggle = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>BJ Store</p>
      </div>
      <img className='nav-dropdown' onClick={menuToggle} src={menuIcon} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=> setMenu("shop")}> <Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "shop" ? <hr/> : <></>}</li>
        <li onClick={()=> setMenu("mens")}> <Link style={{textDecoration: 'none'}} to='mens'>Men</Link> {menu === "mens" ? <hr/> : <></>}</li>
        <li onClick={()=> setMenu("womens")}> <Link style={{textDecoration: 'none'}} to='women'>Women</Link> {menu === "womens" ? <hr/> : <></>}</li>
        <li onClick={()=> setMenu("kids")}> <Link style={{textDecoration: 'none'}} to='kids'>Kids</Link> {menu === "kids" ? <hr/> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ? <button onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button> : 
        <Link to='/login'><button>Login</button></Link>
        }
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
