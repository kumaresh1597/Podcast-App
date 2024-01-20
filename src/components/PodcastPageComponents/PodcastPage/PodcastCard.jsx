import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
import { PlayCircle } from 'react-feather';

const PodcastCard = ({item}) => {
  console.log(item);
  return (
    <Link to={`/podcast/${item.id}`}>
      <li className='podcast-card'>
        <div className='podcast-img-div'>
          <img src={item.smallImage} alt="display img" />
        </div>
        <div className='podcast-div2'>
          <p className='podcast-title'>{item.title}</p>
          <PlayCircle/>
        </div> 
      </li>
    </Link>
  )
}

export default PodcastCard;