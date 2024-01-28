import React from 'react'
import "./style.css";

const InputComponent = ({type,placeholder,state,setState,required}) => {

  return (

    <input 
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e)=> setState(e.target.value)}
        required ={required}
        className='custom-input'
    />
  )
}

export default InputComponent;