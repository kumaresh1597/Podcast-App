import React from 'react'
import Button from '../common/Button';
import "./style.css"

const Episode = ({episode,onclick,index}) => {
  return (
    <div className='episode-card'>
    <h2 className='episode-title'>{index+1}. {episode.title}</h2>
    <p className='episode-desc'>{episode.description}</p>
    <div style={{width:"10%"}}>
    <Button name="Play" onClick={()=>onclick(episode.audioFile)}/>
    </div>
    </div>
  )
}

export default Episode
