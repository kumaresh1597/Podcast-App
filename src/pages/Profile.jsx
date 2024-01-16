import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const user = useSelector((state)=>state.user.user);
  console.log(user);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Name : {user.name}</h2>
      <h2>Email : {user.email}</h2>
      <h2>UID : {user.uid}</h2>
    </div>
  )
}

export default Profile