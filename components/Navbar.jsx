import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="logo">
        <span >iTask</span>
      </div>
      <ul className='lists'>
        <li className='list'>Home</li>
        <li className='list'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
