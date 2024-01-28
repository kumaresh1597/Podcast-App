import React from 'react'
import "./style.css";

const DropDown = ({placeholder,state,setState,required,options}) => {
  return (
    <select
    placeholder={placeholder}
    value={state}
    onChange={(e)=> setState(e.target.value)} 
    required = {required}
    className='custom-input drop-down'
     >
        <option value="" disabled selected hidden>-- Select Genres --</option>
        <option value="">None</option>
        {
            options && options.map((option)=>(
                <option value={option}>{option}</option>
            ))
        }
    </select>
  )
}

export default DropDown