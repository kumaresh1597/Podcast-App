import React from 'react'
import CreateEpisodeForm from '../components/CreateEpisodeComponents/CreateEpisodeForm'
import NavBar from '../components/common/NavBar'

const CreateEpisode = () => {
  return (
    <>
    <NavBar/>
    <div className='create-episode-page'>
        <div className="input-wrapper">
        <h1 className="header-div">Create Episode</h1>
        <CreateEpisodeForm/>
      </div>
    </div>
    </>
    
  )
}

export default CreateEpisode