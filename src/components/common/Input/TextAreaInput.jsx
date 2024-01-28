import React from 'react'

const TextAreaInput = ({placeholder,state,setState,required}) => {
  return (
    <textarea 
    placeholder={placeholder}
    value={state}
    onChange={(e)=> setState(e.target.value)}
    required ={required}
    className='custom-input'
    >
    </textarea>
  )
}

export default TextAreaInput
