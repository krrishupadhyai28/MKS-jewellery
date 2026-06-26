import React from 'react'
import './Navbar.css'
import Logo_Light from '../../assets/Logo-Light.png'
import Logo_Dark from '../../assets/Logo-Dark.png'
import Daylight from '../../assets/daylight.png'
import night_mode from '../../assets/night-mode.png'
import search from '../../assets/search.png'
import Search2 from '../../assets/search2.png'
import background from '../../assets/background.jpg'

const Navbar = ({theme, setTheme}) => {


    const toggle_mode = ()=>{
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }
  return (
    <div  className='Navbar'>
     <img onClick={()=>{toggle_mode()}} // Swap Logo_Dark and Logo_Light here
src={theme == 'light' ? Logo_Dark : Logo_Light} alt="" className='logo' />
     <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Pricing</li>
        <li>About Us</li>
     </ul>
     <div className='Search-Box'>
        <input type='text' placeholder='Search'/>
        <img onClick={()=>{toggle_mode()}}       src={theme == 'light'? search : Search2} alt="" className='search-icon'/>
     </div>
     <img onClick={()=>{toggle_mode()}}src={theme == 'light'? Daylight: night_mode} alt='' className='toggle-icon'/>
    </div>
  )
}

export default Navbar
