import React,{useState,useEffect} from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import { PlayCircle } from 'react-feather';
import { db } from '../../../firebase';
import { doc,getDoc } from 'firebase/firestore';
import {toast} from "react-toastify";

const PodcastCard = ({item}) => {
  console.log(item);

  const [user,setUser] = useState("");

  useEffect(()=>{

    getUserDetails(item.created_By);

  },[]);

async function getUserDetails(id){
  try {

    const userDoc = await getDoc(doc(db,"users",id));
    const userDetail = userDoc.data();
    setUser(userDetail);
    
  } catch (error) {
    toast.error(error.message);
  }
}

  return (
    <Link to={`/podcast/${item.id}`}>
      <li className='podcast-card'>
        <div className='podcast-img-div'>
          <img src={item.smallImage} alt="display img" />
        </div>
        <div className='podcast-div2'>
          <div>
          <p className='podcast-card-title'>{item.title}</p>
          <p className='podcast-card-artist'>by {user.name} | {item.genre}</p>
          </div>
          <p className='play-icon'><PlayCircle size={35}/></p>
        </div> 
      </li>
    </Link>
  )
}

export default PodcastCard;