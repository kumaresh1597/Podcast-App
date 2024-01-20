import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Button from '../components/common/Button';
import { useDispatch } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore'
import { setEpisode } from '../slices/episodeSlice';
import Episode from '../components/CreateEpisodeComponents/Episode';
import AudioPlayer from '../components/common/AudioPlayer/AudioPlayer';

const PodcastDetail = () => {

    const {id} = useParams();
    const [podcast,setPodcast] = useState({});
    const [allEpisodes,setAllEpisodes] = useState({});
    const [playingAudio, setPlayingAudio] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(id){
            getDocument();
        }

    },[id]);


    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapShot)=>{
            const episodesData = [];
            querySnapShot.forEach((doc)=>{
                episodesData.push({id:doc.id, ...doc.data()});
            })
            console.log(episodesData);
            setAllEpisodes(episodesData);
            dispatch(setEpisode(episodesData));
            },
            (error)=>{
            toast.error(error.message);
            }
            );
        
        return ()=>{
            unsubscribe();
        }
        
    },[dispatch]);

    async function getDocument(){

        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.log(docSnap.data());
                setPodcast({id:id, ...docSnap.data()}); 
            }else{
                toast.error("No such podcast found");
                navigate('/podcast');
            }
             
        } catch (error) {
            toast.error(error.message);
        }
    }

    console.log(playingAudio);

  return (
    <div className='podcast-detail-page'>
        {
            podcast.id && <>
                <div className='podcast-title'>
                <h1 className='header-div'>{podcast.title}</h1>
                {
                    podcast.created_By === auth.currentUser.uid && (<div style={{width:'20%'}}>
                    <Button name="Create Episode" onClick={()=>(navigate(`/podcast/${id}/createEpisode`))}/>
                    </div>)
                }
                </div>
                <div className='podcast-banner-wrapper'>
                    <img src={podcast.bannerImage} alt={podcast.title}/>
                </div>
                <p className='podcast-description'>{podcast.description}</p>
                <h1 className='header-div'>Episodes</h1>
                <ol className='episode-list'>
                    {
                        allEpisodes.length >0 ?(
                            allEpisodes.map((episode)=>(
                                <li key={episode.id} >
                                    <Episode episode={episode} onclick={(file)=>setPlayingAudio(file)}/> 
                                </li>
                            ))
                        ):(<p>No Episode found</p>)
                    }
                </ol>     
            </>
        } 
        {
            playingAudio && <AudioPlayer audio={playingAudio} displayImg={podcast.smallImage}/>
        }     
    </div>
  )
}

export default PodcastDetail