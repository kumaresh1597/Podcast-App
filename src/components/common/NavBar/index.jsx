import "./navStyle.css";

import React from 'react'
import { NavLink } from "react-router-dom";
import { auth } from "../../../firebase";
import {signOut} from "firebase/auth";
import { toast } from 'react-toastify';
import Button from "../Button";

const NavBar = () => {
  console.log(auth.currentUser);

  function handleLogOut(){
    signOut(auth)
    .then(()=>{
        toast.success("Logged out successfully");
    })
    .catch((error)=>{
        toast.error(error.message);
    });
  }

  return (
    <div className="nav-bar">
      <div className="gradient"></div>
       <nav className="links-container">
        {
          !auth.currentUser && <NavLink to="/">Sign Up</NavLink>
        }
        <NavLink to="/podcast">Podcasts</NavLink> 
        <NavLink to="/createPodcast">Start A podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <div className="logOut-btn">
        {
          auth.currentUser && (
            <Button name = "Log out" onClick={handleLogOut}/>
          )
        }
        </div>
        
       </nav>
    </div>
    
  )
}

export default NavBar;