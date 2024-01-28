import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import {auth,db,storage} from '../firebase';
import {doc,updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { setUser } from '../slices/userSlice';
import InputComponent from '../components/common/Input/InputComponent';
import FileInput from '../components/common/Input/FileInput';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const EditProfilePage = () => {

    const user = useSelector((state)=>state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username,setUsername] = useState(user.name);
    const [profilePic,setProfilePic] = useState(user.profilePic);
    const [loading,setLoading] = useState(false);

    async function handleProfilePic(file){
        setLoading(true);
      try {

        const profilePicRef = ref(storage,`user/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(profilePicRef,file);
        const profilePicUrl = await getDownloadURL(profilePicRef);
        console.log(profilePicUrl);
        setProfilePic(profilePicUrl);
        setLoading(false);

      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
        
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);

      try{

          await updateDoc(doc(db,"users",user.uid),{
              name : username,
              profilePic : profilePic,
            });

            dispatch(setUser({
              name : username,
              email : user.email,
              profilePic : profilePic,
              uid : user.uid
          }));

      toast.success("Profile Edited successfully");
      setLoading(false);
      navigate("/profile");
  
      } catch (error){
        toast.error(error.message);
        setLoading(false);
      } 

    }


  return (
    <div className='edit-profile-page'>
        <div className='edit-page-wrapper'>
            <h1 className='header-div'>Edit Profile</h1>
            <div className='profile-card'>
                <div className='profile-img-div' style={{position:'relative'}}>
                    {
                      loading ? <Loader/> : <img src={profilePic} alt="display img" />
                    }
                </div>
                <FileInput text="--Edit Profile Picture--" accept={"Image/*"} id="dp" fileHandleFunction={handleProfilePic}/> 
            </div>
            <div>
                <InputComponent type="text" state={username} setState={setUsername} />
            </div>
            <div>
                <Button name={loading ? "Loading..." : "Submit"} onClick={handleSubmit}/>
            </div>
        </div>
    </div>
  )
}

export default EditProfilePage