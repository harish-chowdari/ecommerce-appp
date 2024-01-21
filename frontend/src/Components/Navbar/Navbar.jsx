import React from 'react'
import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_down from "../Assets/dropdown_icon.png"

export const Navbar = () => {

    const [menu,setMenu] = React.useState("shop")
    const {getTotalCartItems} = React.useContext(ShopContext)

    const menuRef=React.useRef()

    const dropdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open')
    }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='logo'/>
            <p>SHOPPER</p>
        </div>
            <img className='drop-down' onClick={dropdown_toggle} src={drop_down} alt=''  />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>setMenu("shop")}>
                 <Link style={{textDecoration:'none'}} to="/">Shop</Link>
                  {menu === "shop" ?<hr/>:<></>}  </li>
                 <li onClick={()=>setMenu("menu")}>
                <Link style={{textDecoration:'none'}} to="/men">Men</Link>
                  {menu === "menu" ? <hr/>:<></>} </li>
                 <li onClick={()=>setMenu("women")}>
                <Link style={{textDecoration:'none'}} to="/women">Women</Link>
                  {menu === "women" ? <hr/>:<></>}</li>
                 <li onClick={()=>setMenu("kids")}>
                <Link style={{textDecoration:'none'}} to="/kids">Kids</Link>
                  {menu === "kids" ? <hr/>:<></>}</li>
            </ul>

            <div className='nav-login-cart'>
              {localStorage.getItem("auth-token")
              ? <button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")} }>Logout</button>: 
              <Link style={{textDecoration:'none'}} to="/login">  <button>Login</button></Link> }

            
            <Link style={{textDecoration:'none'}} to="/cart">    <img src={cart_icon} alt='cart-icon' /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
    
    </div>
  )
}
