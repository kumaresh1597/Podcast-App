import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

import {auth,db} from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore'
import {signOut} from "firebase/auth";
import { getDoc,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ProfileCard from '../components/Profile/ProfileCard/ProfileCard';
import PodcastCard from '../components/PodcastPageComponents/PodcastPage/PodcastCard';
import { setUser } from '../slices/userSlice';
import NavBar from '../components/common/NavBar';

const Profile = () => {

  const user = useSelector((state)=>state.user.user);

  const [podcasts,setPodcasts] = useState([]);

  const dispatch = useDispatch();
  
  console.log(user);

  useEffect(()=>{
    const id = auth.currentUser.uid;
    if(id){
        getUserDetails(id);
    }

},[dispatch]);

async function getUserDetails(id){
    try {

      const userDoc = await getDoc(doc(db,"users",id));
      const userDetail = userDoc.data();
    
      console.log(userDetail);
    
        dispatch(setUser({
            name : userDetail.name,
            email : user.email,
            profilePic : userDetail.profilePic,
            uid : user.uid
        }));
      
    } catch (error) {
      toast.error(error.message);
    }
}

  useEffect(()=>{
    const id = auth.currentUser.uid;
    console.log(id);

    const unsubscribe = onSnapshot(
      query(collection(db,"podcasts")),
      (querySnapShot)=>{
      const podcastsData = [];
      querySnapShot.forEach((doc)=>{
        const currentPodcast = doc.data();
        console.log(currentPodcast);
          if(currentPodcast.created_By === id){
            podcastsData.push({id:doc.id, ...currentPodcast});
          }
      })
      console.log(podcastsData);
      setPodcasts(podcastsData);

      },
      (error)=>{
      toast.error(error.message);
      }
      );
  
  return ()=>{
      unsubscribe();
  }
  },[]);



  return (
    <>
      <NavBar/>

      <div className='profile-page'>
        <div className='my-profile'>
          <h1 className='header-div'>Profile</h1>
          <ProfileCard item={user}/>
        </div>
        <div className='your-podcast'>
          <h1 className='header-div'>Your Podcast</h1>
          {
              podcasts.length > 0 ? (
                <ul className='all-podcast'>
                  {
                    podcasts.map((podcast)=>(
                      <PodcastCard key={podcast.id} item={podcast}/>
                    ))
                }
                </ul>
                ):(
                  <h1 className='content-text-div'>No Podcast Found <Link className='linkRef' to="/createPodcast"> Create Podcast</Link> </h1>
                )
                }
        </div>
      </div>

    </>
  )
}

export default Profile