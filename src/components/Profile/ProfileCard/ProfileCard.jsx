import React from 'react';
import "./style.css";
import { Edit } from 'react-feather';

const ProfileCard = ({item}) => {
    console.log(item);
  return (
    <div className='profile-card'>
       <div className='profile-img-div'>
          <img src={item.profilePic} alt="display img" />
        </div>
        <div className='profile-div2'>
          <p className='profile-title'>{item.name}</p>
          <p><Edit /></p>
        </div>  
    </div>
  )
}

export default ProfileCard