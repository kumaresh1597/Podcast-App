import React,{useState} from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import "./style.css";

import {db,auth,storage} from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { setDoc,doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const SignUpForm = () => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [password2,setPassword2] = useState('');
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);

    if(password === password2 && password.length >= 6 && username && email){
      try{

        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        console.log(user);

        await setDoc(doc(db,"users",user.uid),{
          name : username,
          email : user.email,
          uid : user.uid
        });

        dispatch(setUser({
          name : username,
          email : user.email,
          uid : user.uid
      }));

      toast.success("User created successfully");
      setLoading(false);
      navigate("/profile");
  
      } catch (error){
        toast.error(error.message);
        setLoading(false);
      }
    } else{
       if(password !== password2){
        toast.error("Passwords do not match");
       }
       else if(password.length <= 6){
        toast.error("Password must be at least 6 characters");
       }
       setLoading(false);
    } 
    
  }

  return (
    <>
        <form className="sign-up-form">
          <InputComponent type="text" placeholder="UserName" state={username} setState={setUsername} required={true} />
          <InputComponent type="email" placeholder="Email" state={email} setState={setEmail} required={true} />
          <InputComponent type="password" placeholder="Password" state={password} setState={setPassword} required={true} />
          <InputComponent type="password" placeholder="Confirm Password" state={password2} setState={setPassword2} required={true} />
          <div className='sign-up-btn'>
          <Button name={loading ? "Loading..." : "Sign Up"} onClick={handleSubmit} disabled = {loading}/>
          </div>          
        </form>
    </>
  )
}

export default SignUpForm;