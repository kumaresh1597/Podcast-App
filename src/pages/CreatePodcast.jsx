import React from 'react'
import Button from '../components/common/Button'
import CreatePodcastForm from '../components/CreatePodcastComponents/CreatePodcastForm'

const CreatePodcast = () => {

  function handleSubmit(){
    console.log('submit');
  }

  return (
    <div className='create-podcast-page'>
      <div className="input-wrapper">
        <h1 className="header-div">Create a Podcast</h1>
        <CreatePodcastForm/>
      </div>
    </div>
  )
}

export default CreatePodcast