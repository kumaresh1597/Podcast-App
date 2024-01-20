import React,{useState} from 'react'
import {Link} from "react-router-dom"
import SignUpForm from '../components/SignUpComponents/SignUpForm';
import LogInForm from '../components/SignUpComponents/LogInForm';

const Signup = () => {

  const [flag,setFlag] = useState(true);

  return (
    <div className="sign-up-page">
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
  )
}

export default Signup