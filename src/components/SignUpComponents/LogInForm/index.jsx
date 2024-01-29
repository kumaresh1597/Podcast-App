import React,{useState} from 'react';
import InputComponent from '../../common/Input/InputComponent';
import Button from '../../common/Button';
import "./style.css";

import {db,auth} from "../../../firebase";
import {signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";

import { getDoc,doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import { setUser } from '../../../slices/userSlice';
import { useNavigate,Link} from 'react-router-dom';

import {toast} from "react-toastify";

const LogInForm = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e){
      e.preventDefault();
      setLoading(true);
      
      if(username && password){
          try{

            const userCredential = await signInWithEmailAndPassword(auth,username,password);
            const user = userCredential.user;
            console.log(user);
    
            const userDoc = await getDoc(doc(db,"users",user.uid));
            const userDetail = userDoc.data();
    
            console.log(userDetail);
    
            dispatch(setUser({
              name : userDetail.name,
              email : user.email,
              profilePic : userDetail.profilePic,
              uid : user.uid
          }));
          toast.success("Log in successfull");
          setLoading(false);
          navigate("/profile");
      
          } catch (error){
            console.log(error);
            toast.error(error.message);
            setLoading(false);
          }
       }
      else{
        toast.error("Please fill all the fields");
        setLoading(false);
       }   
    }
    
    function handleResetPassword(){
      setLoading(true);
        if(username){
            sendPasswordResetEmail(auth, username)
         .then(() => {
              // Password reset email sent!
              //..
              toast.error("Password reset link sent to your email");
              setLoading(false); 
              navigate("/");   
            })
         .catch((error) => {
              const errorMessage = error.message;
              toast.error(errorMessage);
              setLoading(false);
              //..
            });
        } else{
          toast.error("Enter Email address");
          setLoading(false);
        }
    }

  return (
    <>
     <form className="log-in-form">
          <InputComponent type="email" placeholder="Email" state={username} setState={setUsername} required={true} />
          <InputComponent type="password" placeholder="Password" state={password} setState={setPassword} required={true} />
          <div style={{width:'100%'}}><Link onClick={handleResetPassword}>Forget password ?</Link></div>
          <div className='log-in-btn'>
          <Button name={loading ? "Loading..." : "Log In"} onClick={handleSubmit} disabled={loading}/>
          </div> 
     </form>
    </>
  )
}

export default LogInForm;