import React, { useContext, useState, useRef } from 'react'
import { GrPlay, GrPause } from "react-icons/gr";
import UserContext from "../../../contexts/UserContext";
import DataContext from '../../../contexts/DataContext';


function Card({ user }) {

  const { currentUser, users, setProfile, profile } = useContext(UserContext);
  const { selectedFile, fileName } = useContext(DataContext);
  const [playing, setPlaying] = useState(false);

  let url;
  if(user.music.length !== 0) {
    url = user.music[0].path
  }
  else {
    url = null
  }

  let audioRef = useRef(new Audio(url))


  const play = () => {
    setPlaying(true);
    audioRef.current.play();
  }

  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
  }

  const checkUserNameLength = () => {
    if(user.username.length > 14 && user.username.length < 17) {
      return 'font-size-s'
    } else if (user.username.length > 17) {
      return 'font-size-xs'
    }
  }

  return (
    <div className="card" onClick={() => setProfile(user)}>

      <div className='card-left-column'>
        <div className={ `${checkUserNameLength()} card-artist-name`}>
          <div>{user.username}</div>
        </div>
      </div>

      <div className='card-right-column'>
        <div className="card-track-pic"><img src={user.image}/></div>
        {user.music.length > 0 ? (
          <div className='card-bottom-column' onClick={e => e.preventDefault()}>
         <div className="play-btn" onClick={playing ? pause : play}> {playing ? <GrPause/> : <GrPlay/> } </div>
          <div className="card-track-title">
          {user.music.length > 0 && user.music[0].title}
          </div>
        </div>) : (
          <div className='card-bottom-column'></div>)
      }
      </div>

    </div>
  )
}

export default Card;