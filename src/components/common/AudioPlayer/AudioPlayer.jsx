import React, { useEffect, useRef,useState } from 'react'
import "./style.css";

import {Play,Pause,Volume2,VolumeX,FastForward,Rewind} from 'react-feather';

const AudioPlayer = ({audio,displayImg}) => {

  const [duration,setDuration] = useState(0);
  const [currentTime,setCurrentTime] = useState(0);
  const [volume,setVolume] = useState(1);
  const [isPlaying,setIsPlaying] = useState(true);
  const [isMuted,setIsMuted] = useState(false);

  const audioRef = useRef();

  useEffect(()=>{
    const audio = audioRef.current;
    audio.addEventListener("timeupdate",handleTimeUpdate);
    audio.addEventListener("loadedmetadata",handleLoadedMetadata);
    audio.addEventListener("ended",handleEnded);

    return ()=>{
      audio.removeEventListener("timeupdate",handleTimeUpdate);
      audio.removeEventListener("loadedmetadata",handleLoadedMetadata);
      audio.removeEventListener("ended",handleEnded);
    }
  },[]);

  useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }
  },[isPlaying]);

  useEffect(()=>{
    if(isMuted){
      audioRef.current.volume = 0;
      setVolume(0);
    }else{
      audioRef.current.volume = 1;
      setVolume(1);
    }
  },[isMuted]);

  function handleTimeUpdate(){
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleLoadedMetadata(){
    setDuration(audioRef.current.duration);
  }

  function handleEnded(){
    setCurrentTime(0);
    setIsPlaying(false);
  }


  function handleDuration(e){
      setCurrentTime(e.target.value);
      audioRef.current.currentTime = e.target.value;
  }

  function handleVolume(e){
      setVolume(e.target.value);
      audioRef.current.volume = e.target.value;
  }

  function handleRewind(){
    audioRef.current.currentTime = currentTime - 5;
  }

  function handleForward(){
    audioRef.current.currentTime = currentTime + 5;
  }

  function formatTime(time){
    const min = Math.floor(time/60);
    const sec = Math.floor(time%60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  return (
    <div className='custom-audio-player'>
        <div className='displayImage-container'>
          <img src={displayImg} alt='display Image'/>
        </div>
        <audio ref={audioRef} src={audio} />
        <div className='progress-bar'>
          <p onClick={()=>setIsPlaying(!isPlaying)}>{isPlaying ? <Pause/> : <Play/>}</p> 
          <p onClick={handleRewind}><Rewind/></p>
          <p>{formatTime(currentTime)}</p>
          <input type='range' min={0} max={duration} step={0.01} value={currentTime} onChange={handleDuration}/>
          <p>{formatTime((duration - currentTime))}</p>
          <p onClick={handleForward}><FastForward/></p> 
        </div>
        <div className='volume-bar'>
          <p onClick={()=>setIsMuted(!isMuted)}>{isMuted ? <VolumeX/> : <Volume2/>}</p>
          <input type='range' min={0} max={1} step={0.01} value={volume} onChange={handleVolume}/>
        </div>
        
    </div>
  )
}

export default AudioPlayer