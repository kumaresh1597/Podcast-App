import "./navStyle.css";

import React from 'react'
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="gradient"></div>
       <nav className="links-container">
        <NavLink to="/">Sign Up</NavLink>
        <NavLink to="/podcast">Podcasts</NavLink> 
        <NavLink to="/createPodcast">Start A podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
       </nav>
    </div>
    
  )
}

export default NavBar;