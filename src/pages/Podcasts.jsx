
import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../slices/podcastSlice';
import { toast } from 'react-toastify';
import InputComponent from '../components/common/Input';
import PodcastCard from '../components/PodcastPageComponents/PodcastPage/PodcastCard';

const Podcasts = () => {

  const dispatch = useDispatch();
  const allPodcasts = useSelector((state)=>state.podcasts.podcasts);

  const [search,setSearch] = useState("");

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

  },[dispatch])

  const filteredPodcasts = allPodcasts.filter(
    (podcast)=>podcast.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

  return (
    <div className='podcast-page'>
        <div style={{width:"100%",display:'flex', justifyContent:'center',alignItems:'center'}}>
        <h1 className='header-div'>Discover Podcasts</h1>
        </div>
        <div className='search-bar' style={{width:"90%"}}>
          <InputComponent type="text" placeholder={"Search Podcast"} state={search} setState={setSearch}/>
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
              search ? <h1 className='header-div'>Podcasts Not Found</h1> : <h1 className='header-div'>No Podcast Found</h1>
            )
            }
    </div>
  )
}

export default Podcasts;