
import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../slices/podcastSlice';
import { toast } from 'react-toastify';
import InputComponent from '../components/common/Input/InputComponent';
import PodcastCard from '../components/PodcastPageComponents/PodcastPage/PodcastCard';
import DropDown from '../components/common/Input/DropDown';
import NavBar from '../components/common/NavBar';

const Podcasts = () => {

  const dispatch = useDispatch();
  const allPodcasts = useSelector((state)=>state.podcasts.podcasts);

  const [searchByName,setSearchByName] = useState("");
  const [searchByGenre,setSearchByGenre] = useState("");

  useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db,"podcasts")),
      (querySnapShot)=>{
        const podcastData = [];
        querySnapShot.forEach((doc)=>{
          podcastData.push({id:doc.id, ...doc.data()});
        })
        console.log(podcastData);
        dispatch(setPodcasts(podcastData))
      },
      (error)=>{
        toast.error(error.message);
      }
    );

    return ()=>{
      unsubscribe();
    }

  },[dispatch]);

  const options = ['Storytelling','Health and wellness','Self-help','Politics','Investigative journalism','Religion','Sports','True crime','History','Technology','Music','Culture'];

  let filteredPodcasts = allPodcasts.filter(
    (podcast)=>podcast.title.trim().toLowerCase().includes(searchByName.trim().toLowerCase())
    );

    filteredPodcasts = filteredPodcasts.filter(
      (podcast)=>podcast.genre.trim().toLowerCase().includes(searchByGenre.trim().toLowerCase())
      );
  

  return (
    <>
      <NavBar/>
        <div className='podcast-page'>
        <div style={{width:"100%",display:'flex', justifyContent:'center',alignItems:'center'}}>
        <h1 className='header-div'>Discover Podcasts</h1>
        </div>
        <div className='search-bar'>
          <div style={{width:"40%"}}>
          <InputComponent type="text" placeholder={"Search podcast by name"} state={searchByName} setState={setSearchByName}/>
          </div>
          <div style={{width:"40%"}}>
          <DropDown state={searchByGenre} setState={setSearchByGenre} options={options} />
          </div>  
        </div>
          {
          filteredPodcasts.length > 0 ? (
            <ul className='all-podcast'>
              {
                filteredPodcasts.map((podcast)=>(
                  <PodcastCard key={podcast.id} item={podcast}/>
                ))
             }
            </ul>
            ):(
              searchByName ? <h1 className='header-div'>Podcasts Not Found</h1> : <h1 className='header-div'>No Podcast Found</h1>
            )
            }
        </div>
    </>
    
  )
}

export default Podcasts;