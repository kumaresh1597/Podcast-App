import React,{useState} from 'react'
import InputComponent from '../../common/Input';
import "./style.css";

const LogInForm = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

  return (
    <>
     <form className="log-in-form">
          <InputComponent type="text" placeholder="UserName" state={username} setState={setUsername} required={true} />
          <InputComponent type="password" placeholder="Password" state={password} setState={setPassword} required={true} />
          <button className='log-in-btn' type="submit">Log In</button>
     </form>
    </>
  )
}

export default LogInForm;