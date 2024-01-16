import React,{useState} from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import "./style.css";

import {db,auth,storage} from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getDoc,doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

import {toast} from "react-toastify"

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

  return (
    <>
     <form className="log-in-form">
          <InputComponent type="text" placeholder="UserName" state={username} setState={setUsername} required={true} />
          <InputComponent type="password" placeholder="Password" state={password} setState={setPassword} required={true} />
          <div className='log-in-btn'>
          <Button name={loading ? "Loading..." : "Log In"} onClick={handleSubmit} disabled={loading}/>
          </div> 
     </form>
    </>
  )
}

export default LogInForm;