import React, { useEffect } from 'react';
import { Routes,Route } from 'react-router-dom';

import NavBar from "./components/common/NavBar/index.jsx"

import Signup from './pages/Signup.jsx'
import Podcasts from './pages/Podcasts.jsx'
import CreatePodcast from './pages/CreatePodcast.jsx'
import Profile from './pages/Profile.jsx' 
import { onAuthStateChanged } from 'firebase/auth';
import { auth,db } from './firebase.js';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice.js';
import PrivateRoutes from './components/common/PrivateRoutes.jsx';
import PodcastDetail from './pages/PodcastDetail.jsx';
import CreateEpisode from './pages/CreateEpisode.jsx';
import EditProfilePage from './pages/EditProfilePage.jsx';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
          if(user){
            const unsubscribeSnapShot = onSnapshot(
              doc(db,"users",user.uid),
              (userDoc)=>{
                if(userDoc.exists()){
                  const userDetail = userDoc.data();
                    dispatch(setUser({
                      name : userDetail.name,
                      email : userDetail.email,
                      uid : userDetail.uid
                    }));
                }
              },
              (error)=>{
                console.log(error);
              }
            );

            return ()=>{
              unsubscribeSnapShot();
            }
          }
    })

    return () => {
      unsubscribeAuth();
    }
  });



  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route element={<PrivateRoutes/>}>
            <Route path="/podcast" element={<Podcasts/>} />
            <Route path="/createPodcast" element={<CreatePodcast/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/podcast/:id" element={<PodcastDetail/>} />
            <Route path="/podcast/:id/createEpisode" element={<CreateEpisode/>} />
            <Route path="/profile/editProfile" element={<EditProfilePage/>} />
        </Route>      
      </Routes>
    </div>
  )
}

export default App
