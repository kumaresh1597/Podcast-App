import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import SignUpForm from '../components/SignUpComponents/SignUpForm';
import LogInForm from '../components/SignUpComponents/LogInForm';
import NavBar from '../components/common/NavBar';
import { auth} from '../firebase';

import apple from "../components/common/Assets/applePodcast.png"


const Signup = () => {

  const [flag,setFlag] = useState(true);
  const navigate = useNavigate();
  console.log(auth.currentUser);

  useEffect(()=>{
    if(auth.currentUser){
      navigate("/profile");
    }
  });


  return (
    <>
      <NavBar/>
      <div className="sign-up-page">
        <div className='hero-img'>
          <img src={apple} alt="Header img" />
        </div>
        <div className="input-wrapper">
          <h1 className="header-div">
            {
              flag ? "Sign Up" : "Log In"
            }
          </h1>
          {
            flag? <SignUpForm /> : <LogInForm />
          }
          <h4 className="footer-div">
            {
              flag? "Already have an account? " : "Don't have an account? "
            }
            <Link onClick={()=>setFlag(!flag)}>{ flag ? "Log In" : "Sign Up"}</Link>
          </h4>
        </div>
      </div>
    </>
  )
}

export default Signup