import React,{useState} from 'react';
import InputComponent from '../../common/Input';
import "./style.css";

const SignUpForm = () => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [password2,setPassword2] = useState('');

  return (
    <>
        <form className="sign-up-form">
          <InputComponent type="text" placeholder="UserName" state={username} setState={setUsername} required={true} />
          <InputComponent type="email" placeholder="Email" state={email} setState={setEmail} required={true} />
          <InputComponent type="password" placeholder="Password" state={password} setState={setPassword} required={true} />
          <InputComponent type="password" placeholder="Confirm Password" state={password2} setState={setPassword2} required={true} />
          <button className='sign-up-btn' type="submit">Sign Up</button>
        </form>
    </>
  )
}

export default SignUpForm;