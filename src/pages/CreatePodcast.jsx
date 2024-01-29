import React from 'react'
import Button from '../components/common/Button'
import CreatePodcastForm from '../components/CreatePodcastComponents/CreatePodcastForm'
import NavBar from '../components/common/NavBar';

const CreatePodcast = () => {

  function handleSubmit(){
    console.log('submit');
  }

  return (
    <>
    <NavBar/>
    <div className='create-podcast-page'>
      <div className="input-wrapper">
        <h1 className="header-div">Create a Podcast</h1>
        <CreatePodcastForm/>
      </div>
    </div>
    </>
    
  )
}

export default CreatePodcast