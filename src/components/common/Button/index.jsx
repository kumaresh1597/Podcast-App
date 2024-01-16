import React from 'react'
import "./style.css";

const Button = ({name,onClick,disabled}) => {

  return (
    <button className='custom-btn' onClick={onClick} disabled={disabled}>{name}</button>
  )
}

export default Button;