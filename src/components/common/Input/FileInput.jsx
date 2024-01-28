import React, { useState } from 'react'

const FileInput = ({accept,id,text,fileHandleFunction,style}) => {

    const [fileSelected, setFileSelected] = useState("");

    const onChangeHandler = (e) => {
        setFileSelected(e.target.files[0]);
        const file = e.target.files[0];
        fileHandleFunction(file);
    }

  return (
    <>
    <label htmlFor={id} className={`custom-input ${!fileSelected ? "lable-input" :"uploaded"}`}>{fileSelected?`${fileSelected.name} file selected`:text}</label>
    <input 
     type="file" 
     id={id} 
     accept={accept}
     style={{display:'none'}}
     onChange={onChangeHandler}
    />
    </>
  )
}

export default FileInput;