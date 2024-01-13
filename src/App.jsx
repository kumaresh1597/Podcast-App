import React from 'react';
import { Routes,Route } from 'react-router-dom';

import NavBar from "./components/common/NavBar/index.jsx"

import Signup from './pages/Signup.jsx'
import Podcasts from './pages/Podcasts.jsx'
import CreatePodcast from './pages/CreatePodcast.jsx'
import Profile from './pages/Profile.jsx' 

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/podcast" element={<Podcasts/>} />
        <Route path="/createPodcast" element={<CreatePodcast/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App
